import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import StatusBadge from '../components/ui/StatusBadge';
import UrgencyDot from '../components/ui/UrgencyDot';
import { dringlichkeit, formatiereDatum, tageBis } from '../utils/dates';

export default function OffeneModulePage() {
  const module = useStore((s) => s.module);
  const regelstudienzeitEnde = useStore((s) => s.settings.regelstudienzeitEnde);

  const offene = module
    .filter((m) => m.status !== 'bestanden')
    .map((m) => ({ m, tage: tageBis(m.pruefungstermin) }))
    .sort((a, b) => {
      if (a.tage == null && b.tage == null) return 0;
      if (a.tage == null) return 1;
      if (b.tage == null) return -1;
      return a.tage - b.tage;
    });

  const tageBisRegelende = tageBis(regelstudienzeitEnde);

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Offene Module</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Nur nicht bestandene Module, sortiert nach Dringlichkeit.
      </p>

      {regelstudienzeitEnde && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
          Regelstudienzeit-Ende: <strong>{formatiereDatum(regelstudienzeitEnde)}</strong>
          {tageBisRegelende != null && (
            <span className={tageBisRegelende < 90 ? 'ml-1 font-semibold text-red-500' : 'ml-1 text-slate-500'}>
              ({tageBisRegelende} Tage)
            </span>
          )}
        </div>
      )}

      {!offene.length ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
          Keine offenen Module &ndash; alles bestanden. 🎉
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {offene.map(({ m, tage }) => (
            <Link
              key={m.id}
              to={`/module/${m.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <UrgencyDot level={dringlichkeit(tage)} />
                  <span className="font-semibold">{m.name}</span>
                  <StatusBadge status={m.status} />
                  {m.status === 'drittversuch' && (
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-950 dark:text-red-400">
                      ⚠ Letzter Versuch
                    </span>
                  )}
                </div>
                {tage != null && (
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {tage >= 0 ? `in ${tage} Tagen` : `${-tage} Tage überfällig`}
                  </span>
                )}
              </div>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>Semester {m.semesterSoll}</span>
                <span>{m.ects} ECTS</span>
                {m.pruefungstermin && <span>Prüfung: {formatiereDatum(m.pruefungstermin)}</span>}
                {m.anmeldefrist && <span>Anmeldefrist: {formatiereDatum(m.anmeldefrist)}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
