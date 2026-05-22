import { useMemo, useState } from 'react';
import { ExternalLink, MoreVertical, Search, Users } from 'lucide-react';

type JoinStatus = 'Invited' | 'Joined' | 'Removed';
type ActiveStatus = 'Active' | 'Inactive';

type EnterpriseRow = {
  id: number;
  name: string;
  joinStatus: JoinStatus;
  activeStatus: ActiveStatus;
};

const initialEnterprises: EnterpriseRow[] = [
  { id: 1, name: 'Mekong Agri Export', joinStatus: 'Joined', activeStatus: 'Active' },
  { id: 2, name: 'Saigon Textile Hub', joinStatus: 'Joined', activeStatus: 'Active' },
  { id: 3, name: 'Danang Packaging Co', joinStatus: 'Invited', activeStatus: 'Inactive' },
  { id: 4, name: 'Hue Handicraft Group', joinStatus: 'Joined', activeStatus: 'Active' },
  { id: 5, name: 'Can Tho Rice Cooperative', joinStatus: 'Removed', activeStatus: 'Inactive' },
];

const statusClass = {
  Invited: 'bg-amber-50 text-amber-700 border-amber-200',
  Joined: 'bg-teal-50 text-teal-700 border-teal-200',
  Removed: 'bg-slate-100 text-slate-600 border-slate-200',
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Inactive: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function EnterpriseManagement() {
  const [rows, setRows] = useState(initialEnterprises);
  const [search, setSearch] = useState('');
  const [joinFilter, setJoinFilter] = useState<'All' | JoinStatus>('All');
  const [activeFilter, setActiveFilter] = useState<'All' | ActiveStatus>('All');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const visibleRows = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesSearch = !keyword || row.name.toLowerCase().includes(keyword);
      const matchesJoin = joinFilter === 'All' || row.joinStatus === joinFilter;
      const matchesActive = activeFilter === 'All' || row.activeStatus === activeFilter;
      return matchesSearch && matchesJoin && matchesActive;
    });
  }, [rows, search, joinFilter, activeFilter]);

  const seeDetail = (row: EnterpriseRow) => {
    setOpenMenuId(null);
    setMessage(`Open B2B Marketplace profile for ${row.name}.`);
  };

  const inactivate = (row: EnterpriseRow) => {
    setOpenMenuId(null);
    if (row.activeStatus === 'Inactive') {
      setMessage(`${row.name} is already inactive.`);
      return;
    }

    setRows((current) => current.map((item) => (item.id === row.id ? { ...item, activeStatus: 'Inactive' } : item)));
    setMessage(`${row.name} is inactive on this Partner Site.`);
  };

  const remove = (row: EnterpriseRow) => {
    setOpenMenuId(null);
    setRows((current) =>
      current.map((item) =>
        item.id === row.id ? { ...item, joinStatus: 'Removed', activeStatus: 'Inactive' } : item
      )
    );
    setMessage(`${row.name} removed from this Partner Site.`);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F5F7FB]">
      <div className="px-8 py-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
            <Users size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Partner Site Members</h2>
            <p className="text-sm text-[#64748B]">Search, filter, and manage enterprises linked to this Partner Site.</p>
          </div>
        </div>

        {message && (
          <div className="mb-5 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800">
            {message}
          </div>
        )}

        <div className="mb-5 grid grid-cols-1 gap-3 rounded-xl border border-[#D7E0EA] bg-white p-4 shadow-sm lg:grid-cols-[1fr_180px_180px]">
          <label className="relative block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search enterprise name"
              className="h-11 w-full rounded-lg border border-[#C9D6E2] bg-white pl-10 pr-3 text-sm font-medium text-[#0F172A]"
            />
          </label>
          <select
            value={joinFilter}
            onChange={(event) => setJoinFilter(event.target.value as 'All' | JoinStatus)}
            className="h-11 rounded-lg border border-[#C9D6E2] bg-white px-3 text-sm font-medium text-[#0F172A]"
          >
            <option>All</option>
            <option>Invited</option>
            <option>Joined</option>
            <option>Removed</option>
          </select>
          <select
            value={activeFilter}
            onChange={(event) => setActiveFilter(event.target.value as 'All' | ActiveStatus)}
            className="h-11 rounded-lg border border-[#C9D6E2] bg-white px-3 text-sm font-medium text-[#0F172A]"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#D7E0EA] bg-white shadow-sm">
          <div className="grid grid-cols-[1.35fr_0.6fr_0.6fr_0.55fr] gap-4 border-b border-[#D7E0EA] bg-[#EEF3F8] px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#334155]">
            <span>Enterprise Name</span>
            <span>Join Status</span>
            <span>Active Status</span>
            <span className="text-right">Action</span>
          </div>

          {visibleRows.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm font-semibold text-[#64748B]">
              No enterprise found for the current search or filters.
            </div>
          ) : (
            visibleRows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1.35fr_0.6fr_0.6fr_0.55fr] items-center gap-4 border-b border-[#E2E8F0] px-6 py-4 text-sm last:border-b-0"
              >
                <strong className="text-[#0F172A]">{row.name}</strong>
                <span>
                  <span className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-bold ${statusClass[row.joinStatus]}`}>
                    {row.joinStatus}
                  </span>
                </span>
                <span>
                  <span className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-bold ${statusClass[row.activeStatus]}`}>
                    {row.activeStatus}
                  </span>
                </span>
                <div className="relative flex justify-end">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#C9D6E2] bg-white px-3 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
                  >
                    Action
                    <MoreVertical size={15} />
                  </button>
                  {openMenuId === row.id && (
                    <div className="absolute right-0 top-11 z-10 w-44 rounded-lg border border-[#D7E0EA] bg-white p-2 shadow-lg">
                      <button onClick={() => seeDetail(row)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-[#0F172A] hover:bg-[#F1F5F9]">
                        <ExternalLink size={15} />
                        See Detail
                      </button>
                      <button onClick={() => inactivate(row)} className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[#0F172A] hover:bg-[#F1F5F9]">
                        Inactivate
                      </button>
                      <button onClick={() => remove(row)} className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-rose-700 hover:bg-rose-50">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
