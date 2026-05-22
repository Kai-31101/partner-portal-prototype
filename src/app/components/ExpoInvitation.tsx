import { Mail, Link2, Send, MoreVertical } from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';

export default function ExpoInvitation() {
  const inviteCodes = [
    { expo: 'Agri Export Expo', code: 'AGRI-PARTNER-26', attribution: 'Vietnam Export Alliance' },
    { expo: 'Textile Sourcing Week', code: 'TEXTILE-VXA-26', attribution: 'Vietnam Export Alliance' },
  ];

  const enterprises = [
    { name: 'Mekong Agri Export', status: 'Joined', statusColor: 'teal', expiry: '2026-07-02', action: 'View' },
    { name: 'Saigon Textile Hub', status: 'Sent', statusColor: 'amber', expiry: '2026-07-08', action: 'Resend' },
    { name: 'Danang Packaging Co', status: 'Draft', statusColor: 'amber', expiry: 'Not sent', action: 'Send' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-lg sticky top-0 z-[100]">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Expo Programs / Invitation
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Expo Invitation
          </h1>
        </div>
        <div className="flex gap-3 justify-end">
          <DateRangeFilter />
          <button className="px-6 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <Link2 size={18} />
            Copy Invite Link
          </button>
          <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2">
            <Send size={18} />
            Send Invitation
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <Mail size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Invite Code and Enterprise Invitations</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            Invite enterprises to the Arobid-created Expo by code or link. Each invitation keeps Partner attribution for invite performance and downstream activation tracking.
          </p>

          {/* Invite Code Table */}
          <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg mb-8">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_0.6fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
              <span>Expo</span>
              <span>Invite Code / Link</span>
              <span>Attribution</span>
              <span>Action</span>
            </div>
            {inviteCodes.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.2fr_1fr_1fr_0.6fr] gap-4 px-6 py-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200"
              >
                <strong className="text-gray-900">{item.expo}</strong>
                <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg inline-block text-gray-800">
                  {item.code}
                </span>
                <span className="text-gray-700">{item.attribution}</span>
                <div className="relative group">
                  <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    Actions
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Invitations Table */}
          <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg">
            <div className="grid grid-cols-[1.5fr_0.7fr_0.8fr_0.6fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
              <span>Enterprise</span>
              <span>Status</span>
              <span>Expiry</span>
              <span>Action</span>
            </div>
            {enterprises.map((enterprise, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.5fr_0.7fr_0.8fr_0.6fr] gap-4 px-6 py-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200 cursor-pointer"
              >
                <strong className="text-gray-900">{enterprise.name}</strong>
                <span>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${
                      enterprise.statusColor === 'teal'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {enterprise.status}
                  </span>
                </span>
                <span className="text-gray-700">{enterprise.expiry}</span>
                <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  {enterprise.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
