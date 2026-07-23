import type { ModulStatus } from '../../types';

const STATUS_STYLES: Record<ModulStatus, string> = {
  offen: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  angemeldet: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  bestanden: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  zweitversuch: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  drittversuch: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
};

export const STATUS_LABELS: Record<ModulStatus, string> = {
  offen: 'Offen',
  angemeldet: 'Angemeldet',
  bestanden: 'Bestanden',
  zweitversuch: 'Zweitversuch',
  drittversuch: 'Drittversuch',
};

export const STATUS_OPTIONS: ModulStatus[] = ['offen', 'angemeldet', 'bestanden', 'zweitversuch', 'drittversuch'];

export default function StatusBadge({ status }: { status: ModulStatus }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
