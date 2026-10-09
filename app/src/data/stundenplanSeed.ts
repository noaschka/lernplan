import type { StundenplanBlock } from '../types';

const b = (
  id: string, wochentag: number, start: string, ende: string,
  art: StundenplanBlock['art'], wochen: StundenplanBlock['wochen'],
  titel: string, kurz: string, modulId: string | null, notiz: string,
): StundenplanBlock => ({ id, wochentag, start, ende, art, wochen, titel, kurz, modulId, notiz, quelle: 'manuell' });

export const STUNDENPLAN_WIW5_WS2627: StundenplanBlock[] = [
  // Montag
  b('mo-mathe', 0, '08:30', '12:00', 'lernblock', 'AB', 'Ingenieurmathematik', 'Mathe', 'modul-w-02', 'Zweitversuch. Drei Blöcke mit Pausen, Altklausuren rechnen.'),
  b('mo-bis', 0, '13:00', '14:30', 'vorlesung', 'AB', 'Betriebliche Informationssysteme', 'BIS', 'modul-w-26', 'Raum I101'),
  b('mo-bis-ue', 0, '14:45', '16:15', 'vorlesung', 'AB', 'Übung Betriebliche Informationssysteme', 'Üb. BIS', 'modul-w-26', 'Raum I101'),
  b('mo-frei', 0, '16:15', '18:00', 'frei', 'AB', 'Vorstand und Fast Forest', 'frei', null, 'Ab 16:15 frei einteilbar.'),

  // Dienstag
  b('di-bsim', 1, '08:00', '14:00', 'vorlesung', 'A', 'Business Simulation', 'BSim', 'modul-w-22', 'Raum C213, EDV'),
  b('di-frei-a', 1, '14:00', '18:00', 'frei', 'A', 'Vorstand und Fast Forest', 'frei', null, 'Kein Lernblock nach sechs Stunden EDV-Raum.'),
  b('di-alt', 1, '08:30', '12:30', 'lernblock', 'B', 'Altklausuren', 'Altkl.', null, 'Ingenieurmathematik und Investition und Finanzierung im Wechsel.'),
  b('di-frei-b', 1, '13:00', '18:00', 'frei', 'B', 'Vorstand und Fast Forest', 'frei', null, 'Ab 13:00 frei einteilbar.'),

  // Mittwoch
  b('mi-unf', 2, '08:00', '09:30', 'vorlesung', 'AB', 'Unternehmensnachfolge', 'UNF', 'modul-w-22', 'Raum I105'),
  b('mi-kt1', 2, '09:45', '11:15', 'vorlesung', 'AB', 'Kunststofftechnik', 'Kunstst.', 'modul-w-25', 'Raum I105'),
  b('mi-pf', 2, '11:30', '13:00', 'vorlesung', 'AB', 'Personalführung', 'Pers.', 'modul-w-27', 'Raum I105'),
  b('mi-kt2-a', 2, '14:00', '15:30', 'vorlesung', 'A', 'Kunststofftechnik', 'Kunstst.', 'modul-w-25', 'Raum I101'),
  b('mi-kt2-b', 2, '14:00', '15:30', 'vorlesung', 'B', 'Kunststofftechnik, Labor', 'Labor', 'modul-w-25', 'Raum I002'),
  b('mi-kt-lern', 2, '16:00', '17:30', 'lernblock', 'AB', 'Kunststofftechnik nacharbeiten', 'Kunstst.', 'modul-w-25', 'Stoff der beiden Termine vom Tag. Modul zählt mit Gewicht 10.'),

  // Donnerstag
  b('do-inv', 3, '08:00', '11:15', 'lernblock', 'AB', 'Investition und Finanzierung', 'Invest', 'modul-w-18', 'Zweitversuch, Gewicht 10. Zwei Blöcke mit Pause.'),
  b('do-ft1', 3, '11:30', '13:00', 'vorlesung', 'AB', 'Fertigungstechnik spanlos', 'Fertig.', 'modul-w-25', 'Gruppe A, Raum I105'),
  b('do-ft2', 3, '14:00', '15:30', 'vorlesung', 'AB', 'Fertigungstechnik spanend', 'Fertig.', 'modul-w-25', 'Raum I105'),
  b('do-ft-lern', 3, '16:00', '17:30', 'lernblock', 'AB', 'Fertigungstechnik, Aufgaben', 'Fertig.', 'modul-w-25', 'Aufgaben zum Stoff des Tages. Modul zählt mit Gewicht 10.'),

  // Freitag
  b('fr-or-vor', 4, '08:00', '09:30', 'lernblock', 'AB', 'Operations Research vorbereiten', 'OR vor', 'modul-w-24', 'Stoff der kommenden Vorlesung anschauen.'),
  b('fr-or', 4, '09:45', '11:15', 'vorlesung', 'AB', 'Operations Research', 'OR', 'modul-w-24', 'Raum I006'),
  b('fr-or-auf', 4, '11:30', '13:30', 'lernblock', 'AB', 'Operations Research, Aufgaben', 'OR Aufg.', 'modul-w-24', 'Direkt nach der Vorlesung rechnen.'),
  b('fr-ar1', 4, '14:00', '15:30', 'vorlesung', 'AB', 'Arbeitsrecht', 'Arb.-R.', 'modul-w-27', 'Raum I105'),
  b('fr-ar2', 4, '15:45', '17:15', 'vorlesung', 'AB', 'Arbeitsrecht', 'Arb.-R.', 'modul-w-27', 'Raum I105'),
];
