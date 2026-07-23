import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DndContext, DragOverlay, useDraggable, useDroppable, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useStore } from '../store/useStore';
import StatusBadge, { STATUS_LABELS, STATUS_OPTIONS } from '../components/ui/StatusBadge';
import FormattedText from '../components/ui/FormattedText';
import IstSemesterBadge from '../components/ui/IstSemesterBadge';
import { aktuelleNote, berechneNotenschnitt, ectsErreicht } from '../utils/grades';
import { formatiereDatum } from '../utils/dates';
import type { Modul, ModulStatus } from '../types';

function ModuleRow({ m, offen, toggle }: { m: Modul; offen: boolean; toggle: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: m.id });
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 ${isDragging ? 'z-10 opacity-40' : ''}`}
    >
      <div className="flex w-full flex-wrap items-center gap-x-2 gap-y-1 px-2 py-3">
        <button
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab touch-none px-1.5 text-slate-300 active:cursor-grabbing dark:text-slate-600"
          title="Ziehen, um Semester zu ändern"
          aria-label="Modul verschieben"
        >
          &#8942;&#8942;
        </button>
        <button onClick={() => toggle(m.id)} className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-left">
          <span className={`shrink-0 text-slate-300 transition-transform dark:text-slate-600 ${offen ? 'rotate-90' : ''}`}>&#9656;</span>
          <span className="min-w-[220px] flex-1 font-semibold">{m.name}</span>
          {m.semesterIst != null && m.semesterIst !== m.semesterSoll && <IstSemesterBadge semesterIst={m.semesterIst} />}
          <span className="text-xs text-slate-400">{m.ects} ECTS</span>
          <span className="hidden text-xs text-slate-400 sm:inline">{m.pruefungsform || '–'}</span>
          <StatusBadge status={m.status} />
          <span className="w-10 text-right text-sm font-semibold">{aktuelleNote(m)?.toFixed(1) ?? '–'}</span>
          <span className="text-xs text-slate-400">{formatiereDatum(m.pruefungstermin)}</span>
        </button>
      </div>

      {offen && (
        <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-800">
          <div className="mb-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>{m.kuerzel}</span>
            <span>SWS {m.swsVorlesung}</span>
            <span>Workload {m.workloadGesamt} Std.</span>
          </div>

          {m.lehrziele && (
            <div className="mb-4">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Lehrziele</div>
              <FormattedText text={m.lehrziele} />
            </div>
          )}
          {m.inhalte && (
            <div className="mb-4">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Inhalte</div>
              <FormattedText text={m.inhalte} />
            </div>
          )}
          {!m.lehrziele && !m.inhalte && <p className="mb-4 text-sm text-slate-400">Keine Inhalte/Lehrziele hinterlegt.</p>}

          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <Link
              to={`/module/${m.id}/lernplan`}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
            >
              Lernplan
            </Link>
            <Link
              to={`/module/${m.id}`}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Details &amp; Versuche
            </Link>
            <Link
              to={`/module/${m.id}/bearbeiten`}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Bearbeiten
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function SemesterGroup({
  sem,
  semModule,
  offen,
  toggle,
}: {
  sem: number;
  semModule: Modul[];
  offen: Set<string>;
  toggle: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `sem-${sem}` });
  const semStats = berechneNotenschnitt(semModule);
  const semEcts = ectsErreicht(semModule);
  const semEctsGesamt = semModule.reduce((s, m) => s + m.ects, 0);

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-bold">Semester {sem}</h2>
        <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>
            ECTS: <strong className="text-slate-700 dark:text-slate-200">{semEcts} / {semEctsGesamt}</strong>
          </span>
          <span>
            Schnitt: <strong className="text-slate-700 dark:text-slate-200">{semStats.schnitt != null ? semStats.schnitt.toFixed(2) : '–'}</strong>
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`space-y-3 rounded-xl border-2 border-dashed p-1 transition-colors ${
          isOver ? 'border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-slate-800/40' : 'border-transparent'
        } ${!semModule.length ? 'min-h-[52px]' : ''}`}
      >
        {semModule.length ? (
          semModule.map((m) => <ModuleRow key={m.id} m={m} offen={offen.has(m.id)} toggle={toggle} />)
        ) : (
          <div className="flex h-12 items-center justify-center text-xs text-slate-300 dark:text-slate-600">Modul hierher ziehen</div>
        )}
      </div>
    </div>
  );
}

export default function ModulePage() {
  const module = useStore((s) => s.module);
  const gesamtEctsSoll = useStore((s) => s.settings.gesamtEctsSoll);
  const updateModul = useStore((s) => s.updateModul);
  const [statusFilter, setStatusFilter] = useState<ModulStatus | 'alle'>('alle');
  const [offen, setOffen] = useState<Set<string>>(new Set());
  const [aktivesModul, setAktivesModul] = useState<Modul | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const gefiltert = module
    .filter((m) => statusFilter === 'alle' || m.status === statusFilter)
    .sort((a, b) => a.name.localeCompare(b.name));

  const nachSemester = useMemo(() => {
    const gruppen = new Map<number, Modul[]>();
    gefiltert.forEach((m) => {
      const sem = m.semesterSoll;
      if (!gruppen.has(sem)) gruppen.set(sem, []);
      gruppen.get(sem)!.push(m);
    });
    return [...gruppen.entries()].sort((a, b) => a[0] - b[0]);
  }, [gefiltert]);

  const gesamt = berechneNotenschnitt(module);
  const gesamtEcts = ectsErreicht(module);

  function toggle(id: string) {
    setOffen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleDragStart(e: DragStartEvent) {
    setAktivesModul(module.find((m) => m.id === e.active.id) ?? null);
  }

  function handleDragEnd(e: DragEndEvent) {
    setAktivesModul(null);
    const overId = e.over?.id;
    if (!overId || typeof overId !== 'string' || !overId.startsWith('sem-')) return;
    const neuesSemester = Number(overId.slice(4));
    const modul = module.find((m) => m.id === e.active.id);
    if (modul && modul.semesterSoll !== neuesSemester) {
      updateModul(modul.id, { semesterSoll: neuesSemester });
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Modulübersicht</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Nach Semester gegliedert &ndash; per Griff (&#8942;&#8942;) in ein anderes Semester ziehen, aufklappen für Inhalte &amp; Lehrziele.
          </p>
        </div>
        <Link
          to="/module/neu"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          + Modul hinzufügen
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Notenschnitt</div>
          <div className="mt-0.5 text-xl font-extrabold">{gesamt.schnitt != null ? gesamt.schnitt.toFixed(2) : '–'}</div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">ECTS erreicht</div>
          <div className="mt-0.5 text-xl font-extrabold">
            {gesamtEcts} / {gesamtEctsSoll}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Module bestanden</div>
          <div className="mt-0.5 text-xl font-extrabold">
            {module.filter((m) => m.status === 'bestanden').length} / {module.length}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ModulStatus | 'alle')}
        >
          <option value="alle">Alle Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <div className="ml-auto flex gap-2 text-xs">
          <button onClick={() => setOffen(new Set(gefiltert.map((m) => m.id)))} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
            Alle aufklappen
          </button>
          <span className="text-slate-300">&middot;</span>
          <button onClick={() => setOffen(new Set())} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
            Alle zuklappen
          </button>
        </div>
      </div>

      {!module.length ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
          Noch keine Module angelegt.
        </div>
      ) : (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="mt-4 space-y-6">
            {nachSemester.map(([sem, semModule]) => (
              <SemesterGroup key={sem} sem={sem} semModule={semModule} offen={offen} toggle={toggle} />
            ))}
          </div>
          <DragOverlay>
            {aktivesModul && (
              <div className="rounded-xl border border-slate-400 bg-white px-4 py-3 text-sm font-semibold shadow-lg dark:border-slate-500 dark:bg-slate-800">
                {aktivesModul.name}
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
