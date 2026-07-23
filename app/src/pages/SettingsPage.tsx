import { useState } from 'react';
import { useStore } from '../store/useStore';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-white';

export default function SettingsPage() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
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

      <div className="mt-6 max-w-lg rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
        Export/Import als JSON-Backup folgt in Phase 4.
      </div>
    </div>
  );
}
