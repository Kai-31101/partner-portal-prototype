import { Building2, Plus, FileDown } from 'lucide-react';
import FilterDropdown from './FilterDropdown';
import DateRangeFilter from './DateRangeFilter';

export default function ExpoDashboard() {
  const expos = [
    { name: 'Agri Export Expo', date: '2026-07-12', booths: '148', sold: '106', status: 'Live', statusColor: 'teal' },
    { name: 'Textile Sourcing Week', date: '2026-08-05', booths: '96', sold: '52', status: 'Await', statusColor: 'amber' },
    { name: 'Packaging Innovation Fair', date: '2026-09-18', booths: '74', sold: '47', status: 'Await', statusColor: 'amber' },
    { name: 'Electronics Trade Forum', date: '2026-10-03', booths: '112', sold: '46', status: 'Archieved', statusColor: 'red' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-lg sticky top-0 z-[100]">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Expo Programs / Dashboard
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Expo Program Dashboard
          </h1>
        </div>
        <div className="flex gap-3 justify-between">
          <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2">
            <Plus size={18} />
            New Turnkey Request
          </button>
          <div className="flex gap-3">
            <DateRangeFilter />
            <FilterDropdown
              label="Export"
              icon={<FileDown size={18} />}
              options={[
                { value: 'csv', label: 'Export as CSV' },
                { value: 'excel', label: 'Export as Excel' },
                { value: 'pdf', label: 'Export as PDF' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Expo Program List</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            View Expo programs connected to this Partner and open the right management screen for each Expo.
          </p>

          {/* Table */}
          <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.55fr_0.55fr_0.7fr_0.65fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
              <span>Expo Program</span>
              <span>Date</span>
              <span>Booth</span>
              <span>Sold</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {expos.map((expo, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.2fr_0.7fr_0.55fr_0.55fr_0.7fr_0.65fr] gap-4 px-6 py-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-200 cursor-pointer"
              >
                <strong className="text-gray-900">{expo.name}</strong>
                <span className="text-gray-900">{expo.date}</span>
                <span className="text-gray-900">{expo.booths}</span>
                <span className="text-gray-900">{expo.sold}</span>
                <span>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${
                      expo.statusColor === 'teal'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : expo.statusColor === 'amber'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {expo.status}
                  </span>
                </span>
                <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  View Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
