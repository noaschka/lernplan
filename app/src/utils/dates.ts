import { differenceInCalendarDays, parseISO, startOfWeek, addDays, addWeeks, format } from 'date-fns';

export function heuteISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function montagDerWoche(datum: Date = new Date()): string {
  return format(startOfWeek(datum, { weekStartsOn: 1 }), 'yyyy-MM-dd');
}

export function wocheVerschieben(montagIso: string, deltaWochen: number): string {
  return format(addWeeks(parseISO(montagIso), deltaWochen), 'yyyy-MM-dd');
}

const WOCHENTAGE_LABEL = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export function tageDerWoche(montagIso: string): { iso: string; label: string; tagLabel: string }[] {
  const montag = parseISO(montagIso);
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(montag, i);
    return {
      iso: format(d, 'yyyy-MM-dd'),
      label: d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
      tagLabel: WOCHENTAGE_LABEL[i],
    };
  });
}

export function tageBis(isoDatum: string | null): number | null {
  if (!isoDatum) return null;
  return differenceInCalendarDays(parseISO(isoDatum), new Date());
}

export type Dringlichkeit = 'gruen' | 'gelb' | 'rot';

export function dringlichkeit(tage: number | null): Dringlichkeit {
  if (tage == null) return 'gruen';
  if (tage <= 7) return 'rot';
  if (tage <= 21) return 'gelb';
  return 'gruen';
}

export function formatiereDatum(isoDatum: string | null): string {
  if (!isoDatum) return '–';
  return parseISO(isoDatum).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
