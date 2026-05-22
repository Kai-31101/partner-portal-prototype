import { useState } from 'react';
import { Bell, CheckCircle2, X } from 'lucide-react';

const notifications = [
  {
    type: 'Member Join',
    title: 'Mekong Agri Export joined your Partner Site.',
    preview: 'The member is now active in your Partner network.',
    detail: 'Mekong Agri Export completed the Partner Site join flow and is now visible in the Partner Site member list.',
    time: '5 min ago',
    unread: true,
  },
  {
    type: 'Profile',
    title: 'Saigon Textile Hub completed more than 80% of profile.',
    preview: 'The member profile is now ready for stronger visibility and participation.',
    detail: 'Saigon Textile Hub passed the configured profile completion threshold and can be reviewed from Enterprise Management.',
    time: '18 min ago',
    unread: true,
  },
  {
    type: 'Booth Sold',
    title: 'Booth sold successfully.',
    preview: 'A booth sale was recorded for your Expo program.',
    detail: 'A booth was sold in Agri Expo. Review Expo Programs for booth inventory and sold booth trend.',
    time: '1 hour ago',
    unread: true,
  },
  {
    type: 'RFQ Created',
    title: 'Danang Packaging Co created a new RFQ.',
    preview: 'A member created a new RFQ from your Partner ecosystem.',
    detail: 'Danang Packaging Co created an RFQ from a Partner Site or Expo entry touchpoint.',
    time: 'Today, 09:24',
    unread: false,
  },
  {
    type: 'RFQ Received',
    title: 'Hue Handicraft Group received a new RFQ from Partner Site.',
    preview: 'A Partner Site lead generated a new RFQ for the member.',
    detail: 'Hue Handicraft Group received an RFQ attributed to the current Partner Site.',
    time: 'Yesterday',
    unread: false,
  },
];

export default function CommunicationNotification() {
  const [selectedNotification, setSelectedNotification] = useState<(typeof notifications)[number] | null>(null);
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <div className="flex-1 overflow-auto bg-[#F5F7FB]">
      <div className="px-8 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <Bell size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]">Notification List</h2>
              <p className="text-sm text-[#64748B]">Same User Workspace notification pattern with Partner-specific events.</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#C9D6E2] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A]">
            <CheckCircle2 size={16} />
            Mark All Read
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Unread Notification</div>
            <div className="mt-2 text-3xl font-bold text-[#0F172A]">{unreadCount}</div>
          </div>
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Member Activity</div>
            <div className="mt-2 text-3xl font-bold text-[#0F172A]">2</div>
          </div>
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Expo Activity</div>
            <div className="mt-2 text-3xl font-bold text-[#0F172A]">1</div>
          </div>
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">RFQ Activity</div>
            <div className="mt-2 text-3xl font-bold text-[#0F172A]">2</div>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <button
              key={notification.title}
              onClick={() => setSelectedNotification(notification)}
              className="w-full rounded-xl border border-[#D7E0EA] bg-white p-5 text-left shadow-sm transition hover:border-[#B7C6D6] hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                  {notification.type}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#0F172A]">{notification.title}</h3>
                    {notification.unread && <span className="h-2 w-2 rounded-full bg-[#07847B]" />}
                  </div>
                  <p className="mt-1 text-sm text-[#475569]">{notification.preview}</p>
                  <div className="mt-2 text-xs font-medium text-[#64748B]">{notification.time}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-dashed border-[#C9D6E2] bg-white p-4 text-sm text-[#64748B]">
          Product Owner may add more Partner notification events later without changing the reused notification pattern.
        </div>
      </div>

      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                  {selectedNotification.type}
                </span>
                <h3 className="mt-3 text-xl font-bold text-[#0F172A]">{selectedNotification.title}</h3>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="rounded-lg border border-[#D7E0EA] p-2 text-[#0F172A] hover:bg-[#F8FAFC]"
                aria-label="Close notification detail"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm leading-6 text-[#475569]">{selectedNotification.detail}</p>
            <div className="mt-5 text-xs font-semibold text-[#64748B]">{selectedNotification.time}</div>
          </div>
        </div>
      )}
    </div>
  );
}
