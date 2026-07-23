import { addDays, parseISO, format } from 'date-fns';
import type { Lernplan, LernplanThema, Modul } from '../types';

export function naechsteWiederholungBerechnen(
  thema: Pick<LernplanThema, 'erledigtAm' | 'wiederholungen'>,
  intervalleTage: number[],
): string | null {
  const stufe = thema.wiederholungen.length;
  if (stufe >= intervalleTage.length) return null;
  const basis = thema.wiederholungen.at(-1) ?? thema.erledigtAm;
  if (!basis) return null;
  return format(addDays(parseISO(basis), intervalleTage[stufe]), 'yyyy-MM-dd');
}

export interface FaelligesThema {
  modul: Modul;
  thema: LernplanThema;
}

export function faelligeWiederholungen(module: Modul[], lernplaene: Lernplan[], biszu: string): FaelligesThema[] {
  const ergebnis: FaelligesThema[] = [];
  for (const plan of lernplaene) {
    const modul = module.find((m) => m.id === plan.modulId);
    if (!modul) continue;
    for (const thema of plan.themen) {
      if (thema.naechsteWiederholung && thema.naechsteWiederholung <= biszu) {
        ergebnis.push({ modul, thema });
      }
    }
  }
  return ergebnis.sort((a, b) => (a.thema.naechsteWiederholung! < b.thema.naechsteWiederholung! ? -1 : 1));
}
