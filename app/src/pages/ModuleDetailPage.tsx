import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import StatusBadge from '../components/ui/StatusBadge';
import { inputClass } from '../components/ui/FormField';
import { formatiereDatum } from '../utils/dates';

export default function ModuleDetailPage() {
  const { modulId } = useParams();
  const navigate = useNavigate();
  const module = useStore((s) => s.module);
  const deleteModul = useStore((s) => s.deleteModul);
  const updateModul = useStore((s) => s.updateModul);
  const addVersuch = useStore((s) => s.addVersuch);
  const deleteVersuch = useStore((s) => s.deleteVersuch);

  const modul = module.find((m) => m.id === modulId);
  const [neuDatum, setNeuDatum] = useState('');
  const [neuNote, setNeuNote] = useState('');
  const [neuBestanden, setNeuBestanden] = useState(true);
  const [neuDokName, setNeuDokName] = useState('');
  const [neuDokUrl, setNeuDokUrl] = useState('');

  if (!modul) {
    return (
      <div>
        <p className="text-sm text-slate-500">Modul nicht gefunden.</p>
        <Link to="/module" className="text-sm underline">
          Zur Modulübersicht
        </Link>
      </div>
    );
  }

  const voraussetzungsNamen = modul.voraussetzungen
    .map((id) => module.find((m) => m.id === id)?.name)
    .filter(Boolean);

  function versuchHinzufuegen() {
    addVersuch(modul!.id, {
      versuchNr: modul!.versuche.length + 1,
      datum: neuDatum || null,
      note: neuNote ? Number(neuNote) : null,
      bestanden: neuBestanden,
    });
    setNeuDatum('');
    setNeuNote('');
    setNeuBestanden(true);
  }

  function dokumentHinzufuegen() {
    if (!neuDokName.trim() || !neuDokUrl.trim()) return;
    updateModul(modul!.id, { dokumente: [...modul!.dokumente, { name: neuDokName.trim(), url: neuDokUrl.trim() }] });
    setNeuDokName('');
    setNeuDokUrl('');
  }

  function dokumentEntfernen(index: number) {
    updateModul(modul!.id, { dokumente: modul!.dokumente.filter((_, i) => i !== index) });
  }

  function loeschen() {
    if (confirm(`Modul "${modul!.name}" wirklich löschen?`)) {
      deleteModul(modul!.id);
      navigate('/module');
    }
  }

  return (
    <div>
      <Link to="/module" className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">
        &larr; Zur Modulübersicht
      </Link>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">{modul.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <StatusBadge status={modul.status} />
            <span>{modul.kuerzel}</span>
            <span>&middot; Semester {modul.semesterIst ?? modul.semesterSoll}</span>
            <span>&middot; {modul.ects} ECTS</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/module/${modul.id}/lernplan`}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Lernplan
          </Link>
          <Link
            to={`/module/${modul.id}/bearbeiten`}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Bearbeiten
          </Link>
          <button
            onClick={loeschen}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
          >
            Löschen
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <InfoCard label="SWS" value={String(modul.swsVorlesung)} />
        <InfoCard label="Workload" value={`${modul.workloadGesamt} Std.`} />
        <InfoCard label="Prüfungsform" value={modul.pruefungsform || '–'} />
        <InfoCard label="Prüfungstermin" value={formatiereDatum(modul.pruefungstermin)} />
      </div>

      {(modul.inhalte || modul.lehrziele) && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {modul.inhalte && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Inhalte</div>
              <p className="whitespace-pre-wrap text-sm">{modul.inhalte}</p>
            </div>
          )}
          {modul.lehrziele && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Lehrziele</div>
              <p className="whitespace-pre-wrap text-sm">{modul.lehrziele}</p>
            </div>
          )}
        </div>
      )}

      {voraussetzungsNamen.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Voraussetzungen</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {voraussetzungsNamen.map((n) => (
              <span key={n} className="rounded-full bg-slate-100 px-2.5 py-0.5 dark:bg-slate-800">
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Dokumente</div>
        {modul.dokumente.length ? (
          <ul className="space-y-1.5">
            {modul.dokumente.map((d, i) => (
              <li key={i} className="flex items-center justify-between gap-2 text-sm">
                <a href={d.url} target="_blank" rel="noreferrer" className="truncate text-slate-700 hover:underline dark:text-slate-200">
                  📄 {d.name}
                </a>
                <button onClick={() => dokumentEntfernen(i)} className="shrink-0 text-xs text-slate-400 hover:text-red-500">
                  Entfernen
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">Noch keine Skripte/Zusammenfassungen verlinkt.</p>
        )}
        <div className="mt-4 flex flex-wrap items-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          <label className="flex-1 text-sm">
            <span className="mb-1 block text-xs font-medium text-slate-500">Name</span>
            <input
              className={inputClass}
              placeholder="z.B. Skript Kapitel 1"
              value={neuDokName}
              onChange={(e) => setNeuDokName(e.target.value)}
            />
          </label>
          <label className="flex-1 text-sm">
            <span className="mb-1 block text-xs font-medium text-slate-500">Link / Dateipfad</span>
            <input
              className={inputClass}
              placeholder="https://... oder Dateiname"
              value={neuDokUrl}
              onChange={(e) => setNeuDokUrl(e.target.value)}
            />
          </label>
          <button
            onClick={dokumentHinzufuegen}
            className="shrink-0 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            + Verlinken
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Versuchs-Historie</div>
        {modul.versuche.length ? (
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-400">
              <tr>
                <th className="py-1 pr-3">Versuch</th>
                <th className="py-1 pr-3">Datum</th>
                <th className="py-1 pr-3">Note</th>
                <th className="py-1 pr-3">Ergebnis</th>
                <th className="py-1" />
              </tr>
            </thead>
            <tbody>
              {modul.versuche
                .slice()
                .sort((a, b) => a.versuchNr - b.versuchNr)
                .map((v) => (
                  <tr key={v.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="py-2 pr-3">{v.versuchNr}.</td>
                    <td className="py-2 pr-3">{formatiereDatum(v.datum)}</td>
                    <td className="py-2 pr-3">{v.note != null ? v.note.toFixed(1) : '–'}</td>
                    <td className="py-2 pr-3">
                      {v.bestanden == null ? '–' : v.bestanden ? (
                        <span className="text-emerald-600 dark:text-emerald-400">bestanden</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">nicht bestanden</span>
                      )}
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => deleteVersuch(modul.id, v.id)}
                        className="text-xs text-slate-400 hover:text-red-500"
                      >
                        Entfernen
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-slate-400">Noch keine Versuche erfasst.</p>
        )}

        <div className="mt-4 flex flex-wrap items-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <label className="text-sm">
            <span className="mb-1 block text-xs font-medium text-slate-500">Datum</span>
            <input type="date" className={inputClass} value={neuDatum} onChange={(e) => setNeuDatum(e.target.value)} />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-xs font-medium text-slate-500">Note</span>
            <input
              type="number"
              min={1}
              max={5}
              step={0.1}
              className={`${inputClass} w-24`}
              value={neuNote}
              onChange={(e) => setNeuNote(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 pb-2 text-sm">
            <input type="checkbox" checked={neuBestanden} onChange={(e) => setNeuBestanden(e.target.checked)} />
            bestanden
          </label>
          <button
            onClick={versuchHinzufuegen}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            + Versuch erfassen
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
