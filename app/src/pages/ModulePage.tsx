import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import StatusBadge, { STATUS_LABELS, STATUS_OPTIONS } from '../components/ui/StatusBadge';
import { aktuelleNote } from '../utils/grades';
import { formatiereDatum } from '../utils/dates';
import type { ModulStatus } from '../types';

export default function ModulePage() {
  const module = useStore((s) => s.module);
  const [statusFilter, setStatusFilter] = useState<ModulStatus | 'alle'>('alle');
  const [semesterFilter, setSemesterFilter] = useState<number | 'alle'>('alle');

  const semesterOptionen = useMemo(
    () => [...new Set(module.map((m) => m.semesterSoll))].sort((a, b) => a - b),
    [module],
  );

  const gefiltert = module
    .filter((m) => statusFilter === 'alle' || m.status === statusFilter)
    .filter((m) => semesterFilter === 'alle' || m.semesterSoll === semesterFilter)
    .sort((a, b) => a.semesterSoll - b.semesterSoll || a.name.localeCompare(b.name));

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Modulübersicht</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Alle Module mit Status, Note, ECTS und Prüfungsform.
          </p>
        </div>
        <Link
          to="/module/neu"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          + Modul hinzufügen
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
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
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value === 'alle' ? 'alle' : Number(e.target.value))}
        >
          <option value="alle">Alle Semester</option>
          {semesterOptionen.map((s) => (
            <option key={s} value={s}>
              Semester {s}
            </option>
          ))}
        </select>
      </div>

      {!module.length ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
          Noch keine Module angelegt.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Modul</th>
                <th className="px-4 py-3">Sem.</th>
                <th className="px-4 py-3">ECTS</th>
                <th className="px-4 py-3">Prüfungsform</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3">Prüfungstermin</th>
              </tr>
            </thead>
            <tbody>
              {gefiltert.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <Link to={`/module/${m.id}`} className="font-medium hover:underline">
                      {m.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{m.semesterIst ?? m.semesterSoll}</td>
                  <td className="px-4 py-3 text-slate-500">{m.ects}</td>
                  <td className="px-4 py-3 text-slate-500">{m.pruefungsform || '–'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-4 py-3 font-semibold">{aktuelleNote(m)?.toFixed(1) ?? '–'}</td>
                  <td className="px-4 py-3 text-slate-500">{formatiereDatum(m.pruefungstermin)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
