import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { heuteISO, formatiereDatum } from '../utils/dates';
import { faelligeWiederholungen, naechsteWiederholungBerechnen } from '../utils/spacedRepetition';

export default function WiederholungenPage() {
  const module = useStore((s) => s.module);
  const lernplaene = useStore((s) => s.lernplaene);
  const intervalle = useStore((s) => s.settings.spacedRepetitionIntervalleTage);
  const updateThema = useStore((s) => s.updateThema);

  const heute = heuteISO();
  const faellig = faelligeWiederholungen(module, lernplaene, heute);
  const ueberfaellig = faellig.filter((f) => f.thema.naechsteWiederholung! < heute);
  const heuteFaellig = faellig.filter((f) => f.thema.naechsteWiederholung === heute);

  function alsWiederholtMarkieren(modulId: string, themaId: string, wiederholungen: string[]) {
    const neueWiederholungen = [...wiederholungen, heute];
    const naechste = naechsteWiederholungBerechnen({ erledigtAm: heute, wiederholungen: neueWiederholungen }, intervalle);
    updateThema(modulId, themaId, { wiederholungen: neueWiederholungen, naechsteWiederholung: naechste });
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Wiederholungen</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Gelernte Themen werden nach dem Spaced-Repetition-Prinzip ({intervalle.join('/')} Tage) zur Wiederholung
        vorgeschlagen.
      </p>

      {!faellig.length ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
          Aktuell nichts fällig. 🎉
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {ueberfaellig.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-red-500">Überfällig</h2>
              <div className="space-y-2">
                {ueberfaellig.map(({ modul, thema }) => (
                  <div key={thema.id} className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950">
                    <div>
                      <div className="text-sm font-semibold">{thema.titel}</div>
                      <Link to={`/module/${modul.id}/lernplan`} className="text-xs text-slate-500 hover:underline dark:text-slate-400">
                        {modul.name}
                      </Link>{' '}
                      <span className="text-xs text-red-500">&middot; fällig seit {formatiereDatum(thema.naechsteWiederholung)}</span>
                    </div>
                    <button
                      onClick={() => alsWiederholtMarkieren(modul.id, thema.id, thema.wiederholungen)}
                      className="shrink-0 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
                    >
                      ✓ Wiederholt
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {heuteFaellig.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-500">Heute fällig</h2>
              <div className="space-y-2">
                {heuteFaellig.map(({ modul, thema }) => (
                  <div key={thema.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <div>
                      <div className="text-sm font-semibold">{thema.titel}</div>
                      <Link to={`/module/${modul.id}/lernplan`} className="text-xs text-slate-500 hover:underline dark:text-slate-400">
                        {modul.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => alsWiederholtMarkieren(modul.id, thema.id, thema.wiederholungen)}
                      className="shrink-0 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
                    >
                      ✓ Wiederholt
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
