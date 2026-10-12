import { v4 as uuid } from 'uuid';
import type { AbWochenSettings, StundenplanBlock } from '../types';
import { wochenTyp } from './stundenplan';

interface IcsRohEvent {
  titel: string;
  ort: string;
  jahr: number;
  monat: number;
  tag: number;
  wochentag: number; // 0 = Montag … 6 = Sonntag
  startHHMM: string;
  endeHHMM: string;
  rruleIntervall: number | null; // null = kein RRULE, also Einzeltermin
}

export interface IcsImportErgebnis {
  bloecke: StundenplanBlock[];
  einmaligeAnzahl: number;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function entfalteZeilen(text: string): string[] {
  const rohzeilen = text.split(/\r\n|\n|\r/);
  const zeilen: string[] = [];
  for (const zeile of rohzeilen) {
    if ((zeile.startsWith(' ') || zeile.startsWith('\t')) && zeilen.length) {
      zeilen[zeilen.length - 1] += zeile.slice(1);
    } else {
      zeilen.push(zeile);
    }
  }
  return zeilen;
}

function parseEigenschaftsZeile(zeile: string): { name: string; params: Record<string, string>; wert: string } | null {
  const idx = zeile.indexOf(':');
  if (idx === -1) return null;
  const kopf = zeile.slice(0, idx);
  const wert = zeile.slice(idx + 1);
  const [name, ...paramTeile] = kopf.split(';');
  const params: Record<string, string> = {};
  for (const teil of paramTeile) {
    const [k, v] = teil.split('=');
    if (k && v) params[k.toUpperCase()] = v;
  }
  return { name: name.toUpperCase(), params, wert };
}

function parseIcsDatum(wert: string): { jahr: number; monat: number; tag: number; stunde: number; minute: number } | null {
  const m = wert.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?)?(Z)?$/);
  if (!m) return null;
  const [, jS, moS, tS, hS, miS, , zSuffix] = m;
  if (!hS) return null; // ganztägig, keine Uhrzeit -> nicht als Zeitblock nutzbar

  let jahr = Number(jS);
  let monat = Number(moS);
  let tag = Number(tS);
  let stunde = Number(hS);
  let minute = Number(miS);

  if (zSuffix) {
    const utcMs = Date.UTC(jahr, monat - 1, tag, stunde, minute);
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const teile = Object.fromEntries(fmt.formatToParts(new Date(utcMs)).map((p) => [p.type, p.value]));
    jahr = Number(teile.year);
    monat = Number(teile.month);
    tag = Number(teile.day);
    stunde = Number(teile.hour === '24' ? '0' : teile.hour);
    minute = Number(teile.minute);
  }

  return { jahr, monat, tag, stunde, minute };
}

function addMinuten(start: { stunde: number; minute: number }, minuten: number): string {
  const gesamt = start.stunde * 60 + start.minute + minuten;
  return `${pad(Math.floor(gesamt / 60) % 24)}:${pad(gesamt % 60)}`;
}

function minutenAusDauer(dauer: string): number {
  const m = dauer.match(/^P(?:\d+D)?T?(?:(\d+)H)?(?:(\d+)M)?/);
  if (!m) return 90;
  const stunden = Number(m[1] ?? 0);
  const minuten = Number(m[2] ?? 0);
  return stunden * 60 + minuten || 90;
}

function baueRohEvent(eig: Record<string, { params: Record<string, string>; wert: string }>): IcsRohEvent | null {
  const dtstart = eig.DTSTART;
  if (!dtstart || dtstart.params.VALUE === 'DATE') return null; // kein Termin oder ganztägig
  const start = parseIcsDatum(dtstart.wert);
  if (!start) return null;

  let endeHHMM: string;
  const dtend = eig.DTEND;
  if (dtend && dtend.params.VALUE !== 'DATE') {
    const ende = parseIcsDatum(dtend.wert);
    endeHHMM = ende ? `${pad(ende.stunde)}:${pad(ende.minute)}` : addMinuten(start, 90);
  } else if (eig.DURATION) {
    endeHHMM = addMinuten(start, minutenAusDauer(eig.DURATION.wert));
  } else {
    endeHHMM = addMinuten(start, 90);
  }

  const jsTag = new Date(Date.UTC(start.jahr, start.monat - 1, start.tag)).getUTCDay();
  const wochentag = (jsTag + 6) % 7;

  let rruleIntervall: number | null = null;
  const rrule = eig.RRULE?.wert;
  if (rrule) {
    const teile = Object.fromEntries(rrule.split(';').map((t) => t.split('=') as [string, string]));
    if (teile.FREQ === 'WEEKLY') rruleIntervall = teile.INTERVAL ? Number(teile.INTERVAL) : 1;
  }

  return {
    titel: (eig.SUMMARY?.wert ?? 'Ohne Titel').trim(),
    ort: (eig.LOCATION?.wert ?? '').trim(),
    jahr: start.jahr,
    monat: start.monat,
    tag: start.tag,
    wochentag,
    startHHMM: `${pad(start.stunde)}:${pad(start.minute)}`,
    endeHHMM,
    rruleIntervall,
  };
}

function parseIcs(text: string): IcsRohEvent[] {
  const zeilen = entfalteZeilen(text);
  const events: IcsRohEvent[] = [];
  let inEvent = false;
  let eigenschaften: Record<string, { params: Record<string, string>; wert: string }> = {};

  for (const zeile of zeilen) {
    if (zeile === 'BEGIN:VEVENT') {
      inEvent = true;
      eigenschaften = {};
      continue;
    }
    if (zeile === 'END:VEVENT') {
      inEvent = false;
      const ev = baueRohEvent(eigenschaften);
      if (ev) events.push(ev);
      continue;
    }
    if (!inEvent) continue;
    const geparst = parseEigenschaftsZeile(zeile);
    if (geparst) eigenschaften[geparst.name] = { params: geparst.params, wert: geparst.wert };
  }

  return events;
}

function datumMs(e: IcsRohEvent): number {
  return Date.UTC(e.jahr, e.monat - 1, e.tag);
}

function montagIsoFuerEvent(e: IcsRohEvent): string {
  const datum = new Date(datumMs(e));
  datum.setUTCDate(datum.getUTCDate() - e.wochentag);
  return datum.toISOString().slice(0, 10);
}

function baueBlock(e: IcsRohEvent, wochen: StundenplanBlock['wochen']): StundenplanBlock {
  return {
    id: uuid(),
    wochentag: e.wochentag,
    start: e.startHHMM,
    ende: e.endeHHMM,
    art: 'vorlesung',
    titel: e.titel,
    kurz: '',
    modulId: null,
    wochen,
    notiz: e.ort,
    quelle: 'import',
  };
}

export function icsDateiZuStundenplan(text: string, abWochen: AbWochenSettings): IcsImportErgebnis {
  const events = parseIcs(text);
  const mitRrule = events.filter((e) => e.rruleIntervall !== null);
  const ohneRrule = events.filter((e) => e.rruleIntervall === null);

  const bloecke: StundenplanBlock[] = [];

  for (const e of mitRrule) {
    const wochen = (e.rruleIntervall as number) >= 2 ? wochenTyp(montagIsoFuerEvent(e), abWochen) : 'AB';
    bloecke.push(baueBlock(e, wochen));
  }

  const gruppen = new Map<string, IcsRohEvent[]>();
  for (const e of ohneRrule) {
    const key = `${e.titel.toLowerCase()}|${e.wochentag}|${e.startHHMM}|${e.endeHHMM}`;
    const liste = gruppen.get(key) ?? [];
    liste.push(e);
    gruppen.set(key, liste);
  }

  let einmaligeAnzahl = 0;
  for (const liste of gruppen.values()) {
    if (liste.length < 2) {
      einmaligeAnzahl += liste.length;
      continue;
    }
    liste.sort((a, b) => datumMs(a) - datumMs(b));
    const luecken = liste.slice(1).map((e, i) => Math.round((datumMs(e) - datumMs(liste[i])) / 86_400_000));
    const sortiert = luecken.slice().sort((a, b) => a - b);
    const median = sortiert[Math.floor(sortiert.length / 2)];
    const wochen = median >= 10 ? wochenTyp(montagIsoFuerEvent(liste[0]), abWochen) : 'AB';
    bloecke.push(baueBlock(liste[0], wochen));
  }

  return { bloecke, einmaligeAnzahl };
}
