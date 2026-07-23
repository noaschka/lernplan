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
} from '../types';
import { defaultState } from '../data/defaultState';

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

  importState: (state: AppState) => void;
  resetState: () => void;
}

type Store = AppState & StoreActions;

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

      importState: (state) => set(() => ({ ...state })),
      resetState: () => set(() => ({ ...defaultState() })),
    }),
    { name: 'studium-tracker-state-v1' },
  ),
);
