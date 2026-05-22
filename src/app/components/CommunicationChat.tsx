import { MessageCircle, Filter, Mail } from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';
import FilterDropdown from './FilterDropdown';

export default function CommunicationChat() {
  const chats = [
    { contact: 'buyer@agriworld.com', source: 'Expo Invitation', message: 'Can you confirm the booth package for Hall A?', unread: 2 },
    { contact: 'sales@saigontextile.vn', source: 'Partner Site Member', message: 'We need support to update company profile.', unread: 1 },
    { contact: 'expo.ops@arobid.com', source: 'Expo Setting', message: 'Banner upload is approved for publishing.', unread: 1 },
    { contact: 'contact@mekongagri.vn', source: 'Trade Credit Wallet', message: 'Please share the settlement confirmation.', unread: 1 },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-lg sticky top-0 z-[100]">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Communication / Chat
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Chat
          </h1>
        </div>
        <div className="flex gap-3 justify-end">
          <DateRangeFilter />
          <FilterDropdown
            label="All Messages"
            icon={<Filter size={18} />}
            options={[
              { value: 'all', label: 'All Messages' },
              { value: 'unread', label: 'Unread Only' },
              { value: 'read', label: 'Read Only' },
              { value: 'awaiting-reply', label: 'Awaiting Reply' },
              { value: 'archived', label: 'Archived' },
            ]}
          />
          <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2">
            <Mail size={18} />
            Open Inbox
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Partner Conversations</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            Regular chat threads use the user email and show where the conversation started, so the user can return to the related workflow quickly.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Unread Chat', value: '5', color: 'from-blue-500 to-indigo-600' },
              { label: 'Open Thread', value: '12', color: 'from-teal-500 to-cyan-600' },
              { label: 'Awaiting Reply', value: '3', color: 'from-amber-500 to-orange-600' },
              { label: 'Today Messages', value: '28', color: 'from-purple-500 to-pink-600' },
            ].map((metric, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{metric.label}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Chat List */}
          <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg">
            <div className="grid grid-cols-[1fr_0.8fr_1.5fr_0.4fr_0.4fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
              <span>Contact</span>
              <span>Started From</span>
              <span>Latest Message</span>
              <span>Unread</span>
              <span>Action</span>
            </div>
            {chats.map((chat, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_0.8fr_1.5fr_0.4fr_0.4fr] gap-4 px-6 py-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200 cursor-pointer"
              >
                <strong className="text-gray-900">{chat.contact}</strong>
                <span className="text-gray-700">{chat.source}</span>
                <span className="text-gray-600">{chat.message}</span>
                <span className="bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[22px] text-center h-6 flex items-center justify-center">
                  {chat.unread}
                </span>
                <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Open Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
