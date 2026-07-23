import type { Dringlichkeit } from '../../utils/dates';

const COLORS: Record<Dringlichkeit, string> = {
  gruen: 'bg-emerald-500',
  gelb: 'bg-amber-500',
  rot: 'bg-red-500',
};

export default function UrgencyDot({ level }: { level: Dringlichkeit }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${COLORS[level]}`} title={level} />;
}
