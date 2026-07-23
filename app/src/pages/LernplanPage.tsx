import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { dringlichkeit, formatiereDatum, heuteISO, tageBis } from '../utils/dates';
import { naechsteWiederholungBerechnen } from '../utils/spacedRepetition';
import UrgencyDot from '../components/ui/UrgencyDot';
import { inputClass } from '../components/ui/FormField';

export default function LernplanPage() {
  const { modulId } = useParams();
  const module = useStore((s) => s.module);
  const lernplaene = useStore((s) => s.lernplaene);
  const intervalle = useStore((s) => s.settings.spacedRepetitionIntervalleTage);
  const addThema = useStore((s) => s.addThema);
  const updateThema = useStore((s) => s.updateThema);
  const deleteThema = useStore((s) => s.deleteThema);

  const [neuTitel, setNeuTitel] = useState('');

  const modul = module.find((m) => m.id === modulId);
  const plan = lernplaene.find((l) => l.modulId === modulId);
  const themen = plan?.themen ?? [];

  if (!modul) {
    return (
      <div>
        <p className="text-sm text-slate-500">Modul nicht gefunden.</p>
        <Link to="/module" className="text-sm underline">
          Zur Modulübersicht
        </Link>
      </div>
    );
  }

  const erledigt = themen.filter((t) => t.erledigt).length;
  const pct = themen.length ? Math.round((erledigt / themen.length) * 100) : 0;
  const tage = tageBis(modul.pruefungstermin);

  function hinzufuegen() {
    if (!neuTitel.trim()) return;
    addThema(modul!.id, neuTitel.trim());
    setNeuTitel('');
  }

  return (
    <div>
      <Link to={`/module/${modul.id}`} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">
        &larr; Zurück zu {modul.name}
      </Link>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Lernplan: {modul.name}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            {modul.pruefungstermin ? (
              <>
                <UrgencyDot level={dringlichkeit(tage)} />
                <span>
                  Prüfung: {formatiereDatum(modul.pruefungstermin)} {tage != null && `(in ${tage} Tagen)`}
                </span>
              </>
            ) : (
              <span>Kein Prüfungstermin hinterlegt</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold">{pct}%</div>
          <div className="text-xs text-slate-400">
            {erledigt} / {themen.length} Themen
          </div>
        </div>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full rounded-full bg-slate-900 dark:bg-white" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Themen-Checkliste</div>

        {themen.length ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {themen.map((t) => (
              <div key={t.id} className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={t.erledigt}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const erledigtAm = heuteISO();
                      updateThema(modul.id, t.id, {
                        erledigt: true,
                        erledigtAm,
                        wiederholungen: [],
                        naechsteWiederholung: naechsteWiederholungBerechnen({ erledigtAm, wiederholungen: [] }, intervalle),
                      });
                    } else {
                      updateThema(modul.id, t.id, { erledigt: false, erledigtAm: null, wiederholungen: [], naechsteWiederholung: null });
                    }
                  }}
                />
                <span className={`flex-1 text-sm ${t.erledigt ? 'text-slate-400 line-through' : ''}`}>{t.titel}</span>
                {t.erledigtAm && <span className="text-xs text-slate-400">{formatiereDatum(t.erledigtAm)}</span>}
                {t.naechsteWiederholung && (
                  <span className="text-xs text-amber-600 dark:text-amber-400">↻ {formatiereDatum(t.naechsteWiederholung)}</span>
                )}
                <button onClick={() => deleteThema(modul.id, t.id)} className="text-xs text-slate-400 hover:text-red-500">
                  Entfernen
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">Noch keine Themen erfasst.</p>
        )}

        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          <input
            className={inputClass}
            placeholder="Neues Thema..."
            value={neuTitel}
            onChange={(e) => setNeuTitel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && hinzufuegen()}
          />
          <button
            onClick={hinzufuegen}
            className="shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            + Thema
          </button>
        </div>
      </div>
    </div>
  );
}
