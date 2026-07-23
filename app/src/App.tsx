import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import SemesterPage from './pages/SemesterPage';
import ModulePage from './pages/ModulePage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import ModulFormPage from './pages/ModulFormPage';
import OffeneModulePage from './pages/OffeneModulePage';
import NotenPage from './pages/NotenPage';
import LernplanPage from './pages/LernplanPage';
import WochenplanPage from './pages/WochenplanPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="semester" element={<SemesterPage />} />
        <Route path="module" element={<ModulePage />} />
        <Route path="module/neu" element={<ModulFormPage />} />
        <Route path="module/:modulId" element={<ModuleDetailPage />} />
        <Route path="module/:modulId/bearbeiten" element={<ModulFormPage />} />
        <Route path="module/:modulId/lernplan" element={<LernplanPage />} />
        <Route path="offene-module" element={<OffeneModulePage />} />
        <Route path="noten" element={<NotenPage />} />
        <Route path="wochenplan" element={<WochenplanPage />} />
        <Route path="einstellungen" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
