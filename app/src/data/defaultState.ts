import type { AppState } from '../types';

export function defaultState(): AppState {
  return {
    module: [],
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
