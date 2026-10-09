import type { ModulStatus, Versuch } from '../types';

interface NotenEintrag {
  status: ModulStatus;
  versuche: Omit<Versuch, 'id'>[];
}

/**
 * Notenstand lt. Notenblattinformation TH Deggendorf, Stand 03.10.2026.
 * Nur Module mit bereits abgelegter Prüfung; alle anderen Module bleiben "offen".
 * Exakte Prüfungstage sind im Notenblatt nicht angegeben (nur Semester), daher datum: null.
 */
export const NOTENSTAND_2026_10_03: Record<string, NotenEintrag> = {
  'W-01': { status: 'zweitversuch', versuche: [{ versuchNr: 1, datum: null, note: 5.0, bestanden: false }] },
  'W-02': { status: 'zweitversuch', versuche: [{ versuchNr: 1, datum: null, note: 5.0, bestanden: false }] },
  'W-03': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 4.0, bestanden: true }] },
  'W-04': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 3.0, bestanden: true }] },
  'W-05': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 2.3, bestanden: true }] },
  'W-06': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 3.3, bestanden: true }] },
  'W-07': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 4.0, bestanden: true }] },
  'W-08': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 3.0, bestanden: true }] },
  'W-09': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 3.0, bestanden: true }] },
  'W-10': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 1.3, bestanden: true }] },
  'W-11': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 1.7, bestanden: true }] },
  'W-12': { status: 'bestanden', versuche: [{ versuchNr: 1, datum: null, note: 2.7, bestanden: true }] },
  'W-18': { status: 'zweitversuch', versuche: [{ versuchNr: 1, datum: null, note: 5.0, bestanden: false }] },
};
