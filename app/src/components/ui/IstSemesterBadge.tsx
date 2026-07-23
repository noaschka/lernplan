export default function IstSemesterBadge({ semesterIst }: { semesterIst: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
      title={`Tatsächlich belegt in Semester ${semesterIst}`}
    >
      <span className="text-[10px]">&#8635;</span>
      Sem. {semesterIst}
    </span>
  );
}
