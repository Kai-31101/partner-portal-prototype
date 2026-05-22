import { useMemo, useState } from 'react';
import { CheckCircle2, Copy, Link2, Mail, QrCode, Search, Send, Share2, Users, X } from 'lucide-react';

type InvitationType = 'Site Visit Link' | 'Join Partner Site';
type InvitationStatus = 'Accepted' | 'Pending';

const partnerId = 'partner-vxa-01';
const partnerName = 'Vietnam Export Alliance';
const senderEmail = 'Current Arobid no-reply email';

const initialInvitations = [
  { recipient: 'contact@mekongagri.vn', status: 'Accepted' as InvitationStatus },
  { recipient: 'sales@saigontextile.vn', status: 'Pending' as InvitationStatus },
  { recipient: 'info@danangpack.vn', status: 'Pending' as InvitationStatus },
  { recipient: 'hello@huecraft.vn', status: 'Accepted' as InvitationStatus },
];

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Invitation() {
  const [invitationType, setInvitationType] = useState<InvitationType>('Join Partner Site');
  const [recipients, setRecipients] = useState('contact@mekongagri.vn, sales@saigontextile.vn');
  const [shareChannel, setShareChannel] = useState('LinkedIn');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | InvitationStatus>('All');
  const [message, setMessage] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const invitationCode = invitationType === 'Join Partner Site' ? 'join' : 'visit';
  const invitationLink = `https://arobid.site/invite?partnerId=${partnerId}&type=${invitationCode}`;
  const emailTemplate =
    invitationType === 'Join Partner Site'
      ? {
          subject: `You are invited to join ${partnerName}`,
          body: `${partnerName} invited you to start onboarding and join its Partner Site.`,
          cta: 'Join Partner Site',
        }
      : {
          subject: `You are invited to visit ${partnerName}`,
          body: `${partnerName} invited you to visit and explore its Partner Site.`,
          cta: 'Visit Partner Site',
        };
  const shareTitle = invitationType === 'Join Partner Site' ? `Join ${partnerName} on Arobid` : `Visit ${partnerName} on Arobid`;
  const shareMessage =
    invitationType === 'Join Partner Site'
      ? `Start onboarding with ${partnerName} through its Partner Site on Arobid.`
      : `Explore ${partnerName} on Arobid and discover new trade opportunities.`;

  const parsedRecipients = useMemo(
    () =>
      recipients
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    [recipients]
  );

  const invalidRecipients = parsedRecipients.filter((recipient) => !isEmail(recipient));

  const filteredInvitations = initialInvitations.filter((item) => {
    const matchesSearch = !search.trim() || item.recipient.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const copyLink = async () => {
    await navigator.clipboard?.writeText(invitationLink);
    setMessage('Invitation link copied.');
  };

  const sendEmail = () => {
    if (parsedRecipients.length === 0) {
      setMessage('Enter at least one recipient email.');
      return;
    }
    if (invalidRecipients.length > 0) {
      setMessage(`Invalid recipient: ${invalidRecipients.join(', ')}`);
      return;
    }
    setMessage(`Invitation email sent to ${parsedRecipients.length} recipient(s).`);
  };

  const shareInvitation = () => {
    setMessage(`${shareChannel} share flow opened with invitation link and QR code.`);
    setIsShareModalOpen(false);
  };

  const resend = (recipient: string) => {
    setMessage(`Invitation resent to ${recipient}.`);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F5F7FB]">
      <div className="px-8 py-8">
        {message && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800 shadow-sm">
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Partner ID</div>
            <div className="mt-2 font-mono text-lg font-extrabold text-[#0F172A]">{partnerId}</div>
          </div>
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Accepted</div>
            <div className="mt-2 text-3xl font-extrabold text-[#0F172A]">{initialInvitations.filter((item) => item.status === 'Accepted').length}</div>
          </div>
          <div className="rounded-xl border border-[#D7E0EA] bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Pending</div>
            <div className="mt-2 text-3xl font-extrabold text-[#0F172A]">{initialInvitations.filter((item) => item.status === 'Pending').length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_420px]">
          <section className="rounded-2xl border border-[#D7E0EA] bg-white shadow-sm">
            <div className="border-b border-[#E2E8F0] px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Create invitation</h2>
                  <p className="mt-1 text-sm text-[#64748B]">Generate a Partner-attributed link, then send by email or share externally.</p>
                </div>
                <div className="inline-flex rounded-xl border border-[#D7E0EA] bg-[#F8FAFC] p-1">
                  {(['Site Visit Link', 'Join Partner Site'] as InvitationType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setInvitationType(type)}
                      className={`h-10 rounded-lg px-4 text-sm font-bold transition ${
                        invitationType === type ? 'bg-[#07847B] text-white shadow-sm' : 'text-[#475569] hover:bg-white hover:text-[#0F172A]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <div className="rounded-xl border border-[#D7E0EA] bg-[#F8FAFC] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                    <Link2 size={17} className="text-[#07847B]" />
                    Invitation link
                  </div>
                  <div className="rounded-lg border border-[#D7E0EA] bg-white px-3 py-3 font-mono text-sm text-blue-700">
                    {invitationLink}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button onClick={copyLink} className="inline-flex h-10 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-700 hover:bg-blue-100">
                      <Copy size={15} />
                      Copy link
                    </button>
                    <button onClick={() => setIsShareModalOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 text-sm font-semibold text-violet-700 hover:bg-violet-100">
                      <Share2 size={15} />
                      Share
                    </button>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#64748B]">Recipient emails</span>
                  <textarea
                    value={recipients}
                    onChange={(event) => setRecipients(event.target.value)}
                    rows={4}
                    placeholder="Paste emails separated by comma"
                    className="w-full rounded-xl border border-[#C9D6E2] bg-white px-4 py-3 text-sm font-medium text-[#0F172A] outline-none transition focus:border-[#07847B] focus:ring-4 focus:ring-teal-100"
                  />
                  <div className="mt-2 flex items-center justify-between gap-3 text-xs font-semibold">
                    <span className={invalidRecipients.length > 0 ? 'text-red-600' : 'text-[#64748B]'}>
                      {parsedRecipients.length} recipient(s){invalidRecipients.length > 0 ? `, ${invalidRecipients.length} invalid` : ''}
                    </span>
                  </div>
                </label>

                <div className="rounded-xl border border-[#D7E0EA] bg-white p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                    <Mail size={17} className="text-[#07847B]" />
                    Email preview
                  </div>
                  <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-[#64748B]">From</div>
                    <div className="mt-1 text-sm font-bold text-[#0F172A]">{senderEmail}</div>
                    <div className="mt-3 text-xs font-bold uppercase tracking-wide text-[#64748B]">Subject</div>
                    <div className="mt-1 text-sm font-bold text-[#0F172A]">{emailTemplate.subject}</div>
                    <p className="mt-3 text-sm leading-6 text-[#475569]">{emailTemplate.body}</p>
                    <button className="mt-4 rounded-lg bg-[#07847B] px-4 py-2 text-sm font-bold text-white">{emailTemplate.cta}</button>
                  </div>
                </div>

                <button onClick={sendEmail} className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#07847B] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066F68]">
                  <Send size={16} />
                  Send invitation email
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#D7E0EA] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Users size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Invitation rules</h2>
                <p className="text-sm text-[#64748B]">Current prototype behavior follows the Partner invitation ticket.</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-[#475569]">
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <strong className="block text-[#0F172A]">Site Visit Link</strong>
                Directs the recipient to the Partner Site.
              </div>
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <strong className="block text-[#0F172A]">Join Partner Site</strong>
                Directs the recipient to the onboarding flow on the Partner Site.
              </div>
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <strong className="block text-[#0F172A]">Tracking</strong>
                The generated invitation URL includes Partner ID for attribution.
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-[#D7E0EA] bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Manage Invitation</h2>
              <p className="text-sm text-[#64748B]">Track accepted and pending invitations. Pending rows can be resent.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[260px_150px]">
              <label className="relative block">
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search recipient"
                  className="h-10 w-full rounded-lg border border-[#C9D6E2] bg-white pl-9 pr-3 text-sm font-medium text-[#0F172A]"
                />
              </label>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'All' | InvitationStatus)} className="h-10 rounded-lg border border-[#C9D6E2] bg-white px-3 text-sm font-medium text-[#0F172A]">
                <option>All</option>
                <option>Accepted</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#D7E0EA]">
            <div className="grid grid-cols-[1fr_0.45fr_0.35fr] gap-4 border-b border-[#D7E0EA] bg-[#EEF3F8] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#334155]">
              <span>Recipient</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>
            {filteredInvitations.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm font-semibold text-[#64748B]">No invitation found for the current criteria.</div>
            ) : (
              filteredInvitations.map((item) => (
                <div key={item.recipient} className="grid grid-cols-[1fr_0.45fr_0.35fr] items-center gap-4 border-b border-[#E2E8F0] px-5 py-4 text-sm last:border-b-0">
                  <strong className="text-[#0F172A]">{item.recipient}</strong>
                  <span>
                    <span className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-bold ${item.status === 'Accepted' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                      {item.status}
                    </span>
                  </span>
                  <div className="text-right">
                    {item.status === 'Pending' ? (
                      <button onClick={() => resend(item.recipient)} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                        Resend
                      </button>
                    ) : (
                      <span className="text-sm font-semibold text-[#94A3B8]">-</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
          <div className="w-full max-w-[380px] rounded-2xl border border-[#D7E0EA] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[#0F172A]">Share card</div>
                <div className="text-xs text-[#64748B]">Link and QR code</div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF3F8] text-[#0F172A] hover:bg-[#E2E8F0]"
                aria-label="Close share modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-[#C9D6E2] bg-[#F8FAFC] text-[#0F172A]">
              <QrCode size={96} />
            </div>
            <div className="mt-4 rounded-lg bg-[#F8FAFC] p-3">
              <div className="text-sm font-bold text-[#0F172A]">{shareTitle}</div>
              <p className="mt-2 text-sm leading-5 text-[#64748B]">{shareMessage}</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {['Facebook', 'LinkedIn', 'Instagram'].map((channel) => (
                <button
                  key={channel}
                  onClick={() => setShareChannel(channel)}
                  className={`h-10 rounded-lg border text-xs font-bold transition ${
                    shareChannel === channel ? 'border-violet-400 bg-violet-50 text-violet-700' : 'border-[#D7E0EA] bg-white text-[#475569] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
            <button
              onClick={shareInvitation}
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800"
            >
              <Share2 size={16} />
              Share to {shareChannel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
