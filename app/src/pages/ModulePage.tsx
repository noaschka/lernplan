import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import StatusBadge, { STATUS_LABELS, STATUS_OPTIONS } from '../components/ui/StatusBadge';
import { aktuelleNote, berechneNotenschnitt, ectsErreicht } from '../utils/grades';
import { formatiereDatum } from '../utils/dates';
import type { Modul, ModulStatus } from '../types';

export default function ModulePage() {
  const module = useStore((s) => s.module);
  const gesamtEctsSoll = useStore((s) => s.settings.gesamtEctsSoll);
  const [statusFilter, setStatusFilter] = useState<ModulStatus | 'alle'>('alle');
  const [offen, setOffen] = useState<Set<string>>(new Set());

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

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Modulübersicht</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Nach Semester gegliedert &ndash; aufklappen für Inhalte &amp; Lehrziele.
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
        <div className="mt-4 space-y-6">
          {nachSemester.map(([sem, semModule]) => {
            const semStats = berechneNotenschnitt(semModule);
            const semEcts = ectsErreicht(semModule);
            const semEctsGesamt = semModule.reduce((s, m) => s + m.ects, 0);
            return (
              <div key={sem}>
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

                <div className="space-y-3">
                  {semModule.map((m) => {
                    const ist = offen.has(m.id);
                    return (
                      <div key={m.id} className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                        <button onClick={() => toggle(m.id)} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-left">
                          <span className={`shrink-0 text-slate-300 transition-transform dark:text-slate-600 ${ist ? 'rotate-90' : ''}`}>&#9656;</span>
                          <span className="min-w-[220px] flex-1 font-semibold">{m.name}</span>
                          {m.semesterIst != null && m.semesterIst !== m.semesterSoll && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                              tats. Sem. {m.semesterIst}
                            </span>
                          )}
                          <span className="text-xs text-slate-400">{m.ects} ECTS</span>
                          <span className="hidden text-xs text-slate-400 sm:inline">{m.pruefungsform || '–'}</span>
                          <StatusBadge status={m.status} />
                          <span className="w-10 text-right text-sm font-semibold">{aktuelleNote(m)?.toFixed(1) ?? '–'}</span>
                          <span className="text-xs text-slate-400">{formatiereDatum(m.pruefungstermin)}</span>
                        </button>

                        {ist && (
                          <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-800">
                            <div className="mb-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <span>{m.kuerzel}</span>
                              <span>SWS {m.swsVorlesung}</span>
                              <span>Workload {m.workloadGesamt} Std.</span>
                            </div>

                            {m.lehrziele && (
                              <div className="mb-4">
                                <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Lehrziele</div>
                                <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{m.lehrziele}</p>
                              </div>
                            )}
                            {m.inhalte && (
                              <div className="mb-4">
                                <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Inhalte</div>
                                <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{m.inhalte}</p>
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
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
