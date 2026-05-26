import { useState } from 'react';
import { Search } from 'lucide-react';

export default function CommunicationChat() {
  const conversations = [
    {
      id: 'agriworld',
      name: 'Agri World Buyer',
      company: 'AgriWorld Imports',
      lastMessage: 'Can you confirm the booth package for Hall A?',
      time: '09:42',
      unread: 2,
      messages: [
        { from: 'Agri World Buyer', text: 'Can you confirm the booth package for Hall A?', time: '09:40' },
        { from: 'Peak Outfitters', text: 'Yes, Hall A package includes the standard booth setup and visitor lead report.', time: '09:42' },
      ],
    },
    {
      id: 'saigon-textile',
      name: 'Saigon Textile Hub',
      company: 'Saigon Textile Hub',
      lastMessage: 'We need support to update company profile.',
      time: 'Yesterday',
      unread: 1,
      messages: [
        { from: 'Saigon Textile Hub', text: 'We need support to update company profile before publishing.', time: 'Yesterday' },
      ],
    },
    {
      id: 'mekong-agri',
      name: 'Mekong Agri Export',
      company: 'Mekong Agri Export',
      lastMessage: 'Please share the settlement confirmation.',
      time: 'Mon',
      unread: 0,
      messages: [
        { from: 'Mekong Agri Export', text: 'Please share the settlement confirmation.', time: 'Mon' },
        { from: 'Peak Outfitters', text: 'The confirmation is being checked by our finance team.', time: 'Mon' },
      ],
    },
  ];
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId);

  return (
    <main className="min-h-[calc(100vh-89px)] bg-white p-3">
      <section className="flex min-h-[calc(100vh-113px)] overflow-hidden rounded-lg border border-[#D7E0EA] bg-white">
        <aside className="flex w-[300px] shrink-0 flex-col border-r border-[#D7E0EA] bg-white px-4 py-5">
          <h2 className="mb-4 text-base font-bold text-[#0F172A]">Deal Room</h2>

          <label className="mb-3 flex h-9 items-center gap-2 rounded-md border border-[#D7E0EA] bg-white px-3 text-sm text-[#94A3B8]">
            <Search size={16} />
            <input
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
              placeholder="Search by name or company..."
              type="search"
            />
          </label>

          <div className="mb-8 grid grid-cols-2 rounded-md bg-[#F4F4F5] p-0.5">
            <button className="h-8 rounded-md bg-[#F56600] text-sm font-semibold text-white shadow-sm" type="button">
              Inbox
            </button>
            <button className="h-8 rounded-md text-sm font-semibold text-[#64748B]" type="button">
              Archived
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`w-full rounded-lg border px-3 py-3 text-left transition ${
                  selectedId === conversation.id
                    ? 'border-[#F56600] bg-[#FFF7ED]'
                    : 'border-transparent hover:border-[#D7E0EA] hover:bg-[#F8FAFC]'
                }`}
                onClick={() => setSelectedId(conversation.id)}
                type="button"
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-[#0F172A]">{conversation.name}</div>
                    <div className="truncate text-xs text-[#64748B]">{conversation.company}</div>
                  </div>
                  <span className="shrink-0 text-xs text-[#94A3B8]">{conversation.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="min-w-0 flex-1 truncate text-sm text-[#64748B]">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#F56600] px-1.5 text-xs font-bold text-white">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="relative min-w-0 flex-1 bg-white">
          {selectedConversation ? (
            <div className="flex h-full min-h-[calc(100vh-113px)] flex-col">
              <div className="border-b border-[#D7E0EA] px-6 py-4">
                <h3 className="text-base font-bold text-[#0F172A]">{selectedConversation.name}</h3>
                <p className="text-sm text-[#64748B]">{selectedConversation.company}</p>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                {selectedConversation.messages.map((message, index) => {
                  const isPartner = message.from === 'Peak Outfitters';
                  return (
                    <div key={`${message.from}-${index}`} className={`flex ${isPartner ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[520px] rounded-xl border px-4 py-3 ${
                          isPartner
                            ? 'border-[#D7E0EA] bg-[#F8FAFC]'
                            : 'border-[#D7E0EA] bg-white'
                        }`}
                      >
                        <div className="mb-1 text-xs font-semibold text-[#64748B]">{message.from}</div>
                        <div className="text-sm leading-5 text-[#0F172A]">{message.text}</div>
                        <div className="mt-2 text-right text-xs text-[#94A3B8]">{message.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-[#D7E0EA] p-4">
                <div className="flex min-h-11 items-center rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] px-4 text-sm text-[#94A3B8]">
                  Message composer placeholder
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-[#64748B]">
              Select a conversation to start chatting.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
