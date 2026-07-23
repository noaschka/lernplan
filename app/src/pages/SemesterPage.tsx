import { useMemo, useState } from 'react';
import { useStore } from '../store/useStore';
import { berechneNotenschnitt, ectsErreicht } from '../utils/grades';
import { formatiereDatum } from '../utils/dates';
import { aktuellesSollSemester } from '../utils/semester';
import { inputClass } from '../components/ui/FormField';
import StatusBadge from '../components/ui/StatusBadge';
import type { Semester } from '../types';

const EMPTY: Semester = { nummer: 1, start: '', ende: '', ectsSoll: 30 };

export default function SemesterPage() {
  const module = useStore((s) => s.module);
  const semesterListe = useStore((s) => s.semester);
  const upsertSemester = useStore((s) => s.upsertSemester);
  const deleteSemester = useStore((s) => s.deleteSemester);

  const [form, setForm] = useState<Semester>(EMPTY);
  const [editing, setEditing] = useState(false);

  const semesterNummern = useMemo(
    () => [...new Set([...module.map((m) => m.semesterSoll), ...semesterListe.map((s) => s.nummer)])].sort((a, b) => a - b),
    [module, semesterListe],
  );

  const sollSemester = aktuellesSollSemester(semesterListe);
  const hoechstesIst = Math.max(
    0,
    ...module.filter((m) => m.status === 'bestanden' || m.status === 'angemeldet').map((m) => m.semesterIst ?? 0),
  );

  function submitSemester(e: React.FormEvent) {
    e.preventDefault();
    upsertSemester(form);
    setForm(EMPTY);
    setEditing(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Semesterübersicht</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Module gruppiert nach Semester, ECTS/Notenschnitt pro Semester, Soll- vs. Ist-Verlauf.
      </p>

      {sollSemester != null && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
          Laut Semesterplanung bist du aktuell in <strong>Semester {sollSemester}</strong> (Soll)
          {hoechstesIst > 0 && (
            <>
              , dein höchstes belegtes/bestandenes Modul liegt bei <strong>Semester {hoechstesIst}</strong> (Ist)
              {hoechstesIst < sollSemester && (
                <span className="ml-1 font-semibold text-amber-600 dark:text-amber-400">
                  &ndash; {sollSemester - hoechstesIst} Semester Verzug zum Plan
                </span>
              )}
              {hoechstesIst >= sollSemester && <span className="ml-1 font-semibold text-emerald-600 dark:text-emerald-400">&ndash; im Plan</span>}
            </>
          )}
          .
        </div>
      )}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Semester verwalten</div>
          {!editing && (
            <button
              onClick={() => {
                setForm({ ...EMPTY, nummer: (semesterListe.at(-1)?.nummer ?? 0) + 1 });
                setEditing(true);
              }}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
            >
              + Semester
            </button>
          )}
        </div>

        {editing && (
          <form onSubmit={submitSemester} className="mb-4 grid grid-cols-2 gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800 sm:grid-cols-4">
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-500">Nummer</span>
              <input
                type="number"
                min={1}
                className={inputClass}
                value={form.nummer}
                onChange={(e) => setForm({ ...form, nummer: Number(e.target.value) })}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-500">Start</span>
              <input type="date" className={inputClass} value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-500">Ende</span>
              <input type="date" className={inputClass} value={form.ende} onChange={(e) => setForm({ ...form, ende: e.target.value })} />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-500">ECTS-Soll</span>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.ectsSoll}
                onChange={(e) => setForm({ ...form, ectsSoll: Number(e.target.value) })}
              />
            </label>
            <div className="col-span-2 flex gap-2 sm:col-span-4">
              <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
                Speichern
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Abbrechen
              </button>
            </div>
          </form>
        )}

        {semesterListe.length ? (
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-400">
              <tr>
                <th className="py-1 pr-3">Semester</th>
                <th className="py-1 pr-3">Start</th>
                <th className="py-1 pr-3">Ende</th>
                <th className="py-1 pr-3">ECTS-Soll</th>
                <th className="py-1" />
              </tr>
            </thead>
            <tbody>
              {semesterListe.map((s) => (
                <tr key={s.nummer} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2 pr-3 font-medium">Semester {s.nummer}</td>
                  <td className="py-2 pr-3">{formatiereDatum(s.start)}</td>
                  <td className="py-2 pr-3">{formatiereDatum(s.ende)}</td>
                  <td className="py-2 pr-3">{s.ectsSoll}</td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => {
                        setForm(s);
                        setEditing(true);
                      }}
                      className="mr-2 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      Bearbeiten
                    </button>
                    <button onClick={() => deleteSemester(s.nummer)} className="text-xs text-slate-400 hover:text-red-500">
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-slate-400">
            Noch keine Semester-Termine hinterlegt (optional &ndash; für den Soll/Ist-Abgleich).
          </p>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {semesterNummern.map((nr) => {
          const semModule = module.filter((m) => m.semesterSoll === nr);
          const semMeta = semesterListe.find((s) => s.nummer === nr);
          const { schnitt } = berechneNotenschnitt(semModule);
          const erreicht = ectsErreicht(semModule);
          const geplant = semMeta?.ectsSoll ?? semModule.reduce((sum, m) => sum + m.ects, 0);

          return (
            <div key={nr} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-base font-bold">Semester {nr}</div>
                  {semMeta && (
                    <div className="text-xs text-slate-400">
                      {formatiereDatum(semMeta.start)} &ndash; {formatiereDatum(semMeta.ende)}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 text-sm">
                  <span>
                    <span className="text-slate-400">ECTS: </span>
                    <strong>
                      {erreicht} / {geplant}
                    </strong>
                  </span>
                  <span>
                    <span className="text-slate-400">Schnitt: </span>
                    <strong>{schnitt != null ? schnitt.toFixed(2) : '–'}</strong>
                  </span>
                </div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {semModule.map((m) => (
                  <div key={m.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                    <span className="flex items-center gap-2">
                      {m.name}
                      {m.semesterIst != null && m.semesterIst !== m.semesterSoll && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                          tats. Sem. {m.semesterIst}
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{m.ects} ECTS</span>
                      <StatusBadge status={m.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
