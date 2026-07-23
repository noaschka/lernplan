import { useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import { Field, inputClass } from '../components/ui/FormField';
import type { AppState } from '../types';

function istGueltigerState(data: unknown): data is AppState {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    Array.isArray(d.module) &&
    Array.isArray(d.lernplaene) &&
    Array.isArray(d.wochenplaene) &&
    Array.isArray(d.semester) &&
    typeof d.settings === 'object' &&
    d.settings !== null
  );
}

export default function SettingsPage() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const importState = useStore((s) => s.importState);
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [importFehler, setImportFehler] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function exportieren() {
    const state: AppState = useStore.getState();
    const { module, lernplaene, wochenplaene, semester, settings: s } = state;
    const payload: AppState = { module, lernplaene, wochenplaene, semester, settings: s };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studium-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importDatei(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportFehler('');
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!istGueltigerState(data)) throw new Error('invalid');
        if (confirm('Import ersetzt alle aktuellen Daten (Module, Lernpläne, Wochenpläne, Einstellungen). Fortfahren?')) {
          importState(data);
          setForm(data.settings);
        }
      } catch {
        setImportFehler('Ungültige Backup-Datei.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Einstellungen</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Grunddaten deines Studiums &ndash; Basis für ECTS-Fortschritt, Notenschnitt und Regelstudienzeit-Abgleich.
      </p>

      <form onSubmit={submit} className="mt-6 max-w-lg space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <Field label="Studiengang">
          <input
            className={inputClass}
            value={form.studiengang}
            onChange={(e) => setForm({ ...form, studiengang: e.target.value })}
          />
        </Field>
        <Field label="Hochschule">
          <input
            className={inputClass}
            value={form.hochschule}
            onChange={(e) => setForm({ ...form, hochschule: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Gesamt-ECTS (Soll)">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={form.gesamtEctsSoll}
              onChange={(e) => setForm({ ...form, gesamtEctsSoll: Number(e.target.value) })}
            />
          </Field>
          <Field label="Zielschnitt (optional)">
            <input
              type="number"
              min={1}
              max={5}
              step={0.1}
              className={inputClass}
              value={form.zielschnitt ?? ''}
              onChange={(e) => setForm({ ...form, zielschnitt: e.target.value ? Number(e.target.value) : null })}
            />
          </Field>
        </div>
        <Field label="Regelstudienzeit-Ende">
          <input
            type="date"
            className={inputClass}
            value={form.regelstudienzeitEnde ?? ''}
            onChange={(e) => setForm({ ...form, regelstudienzeitEnde: e.target.value || null })}
          />
        </Field>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Speichern
          </button>
          {saved && <span className="text-sm text-emerald-600 dark:text-emerald-400">Gespeichert.</span>}
        </div>
      </form>

      <div className="mt-6 max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
        Der Modulkatalog wurde automatisiert aus dem offiziellen Modulhandbuch extrahiert. Bei den
        Wahlpflichtfächern (W-19, W-20, W-30&ndash;W-35) sind mehr Module gelistet, als tatsächlich
        Pflicht sind &ndash; bitte in der Modulübersicht die für dich nicht relevanten Wahlmodule
        löschen, damit ECTS-Fortschritt und Notenschnitt stimmen.
      </div>

      <div className="mt-4 max-w-lg rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Backup</div>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Alle Daten liegen nur in diesem Browser (localStorage). Exportiere regelmäßig ein Backup,
          damit bei Cache-Löschung oder Browserwechsel nichts verloren geht.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportieren}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            &darr; Als JSON exportieren
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            &uarr; JSON importieren
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importDatei} />
        </div>
        {importFehler && <p className="mt-2 text-sm text-red-500">{importFehler}</p>}
      </div>
    </div>
  );
}
