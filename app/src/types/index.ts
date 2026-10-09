export type ModulStatus =
  | 'offen'
  | 'angemeldet'
  | 'bestanden'
  | 'zweitversuch'
  | 'drittversuch';

export interface Versuch {
  id: string;
  versuchNr: number;
  datum: string | null;
  note: number | null;
  bestanden: boolean | null;
}

export interface Dokument {
  name: string;
  url: string;
}

export interface Modul {
  id: string;
  name: string;
  kuerzel: string;
  semesterSoll: number;
  semesterIst: number | null;
  ects: number;
  swsVorlesung: number;
  workloadGesamt: number;
  pruefungsform: string;
  status: ModulStatus;
  pruefungstermin: string | null;
  anmeldefrist: string | null;
  voraussetzungen: string[];
  inhalte: string;
  lehrziele: string;
  dokumente: Dokument[];
  versuche: Versuch[];
}

export interface LernplanThema {
  id: string;
  titel: string;
  erledigt: boolean;
  erledigtAm: string | null;
  naechsteWiederholung: string | null;
  wiederholungen: string[];
}

export interface Lernplan {
  id: string;
  modulId: string;
  themen: LernplanThema[];
}

export interface WochenplanEintrag {
  id: string;
  modulId: string | null;
  tag: string;
  geplantMin: number;
  tatsaechlichMin: number;
  blockId?: string;
}

export interface Wochenplan {
  woche: string;
  eintraege: WochenplanEintrag[];
}

export type BlockArt = 'lernblock' | 'vorlesung' | 'frei';

export interface StundenplanBlock {
  id: string;
  wochentag: number;
  start: string;
  ende: string;
  art: BlockArt;
  titel: string;
  kurz: string;
  modulId: string | null;
  wochen: 'AB' | 'A' | 'B';
  notiz: string;
  quelle: 'manuell' | 'import';
}

export interface Semester {
  nummer: number;
  start: string;
  ende: string;
  ectsSoll: number;
}

export interface AbWochenSettings {
  aUngerade: boolean;
  labelA: string;
  labelB: string;
}

export interface Settings {
  studiengang: string;
  hochschule: string;
  gesamtEctsSoll: number;
  regelstudienzeitEnde: string | null;
  zielschnitt: number | null;
  spacedRepetitionIntervalleTage: number[];
  abWochen: AbWochenSettings;
}

export interface AppState {
  module: Modul[];
  lernplaene: Lernplan[];
  wochenplaene: Wochenplan[];
  semester: Semester[];
  stundenplan: StundenplanBlock[];
  settings: Settings;
}
