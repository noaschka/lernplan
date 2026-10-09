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

export function sollMinutenDerWoche(stundenplanDerWoche: StundenplanBlock[], eintraege: WochenplanEintrag[]): number {
  const lernblockMin = stundenplanDerWoche.filter((b) => b.art === 'lernblock').reduce((s, b) => s + blockDauerMin(b), 0);
  const manuelleMin = eintraege.filter((e) => !e.blockId).reduce((s, e) => s + e.geplantMin, 0);
  return lernblockMin + manuelleMin;
}

export function istMinutenDerWoche(eintraege: WochenplanEintrag[]): number {
  return eintraege.reduce((s, e) => s + e.tatsaechlichMin, 0);
}
