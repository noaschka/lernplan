import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { berechneNotenschnitt, ectsErreicht, ectsOffen, simuliereZielschnitt } from '../utils/grades';
import { dringlichkeit, formatiereDatum, tageBis } from '../utils/dates';
import UrgencyDot from '../components/ui/UrgencyDot';
import { inputClass } from '../components/ui/FormField';

export default function DashboardPage() {
  const module = useStore((s) => s.module);
  const settings = useStore((s) => s.settings);
  const { schnitt } = berechneNotenschnitt(module);
  const erreicht = ectsErreicht(module);
  const offen = ectsOffen(module, settings.gesamtEctsSoll);
  const pct = settings.gesamtEctsSoll ? Math.min(100, Math.round((erreicht / settings.gesamtEctsSoll) * 100)) : 0;

  const naechstePruefungen = module
    .filter((m) => m.pruefungstermin && m.status !== 'bestanden')
    .map((m) => ({ m, tage: tageBis(m.pruefungstermin) }))
    .filter((x) => x.tage != null && x.tage >= 0)
    .sort((a, b) => (a.tage ?? 0) - (b.tage ?? 0))
    .slice(0, 5);

  const [zielInput, setZielInput] = useState(settings.zielschnitt ?? 2.0);
  const sim = simuliereZielschnitt(module, zielInput);

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Übersicht</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{settings.studiengang} &middot; {settings.hochschule}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">ECTS-Fortschritt</div>
          <div className="mt-1 text-3xl font-extrabold">
            {erreicht} / {settings.gesamtEctsSoll}
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-slate-900 dark:bg-white" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-1 text-xs text-slate-400">{pct}% &middot; {offen} ECTS offen</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Notenschnitt</div>
          <div className="mt-1 text-3xl font-extrabold">{schnitt != null ? schnitt.toFixed(2) : '–'}</div>
          {settings.zielschnitt != null && <div className="mt-1 text-xs text-slate-400">Ziel: {settings.zielschnitt.toFixed(1)}</div>}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Nächste Prüfung</div>
          {naechstePruefungen[0] ? (
            <>
              <div className="mt-1 text-lg font-bold">{naechstePruefungen[0].m.name}</div>
              <div className="text-xs text-slate-400">
                {formatiereDatum(naechstePruefungen[0].m.pruefungstermin)} &middot; in {naechstePruefungen[0].tage} Tagen
              </div>
            </>
          ) : (
            <div className="mt-1 text-lg font-bold text-slate-300">–</div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Anstehende Prüfungen</div>
          {naechstePruefungen.length ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {naechstePruefungen.map(({ m, tage }) => (
                <Link key={m.id} to={`/module/${m.id}`} className="flex items-center justify-between gap-2 py-2 text-sm hover:underline">
                  <span className="flex items-center gap-2">
                    <UrgencyDot level={dringlichkeit(tage)} />
                    {m.name}
                  </span>
                  <span className="text-slate-400">{formatiereDatum(m.pruefungstermin)} &middot; {tage}d</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Keine anstehenden Prüfungstermine.</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Zielschnitt-Simulator</div>
          <label className="mb-3 block text-sm">
            <span className="mb-1 block text-xs font-medium text-slate-500">Zielschnitt gesamt</span>
            <input
              type="number"
              min={1}
              max={5}
              step={0.1}
              className={`${inputClass} w-28`}
              value={zielInput}
              onChange={(e) => setZielInput(Number(e.target.value))}
            />
          </label>
          {sim.ectsOffenGewertet === 0 ? (
            <p className="text-sm text-slate-500">
              Alle Module sind bewertet &ndash; dein Schnitt steht bereits fest.
            </p>
          ) : (
            <p className="text-sm">
              Du brauchst im Schnitt noch{' '}
              <strong className={sim.erreichbar ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}>
                {sim.benoetigterSchnittOffen?.toFixed(2)}
              </strong>{' '}
              in den verbleibenden {sim.ectsOffenGewertet} offenen ECTS, um auf {zielInput.toFixed(1)} zu kommen.
              {!sim.erreichbar && <span className="mt-1 block text-red-500">Rechnerisch nicht mehr erreichbar (Note {'<'} 1.0 nötig).</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
