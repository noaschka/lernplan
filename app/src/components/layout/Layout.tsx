import { NavLink, Outlet } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const NAV_ITEMS = [
  { to: '/', label: 'Übersicht', end: true },
  { to: '/semester', label: 'Semester' },
  { to: '/module', label: 'Module' },
  { to: '/offene-module', label: 'Offene Module' },
  { to: '/noten', label: 'ECTS/Noten' },
  { to: '/wochenplan', label: 'Wochenplan' },
  { to: '/wiederholungen', label: 'Wiederholungen' },
  { to: '/einstellungen', label: 'Einstellungen' },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
      : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800',
  ].join(' ');
}

export default function Layout() {
  const studiengang = useStore((s) => s.settings.studiengang);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 lg:flex">
      <aside className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-3 lg:py-6">
        <div className="mb-4 px-1 lg:mb-6">
          <div className="text-lg font-extrabold">Studium-Tracker</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{studiengang}</div>
        </div>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              <span className="whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
