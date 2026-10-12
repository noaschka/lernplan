import { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useStore } from '../store/useStore';
import { montagDerWoche, tageDerWoche, wocheVerschieben, heuteISO } from '../utils/dates';
import { inputClass, Field } from '../components/ui/FormField';
import {
  wochenTyp,
  bloeckeDerWoche,
  blockDauerMin,
  blockStartMin,
  zeitRasterBereich,
  aktiveWochentage,
  sollMinutenDerWoche,
  istMinutenDerWoche,
  fachZeitenDerWoche,
  kalenderwoche,
} from '../utils/stundenplan';
import type { Modul, StundenplanBlock, WochenplanEintrag } from '../types';

const LG_QUERY = '(min-width: 1024px)';
const PX_PRO_MIN_DESKTOP = 1.1;
const PX_PRO_MIN_MOBIL = 0.7;
const ACHSE_BREITE_DESKTOP = 36;
const ACHSE_BREITE_MOBIL = 28;

function useIstDesktop() {
  const [istDesktop, setIstDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia(LG_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY);
    const handler = (e: MediaQueryListEvent) => setIstDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return istDesktop;
}

function minutenZuText(min: number) {
  if (!min) return '0m';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
}

const ART_FARBEN: Record<StundenplanBlock['art'], { basis: string; erledigt: string }> = {
  lernblock: {
    basis: 'bg-amber-400 text-slate-900',
    erledigt: 'bg-slate-900 text-amber-400 dark:bg-slate-100 dark:text-slate-900',
  },
  vorlesung: {
    basis: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100',
    erledigt: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100',
  },
  frei: {
    basis: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200',
    erledigt: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200',
  },
};

const ART_LABEL: Record<StundenplanBlock['art'], string> = {
  lernblock: 'Lernblock',
  vorlesung: 'Vorlesung',
  frei: 'Frei',
};

function Zeitachse({
  startMin,
  endeMin,
  pxProMin,
  breite,
  kompakt,
}: {
  startMin: number;
  endeMin: number;
  pxProMin: number;
  breite: number;
  kompakt: boolean;
}) {
  const stunden: number[] = [];
  for (let m = Math.ceil(startMin / 60) * 60; m <= endeMin; m += 60) stunden.push(m);
  return (
    <div
      className={`relative shrink-0 text-right ${kompakt ? 'text-[9px]' : 'text-[10px]'} text-slate-400`}
      style={{ width: breite, height: (endeMin - startMin) * pxProMin }}
    >
      {stunden.map((m) => (
        <div key={m} className="absolute right-0 -translate-y-1/2 whitespace-nowrap" style={{ top: (m - startMin) * pxProMin }}>
          {String(Math.floor(m / 60)).padStart(2, '0')}:00
        </div>
      ))}
    </div>
  );
}

interface TagKopfProps {
  tagLabel: string;
  datumLabel: string;
  ausgewaehlt: boolean;
  heute: boolean;
  onAuswaehlen: () => void;
}

function TagKopf({ tagLabel, datumLabel, ausgewaehlt, heute, onAuswaehlen }: TagKopfProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onAuswaehlen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onAuswaehlen();
        }
      }}
      className={`flex min-h-11 w-full cursor-pointer flex-col items-center justify-center border-b px-1 py-1 text-center dark:border-slate-800 ${
        ausgewaehlt
          ? 'border-slate-900 bg-slate-900 dark:border-white dark:bg-white'
          : `border-slate-100 ${heute ? 'bg-slate-50 dark:bg-slate-800/40' : ''}`
      }`}
    >
      <div
        className={`text-xs font-bold ${
          ausgewaehlt ? 'text-white dark:text-slate-900' : heute ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {tagLabel}
      </div>
      <div className={`text-[10px] ${ausgewaehlt ? 'text-white/70 dark:text-slate-900/70' : 'text-slate-400'}`}>{datumLabel}</div>
    </div>
  );
}

interface TagRasterKoerperProps {
  bloecke: StundenplanBlock[];
  startMin: number;
  endeMin: number;
  heute: boolean;
  aktuelleZeitMin: number | null;
  erledigtIds: Set<string>;
  kompakt: boolean;
  pxProMin: number;
}

function TagRasterKoerper({ bloecke, startMin, endeMin, heute, aktuelleZeitMin, erledigtIds, kompakt, pxProMin }: TagRasterKoerperProps) {
  const hoehe = (endeMin - startMin) * pxProMin;
  return (
    <div className={`relative w-full ${heute ? 'bg-slate-50/60 dark:bg-slate-800/20' : ''}`} style={{ height: hoehe }}>
      {bloecke.map((b) => {
        const top = (blockStartMin(b) - startMin) * pxProMin;
        const h = Math.max(blockDauerMin(b) * pxProMin, 16);
        const erledigt = erledigtIds.has(b.id);
        const haken = erledigt && b.art === 'lernblock';
        const farben = erledigt ? ART_FARBEN[b.art].erledigt : ART_FARBEN[b.art].basis;
        return (
          <div
            key={b.id}
            className={`absolute inset-x-0.5 z-0 rounded px-1 py-0.5 text-[9px] leading-tight ${farben}`}
            style={{ top, height: h }}
            title={`${b.titel} · ${b.start}–${b.ende}`}
          >
            {kompakt ? (
              <div className="truncate text-[11px] font-semibold">
                {haken && '✓ '}
                {b.kurz || b.titel}
              </div>
            ) : (
              <>
                <div lang="de" className="break-words font-semibold [hyphens:auto]">
                  {haken && '✓ '}
                  {b.titel}
                </div>
                <div className="opacity-80">
                  {b.start}&ndash;{b.ende}
                </div>
              </>
            )}
          </div>
        );
      })}
      {heute && aktuelleZeitMin != null && aktuelleZeitMin >= startMin && aktuelleZeitMin <= endeMin && (
        <div className="absolute inset-x-0 z-10 border-t-2 border-red-500" style={{ top: (aktuelleZeitMin - startMin) * pxProMin }} />
      )}
    </div>
  );
}

interface TagDetailPanelProps {
  tag: { iso: string; label: string; tagLabel: string };
  heute: boolean;
  bloecke: StundenplanBlock[];
  blockEintraege: WochenplanEintrag[];
  onToggleBlock: (block: StundenplanBlock) => void;
  manuelleEintraege: WochenplanEintrag[];
  module: Modul[];
  onHinzufuegen: (modulId: string, geplantMin: number) => void;
  onBearbeiten: (eintrag: WochenplanEintrag, patch: Partial<WochenplanEintrag>) => void;
  onLoeschen: (eintragId: string) => void;
}

function TagDetailPanel({
  tag,
  heute,
  bloecke,
  blockEintraege,
  onToggleBlock,
  manuelleEintraege,
  module,
  onHinzufuegen,
  onBearbeiten,
  onLoeschen,
}: TagDetailPanelProps) {
  const [modulId, setModulId] = useState(module[0]?.id ?? '');
  const [geplantMin, setGeplantMin] = useState(30);

  const manuellSoll = manuelleEintraege.reduce((s, e) => s + e.geplantMin, 0);
  const manuellIst = manuelleEintraege.reduce((s, e) => s + e.tatsaechlichMin, 0);

  return (
    <div className="flex-1 p-4">
      <div className="mb-3 border-b border-slate-100 pb-2 dark:border-slate-800">
        <div className="text-sm font-bold">
          {tag.tagLabel} <span className="font-normal text-slate-400">{tag.label}</span>
          {heute && (
            <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-white dark:text-slate-900">
              Heute
            </span>
          )}
        </div>
      </div>

      {bloecke.length > 0 && (
        <div className="mb-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Stundenplan</div>
          {bloecke
            .slice()
            .sort((a, b) => blockStartMin(a) - blockStartMin(b))
            .map((b) => {
              const eintrag = blockEintraege.find((e) => e.blockId === b.id);
              const erledigt = !!eintrag;
              const mod = module.find((m) => m.id === b.modulId);
              const istToggle = b.art === 'lernblock';
              const dauer = blockDauerMin(b);
              return (
                <div
                  key={b.id}
                  className={`rounded-lg px-3 py-2 text-sm ${erledigt ? ART_FARBEN[b.art].erledigt : ART_FARBEN[b.art].basis}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="break-words font-semibold">{b.titel}</div>
                      <div className="text-xs opacity-80">
                        {b.start}&ndash;{b.ende} &middot; {ART_LABEL[b.art]}
                        {mod && ` · ${mod.kuerzel || mod.name}`}
                      </div>
                      {b.notiz && <div className="mt-0.5 break-words text-xs opacity-70">{b.notiz}</div>}
                    </div>
                    {istToggle && (
                      <button
                        onClick={() => onToggleBlock(b)}
                        className={`flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-lg border px-3 text-xs font-semibold ${
                          erledigt
                            ? 'border-current/30 bg-black/10 text-current dark:bg-white/20'
                            : 'border-slate-300 bg-white text-slate-600 hover:border-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                        }`}
                      >
                        {erledigt ? 'zurücksetzen' : 'erledigt?'}
                      </button>
                    )}
                  </div>
                  {istToggle && eintrag && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-current/20 pt-2 text-xs">
                      <label className="flex items-center gap-1">
                        <span>Geschafft</span>
                        <input
                          type="number"
                          min={0}
                          step={5}
                          value={eintrag.tatsaechlichMin}
                          onChange={(ev) => onBearbeiten(eintrag, { tatsaechlichMin: Number(ev.target.value) })}
                          className="w-14 rounded border border-slate-300 bg-white/90 px-1.5 py-1 text-slate-900"
                        />
                        <span>/ {dauer} min</span>
                      </label>
                      <input
                        placeholder="Notiz, z.B. welche Themen noch fehlen"
                        value={eintrag.notiz ?? ''}
                        onChange={(ev) => onBearbeiten(eintrag, { notiz: ev.target.value })}
                        className="min-w-0 flex-1 rounded border border-slate-300 bg-white/90 px-1.5 py-1 text-slate-900"
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-400">
          <span>Manuelle Lernzeit</span>
          {manuellSoll > 0 && (
            <span className="font-normal normal-case text-slate-400">
              {minutenZuText(manuellIst)} / {minutenZuText(manuellSoll)}
            </span>
          )}
        </div>
        <div className="space-y-1.5">
          {manuelleEintraege.map((e) => {
            const mod = module.find((m) => m.id === e.modulId);
            return (
              <div key={e.id} className="rounded-lg bg-slate-50 px-3 py-2 text-xs dark:bg-slate-800/60">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium">{mod?.name ?? '–'}</span>
                  <button onClick={() => onLoeschen(e.id)} className="flex h-8 w-8 shrink-0 items-center justify-center hover:text-red-500">
                    &times;
                  </button>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400">
                  <label className="flex items-center gap-1">
                    <span>Ist</span>
                    <input
                      type="number"
                      min={0}
                      step={5}
                      value={e.tatsaechlichMin}
                      onChange={(ev) => onBearbeiten(e, { tatsaechlichMin: Number(ev.target.value) })}
                      className="w-14 rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    />
                    <span>min</span>
                  </label>
                  <button
                    onClick={() => onBearbeiten(e, { tatsaechlichMin: e.tatsaechlichMin + 15 })}
                    className="flex h-7 items-center rounded-full border border-slate-200 px-2 text-[11px] hover:border-slate-400 dark:border-slate-700"
                    title="15 Min. zur Ist-Zeit hinzufügen"
                  >
                    +15m
                  </button>
                  <label className="flex items-center gap-1">
                    <span>Soll</span>
                    <input
                      type="number"
                      min={0}
                      step={5}
                      value={e.geplantMin}
                      onChange={(ev) => onBearbeiten(e, { geplantMin: Number(ev.target.value) })}
                      className="w-14 rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    />
                    <span>min</span>
                  </label>
                </div>
                <input
                  placeholder="Notiz, z.B. welche Themen noch fehlen"
                  value={e.notiz ?? ''}
                  onChange={(ev) => onBearbeiten(e, { notiz: ev.target.value })}
                  className="mt-1.5 w-full rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                />
              </div>
            );
          })}
          {!manuelleEintraege.length && <p className="text-xs text-slate-400">Noch keine manuelle Lernzeit für diesen Tag.</p>}
        </div>
        {module.length > 0 ? (
          <div className="mt-2 grid grid-cols-[1fr_5rem_auto] items-end gap-1.5 border-t border-slate-100 pt-2 dark:border-slate-800">
            <Field label="Modul">
              <select className={`${inputClass} w-full !py-1.5 text-xs`} value={modulId} onChange={(e) => setModulId(e.target.value)}>
                {module.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.kuerzel || m.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Minuten">
              <input
                type="number"
                min={0}
                step={5}
                className={`${inputClass} w-full !py-1.5 text-xs`}
                value={geplantMin}
                onChange={(e) => setGeplantMin(Number(e.target.value))}
              />
            </Field>
            <button
              onClick={() => modulId && onHinzufuegen(modulId, geplantMin)}
              className="flex h-9 min-w-[44px] shrink-0 items-center justify-center rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              +
            </button>
          </div>
        ) : (
          <p className="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-400 dark:border-slate-800">
            Lege zuerst Module an, um manuelle Lernzeit zu erfassen.
          </p>
        )}
      </div>
    </div>
  );
}

function FachZeile({
  modul,
  sollMin,
  istMin,
  minutenEntwurf,
  onMinutenChange,
  onHinzufuegen,
  zeigeEintrag,
}: {
  modul: Modul;
  sollMin: number;
  istMin: number;
  minutenEntwurf: number;
  onMinutenChange: (minuten: number) => void;
  onHinzufuegen: () => void;
  zeigeEintrag: boolean;
}) {
  const pct = sollMin > 0 ? Math.min(100, Math.round((istMin / sollMin) * 100)) : 0;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-2">
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="truncate font-medium">{modul.kuerzel || modul.name}</span>
          <span className="shrink-0 text-xs text-slate-400">
            {minutenZuText(istMin)} / {minutenZuText(sollMin)}
          </span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full rounded-full ${istMin >= sollMin && sollMin > 0 ? 'bg-emerald-500' : 'bg-slate-900 dark:bg-white'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      {zeigeEintrag && (
        <div className="flex shrink-0 items-center gap-1">
          <input
            type="number"
            min={0}
            step={5}
            value={minutenEntwurf}
            onChange={(e) => onMinutenChange(Number(e.target.value))}
            className="w-14 rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
          <button
            onClick={onHinzufuegen}
            className="flex h-7 min-w-[28px] shrink-0 items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
            title="Minuten zu heute hinzufügen"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default function WochenplanPage() {
  const module = useStore((s) => s.module);
  const wochenplaene = useStore((s) => s.wochenplaene);
  const stundenplan = useStore((s) => s.stundenplan);
  const abWochen = useStore((s) => s.settings.abWochen);
  const upsertEintrag = useStore((s) => s.upsertEintrag);
  const deleteEintrag = useStore((s) => s.deleteEintrag);
  const toggleBlockErledigt = useStore((s) => s.toggleBlockErledigt);

  const istDesktop = useIstDesktop();
  const pxProMin = istDesktop ? PX_PRO_MIN_DESKTOP : PX_PRO_MIN_MOBIL;
  const achsenBreite = istDesktop ? ACHSE_BREITE_DESKTOP : ACHSE_BREITE_MOBIL;

  const [montag, setMontag] = useState(montagDerWoche());
  const [ausgewaehlterTag, setAusgewaehlterTag] = useState<string | null>(null);
  const [jetzt, setJetzt] = useState(() => new Date());
  const [fachMinutenEntwurf, setFachMinutenEntwurf] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => setJetzt(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  const tage = tageDerWoche(montag);
  const woche = wochenplaene.find((w) => w.woche === montag);
  const eintraege = woche?.eintraege ?? [];

  const typ = wochenTyp(montag, abWochen);
  const typLabel = typ === 'A' ? abWochen.labelA : abWochen.labelB;
  const bloeckeWoche = useMemo(() => bloeckeDerWoche(stundenplan, typ), [stundenplan, typ]);
  const { startMin, endeMin } = useMemo(() => zeitRasterBereich(bloeckeWoche), [bloeckeWoche]);
  const aktiveTageIdx = useMemo(() => aktiveWochentage(bloeckeWoche), [bloeckeWoche]);
  const aktiveTage = aktiveTageIdx.map((idx) => tage[idx]);

  const sollGesamt = sollMinutenDerWoche(bloeckeWoche, eintraege);
  const istGesamt = istMinutenDerWoche(eintraege);

  const heuteIso = heuteISO();
  const istAktuelleWoche = montag === montagDerWoche();
  const aktuelleZeitMin = istAktuelleWoche ? jetzt.getHours() * 60 + jetzt.getMinutes() : null;

  const erledigtIds = new Set(eintraege.filter((e) => e.blockId).map((e) => e.blockId as string));

  const fachZeiten = fachZeitenDerWoche(bloeckeWoche, eintraege);
  const fachZeitenByModul = new Map(fachZeiten.map((f) => [f.modulId, f]));
  const aktiveModule = module.filter((m) => m.status !== 'bestanden');

  function fachSchnellEintrag(modulId: string, minuten: number) {
    if (!istAktuelleWoche || minuten <= 0) return;
    const bestehender = eintraege.find((e) => e.modulId === modulId && e.tag === heuteIso && !e.blockId);
    if (bestehender) {
      upsertEintrag(montag, {
        ...bestehender,
        geplantMin: bestehender.geplantMin + minuten,
        tatsaechlichMin: bestehender.tatsaechlichMin + minuten,
      });
    } else {
      upsertEintrag(montag, { id: uuid(), modulId, tag: heuteIso, geplantMin: minuten, tatsaechlichMin: minuten, notiz: '' });
    }
  }

  const ausgewaehlteTagIso =
    (ausgewaehlterTag && aktiveTage.some((t) => t.iso === ausgewaehlterTag) ? ausgewaehlterTag : null) ??
    aktiveTage.find((t) => t.iso === heuteIso)?.iso ??
    aktiveTage[0]?.iso ??
    tage[0].iso;

  const ausgewaehlterTagObj = tage.find((t) => t.iso === ausgewaehlteTagIso) ?? tage[0];
  const bloeckeTag = bloeckeWoche.filter((b) => tage[b.wochentag]?.iso === ausgewaehlteTagIso);
  const manuelleEintraegeTag = eintraege.filter((e) => e.tag === ausgewaehlteTagIso && !e.blockId);
  const blockEintraegeTag = eintraege.filter((e) => e.tag === ausgewaehlteTagIso && e.blockId);

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Wochenplan</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Stundenplan, feste Lernblöcke und manuelle Lernzeit mit Soll/Ist-Abgleich.
      </p>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setMontag(wocheVerschieben(montag, -1))}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
            >
              &larr;
            </button>
            <span className="text-sm font-semibold">
              {tage[0].label}&ndash;{tage[6].label}
            </span>
            <button
              onClick={() => setMontag(wocheVerschieben(montag, 1))}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
            >
              &rarr;
            </button>
            <button onClick={() => setMontag(montagDerWoche())} className="text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white">
              Heute
            </button>
            <span className="text-xs text-slate-400">
              KW {kalenderwoche(montag)}, Woche {typ}, {typLabel}
            </span>
          </div>
          <div className="flex gap-4 text-sm">
            <span>
              <span className="text-slate-400">Soll: </span>
              <strong>{minutenZuText(sollGesamt)}</strong>
            </span>
            <span>
              <span className="text-slate-400">Ist: </span>
              <strong className={istGesamt >= sollGesamt && sollGesamt > 0 ? 'text-emerald-600 dark:text-emerald-400' : ''}>
                {minutenZuText(istGesamt)}
              </strong>
            </span>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${sollGesamt > 0 ? Math.min(100, (istGesamt / sollGesamt) * 100) : 0}%` }}
          />
        </div>
      </div>

      {aktiveModule.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Lernzeit pro Fach · diese Woche</div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {aktiveModule.map((m) => {
              const fz = fachZeitenByModul.get(m.id);
              return (
                <FachZeile
                  key={m.id}
                  modul={m}
                  sollMin={fz?.sollMin ?? 0}
                  istMin={fz?.istMin ?? 0}
                  minutenEntwurf={fachMinutenEntwurf[m.id] ?? 15}
                  onMinutenChange={(minuten) => setFachMinutenEntwurf((s) => ({ ...s, [m.id]: minuten }))}
                  onHinzufuegen={() => fachSchnellEintrag(m.id, fachMinutenEntwurf[m.id] ?? 15)}
                  zeigeEintrag={istAktuelleWoche}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 lg:flex-row">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex-[2]">
          <div className="flex">
            <div style={{ width: achsenBreite }} className="shrink-0" />
            <div className="flex flex-1 divide-x divide-slate-100 dark:divide-slate-800">
              {aktiveTage.map((tag) => (
                <div key={tag.iso} className="min-w-0 flex-1">
                  <TagKopf
                    tagLabel={tag.tagLabel}
                    datumLabel={tag.label}
                    ausgewaehlt={tag.iso === ausgewaehlteTagIso}
                    heute={tag.iso === heuteIso}
                    onAuswaehlen={() => setAusgewaehlterTag(tag.iso)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex py-2">
            <Zeitachse startMin={startMin} endeMin={endeMin} pxProMin={pxProMin} breite={achsenBreite} kompakt={!istDesktop} />
            <div className="flex flex-1 divide-x divide-slate-100 dark:divide-slate-800">
              {aktiveTage.map((tag) => (
                <div key={tag.iso} className="min-w-0 flex-1">
                  <TagRasterKoerper
                    bloecke={bloeckeWoche.filter((b) => tage[b.wochentag]?.iso === tag.iso)}
                    startMin={startMin}
                    endeMin={endeMin}
                    heute={tag.iso === heuteIso}
                    aktuelleZeitMin={aktuelleZeitMin}
                    erledigtIds={erledigtIds}
                    kompakt={!istDesktop}
                    pxProMin={pxProMin}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex-1">
          <TagDetailPanel
            tag={ausgewaehlterTagObj}
            heute={ausgewaehlterTagObj.iso === heuteIso}
            bloecke={bloeckeTag}
            blockEintraege={blockEintraegeTag}
            onToggleBlock={(block) => toggleBlockErledigt(montag, block, ausgewaehlterTagObj.iso)}
            manuelleEintraege={manuelleEintraegeTag}
            module={module}
            onHinzufuegen={(modulId, geplantMin) =>
              upsertEintrag(montag, {
                id: uuid(),
                modulId,
                tag: ausgewaehlterTagObj.iso,
                geplantMin,
                tatsaechlichMin: geplantMin,
                notiz: '',
              })
            }
            onBearbeiten={(eintrag, patch) => upsertEintrag(montag, { ...eintrag, ...patch })}
            onLoeschen={(eintragId) => deleteEintrag(montag, eintragId)}
          />
        </div>
      </div>
    </div>
  );
}
