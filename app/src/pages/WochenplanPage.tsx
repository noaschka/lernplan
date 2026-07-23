import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useStore } from '../store/useStore';
import { montagDerWoche, tageDerWoche, wocheVerschieben } from '../utils/dates';
import { inputClass } from '../components/ui/FormField';

function minutenZuText(min: number) {
  if (!min) return '0m';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
}

export default function WochenplanPage() {
  const module = useStore((s) => s.module);
  const wochenplaene = useStore((s) => s.wochenplaene);
  const upsertEintrag = useStore((s) => s.upsertEintrag);
  const deleteEintrag = useStore((s) => s.deleteEintrag);

  const [montag, setMontag] = useState(montagDerWoche());
  const tage = tageDerWoche(montag);
  const woche = wochenplaene.find((w) => w.woche === montag);
  const eintraege = woche?.eintraege ?? [];

  const [form, setForm] = useState<{ tag: string; modulId: string; geplantMin: number; tatsaechlichMin: number }>({
    tag: '',
    modulId: module[0]?.id ?? '',
    geplantMin: 30,
    tatsaechlichMin: 0,
  });

  const sollGesamt = eintraege.reduce((s, e) => s + e.geplantMin, 0);
  const istGesamt = eintraege.reduce((s, e) => s + e.tatsaechlichMin, 0);

  function eintragen(tagIso: string) {
    if (!form.modulId) return;
    upsertEintrag(montag, {
      id: uuid(),
      modulId: form.modulId,
      tag: tagIso,
      geplantMin: form.geplantMin,
      tatsaechlichMin: form.tatsaechlichMin,
    });
    setForm({ ...form, tag: '', geplantMin: 30, tatsaechlichMin: 0 });
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Wochenplan</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Lernzeit-Blöcke mit Soll/Ist-Abgleich.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMontag(wocheVerschieben(montag, -1))}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
          >
            &larr;
          </button>
          <span className="text-sm font-semibold">
            {tage[0].label}&ndash;{tage[6].label}
          </span>
          <button
            onClick={() => setMontag(wocheVerschieben(montag, 1))}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
          >
            &rarr;
          </button>
          <button onClick={() => setMontag(montagDerWoche())} className="ml-1 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white">
            Heute
          </button>
        </div>
        <div className="flex gap-4 text-sm">
          <span>
            <span className="text-slate-400">Soll: </span>
            <strong>{minutenZuText(sollGesamt)}</strong>
          </span>
          <span>
            <span className="text-slate-400">Ist: </span>
            <strong className={istGesamt >= sollGesamt ? 'text-emerald-600 dark:text-emerald-400' : ''}>{minutenZuText(istGesamt)}</strong>
          </span>
        </div>
      </div>

      {!module.length ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
          Lege zuerst Module an, um Lernzeit-Blöcke zu planen.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="grid min-w-[980px] grid-cols-7 divide-x divide-slate-100 dark:divide-slate-800">
            {tage.map((tag) => {
              const tagEintraege = eintraege.filter((e) => e.tag === tag.iso);
              const heute = tag.iso === new Date().toISOString().slice(0, 10);
              const tagSoll = tagEintraege.reduce((s, e) => s + e.geplantMin, 0);
              const tagIst = tagEintraege.reduce((s, e) => s + e.tatsaechlichMin, 0);
              return (
                <div key={tag.iso} className={`flex min-h-[380px] flex-col p-3 ${heute ? 'bg-slate-50 dark:bg-slate-800/40' : ''}`}>
                  <div className="mb-2 border-b border-slate-100 pb-2 dark:border-slate-800">
                    <div className={`text-sm font-bold ${heute ? 'text-slate-900 dark:text-white' : ''}`}>
                      {tag.tagLabel} <span className="font-normal text-slate-400">{tag.label}</span>
                    </div>
                    {tagSoll > 0 && (
                      <div className="mt-0.5 text-[11px] text-slate-400">
                        {minutenZuText(tagIst)} / {minutenZuText(tagSoll)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {tagEintraege.map((e) => {
                      const mod = module.find((m) => m.id === e.modulId);
                      return (
                        <div key={e.id} className="rounded-lg bg-slate-50 px-2 py-1.5 text-xs dark:bg-slate-800/60">
                          <div className="truncate font-medium">{mod?.name ?? '–'}</div>
                          <div className="mt-0.5 flex items-center justify-between text-slate-400">
                            <span>
                              {minutenZuText(e.tatsaechlichMin)}/{minutenZuText(e.geplantMin)}
                            </span>
                            <span className="flex items-center gap-1">
                              <button
                                onClick={() => upsertEintrag(montag, { ...e, tatsaechlichMin: e.tatsaechlichMin + 15 })}
                                className="rounded-full border border-slate-200 px-1.5 text-[10px] hover:border-slate-400 dark:border-slate-700"
                                title="15 Min. Ist-Zeit hinzufügen"
                              >
                                +15m
                              </button>
                              <button onClick={() => deleteEintrag(montag, e.id)} className="px-0.5 hover:text-red-500">
                                &times;
                              </button>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 space-y-1.5 border-t border-slate-100 pt-2 dark:border-slate-800">
                    <select
                      className={`${inputClass} !py-1 text-xs`}
                      value={form.modulId}
                      onChange={(e) => setForm({ ...form, modulId: e.target.value })}
                    >
                      {module.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.kuerzel || m.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={0}
                        step={5}
                        title="Geplant (Min.)"
                        className={`${inputClass} !py-1 text-xs`}
                        value={form.geplantMin}
                        onChange={(e) => setForm({ ...form, geplantMin: Number(e.target.value) })}
                      />
                      <button
                        onClick={() => eintragen(tag.iso)}
                        className="shrink-0 rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
