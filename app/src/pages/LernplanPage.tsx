import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { dringlichkeit, formatiereDatum, heuteISO, tageBis } from '../utils/dates';
import { naechsteWiederholungBerechnen } from '../utils/spacedRepetition';
import UrgencyDot from '../components/ui/UrgencyDot';
import { inputClass, Field } from '../components/ui/FormField';
import type { LernplanThema } from '../types';

function ThemaZeile({
  thema,
  onUpdate,
  onToggleErledigt,
  onDelete,
}: {
  thema: LernplanThema;
  onUpdate: (patch: Partial<LernplanThema>) => void;
  onToggleErledigt: (erledigt: boolean) => void;
  onDelete: () => void;
}) {
  const [bearbeiten, setBearbeiten] = useState(false);
  const [titelEntwurf, setTitelEntwurf] = useState(thema.titel);
  const [notizEntwurf, setNotizEntwurf] = useState(thema.notiz ?? '');
  const [wiederholungEntwurf, setWiederholungEntwurf] = useState(thema.naechsteWiederholung ?? '');

  function bearbeitenStarten() {
    setTitelEntwurf(thema.titel);
    setNotizEntwurf(thema.notiz ?? '');
    setWiederholungEntwurf(thema.naechsteWiederholung ?? '');
    setBearbeiten(true);
  }

  function speichern() {
    onUpdate({
      titel: titelEntwurf.trim() || thema.titel,
      notiz: notizEntwurf,
      naechsteWiederholung: wiederholungEntwurf || null,
    });
    setBearbeiten(false);
  }

  if (bearbeiten) {
    return (
      <div className="space-y-2 py-2">
        <Field label="Titel">
          <input className={`${inputClass} text-sm`} value={titelEntwurf} onChange={(e) => setTitelEntwurf(e.target.value)} autoFocus />
        </Field>
        <Field label="Notiz" hint="z.B. wie viel du schon geschafft hast">
          <input className={`${inputClass} text-sm`} value={notizEntwurf} onChange={(e) => setNotizEntwurf(e.target.value)} />
        </Field>
        <Field label="Nächste Wiederholung">
          <input
            type="date"
            className={`${inputClass} text-sm`}
            value={wiederholungEntwurf}
            onChange={(e) => setWiederholungEntwurf(e.target.value)}
          />
        </Field>
        <div className="flex gap-2 pt-1">
          <button
            onClick={speichern}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            Speichern
          </button>
          <button
            onClick={() => setBearbeiten(false)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
          >
            Abbrechen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 py-2">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 shrink-0"
        checked={thema.erledigt}
        onChange={(e) => onToggleErledigt(e.target.checked)}
      />
      <button onClick={bearbeitenStarten} className="min-w-0 flex-1 text-left">
        <div className={`text-sm ${thema.erledigt ? 'text-slate-400 line-through' : ''}`}>{thema.titel}</div>
        {thema.notiz && <div className="mt-0.5 text-xs text-slate-400">{thema.notiz}</div>}
      </button>
      {thema.erledigtAm && <span className="shrink-0 text-xs text-slate-400">{formatiereDatum(thema.erledigtAm)}</span>}
      {thema.naechsteWiederholung && (
        <span className="shrink-0 text-xs text-amber-600 dark:text-amber-400">↻ {formatiereDatum(thema.naechsteWiederholung)}</span>
      )}
      <button onClick={bearbeitenStarten} className="shrink-0 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white">
        Bearbeiten
      </button>
      <button onClick={onDelete} className="shrink-0 text-xs text-slate-400 hover:text-red-500">
        Entfernen
      </button>
    </div>
  );
}

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

  function toggleErledigt(themaId: string, checked: boolean) {
    if (checked) {
      const erledigtAm = heuteISO();
      updateThema(modul!.id, themaId, {
        erledigt: true,
        erledigtAm,
        wiederholungen: [],
        naechsteWiederholung: naechsteWiederholungBerechnen({ erledigtAm, wiederholungen: [] }, intervalle),
      });
    } else {
      updateThema(modul!.id, themaId, { erledigt: false, erledigtAm: null, wiederholungen: [], naechsteWiederholung: null });
    }
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
              <ThemaZeile
                key={t.id}
                thema={t}
                onToggleErledigt={(checked) => toggleErledigt(t.id, checked)}
                onUpdate={(patch) => updateThema(modul.id, t.id, patch)}
                onDelete={() => deleteThema(modul.id, t.id)}
              />
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
