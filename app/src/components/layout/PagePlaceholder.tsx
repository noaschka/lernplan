interface Props {
  titel: string;
  beschreibung: string;
  phase: string;
}

export default function PagePlaceholder({ titel, beschreibung, phase }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold">{titel}</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{beschreibung}</p>
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
        Wird in {phase} umgesetzt.
      </div>
    </div>
  );
}
