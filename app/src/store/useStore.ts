import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type {
  AppState,
  Modul,
  Semester,
  Settings,
  Lernplan,
  LernplanThema,
  Wochenplan,
  WochenplanEintrag,
  Versuch,
  StundenplanBlock,
} from '../types';
import { defaultState } from '../data/defaultState';
import { blockDauerMin } from '../utils/stundenplan';

interface StoreActions {
  addModul: (modul: Omit<Modul, 'id' | 'versuche' | 'dokumente'>) => string;
  updateModul: (id: string, patch: Partial<Modul>) => void;
  deleteModul: (id: string) => void;

  addVersuch: (modulId: string, versuch: Omit<Versuch, 'id'>) => void;
  updateVersuch: (modulId: string, versuchId: string, patch: Partial<Versuch>) => void;
  deleteVersuch: (modulId: string, versuchId: string) => void;

  upsertSemester: (semester: Semester) => void;
  deleteSemester: (nummer: number) => void;

  updateSettings: (patch: Partial<Settings>) => void;

  getOrCreateLernplan: (modulId: string) => Lernplan;
  addThema: (modulId: string, titel: string) => void;
  updateThema: (modulId: string, themaId: string, patch: Partial<LernplanThema>) => void;
  deleteThema: (modulId: string, themaId: string) => void;

  getOrCreateWoche: (woche: string) => Wochenplan;
  upsertEintrag: (woche: string, eintrag: WochenplanEintrag) => void;
  deleteEintrag: (woche: string, eintragId: string) => void;

  upsertBlock: (block: StundenplanBlock) => void;
  deleteBlock: (id: string) => void;
  toggleBlockErledigt: (wocheMontagIso: string, block: StundenplanBlock, tagIso: string) => void;

  importState: (state: AppState) => void;
  resetState: () => void;
}

type Store = AppState & StoreActions;

const PERSIST_VERSION = 1;

/** Ergänzt fehlende Felder (stundenplan, settings.abWochen) bei älteren gespeicherten/importierten Ständen, ohne vorhandene Daten anzutasten. */
function backfillState(partial: unknown): AppState {
  const basis = defaultState();
  if (!partial || typeof partial !== 'object') return basis;
  const p = partial as Partial<AppState>;
  return {
    ...basis,
    ...p,
    stundenplan: Array.isArray(p.stundenplan) && p.stundenplan.length ? p.stundenplan : basis.stundenplan,
    settings: {
      ...basis.settings,
      ...p.settings,
      abWochen: { ...basis.settings.abWochen, ...p.settings?.abWochen },
    },
  };
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...defaultState(),

      addModul: (modul) => {
        const id = uuid();
        set((s) => ({
          module: [...s.module, { ...modul, id, versuche: [], dokumente: [] }],
        }));
        return id;
      },
      updateModul: (id, patch) =>
        set((s) => ({
          module: s.module.map((m) => (m.id === id ? { ...m, ...patch } : m)),
        })),
      deleteModul: (id) =>
        set((s) => ({
          module: s.module.filter((m) => m.id !== id),
          lernplaene: s.lernplaene.filter((l) => l.modulId !== id),
        })),

      addVersuch: (modulId, versuch) =>
        set((s) => ({
          module: s.module.map((m) =>
            m.id === modulId
              ? { ...m, versuche: [...m.versuche, { ...versuch, id: uuid() }] }
              : m,
          ),
        })),
      updateVersuch: (modulId, versuchId, patch) =>
        set((s) => ({
          module: s.module.map((m) =>
            m.id === modulId
              ? {
                  ...m,
                  versuche: m.versuche.map((v) => (v.id === versuchId ? { ...v, ...patch } : v)),
                }
              : m,
          ),
        })),
      deleteVersuch: (modulId, versuchId) =>
        set((s) => ({
          module: s.module.map((m) =>
            m.id === modulId ? { ...m, versuche: m.versuche.filter((v) => v.id !== versuchId) } : m,
          ),
        })),

      upsertSemester: (semester) =>
        set((s) => {
          const exists = s.semester.some((x) => x.nummer === semester.nummer);
          return {
            semester: exists
              ? s.semester.map((x) => (x.nummer === semester.nummer ? semester : x))
              : [...s.semester, semester].sort((a, b) => a.nummer - b.nummer),
          };
        }),
      deleteSemester: (nummer) =>
        set((s) => ({ semester: s.semester.filter((x) => x.nummer !== nummer) })),

      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

      getOrCreateLernplan: (modulId) => {
        const existing = get().lernplaene.find((l) => l.modulId === modulId);
        if (existing) return existing;
        const created: Lernplan = { id: uuid(), modulId, themen: [] };
        set((s) => ({ lernplaene: [...s.lernplaene, created] }));
        return created;
      },
      addThema: (modulId, titel) => {
        const plan = get().getOrCreateLernplan(modulId);
        const thema: LernplanThema = {
          id: uuid(),
          titel,
          erledigt: false,
          erledigtAm: null,
          naechsteWiederholung: null,
          wiederholungen: [],
        };
        set((s) => ({
          lernplaene: s.lernplaene.map((l) =>
            l.id === plan.id ? { ...l, themen: [...l.themen, thema] } : l,
          ),
        }));
      },
      updateThema: (modulId, themaId, patch) =>
        set((s) => ({
          lernplaene: s.lernplaene.map((l) =>
            l.modulId === modulId
              ? { ...l, themen: l.themen.map((t) => (t.id === themaId ? { ...t, ...patch } : t)) }
              : l,
          ),
        })),
      deleteThema: (modulId, themaId) =>
        set((s) => ({
          lernplaene: s.lernplaene.map((l) =>
            l.modulId === modulId ? { ...l, themen: l.themen.filter((t) => t.id !== themaId) } : l,
          ),
        })),

      getOrCreateWoche: (woche) => {
        const existing = get().wochenplaene.find((w) => w.woche === woche);
        if (existing) return existing;
        const created: Wochenplan = { woche, eintraege: [] };
        set((s) => ({ wochenplaene: [...s.wochenplaene, created] }));
        return created;
      },
      upsertEintrag: (woche, eintrag) => {
        get().getOrCreateWoche(woche);
        set((s) => ({
          wochenplaene: s.wochenplaene.map((w) => {
            if (w.woche !== woche) return w;
            const exists = w.eintraege.some((e) => e.id === eintrag.id);
            return {
              ...w,
              eintraege: exists
                ? w.eintraege.map((e) => (e.id === eintrag.id ? eintrag : e))
                : [...w.eintraege, eintrag],
            };
          }),
        }));
      },
      deleteEintrag: (woche, eintragId) =>
        set((s) => ({
          wochenplaene: s.wochenplaene.map((w) =>
            w.woche === woche ? { ...w, eintraege: w.eintraege.filter((e) => e.id !== eintragId) } : w,
          ),
        })),

      upsertBlock: (block) =>
        set((s) => {
          const exists = s.stundenplan.some((b) => b.id === block.id);
          return {
            stundenplan: exists
              ? s.stundenplan.map((b) => (b.id === block.id ? block : b))
              : [...s.stundenplan, block],
          };
        }),
      deleteBlock: (id) =>
        set((s) => ({
          stundenplan: s.stundenplan.filter((b) => b.id !== id),
          wochenplaene: s.wochenplaene.map((w) => ({
            ...w,
            eintraege: w.eintraege.filter((e) => e.blockId !== id),
          })),
        })),
      toggleBlockErledigt: (wocheMontagIso, block, tagIso) => {
        get().getOrCreateWoche(wocheMontagIso);
        const woche = get().wochenplaene.find((w) => w.woche === wocheMontagIso);
        const bestehender = woche?.eintraege.find((e) => e.blockId === block.id && e.tag === tagIso);
        if (bestehender) {
          get().deleteEintrag(wocheMontagIso, bestehender.id);
        } else {
          const dauer = blockDauerMin(block);
          get().upsertEintrag(wocheMontagIso, {
            id: uuid(),
            modulId: block.modulId,
            tag: tagIso,
            geplantMin: dauer,
            tatsaechlichMin: dauer,
            blockId: block.id,
          });
        }
      },

      importState: (state) => set(() => backfillState(state)),
      resetState: () => set(() => ({ ...defaultState() })),
    }),
    {
      name: 'studium-tracker-state-v1',
      version: PERSIST_VERSION,
      // zustand only calls `migrate` when the stored blob already has a numeric
      // `version` field - older, never-migrated data has none, so migrate would
      // never run for existing users. `merge` runs on every hydration regardless,
      // so the backfill lives there instead.
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...backfillState({ ...currentState, ...(persistedState as Partial<AppState> | undefined) }),
      }),
    },
  ),
);
