import { useEffect, useState } from 'react';
import { ChevronRight, PanelLeftClose } from 'lucide-react';

interface NavModule {
  title: string;
  badge?: number;
  defaultSubtab?: string;
  placeholder?: boolean;
  subitems?: { id: string; label: string; badge?: number; placeholder?: boolean }[];
}

const navModules: NavModule[] = [
  { title: 'Overview' },
  {
    title: 'Partner Site Management',
    defaultSubtab: 'Site Setting',
    subitems: [
      { id: 'site-setting', label: 'Site Setting' },
      { id: 'enterprise-management', label: 'Enterprise Management' },
      { id: 'invitation', label: 'Invitation' },
    ],
  },
  { title: 'Expo Programs' },
  { title: 'Trade Credit Wallet', placeholder: true },
  {
    title: 'Package Management',
    placeholder: true,
    subitems: [
      { id: 'bundle-creation', label: 'Bundle Creation', placeholder: true },
      { id: 'bundle-pricing', label: 'Bundle Pricing', placeholder: true },
    ],
  },
  {
    title: 'Communication',
    badge: 13,
    defaultSubtab: 'Chat',
    subitems: [
      { id: 'chat', label: 'Chat', badge: 5 },
      { id: 'notification', label: 'Notification', badge: 8 },
    ],
  },
  {
    title: 'Finance and Settlement',
    placeholder: true,
    subitems: [
      { id: 'platform-billing', label: 'Platform Billing', placeholder: true },
      { id: 'payment-management', label: 'Payment Management', placeholder: true },
    ],
  },
  {
    title: 'Data Center',
    subitems: [
      { id: 'enterprise-reports', label: 'Enterprise Reports' },
      { id: 'expo-reports', label: 'Expo Reports' },
      { id: 'trade-reports', label: 'Trade Reports', placeholder: true },
      { id: 'credit-revenue-reports', label: 'Credit & Revenue Reports', placeholder: true },
      { id: 'buyer-lead-reports', label: 'Buyer Lead Reports', placeholder: true },
    ],
  },
];

interface SidebarProps {
  currentModule: string;
  currentSubtab: string;
  onNavigate: (module: string, subtab?: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  isDesktopVisible?: boolean;
  onToggleDesktop?: () => void;
}

export default function Sidebar({
  currentModule,
  currentSubtab,
  onNavigate,
  isMobileOpen = false,
  onCloseMobile,
  isDesktopVisible = true,
  onToggleDesktop,
}: SidebarProps) {
  const [openModules, setOpenModules] = useState<Set<string>>(new Set([currentModule]));

  useEffect(() => {
    if (currentModule) {
      setOpenModules((previous) => new Set(previous).add(currentModule));
    }
  }, [currentModule]);

  const handleModuleClick = (module: NavModule) => {
    if (module.subitems) {
      const newOpen = new Set(openModules);
      if (newOpen.has(module.title)) {
        newOpen.delete(module.title);
      } else {
        newOpen.add(module.title);
        if (module.defaultSubtab) {
          onNavigate(module.title, module.defaultSubtab);
        }
      }
      setOpenModules(newOpen);
    } else {
      setOpenModules(new Set());
      onNavigate(module.title, '');
      onCloseMobile?.();
    }
  };

  const handleSubitemClick = (moduleTitle: string, subitemLabel: string) => {
    onNavigate(moduleTitle, subitemLabel);
    onCloseMobile?.();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex min-h-screen w-[284px] flex-shrink-0 flex-col bg-[#182638] text-gray-100 shadow-xl transition-[transform,margin] duration-200 lg:relative lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isDesktopVisible ? 'lg:ml-0' : 'lg:-ml-[284px]'}`}
    >
      {isDesktopVisible && (
        <button
          className="absolute -right-5 top-5 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#22364D] text-white shadow-lg transition hover:bg-[#2C4664] lg:inline-flex"
          onClick={onToggleDesktop}
          aria-label="Hide sidebar"
          title="Hide sidebar"
        >
          <PanelLeftClose size={18} />
        </button>
      )}
      <div className="flex-1 p-4">
        {/* Brand */}
        <div className="flex items-center gap-3 p-2 pb-5 border-b border-white/10 mb-4">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-extrabold shadow-lg">
            AP
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-white">Partner Portal</div>
            <div className="text-xs text-gray-400 mt-0.5">Peak Outfitters</div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="mb-2">
          <div className="px-2 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Partner portal
          </div>
          <nav className="space-y-1">
            {navModules.map((module, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => handleModuleClick(module)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    openModules.has(module.title) || currentModule === module.title
                      ? 'bg-[#2C4664] text-white shadow-md'
                      : 'text-gray-300 hover:bg-[#22364D] hover:text-white'
                  }`}
                >
                  <div className="flex-1 text-left font-medium min-w-0 flex items-center gap-2">
                    <span className="truncate">{module.title}</span>
                    {module.badge && (
                      <span className="bg-teal-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
                        {module.badge}
                      </span>
                    )}
                  </div>
                  {module.subitems && (
                    <ChevronRight
                      size={14}
                      className={`text-gray-400 transition-transform duration-200 ${
                        openModules.has(module.title) ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Subitems */}
                {module.subitems && openModules.has(module.title) && (
                  <div className="ml-6 mt-1 mb-2 pl-3 border-l-2 border-white/10 space-y-0.5">
                    {module.subitems.map((subitem) => (
                      <button
                        key={subitem.id}
                        onClick={() => handleSubitemClick(module.title, subitem.label)}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-between ${
                          currentModule === module.title && currentSubtab === subitem.label
                            ? 'bg-[#2a3d54] text-white'
                            : 'text-gray-400 hover:bg-[#1a2838] hover:text-white'
                        }`}
                      >
                        <span className="min-w-0 truncate">{subitem.label}</span>
                        {subitem.badge && (
                          <span className="bg-teal-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
                            {subitem.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a2838] hover:bg-[#213145] transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-extrabold">
            AP
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white text-sm truncate">Gordon H.</div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <span>Owner</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
