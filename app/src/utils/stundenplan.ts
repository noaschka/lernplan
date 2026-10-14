import { parseISO, getISOWeek } from 'date-fns';
import type { AbWochenSettings, StundenplanBlock, WochenplanEintrag } from '../types';

export type WochenTyp = 'A' | 'B';

export function wochenTyp(montagIso: string, abWochen: AbWochenSettings): WochenTyp {
  const istUngerade = getISOWeek(parseISO(montagIso)) % 2 === 1;
  if (abWochen.aUngerade) return istUngerade ? 'A' : 'B';
  return istUngerade ? 'B' : 'A';
}

export function bloeckeDerWoche(stundenplan: StundenplanBlock[], typ: WochenTyp): StundenplanBlock[] {
  return stundenplan.filter((b) => b.wochen === 'AB' || b.wochen === typ);
}

export function blockDauerMin(block: StundenplanBlock): number {
  const [startH, startM] = block.start.split(':').map(Number);
  const [endH, endM] = block.ende.split(':').map(Number);
  return endH * 60 + endM - (startH * 60 + startM);
}

export function blockStartMin(block: StundenplanBlock): number {
  const [h, m] = block.start.split(':').map(Number);
  return h * 60 + m;
}

export function blockEndeMin(block: StundenplanBlock): number {
  const [h, m] = block.ende.split(':').map(Number);
  return h * 60 + m;
}

const STANDARD_START_MIN = 8 * 60;
const STANDARD_ENDE_MIN = 18 * 60;

export function zeitRasterBereich(bloeckeDerWoche: StundenplanBlock[]): { startMin: number; endeMin: number } {
  const startMin = Math.min(STANDARD_START_MIN, ...bloeckeDerWoche.map(blockStartMin));
  const endeMin = Math.max(STANDARD_ENDE_MIN, ...bloeckeDerWoche.map(blockEndeMin));
  return { startMin, endeMin };
}

const WOCHENTAGE_MO_FR = [0, 1, 2, 3, 4];

// Sa/So sind aktiv, wenn dort ein Block liegt oder ein Eintrag der Woche auf sie datiert ist
// (z.B. Lernzeit an einem inzwischen verschobenen/gelöschten Wochenend-Block).
export function aktiveWochentage(
  bloeckeDerWoche: StundenplanBlock[],
  eintraege: WochenplanEintrag[],
  tageIso: string[],
): number[] {
  const wochenende = [5, 6].filter(
    (tag) => bloeckeDerWoche.some((b) => b.wochentag === tag) || eintraege.some((e) => e.tag === tageIso[tag]),
  );
  return [...WOCHENTAGE_MO_FR, ...wochenende];
}

// Liefert den Lernblock, an dem ein Eintrag hängt – aber nur, wenn dieser Block in der Woche
// tatsächlich am Tag des Eintrags als Lernblock angezeigt wird. Wurde der Block gelöscht oder
// so bearbeitet (Wochentag, A/B-Woche, Art), dass er dort nicht mehr erscheint, gilt der Eintrag
// als manueller Eintrag, damit er sichtbar bleibt und Soll/Ist konsistent zählen.
// tageIso: ISO-Daten der Woche, Index = Wochentag (0 = Montag).
export function sichtbarerBlockDesEintrags(
  eintrag: WochenplanEintrag,
  stundenplanDerWoche: StundenplanBlock[],
  tageIso: string[],
): StundenplanBlock | undefined {
  if (!eintrag.blockId) return undefined;
  return stundenplanDerWoche.find(
    (b) => b.id === eintrag.blockId && b.art === 'lernblock' && tageIso[b.wochentag] === eintrag.tag,
  );
}

export function blockDesEintragsZaehltInWoche(eintrag: WochenplanEintrag, stundenplanDerWoche: StundenplanBlock[]): boolean {
  if (!eintrag.blockId) return false;
  return stundenplanDerWoche.some((b) => b.id === eintrag.blockId && b.art === 'lernblock');
}

// Soll-Minuten, die ein Eintrag zusätzlich zu den Lernblöcken der Woche beiträgt: seine geplanten
// Minuten – außer sein Block erscheint diese Woche als Lernblock (am Tag des Eintrags oder, wenn
// verschoben, an einem anderen Tag), dann ist das Soll bereits über den Block gezählt.
export function zusatzSollMinDesEintrags(eintrag: WochenplanEintrag, stundenplanDerWoche: StundenplanBlock[]): number {
  return blockDesEintragsZaehltInWoche(eintrag, stundenplanDerWoche) ? 0 : eintrag.geplantMin;
}

export function sollMinutenDerWoche(stundenplanDerWoche: StundenplanBlock[], eintraege: WochenplanEintrag[]): number {
  const lernblockMin = stundenplanDerWoche.filter((b) => b.art === 'lernblock').reduce((s, b) => s + blockDauerMin(b), 0);
  const manuelleMin = eintraege.reduce((s, e) => s + zusatzSollMinDesEintrags(e, stundenplanDerWoche), 0);
  return lernblockMin + manuelleMin;
}

export function istMinutenDerWoche(eintraege: WochenplanEintrag[]): number {
  return eintraege.reduce((s, e) => s + e.tatsaechlichMin, 0);
}

// Soll-Beitrag eines Eintrags zu GENAU dem Fach, das der Eintrag trägt (eintrag.modulId) – anders als
// zusatzSollMinDesEintrags, das nur "zählt der Block schon mit" prüft, ohne auf ein bestimmtes Fach zu
// schauen. Nötig für Lernblöcke ohne eigenes Fach (z.B. "Mathe / OR-Videos"), bei denen das Fach erst
// am Eintrag selbst gewählt wird: deren Blockdauer wird sonst nirgends als Soll gezählt.
function fachSollBeitragDesEintrags(eintrag: WochenplanEintrag, stundenplanDerWoche: StundenplanBlock[]): number {
  const block = stundenplanDerWoche.find((b) => b.id === eintrag.blockId && b.art === 'lernblock');
  if (!block) return eintrag.geplantMin;
  return block.modulId === eintrag.modulId ? 0 : blockDauerMin(block);
}

export interface FachZeit {
  modulId: string;
  sollMin: number;
  istMin: number;
}

export function fachZeitenDerWoche(stundenplanDerWoche: StundenplanBlock[], eintraege: WochenplanEintrag[]): FachZeit[] {
  const map = new Map<string, FachZeit>();
  const eintrag = (modulId: string) => {
    let f = map.get(modulId);
    if (!f) {
      f = { modulId, sollMin: 0, istMin: 0 };
      map.set(modulId, f);
    }
    return f;
  };

  stundenplanDerWoche
    .filter((b) => b.art === 'lernblock' && b.modulId)
    .forEach((b) => {
      eintrag(b.modulId as string).sollMin += blockDauerMin(b);
    });

  eintraege.forEach((e) => {
    if (!e.modulId) return;
    const f = eintrag(e.modulId);
    f.istMin += e.tatsaechlichMin;
    f.sollMin += fachSollBeitragDesEintrags(e, stundenplanDerWoche);
  });

  return Array.from(map.values());
}

export function kalenderwoche(montagIso: string): number {
  return getISOWeek(parseISO(montagIso));
}
