import type { Modul } from '../types';

export function letzterVersuch(modul: Modul) {
  if (!modul.versuche.length) return null;
  return [...modul.versuche].sort((a, b) => (b.versuchNr ?? 0) - (a.versuchNr ?? 0))[0];
}

export function aktuelleNote(modul: Modul): number | null {
  const bestandener = [...modul.versuche]
    .filter((v) => v.bestanden && v.note != null)
    .sort((a, b) => (b.versuchNr ?? 0) - (a.versuchNr ?? 0))[0];
  return bestandener ? bestandener.note : null;
}

export function istBestanden(modul: Modul): boolean {
  return modul.status === 'bestanden';
}

export function versuchAnzahl(modul: Modul): number {
  return modul.versuche.length;
}

export interface Notenschnitt {
  schnitt: number | null;
  ectsGewertet: number;
}

export function berechneNotenschnitt(module: Modul[]): Notenschnitt {
  let sumGewichtet = 0;
  let sumEcts = 0;
  for (const m of module) {
    if (!istBestanden(m)) continue;
    const note = aktuelleNote(m);
    if (note == null) continue;
    sumGewichtet += note * m.ects;
    sumEcts += m.ects;
  }
  return { schnitt: sumEcts ? sumGewichtet / sumEcts : null, ectsGewertet: sumEcts };
}

export function ectsErreicht(module: Modul[]): number {
  return module.filter(istBestanden).reduce((sum, m) => sum + m.ects, 0);
}

export function ectsOffen(module: Modul[], gesamtEctsSoll: number): number {
  return Math.max(0, gesamtEctsSoll - ectsErreicht(module));
}

export function notenverteilung(module: Modul[]): Record<string, number> {
  const buckets: Record<string, number> = {
    '1.0-1.5': 0,
    '1.6-2.5': 0,
    '2.6-3.5': 0,
    '3.6-4.0': 0,
  };
  for (const m of module) {
    if (!istBestanden(m)) continue;
    const note = aktuelleNote(m);
    if (note == null) continue;
    if (note <= 1.5) buckets['1.0-1.5']++;
    else if (note <= 2.5) buckets['1.6-2.5']++;
    else if (note <= 3.5) buckets['2.6-3.5']++;
    else buckets['3.6-4.0']++;
  }
  return buckets;
}

/**
 * Simuliert den benötigten Schnitt in den verbleibenden offenen Modulen (mit ECTS-Gewicht),
 * um einen Zielschnitt über das gesamte Studium zu erreichen.
 */
export function simuliereZielschnitt(
  module: Modul[],
  zielschnitt: number,
): { benoetigterSchnittOffen: number | null; erreichbar: boolean; ectsOffenGewertet: number } {
  const bestanden = module.filter(istBestanden);
  const offen = module.filter((m) => !istBestanden(m));
  const { schnitt: bisherigerSchnitt } = berechneNotenschnitt(bestanden);
  const ectsBestanden = bestanden.reduce((s, m) => s + m.ects, 0);
  const ectsOffenGewertet = offen.reduce((s, m) => s + m.ects, 0);

  if (!ectsOffenGewertet) {
    return { benoetigterSchnittOffen: null, erreichbar: bisherigerSchnitt != null && bisherigerSchnitt <= zielschnitt, ectsOffenGewertet: 0 };
  }

  const sumGewichtetBisher = (bisherigerSchnitt ?? 0) * ectsBestanden;
  const gesamtEcts = ectsBestanden + ectsOffenGewertet;
  const benoetigt = (zielschnitt * gesamtEcts - sumGewichtetBisher) / ectsOffenGewertet;

  return {
    benoetigterSchnittOffen: benoetigt,
    erreichbar: benoetigt >= 1.0,
    ectsOffenGewertet,
  };
}
