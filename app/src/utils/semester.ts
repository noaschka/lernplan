import type { Semester } from '../types';

export function aktuellesSollSemester(semesterListe: Semester[]): number | null {
  const heute = new Date().toISOString().slice(0, 10);
  const laufendes = semesterListe.find((s) => s.start <= heute && heute <= s.ende);
  if (laufendes) return laufendes.nummer;
  const kommende = semesterListe.filter((s) => s.start > heute).sort((a, b) => (a.start < b.start ? -1 : 1))[0];
  if (kommende) return kommende.nummer;
  const vergangene = [...semesterListe].sort((a, b) => (a.nummer > b.nummer ? -1 : 1))[0];
  return vergangene ? vergangene.nummer : null;
}
