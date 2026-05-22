import { useState } from 'react';
import { Menu, PanelLeftOpen, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import OverviewDashboard from './components/OverviewDashboard';
import SiteSetting from './components/SiteSetting';
import EnterpriseManagement from './components/EnterpriseManagement';
import Invitation from './components/Invitation';
import BannerManagement from './components/BannerManagement';
import ExpoDashboard from './components/ExpoDashboard';
import ExpoSetting from './components/ExpoSetting';
import ExpoInvitation from './components/ExpoInvitation';
import CommunicationChat from './components/CommunicationChat';
import CommunicationNotification from './components/CommunicationNotification';
import PartnerProfile from './components/PartnerProfile';
import RoleManagement from './components/RoleManagement';
import DataCenterReports from './components/DataCenterReports';
import ComingSoon from './components/ComingSoon';

export default function App() {
  const [currentModule, setCurrentModule] = useState('Overview');
  const [currentSubtab, setCurrentSubtab] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleNavigation = (module: string, subtab: string = '') => {
    setCurrentModule(module);
    setCurrentSubtab(subtab);
  };

  const pageContext = currentSubtab ? `${currentModule} / ${currentSubtab}` : `Partner Portal / ${currentModule}`;
  const pageTitle = currentSubtab || currentModule;

  const renderScreen = () => {
    // Overview
    if (currentModule === 'Overview') {
      return <OverviewDashboard onNavigate={handleNavigation} />;
    }

    // Partner Site Management
    if (currentModule === 'Partner Site Management') {
      if (currentSubtab === 'Site Setting') return <SiteSetting />;
      if (currentSubtab === 'Enterprise Management') return <EnterpriseManagement />;
      if (currentSubtab === 'Invitation') return <Invitation />;
      if (currentSubtab === 'Banner Management') return <BannerManagement />;
    }

    // Expo Programs
    if (currentModule === 'Expo Programs') {
      if (currentSubtab === 'Dashboard') return <ExpoDashboard />;
      if (currentSubtab === 'Expo Setting') return <ExpoSetting />;
      if (currentSubtab === 'Invitation') return <ExpoInvitation />;
    }

    // Communication
    if (currentModule === 'Communication') {
      if (currentSubtab === 'Chat') return <CommunicationChat />;
      if (currentSubtab === 'Notification') return <CommunicationNotification />;
    }

    // Data Center
    if (currentModule === 'Data Center') {
      if (currentSubtab === 'Enterprise Reports') return <DataCenterReports reportType="enterprise" />;
      if (currentSubtab === 'Expo Reports') return <DataCenterReports reportType="expo" />;
      return <ComingSoon moduleName={currentModule} subtab={currentSubtab} />;
    }

    // Portal Management
    if (currentModule === 'Portal Management') {
      if (currentSubtab === 'Partner Profile') return <PartnerProfile />;
      if (currentSubtab === 'Role Management') return <RoleManagement />;
    }

    // Other modules - show coming soon
    return <ComingSoon moduleName={currentModule} subtab={currentSubtab} />;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7FB]">
      {isSidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar
        currentModule={currentModule}
        currentSubtab={currentSubtab}
        onNavigate={handleNavigation}
        isMobileOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
        isDesktopVisible={isSidebarVisible}
        onToggleDesktop={() => setIsSidebarVisible((value) => !value)}
      />
      {!isSidebarVisible && (
        <button
          className="fixed left-3 top-4 z-30 hidden h-10 w-10 items-center justify-center rounded-lg border border-[#D7E0EA] bg-white text-[#0F172A] shadow-md transition hover:bg-[#F8FAFC] lg:inline-flex"
          onClick={() => setIsSidebarVisible(true)}
          aria-label="Show sidebar"
          title="Show sidebar"
        >
          <PanelLeftOpen size={20} />
        </button>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-[#D7E0EA] bg-white px-5 py-4 shadow-sm lg:px-8">
          <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <button
                className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D7E0EA] bg-white text-[#0F172A] lg:hidden"
                onClick={() => setIsSidebarOpen((value) => !value)}
                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="min-w-0">
                <div className="mb-1 truncate text-sm font-medium text-[#475569]">{pageContext}</div>
                <h1 className="truncate text-3xl font-bold text-[#0F172A]">{pageTitle}</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <select className="h-10 rounded-lg border border-[#D7E0EA] bg-white px-3 text-sm font-medium text-[#0F172A]">
                <option>English</option>
                <option>Vietnamese</option>
              </select>
              <select className="h-10 rounded-lg border border-[#D7E0EA] bg-white px-3 text-sm font-medium text-[#0F172A]">
                <option>USD</option>
                <option>VND</option>
                <option>EUR</option>
              </select>
              <div className="hidden items-center gap-2 rounded-lg border border-[#D7E0EA] bg-white px-3 py-2 lg:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 text-xs font-extrabold text-white">
                  AP
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-[#0F172A]">Peak Outfitters</div>
                  <div className="text-xs text-[#475569]">Partner profile</div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto min-h-full w-full max-w-[1536px]">{renderScreen()}</div>
        </div>
      </div>
    </div>
  );
}
