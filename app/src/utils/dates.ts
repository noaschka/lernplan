import { differenceInCalendarDays, parseISO, startOfWeek, format } from 'date-fns';

export function heuteISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function montagDerWoche(datum: Date = new Date()): string {
  return format(startOfWeek(datum, { weekStartsOn: 1 }), 'yyyy-MM-dd');
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
