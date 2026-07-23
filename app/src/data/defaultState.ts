import type { AppState, Modul } from '../types';
import { MODUL_KATALOG_WIW_THD } from './moduleSeed';

function katalogAlsModule(): Modul[] {
  return MODUL_KATALOG_WIW_THD.map((m) => ({
    ...m,
    id: `modul-${m.kuerzel.toLowerCase()}`,
    semesterIst: null,
    status: 'offen',
    pruefungstermin: null,
    anmeldefrist: null,
    voraussetzungen: [],
    dokumente: [],
    versuche: [],
  }));
}

export function defaultState(): AppState {
  return {
    module: katalogAlsModule(),
    lernplaene: [],
    wochenplaene: [],
    semester: [],
    settings: {
      studiengang: 'Wirtschaftsingenieurwesen',
      hochschule: 'TH Deggendorf',
      gesamtEctsSoll: 210,
      regelstudienzeitEnde: null,
      zielschnitt: null,
      spacedRepetitionIntervalleTage: [1, 3, 7, 14, 30],
    },
  };
}
