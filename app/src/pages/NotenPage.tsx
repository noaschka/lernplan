import { useStore } from '../store/useStore';
import { berechneNotenschnitt, notenverteilung, ectsErreicht } from '../utils/grades';

export default function NotenPage() {
  const module = useStore((s) => s.module);
  const { schnitt, ectsGewertet } = berechneNotenschnitt(module);
  const verteilung = notenverteilung(module);
  const maxCount = Math.max(1, ...Object.values(verteilung));
  const gesamtBestanden = module.filter((m) => m.status === 'bestanden').length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">ECTS/Noten</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Gewichteter Gesamtschnitt und Notenverteilung.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Notenschnitt</div>
          <div className="mt-1 text-3xl font-extrabold">{schnitt != null ? schnitt.toFixed(2) : '–'}</div>
          <div className="mt-1 text-xs text-slate-400">ECTS-gewichtet über {ectsGewertet} ECTS</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">ECTS erreicht</div>
          <div className="mt-1 text-3xl font-extrabold">{ectsErreicht(module)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Module bestanden</div>
          <div className="mt-1 text-3xl font-extrabold">{gesamtBestanden}</div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-400">Notenspiegel</div>
        <div className="space-y-2">
          {Object.entries(verteilung).map(([bucket, count]) => (
            <div key={bucket} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-sm text-slate-500">{bucket}</span>
              <div className="h-5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-slate-900 dark:bg-white"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="w-6 shrink-0 text-right text-sm font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
