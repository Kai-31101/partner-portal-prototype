import type { CSSProperties } from 'react';
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  BarChart3,
  Zap
} from 'lucide-react';

interface OverviewDashboardProps {
  onNavigate?: (module: string, subtab?: string) => void;
}

const operationMetrics = [
  {
    label: 'Views',
    value: '12,480',
    hint: 'Open Enterprise Management',
    target: ['Partner Site Management', 'Enterprise Management'],
  },
  {
    label: 'Likes',
    value: '946',
    hint: 'Open Enterprise Management',
    target: ['Partner Site Management', 'Enterprise Management'],
  },
  {
    label: 'Activated Enterprises',
    value: '1,284',
    hint: 'Open Enterprise Management',
    target: ['Partner Site Management', 'Enterprise Management'],
  },
  {
    label: 'Sold Booths',
    value: '472',
    hint: 'Open Expo Program Dashboard',
    target: ['Expo Programs', 'Dashboard'],
  },
  {
    label: 'TradeCredits Balance',
    value: '18.4K',
    hint: 'Open Trade Credit Wallet',
    target: ['Trade Credit Wallet', ''],
  },
  {
    label: 'RFQs',
    value: '396',
    hint: 'Open Enterprise Management',
    target: ['Partner Site Management', 'Enterprise Management'],
  },
  {
    label: 'Deal Contexts',
    value: '124',
    hint: 'Display only - click direction not defined yet',
    target: null,
  },
  {
    label: 'Revenue',
    value: '$128K',
    hint: 'Display only - auto-converted into selected currency',
    target: null,
  },
];

const activationFunnelStages = [
  {
    label: 'Invited enterprises',
    value: '1,820',
    width: '76px',
    target: ['Partner Site Management', 'Invitation'],
  },
  {
    label: 'Verified enterprises',
    value: '1,430',
    width: '64px',
    target: ['Partner Site Management', 'Enterprise Management'],
  },
  {
    label: 'Profile completed enterprises > 80%',
    value: '1,160',
    width: '52px',
    target: ['Partner Site Management', 'Enterprise Management'],
  },
  {
    label: 'Expo activated enterprises',
    value: '884',
    width: '42px',
    target: ['Expo Programs', 'Dashboard'],
  },
];

const alertItems = [
  {
    label: 'Booth inventory high',
    value: 'true',
    description: 'Trigger: booth unsold ratio > 50%',
    icon: 'alert',
    target: ['Expo Programs', 'Dashboard'],
  },
  {
    label: 'Dormant enterprises',
    value: '18',
    description: 'Members with no action or response after invitation',
    icon: 'clock',
    target: ['Partner Site Management', 'Enterprise Management'],
  },
  {
    label: 'Total TradeCredit expiry',
    value: '6',
    description: 'TradeCredits with expiry date < 30 days',
    icon: 'alert',
    target: ['Trade Credit Wallet', ''],
  },
];

const boothSoldVsUnsoldRows = [
  { expo: 'Agri Expo', soldPercent: 72, unsoldPercent: 28, createdDate: '2026-05-01' },
  { expo: 'Textile Week', soldPercent: 54, unsoldPercent: 46, createdDate: '2026-05-03' },
  { expo: 'Packaging', soldPercent: 63, unsoldPercent: 37, createdDate: '2026-05-08' },
  { expo: 'Electronics', soldPercent: 41, unsoldPercent: 59, createdDate: '2026-05-12' },
];

const boothSoldVsUnsoldRowsByCreatedDate = [...boothSoldVsUnsoldRows].sort(
  (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
);

const expoInventoryRows = [
  { expo: 'Agri Expo', totalBooth: 148, sold: 106, createdDate: '2026-05-01' },
  { expo: 'Textile Week', totalBooth: 96, sold: 52, createdDate: '2026-05-03' },
  { expo: 'Packaging', totalBooth: 74, sold: 47, createdDate: '2026-05-08' },
  { expo: 'Electronics', totalBooth: 112, sold: 46, createdDate: '2026-05-12' },
  { expo: 'Furniture', totalBooth: 58, sold: 21, createdDate: '2026-05-16' },
];

const expoInventoryRowsByCreatedDate = [...expoInventoryRows].sort(
  (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
);

const purchasedBoothTrendMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const tradeCreditRows = [
  { status: 'Allocated', value: 18400, barPercent: 100, tone: 'teal' },
  { status: 'Used', value: 7200, barPercent: 39, tone: 'teal' },
  { status: 'Expired', value: 600, barPercent: 3, tone: 'amber' },
  { status: 'Balance', value: 10600, barPercent: 58, tone: 'blue' },
];

export default function Dashboard({ onNavigate }: OverviewDashboardProps) {
  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Overview Screen */}
      <section>
        {/* Operations Summary Section */}
        <div className="px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-lg">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Operations Summary</h2>
              </div>
              <div className="text-gray-600 ml-14">Partner performance snapshot</div>
            </div>
          </div>

          <div className="overview-card-grid" style={{ '--overview-card-count': 3 } as CSSProperties}>
            {/* Partner Operations Summary Card */}
            <div className="bg-white border border-gray-200/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl">
                    <Users size={20} className="text-teal-700" />
                  </div>
                  <div className="font-bold text-gray-900 text-lg">Partner Operations Summary</div>
                </div>
                <button
                  onClick={() => onNavigate?.('Partner Site Management', 'Enterprise Management')}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group"
                >
                  View members
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              <div className="overview-card-scroll grid grid-cols-2 gap-3 relative z-10">
                {operationMetrics.map((metric, index) => {
                  const isClickable = Boolean(metric.target);
                  const content = (
                    <>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        {index === 0 && <Zap size={12} className="text-teal-600" />}
                        {metric.label}
                      </div>
                      <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                    </>
                  );

                  if (!isClickable) {
                    return (
                      <div
                        key={metric.label}
                        title={metric.hint}
                        className="border border-gray-200/50 rounded-xl bg-gradient-to-br from-gray-50 to-white p-4"
                      >
                        {content}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={metric.label}
                      title={metric.hint}
                      onClick={() => onNavigate?.(metric.target![0], metric.target![1])}
                      className="text-left border border-gray-200/50 rounded-xl bg-gradient-to-br from-gray-50 to-white p-4 hover:shadow-md hover:border-teal-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Partner Activation Funnel Card */}
            <div className="bg-white border border-gray-200/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl">
                    <TrendingUp size={20} className="text-teal-700" />
                  </div>
                  <div className="font-bold text-gray-900 text-lg">Partner Activation Funnel</div>
                </div>
                <button
                  onClick={() => onNavigate?.('Partner Site Management', 'Enterprise Management')}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group"
                >
                  View members
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              <div className="overview-card-scroll border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg">
                <div className="grid grid-cols-[1.15fr_0.9fr_0.65fr] gap-2.5 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  <span>Stage</span>
                  <span>Volume</span>
                  <span className="text-right">Count</span>
                </div>
                {activationFunnelStages.map((stage, index) => (
                  <button
                    key={stage.label}
                    onClick={() => onNavigate?.(stage.target[0], stage.target[1])}
                    className={`grid w-full grid-cols-[1.15fr_0.9fr_0.65fr] gap-2.5 px-4 py-3 text-left font-medium text-gray-700 hover:bg-teal-50/30 transition-all duration-200 group focus:outline-none focus:bg-teal-50/50 ${
                      index < activationFunnelStages.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span>{stage.label}</span>
                    <div className="h-5 bg-teal-600 rounded-lg shadow-sm group-hover:shadow-md transition-shadow" style={{ width: stage.width }}></div>
                    <strong className="text-right text-gray-900">{stage.value}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* Alerts and Suggested Actions Card */}
            <div className="bg-white border border-gray-200/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl">
                    <AlertTriangle size={20} className="text-red-700" />
                  </div>
                  <div className="font-bold text-gray-900 text-lg">Alerts and Suggested Actions</div>
                </div>
                <button
                  onClick={() => onNavigate?.('Expo Programs', 'Dashboard')}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group"
                >
                  Open tasks
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              <div className="overview-card-scroll space-y-3 relative z-10">
                {alertItems.map((alert) => {
                  return (
                    <button
                      key={alert.label}
                      onClick={() => onNavigate?.(alert.target[0], alert.target[1])}
                      className="flex w-full items-start justify-between gap-4 rounded-xl border border-gray-200/70 bg-gradient-to-r from-gray-50 to-white p-4 text-left transition-all hover:border-teal-200 hover:bg-teal-50/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-100"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {alert.icon === 'clock' ? (
                            <Clock size={16} className="text-amber-600 flex-shrink-0" />
                          ) : (
                            <AlertTriangle size={16} className="text-red-600 flex-shrink-0" />
                          )}
                          <strong className="font-semibold text-gray-900">{alert.label}</strong>
                        </div>
                        <div className="text-sm font-bold text-gray-900 ml-6">Value: {alert.value}</div>
                        <div className="text-sm text-gray-600 ml-6">{alert.description}</div>
                      </div>
                      <ArrowUpRight size={16} className="mt-1 flex-shrink-0 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Expo and Inventory Section */}
        <div className="px-8 py-8 bg-gradient-to-br from-white via-teal-50/20 to-white border-t border-gray-200">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-lg">
                  <Building2 size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Expo and Inventory</h2>
              </div>
              <div className="text-gray-600 ml-14">Expo usage and booth capacity</div>
            </div>
          </div>

          <div className="overview-card-grid" style={{ '--overview-card-count': 3 } as CSSProperties}>
            {/* Booth sold vs unsold */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-gray-900">Booth sold vs unsold</div>
                </div>
                <button
                  onClick={() => onNavigate?.('Expo Programs', 'Dashboard')}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Manage booths
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm max-h-64 overflow-y-auto">
                <div className="grid grid-cols-[1.15fr_0.9fr_0.65fr] gap-2.5 px-4 py-3 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide sticky top-0">
                  <span>Expo</span>
                  <span>Sold vs unsold</span>
                  <span className="text-right">Unsold%</span>
                </div>
                {boothSoldVsUnsoldRowsByCreatedDate.map((row, index) => (
                  <button
                    key={row.expo}
                    onClick={() => onNavigate?.('Expo Programs', 'Dashboard')}
                    className={`grid w-full grid-cols-[1.15fr_0.9fr_0.65fr] gap-2.5 px-4 py-3 text-left font-medium text-gray-700 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-blue-50/30 transition-all duration-200 group focus:outline-none focus:bg-teal-50/40 ${
                      index < boothSoldVsUnsoldRowsByCreatedDate.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span>{row.expo}</span>
                    <div className="flex h-5 rounded overflow-hidden">
                      <div className="bg-gradient-to-r from-teal-500 to-teal-600 shadow-sm" style={{ width: `${row.soldPercent}%` }}></div>
                      <div className="bg-gradient-to-r from-gray-200 to-gray-300" style={{ width: `${row.unsoldPercent}%` }}></div>
                    </div>
                    <strong className="text-right text-gray-900">{row.unsoldPercent}%</strong>
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-4 mt-5 pt-4 border-t border-gray-100">
                <span className="flex items-center gap-2 text-xs font-semibold text-teal-700 px-3 py-1.5 bg-teal-50 rounded-lg border border-teal-200">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-teal-600 shadow-sm"></span>
                  Sold
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 px-3 py-1.5 bg-gray-50 rounded-lg">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-gray-400 shadow-sm"></span>
                  Unsold
                </span>
              </div>
            </div>

            {/* Expo inventory board */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-gray-900">Expo inventory board</div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm max-h-64 overflow-y-auto">
                <div className="grid grid-cols-[1.05fr_0.85fr_0.65fr_0.7fr] gap-2.5 px-4 py-3 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide sticky top-0">
                  <span>Expo</span>
                  <span className="text-right">Total Booth</span>
                  <span className="text-right">Sold</span>
                  <span className="text-right">Unsold</span>
                </div>
                {expoInventoryRowsByCreatedDate.map((row, index) => (
                  <div
                    key={row.expo}
                    className={`grid grid-cols-[1.05fr_0.85fr_0.65fr_0.7fr] gap-2.5 px-4 py-3 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-blue-50/30 transition-all duration-200 ${
                      index < expoInventoryRowsByCreatedDate.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span>{row.expo}</span>
                    <strong className="text-right text-gray-900">{row.totalBooth}</strong>
                    <span className="text-right">{row.sold}</span>
                    <span className="text-right">{row.totalBooth - row.sold}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchased booth trend */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-gray-900">Purchased booth trend</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">Monthly sold booths by package tier</div>
                </div>
              </div>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent leading-none">472</div>
                <div className="text-sm font-semibold text-gray-500 mb-1">sold booths</div>
              </div>
              <div className="h-28 relative border-b-2 border-gray-200/50 bg-gradient-to-br from-violet-50/30 via-white to-purple-50/30 rounded-xl p-3 shadow-inner">
                <svg viewBox="0 0 260 100" preserveAspectRatio="none" className="w-full h-full">
                  <line x1="0" y1="82" x2="260" y2="82" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="58" x2="260" y2="58" stroke="#edf2f7" strokeWidth="1" />
                  <line x1="0" y1="34" x2="260" y2="34" stroke="#edf2f7" strokeWidth="1" />
                  <polyline points="0,70 52,60 104,46 156,42 208,28 260,22" fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,78 52,68 104,62 156,50 208,46 260,36" fill="none" stroke="#0f9f8f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,54 52,52 104,44 156,36 208,32 260,26" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  {purchasedBoothTrendMonths.map((month, index) => (
                    <text key={month} x={index * 52} y="98" fill="#667789" fontSize="9">{month}</text>
                  ))}
                </svg>
              </div>
              <div className="flex justify-end gap-4 mt-5 pt-4 border-t border-gray-100">
                <span className="flex items-center gap-2 text-xs font-semibold text-violet-700 px-3 py-1.5 bg-violet-50 rounded-lg border border-violet-200">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-violet-600 shadow-sm"></span>
                  Premium
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold text-teal-700 px-3 py-1.5 bg-teal-50 rounded-lg border border-teal-200">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-teal-600 shadow-sm"></span>
                  Pro
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold text-amber-700 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-500 shadow-sm"></span>
                  Basic
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Activity Section */}
        <div className="px-8 py-8 bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-50">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg shadow-lg">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Trade Activity</h2>
              </div>
              <div className="text-gray-600 ml-14">RFQ and deal movement</div>
            </div>
          </div>

          <div className="overview-card-grid" style={{ '--overview-card-count': 3 } as CSSProperties}>
            {/* Deal Contexts Trend */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-gray-900">Deal Contexts Trend</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">Chat + RFQ + BFM from Partner Site / Expo Entry</div>
                </div>
              </div>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent leading-none">124</div>
                <div className="text-sm font-semibold text-gray-600 mb-1 px-3 py-1 bg-gray-100 rounded-full">Deal Contexts</div>
              </div>
              <div className="h-24 relative border-b-2 border-gray-200/50 bg-gradient-to-br from-violet-50/30 via-white to-purple-50/30 rounded-xl p-3 shadow-inner">
                <svg viewBox="0 0 260 100" preserveAspectRatio="none" className="w-full h-full">
                  <line x1="0" y1="78" x2="260" y2="78" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="52" x2="260" y2="52" stroke="#edf2f7" strokeWidth="1" />
                  <line x1="0" y1="26" x2="260" y2="26" stroke="#edf2f7" strokeWidth="1" />
                  <polyline points="0,82 52,74 104,62 156,48 208,34 260,22" fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="0" y="98" fill="#667789" fontSize="9">Jan</text>
                  <text x="52" y="98" fill="#667789" fontSize="9">Feb</text>
                  <text x="104" y="98" fill="#667789" fontSize="9">Mar</text>
                  <text x="156" y="98" fill="#667789" fontSize="9">Apr</text>
                  <text x="208" y="98" fill="#667789" fontSize="9">May</text>
                  <text x="246" y="98" fill="#667789" fontSize="9">Jun</text>
                </svg>
              </div>
              <div className="flex justify-end gap-4 mt-5 pt-4 border-t border-gray-100">
                <span className="flex items-center gap-2 text-xs font-semibold text-violet-700 px-3 py-1.5 bg-violet-50 rounded-lg border border-violet-200">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-violet-600 shadow-sm"></span>
                  Deal Contexts
                </span>
              </div>
            </div>

            {/* TradeCredits allocated */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-gray-900">TradeCredits allocated</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">Credit status breakdown by Partner</div>
                </div>
              </div>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-none">18.4K</div>
                <div className="text-sm font-semibold text-gray-500 mb-1">allocated credits</div>
              </div>
              <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg backdrop-blur-sm">
                <div className="grid grid-cols-[1fr_0.9fr_0.75fr] gap-2.5 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  <span>Status</span>
                  <span>Volume</span>
                  <span className="text-right">Credits</span>
                </div>
                {tradeCreditRows.map((row, index) => {
                  const barClass =
                    row.tone === 'amber'
                      ? 'from-amber-500 to-amber-600'
                      : row.tone === 'blue'
                        ? 'from-blue-500 to-indigo-600'
                        : 'from-teal-600 to-teal-700';

                  return (
                    <div
                      key={row.status}
                      className={`grid grid-cols-[1fr_0.9fr_0.75fr] gap-2.5 px-4 py-3 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-blue-50/30 transition-all duration-200 ${
                        index < tradeCreditRows.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <span>{row.status}</span>
                      <div className="h-5 bg-gray-100 rounded overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${barClass} shadow-sm`} style={{ width: `${row.barPercent}%` }}></div>
                      </div>
                      <strong className="text-right text-gray-900">{row.value.toLocaleString()}</strong>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RFQ Received */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-gray-900">RFQ Received</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">Partner-member RFQs by month</div>
                </div>
              </div>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none">396</div>
                <div className="text-sm font-semibold text-gray-500 mb-1">received RFQs</div>
              </div>
              <div className="h-28 relative border-b-2 border-gray-200/50 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30 rounded-xl p-3 shadow-inner">
                <svg viewBox="0 0 260 100" preserveAspectRatio="none" className="w-full h-full">
                  <line x1="0" y1="78" x2="260" y2="78" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="52" x2="260" y2="52" stroke="#edf2f7" strokeWidth="1" />
                  <line x1="0" y1="26" x2="260" y2="26" stroke="#edf2f7" strokeWidth="1" />
                  <polyline points="0,76 52,70 104,58 156,46 208,32 260,18" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="0" y="98" fill="#667789" fontSize="9">Jan</text>
                  <text x="52" y="98" fill="#667789" fontSize="9">Feb</text>
                  <text x="104" y="98" fill="#667789" fontSize="9">Mar</text>
                  <text x="156" y="98" fill="#667789" fontSize="9">Apr</text>
                  <text x="208" y="98" fill="#667789" fontSize="9">May</text>
                  <text x="246" y="98" fill="#667789" fontSize="9">Jun</text>
                </svg>
              </div>
              <div className="flex justify-end gap-4 mt-5 pt-4 border-t border-gray-100">
                <span className="flex items-center gap-2 text-xs font-semibold text-blue-700 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-600 shadow-sm"></span>
                  RFQ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue and Bundles Section */}
        <div className="px-8 py-8 bg-gradient-to-br from-white via-emerald-50/20 to-white border-t border-gray-200">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-lg">
                  <DollarSign size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Revenue and Bundles</h2>
              </div>
              <div className="text-gray-600 ml-14">Revenue and bundle adoption</div>
            </div>
          </div>

          <div className="overview-card-grid" style={{ '--overview-card-count': 3 } as CSSProperties}>
            {/* Partner revenue */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="font-bold text-gray-900">Partner revenue</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">Placeholder for later build</div>
                </div>
                <span className="text-xs font-bold text-amber-700 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">TBD</span>
              </div>
              <div className="min-h-36 border border-dashed border-gray-300 rounded-xl bg-gray-50/70 p-4 flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-700">Detailed metric design pending</div>
                <div className="text-sm text-gray-500 mt-1">Final calculation, value display, and click direction will be defined in a later ticket.</div>
              </div>
            </div>

            {/* Total Revenue By */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="font-bold text-gray-900">Total Revenue By</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">Placeholder for later build</div>
                </div>
                <span className="text-xs font-bold text-amber-700 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">TBD</span>
              </div>
              <div className="min-h-36 border border-dashed border-gray-300 rounded-xl bg-gray-50/70 p-4 flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-700">Detailed breakdown pending</div>
                <div className="text-sm text-gray-500 mt-1">Revenue grouping dimensions, formulas, and interaction rules are not defined yet.</div>
              </div>
            </div>

            {/* Bundle adoption */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="font-bold text-gray-900">Bundle adoption</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">Placeholder for later build</div>
                </div>
                <span className="text-xs font-bold text-amber-700 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">TBD</span>
              </div>
              <div className="min-h-36 border border-dashed border-gray-300 rounded-xl bg-gray-50/70 p-4 flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-700">Detailed adoption logic pending</div>
                <div className="text-sm text-gray-500 mt-1">Final funnel stages, metrics, and click behavior will be defined in a later ticket.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
