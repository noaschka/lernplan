import { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useStore } from '../store/useStore';
import { montagDerWoche, tageDerWoche, wocheVerschieben, heuteISO } from '../utils/dates';
import { inputClass } from '../components/ui/FormField';
import {
  wochenTyp,
  bloeckeDerWoche,
  blockDauerMin,
  blockStartMin,
  zeitRasterBereich,
  aktiveWochentage,
  sollMinutenDerWoche,
  istMinutenDerWoche,
  kalenderwoche,
} from '../utils/stundenplan';
import type { Modul, StundenplanBlock, WochenplanEintrag } from '../types';

const PX_PRO_MIN = 1.1;

function minutenZuText(min: number) {
  if (!min) return '0m';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
}

const ART_FARBEN: Record<StundenplanBlock['art'], { basis: string; erledigt: string }> = {
  lernblock: {
    basis: 'bg-amber-300 border-amber-400 text-amber-950 dark:bg-amber-500/80 dark:border-amber-400 dark:text-white',
    erledigt: 'bg-amber-700 border-amber-800 text-white dark:bg-amber-800 dark:border-amber-900',
  },
  vorlesung: {
    basis: 'bg-slate-200 border-slate-300 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100',
    erledigt: 'bg-slate-200 border-slate-300 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100',
  },
  frei: {
    basis: 'bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:border-emerald-800 dark:text-emerald-200',
    erledigt: 'bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:border-emerald-800 dark:text-emerald-200',
  },
};

const ART_LABEL: Record<StundenplanBlock['art'], string> = {
  lernblock: 'Lernblock',
  vorlesung: 'Vorlesung',
  frei: 'Frei',
};

function Zeitachse({ startMin, endeMin }: { startMin: number; endeMin: number }) {
  const stunden: number[] = [];
  for (let m = Math.ceil(startMin / 60) * 60; m <= endeMin; m += 60) stunden.push(m);
  return (
    <div className="relative w-9 shrink-0 text-right text-[10px] text-slate-400" style={{ height: (endeMin - startMin) * PX_PRO_MIN }}>
      {stunden.map((m) => (
        <div key={m} className="absolute right-1 -translate-y-1/2" style={{ top: (m - startMin) * PX_PRO_MIN }}>
          {String(Math.floor(m / 60)).padStart(2, '0')}:00
        </div>
      ))}
    </div>
  );
}

interface TagGridSpalteProps {
  tagLabel: string;
  datumLabel: string;
  bloecke: StundenplanBlock[];
  startMin: number;
  endeMin: number;
  ausgewaehlt: boolean;
  heute: boolean;
  aktuelleZeitMin: number | null;
  onAuswaehlen: () => void;
  erledigtIds: Set<string>;
}

function TagGridSpalte({
  tagLabel,
  datumLabel,
  bloecke,
  startMin,
  endeMin,
  ausgewaehlt,
  heute,
  aktuelleZeitMin,
  onAuswaehlen,
  erledigtIds,
}: TagGridSpalteProps) {
  const hoehe = (endeMin - startMin) * PX_PRO_MIN;
  return (
    <button
      type="button"
      onClick={onAuswaehlen}
      className={`flex w-full flex-col text-left ${ausgewaehlt ? 'ring-2 ring-inset ring-slate-900 dark:ring-white' : ''}`}
    >
      <div className={`border-b border-slate-100 px-1.5 py-1.5 text-center dark:border-slate-800 ${heute ? 'bg-slate-50 dark:bg-slate-800/40' : ''}`}>
        <div className={`text-xs font-bold ${heute ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>{tagLabel}</div>
        <div className="text-[10px] text-slate-400">{datumLabel}</div>
      </div>
      <div className={`relative ${heute ? 'bg-slate-50/60 dark:bg-slate-800/20' : ''}`} style={{ height: hoehe }}>
        {bloecke.map((b) => {
          const top = (blockStartMin(b) - startMin) * PX_PRO_MIN;
          const h = Math.max(blockDauerMin(b) * PX_PRO_MIN, 16);
          const erledigt = erledigtIds.has(b.id);
          const farben = erledigt ? ART_FARBEN[b.art].erledigt : ART_FARBEN[b.art].basis;
          return (
            <div
              key={b.id}
              className={`absolute inset-x-0.5 overflow-hidden rounded border px-1 py-0.5 text-[9px] leading-tight break-words ${farben}`}
              style={{ top, height: h }}
              title={`${b.titel} · ${b.start}–${b.ende}`}
            >
              <div className="font-semibold">{b.kurz || b.titel}</div>
            </div>
          );
        })}
        {heute && aktuelleZeitMin != null && aktuelleZeitMin >= startMin && aktuelleZeitMin <= endeMin && (
          <div className="absolute inset-x-0 z-10 border-t-2 border-red-500" style={{ top: (aktuelleZeitMin - startMin) * PX_PRO_MIN }} />
        )}
      </div>
    </button>
  );
}

interface TagDetailPanelProps {
  tag: { iso: string; label: string; tagLabel: string };
  heute: boolean;
  bloecke: StundenplanBlock[];
  erledigtIds: Set<string>;
  onToggleBlock: (block: StundenplanBlock) => void;
  manuelleEintraege: WochenplanEintrag[];
  module: Modul[];
  onHinzufuegen: (modulId: string, geplantMin: number) => void;
  onIstZeitPlus: (eintrag: WochenplanEintrag, minuten: number) => void;
  onLoeschen: (eintragId: string) => void;
}

function TagDetailPanel({
  tag,
  heute,
  bloecke,
  erledigtIds,
  onToggleBlock,
  manuelleEintraege,
  module,
  onHinzufuegen,
  onIstZeitPlus,
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
              const erledigt = erledigtIds.has(b.id);
              const mod = module.find((m) => m.id === b.modulId);
              const istToggle = b.art === 'lernblock';
              return (
                <div
                  key={b.id}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                    erledigt ? ART_FARBEN[b.art].erledigt : ART_FARBEN[b.art].basis
                  }`}
                >
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
                          ? 'border-white/40 bg-black/10 text-white'
                          : 'border-slate-300 bg-white text-slate-600 hover:border-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                      }`}
                    >
                      {erledigt ? '✓ erledigt' : 'erledigt?'}
                    </button>
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
                <div className="truncate font-medium">{mod?.name ?? '–'}</div>
                <div className="mt-0.5 flex items-center justify-between text-slate-400">
                  <span>
                    {minutenZuText(e.tatsaechlichMin)}/{minutenZuText(e.geplantMin)}
                  </span>
                  <span className="flex items-center gap-1">
                    <button
                      onClick={() => onIstZeitPlus(e, 15)}
                      className="flex h-8 items-center rounded-full border border-slate-200 px-2 text-[11px] hover:border-slate-400 dark:border-slate-700"
                      title="15 Min. Ist-Zeit hinzufügen"
                    >
                      +15m
                    </button>
                    <button onClick={() => onLoeschen(e.id)} className="flex h-8 w-8 items-center justify-center hover:text-red-500">
                      &times;
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
          {!manuelleEintraege.length && <p className="text-xs text-slate-400">Noch keine manuelle Lernzeit für diesen Tag.</p>}
        </div>
        {module.length > 0 ? (
          <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2 dark:border-slate-800">
            <select className={`${inputClass} flex-1 !py-1.5 text-xs`} value={modulId} onChange={(e) => setModulId(e.target.value)}>
              {module.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.kuerzel || m.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              step={5}
              title="Geplant (Min.)"
              className={`${inputClass} w-20 !py-1.5 text-xs`}
              value={geplantMin}
              onChange={(e) => setGeplantMin(Number(e.target.value))}
            />
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

export default function WochenplanPage() {
  const module = useStore((s) => s.module);
  const wochenplaene = useStore((s) => s.wochenplaene);
  const stundenplan = useStore((s) => s.stundenplan);
  const abWochen = useStore((s) => s.settings.abWochen);
  const upsertEintrag = useStore((s) => s.upsertEintrag);
  const deleteEintrag = useStore((s) => s.deleteEintrag);
  const toggleBlockErledigt = useStore((s) => s.toggleBlockErledigt);

  const [montag, setMontag] = useState(montagDerWoche());
  const [ausgewaehlterTag, setAusgewaehlterTag] = useState<string | null>(null);
  const [jetzt, setJetzt] = useState(() => new Date());

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

  const ausgewaehlteTagIso =
    (ausgewaehlterTag && aktiveTage.some((t) => t.iso === ausgewaehlterTag) ? ausgewaehlterTag : null) ??
    aktiveTage.find((t) => t.iso === heuteIso)?.iso ??
    aktiveTage[0]?.iso ??
    tage[0].iso;

  const ausgewaehlterTagObj = tage.find((t) => t.iso === ausgewaehlteTagIso) ?? tage[0];
  const bloeckeTag = bloeckeWoche.filter((b) => tage[b.wochentag]?.iso === ausgewaehlteTagIso);
  const manuelleEintraegeTag = eintraege.filter((e) => e.tag === ausgewaehlteTagIso && !e.blockId);

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Wochenplan</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Stundenplan, feste Lernblöcke und manuelle Lernzeit mit Soll/Ist-Abgleich.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
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
            KW {kalenderwoche(montag)} &middot; Woche {typ} ({typLabel})
          </span>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex gap-4">
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
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${sollGesamt > 0 ? Math.min(100, (istGesamt / sollGesamt) * 100) : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 lg:hidden">
        {aktiveTage.map((tag) => (
          <button
            key={tag.iso}
            onClick={() => setAusgewaehlterTag(tag.iso)}
            className={`flex h-11 flex-col items-center justify-center rounded-lg px-3 text-xs font-semibold ${
              tag.iso === ausgewaehlteTagIso
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            <span>{tag.tagLabel}</span>
            <span className="text-[10px] font-normal opacity-70">{tag.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-2 flex flex-col gap-4 lg:flex-row">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex-[2]">
          <div className="hidden lg:flex">
            <Zeitachse startMin={startMin} endeMin={endeMin} />
            <div className="flex flex-1 divide-x divide-slate-100 dark:divide-slate-800">
              {aktiveTage.map((tag) => (
                <div key={tag.iso} className="flex-1">
                  <TagGridSpalte
                    tagLabel={tag.tagLabel}
                    datumLabel={tag.label}
                    bloecke={bloeckeWoche.filter((b) => tage[b.wochentag]?.iso === tag.iso)}
                    startMin={startMin}
                    endeMin={endeMin}
                    ausgewaehlt={tag.iso === ausgewaehlteTagIso}
                    heute={tag.iso === heuteIso}
                    aktuelleZeitMin={aktuelleZeitMin}
                    onAuswaehlen={() => setAusgewaehlterTag(tag.iso)}
                    erledigtIds={erledigtIds}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex lg:hidden">
            <Zeitachse startMin={startMin} endeMin={endeMin} />
            <div className="flex-1">
              <TagGridSpalte
                tagLabel={ausgewaehlterTagObj.tagLabel}
                datumLabel={ausgewaehlterTagObj.label}
                bloecke={bloeckeTag}
                startMin={startMin}
                endeMin={endeMin}
                ausgewaehlt
                heute={ausgewaehlterTagObj.iso === heuteIso}
                aktuelleZeitMin={aktuelleZeitMin}
                onAuswaehlen={() => {}}
                erledigtIds={erledigtIds}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex-1">
          <TagDetailPanel
            tag={ausgewaehlterTagObj}
            heute={ausgewaehlterTagObj.iso === heuteIso}
            bloecke={bloeckeTag}
            erledigtIds={erledigtIds}
            onToggleBlock={(block) => toggleBlockErledigt(montag, block, ausgewaehlterTagObj.iso)}
            manuelleEintraege={manuelleEintraegeTag}
            module={module}
            onHinzufuegen={(modulId, geplantMin) =>
              upsertEintrag(montag, { id: uuid(), modulId, tag: ausgewaehlterTagObj.iso, geplantMin, tatsaechlichMin: 0 })
            }
            onIstZeitPlus={(eintrag, minuten) =>
              upsertEintrag(montag, { ...eintrag, tatsaechlichMin: eintrag.tatsaechlichMin + minuten })
            }
            onLoeschen={(eintragId) => deleteEintrag(montag, eintragId)}
          />
        </div>
      </div>
    </div>
  );
}
