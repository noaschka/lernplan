import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Field, inputClass } from '../components/ui/FormField';
import { STATUS_LABELS, STATUS_OPTIONS } from '../components/ui/StatusBadge';
import type { Modul, ModulStatus } from '../types';

const EMPTY: Omit<Modul, 'id' | 'versuche' | 'dokumente'> = {
  name: '',
  kuerzel: '',
  semesterSoll: 1,
  semesterIst: null,
  ects: 5,
  swsVorlesung: 4,
  workloadGesamt: 150,
  pruefungsform: 'Klausur',
  status: 'offen',
  pruefungstermin: null,
  anmeldefrist: null,
  voraussetzungen: [],
  inhalte: '',
  lehrziele: '',
};

export default function ModulFormPage() {
  const { modulId } = useParams();
  const navigate = useNavigate();
  const module = useStore((s) => s.module);
  const addModul = useStore((s) => s.addModul);
  const updateModul = useStore((s) => s.updateModul);

  const editing = modulId ? module.find((m) => m.id === modulId) : undefined;
  const [form, setForm] = useState(editing ? { ...editing } : { ...EMPTY });
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Bitte einen Modulnamen eingeben.');
      return;
    }
    if (editing) {
      updateModul(editing.id, form);
      navigate(`/module/${editing.id}`);
    } else {
      const id = addModul(form);
      navigate(`/module/${id}`);
    }
  }

  const andereModule = module.filter((m) => m.id !== modulId);

  return (
    <div>
      <Link to={editing ? `/module/${editing.id}` : '/module'} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">
        &larr; Zurück
      </Link>
      <h1 className="mt-2 text-2xl font-extrabold">{editing ? 'Modul bearbeiten' : 'Modul hinzufügen'}</h1>

      <form onSubmit={submit} className="mt-6 max-w-2xl space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Field label="Modulname *">
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
          </div>
          <Field label="Kürzel">
            <input className={inputClass} value={form.kuerzel} onChange={(e) => setForm({ ...form, kuerzel: e.target.value })} />
          </Field>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="grid grid-cols-4 gap-4">
          <Field label="Semester (Soll)">
            <input
              type="number"
              min={1}
              className={inputClass}
              value={form.semesterSoll}
              onChange={(e) => setForm({ ...form, semesterSoll: Number(e.target.value) })}
            />
          </Field>
          <Field label="Semester (Ist)" hint="leer = noch nicht belegt">
            <input
              type="number"
              min={1}
              className={inputClass}
              value={form.semesterIst ?? ''}
              onChange={(e) => setForm({ ...form, semesterIst: e.target.value ? Number(e.target.value) : null })}
            />
          </Field>
          <Field label="ECTS">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={form.ects}
              onChange={(e) => setForm({ ...form, ects: Number(e.target.value) })}
            />
          </Field>
          <Field label="SWS">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={form.swsVorlesung}
              onChange={(e) => setForm({ ...form, swsVorlesung: Number(e.target.value) })}
            />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Workload gesamt (Std.)">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={form.workloadGesamt}
              onChange={(e) => setForm({ ...form, workloadGesamt: Number(e.target.value) })}
            />
          </Field>
          <Field label="Prüfungsform">
            <input
              className={inputClass}
              placeholder="z.B. Klausur, mündlich, Hausarbeit"
              value={form.pruefungsform}
              onChange={(e) => setForm({ ...form, pruefungsform: e.target.value })}
            />
          </Field>
          <Field label="Status">
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as ModulStatus })}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Prüfungstermin">
            <input
              type="date"
              className={inputClass}
              value={form.pruefungstermin ?? ''}
              onChange={(e) => setForm({ ...form, pruefungstermin: e.target.value || null })}
            />
          </Field>
          <Field label="Anmeldefrist">
            <input
              type="date"
              className={inputClass}
              value={form.anmeldefrist ?? ''}
              onChange={(e) => setForm({ ...form, anmeldefrist: e.target.value || null })}
            />
          </Field>
        </div>

        <Field label="Inhalte">
          <textarea
            className={inputClass}
            rows={3}
            value={form.inhalte}
            onChange={(e) => setForm({ ...form, inhalte: e.target.value })}
          />
        </Field>
        <Field label="Lehrziele">
          <textarea
            className={inputClass}
            rows={3}
            value={form.lehrziele}
            onChange={(e) => setForm({ ...form, lehrziele: e.target.value })}
          />
        </Field>

        {andereModule.length > 0 && (
          <Field label="Voraussetzungen">
            <div className="flex max-h-40 flex-col gap-1 overflow-y-auto rounded-lg border border-slate-300 p-2 dark:border-slate-700">
              {andereModule.map((m) => (
                <label key={m.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.voraussetzungen.includes(m.id)}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        voraussetzungen: e.target.checked
                          ? [...form.voraussetzungen, m.id]
                          : form.voraussetzungen.filter((id) => id !== m.id),
                      })
                    }
                  />
                  {m.name}
                </label>
              ))}
            </div>
          </Field>
        )}

        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            Speichern
          </button>
          <Link
            to={editing ? `/module/${editing.id}` : '/module'}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Abbrechen
          </Link>
        </div>
      </form>
    </div>
  );
}
