import { useMemo, useState } from 'react';
import { Download, Filter, Search, Table2 } from 'lucide-react';

type ReportType = 'enterprise' | 'expo';

interface DataCenterReportsProps {
  reportType: ReportType;
}

const enterpriseRows = [
  { enterpriseName: 'Mekong Agri Export JSC', joinStatus: 'Joined', activeStatus: 'Active', joinedDate: '2026-05-20' },
  { enterpriseName: 'Saigon Textile Hub', joinStatus: 'Invited', activeStatus: 'Active', joinedDate: '-' },
  { enterpriseName: 'An Phu Packaging Co., Ltd.', joinStatus: 'Joined', activeStatus: 'Inactive', joinedDate: '2026-05-12' },
  { enterpriseName: 'Central Electronics Trading', joinStatus: 'Removed', activeStatus: 'Inactive', joinedDate: '2026-04-28' },
  { enterpriseName: 'Viet Rice Cooperative', joinStatus: 'Joined', activeStatus: 'Active', joinedDate: '2026-05-18' },
];

const expoRows = [
  { expoName: 'Agri Expo 2026', status: 'Live', totalBooth: 148, soldBooth: 106 },
  { expoName: 'Textile Week', status: 'Await', totalBooth: 96, soldBooth: 52 },
  { expoName: 'Packaging Expo', status: 'Live', totalBooth: 74, soldBooth: 47 },
  { expoName: 'Electronics Fair', status: 'Archieved', totalBooth: 112, soldBooth: 46 },
];

function StatusBadge({ value }: { value: string }) {
  const className =
    value === 'Active' || value === 'Joined' || value === 'Live'
      ? 'bg-teal-50 text-teal-700 border-teal-200'
      : value === 'Invited' || value === 'Await'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : value === 'Removed' || value === 'Archieved'
          ? 'bg-gray-100 text-gray-700 border-gray-200'
          : 'bg-red-50 text-red-700 border-red-200';

  return (
    <span className={`inline-flex min-h-6 items-center rounded-full border px-3 text-xs font-bold ${className}`}>
      {value}
    </span>
  );
}

function downloadCsv(filename: string, headers: string[], rows: Array<Array<string | number>>) {
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function DataCenterReports({ reportType }: DataCenterReportsProps) {
  const [search, setSearch] = useState('');
  const [joinStatus, setJoinStatus] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [expoStatus, setExpoStatus] = useState('All');

  const isEnterprise = reportType === 'enterprise';
  const title = isEnterprise ? 'Enterprise Reports' : 'Expo Reports';
  const subtitle = isEnterprise
    ? 'Review and export enterprises linked to the Partner Site.'
    : 'Review and export Expo booth status and sold/unsold booth counts.';

  const filteredEnterpriseRows = useMemo(() => {
    return enterpriseRows.filter((row) => {
      const matchesSearch = !search || row.enterpriseName.toLowerCase().includes(search.toLowerCase());
      const matchesJoin = joinStatus === 'All' || row.joinStatus === joinStatus;
      const matchesActive = activeStatus === 'All' || row.activeStatus === activeStatus;
      return matchesSearch && matchesJoin && matchesActive;
    });
  }, [activeStatus, joinStatus, search]);

  const filteredExpoRows = useMemo(() => {
    return expoRows.filter((row) => {
      const matchesSearch = !search || row.expoName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = expoStatus === 'All' || row.status === expoStatus;
      return matchesSearch && matchesStatus;
    });
  }, [expoStatus, search]);

  const resetFilters = () => {
    setSearch('');
    setJoinStatus('All');
    setActiveStatus('All');
    setExpoStatus('All');
  };

  const handleDownload = () => {
    if (isEnterprise) {
      downloadCsv(
        'enterprise-reports.csv',
        ['Enterprise Name', 'Join Status', 'Active Status', 'Joined Date'],
        filteredEnterpriseRows.map((row) => [row.enterpriseName, row.joinStatus, row.activeStatus, row.joinedDate])
      );
      return;
    }

    downloadCsv(
      'expo-reports.csv',
      ['Expo Name', 'Status', 'Total Booth', 'Sold Booth', 'Unsold Booth'],
      filteredExpoRows.map((row) => [
        row.expoName,
        row.status,
        row.totalBooth,
        row.soldBooth,
        Math.max(0, row.totalBooth - row.soldBooth),
      ])
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="sticky top-0 z-[100] border-b border-gray-200 bg-white px-8 py-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-sm font-medium text-gray-500">Data Center / {title}</div>
            <h1 className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-bold text-transparent">
              {title}
            </h1>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-xl border-2 border-teal-600 bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md"
          >
            <Download size={18} />
            Download Excel
          </button>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="rounded-2xl border border-gray-200/60 bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 shadow-lg">
              <Table2 size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="mt-1 text-gray-600">{subtitle}</p>
            </div>
          </div>

          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className={`grid gap-3 ${isEnterprise ? 'grid-cols-[1.4fr_1fr_1fr_auto]' : 'grid-cols-[1.5fr_1fr_auto]'}`}>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">Search</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={isEnterprise ? 'Search enterprise name' : 'Search Expo name'}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 font-medium outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              {isEnterprise ? (
                <>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">Join Status</label>
                    <select
                      value={joinStatus}
                      onChange={(event) => setJoinStatus(event.target.value)}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 font-medium outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    >
                      <option>All</option>
                      <option>Invited</option>
                      <option>Joined</option>
                      <option>Removed</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">Active Status</label>
                    <select
                      value={activeStatus}
                      onChange={(event) => setActiveStatus(event.target.value)}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 font-medium outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    >
                      <option>All</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </>
              ) : (
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">Status</label>
                  <select
                    value={expoStatus}
                    onChange={(event) => setExpoStatus(event.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 font-medium outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                  >
                    <option>All</option>
                    <option>Live</option>
                    <option>Await</option>
                    <option>Archieved</option>
                  </select>
                </div>
              )}

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="flex h-11 items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                >
                  <Filter size={17} />
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-[520px] overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            {isEnterprise ? (
              <table className="w-full min-w-[760px] table-fixed border-collapse">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-600">Enterprise Name</th>
                    <th className="w-40 border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-600">Join Status</th>
                    <th className="w-40 border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-600">Active Status</th>
                    <th className="w-44 border-b border-gray-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-600">Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnterpriseRows.map((row) => (
                    <tr key={row.enterpriseName} className="hover:bg-teal-50/20">
                      <td className="border-b border-r border-gray-200 px-4 py-4 font-semibold text-gray-900">{row.enterpriseName}</td>
                      <td className="border-b border-r border-gray-200 px-4 py-4"><StatusBadge value={row.joinStatus} /></td>
                      <td className="border-b border-r border-gray-200 px-4 py-4"><StatusBadge value={row.activeStatus} /></td>
                      <td className="border-b border-gray-200 px-4 py-4 text-gray-700">{row.joinedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full min-w-[760px] table-fixed border-collapse">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-600">Expo Name</th>
                    <th className="w-40 border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-600">Status</th>
                    <th className="w-36 border-b border-r border-gray-200 px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-gray-600">Total Booth</th>
                    <th className="w-36 border-b border-r border-gray-200 px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-gray-600">Sold Booth</th>
                    <th className="w-36 border-b border-gray-200 px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-gray-600">Unsold Booth</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpoRows.map((row) => (
                    <tr key={row.expoName} className="hover:bg-teal-50/20">
                      <td className="border-b border-r border-gray-200 px-4 py-4 font-semibold text-gray-900">{row.expoName}</td>
                      <td className="border-b border-r border-gray-200 px-4 py-4"><StatusBadge value={row.status} /></td>
                      <td className="border-b border-r border-gray-200 px-4 py-4 text-right font-bold text-gray-900">{row.totalBooth}</td>
                      <td className="border-b border-r border-gray-200 px-4 py-4 text-right font-bold text-gray-900">{row.soldBooth}</td>
                      <td className="border-b border-gray-200 px-4 py-4 text-right font-bold text-gray-900">{Math.max(0, row.totalBooth - row.soldBooth)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {(isEnterprise ? filteredEnterpriseRows.length : filteredExpoRows.length) === 0 && (
              <div className="flex min-h-[260px] items-center justify-center text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">No data found</div>
                  <div className="mt-1 text-sm text-gray-500">Try changing the search or filter.</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Report table is read/export only. Row-level action controls are intentionally not shown.
          </div>
        </div>
      </div>
    </div>
  );
}
