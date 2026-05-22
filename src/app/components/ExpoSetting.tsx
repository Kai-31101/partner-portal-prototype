import { Settings, Upload, Save, Globe } from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';

export default function ExpoSetting() {
  const expos = [
    { name: 'Agri Export Expo', status: 'Live', statusColor: 'teal', booth: '148', sold: '106', price: '$280' },
    { name: 'Textile Sourcing Week', status: 'Await', statusColor: 'amber', booth: '96', sold: '52', price: '$240' },
    { name: 'Packaging Innovation Fair', status: 'Await', statusColor: 'amber', booth: '74', sold: '47', price: '$220' },
    { name: 'Electronics Trade Forum', status: 'Archieved', statusColor: 'red', booth: '112', sold: '46', price: '$260' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-lg sticky top-0 z-[100]">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Expo Programs / Expo Setting
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Expo Setting
          </h1>
        </div>
        <div className="flex gap-3 justify-end">
          <DateRangeFilter />
          <button className="px-6 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <Save size={18} />
            Save Draft
          </button>
          <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2">
            <Globe size={18} />
            Publish
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-lg">
              <Settings size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Expo List and General Metrics</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            System shows the Expo programs available for Partner setup, together with general metrics. When the user opens one Expo, the setting area below shows the selected Expo configuration.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Expo', value: '4', color: 'from-teal-500 to-cyan-600' },
              { label: 'Live Expo', value: '1', color: 'from-blue-500 to-indigo-600' },
              { label: 'Draft Expo', value: '2', color: 'from-amber-500 to-orange-600' },
              { label: 'Total Booth', value: '430', color: 'from-purple-500 to-pink-600' },
            ].map((metric, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{metric.label}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Expo Table */}
          <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg mb-8">
            <div className="grid grid-cols-[1.2fr_0.6fr_0.5fr_0.5fr_0.7fr_0.6fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
              <span>Expo</span>
              <span>Status</span>
              <span>Booth</span>
              <span>Sold</span>
              <span>Package Price</span>
              <span>Action</span>
            </div>
            {expos.map((expo, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.2fr_0.6fr_0.5fr_0.5fr_0.7fr_0.6fr] gap-4 px-6 py-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-200 cursor-pointer"
              >
                <strong className="text-gray-900">{expo.name}</strong>
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
                <span className="text-gray-900">{expo.booth}</span>
                <span className="text-gray-900">{expo.sold}</span>
                <span className="text-gray-900">{expo.price}</span>
                <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  View Detail
                </button>
              </div>
            ))}
          </div>

          {/* Selected Expo Setting Card */}
          <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white shadow-md">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Selected Expo Setting</h3>
                <p className="text-sm text-gray-600">Agri Export Expo is currently selected for editing.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Save Draft
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all">
                  Publish
                </button>
              </div>
            </div>

            {/* Media Assets */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Media Assets</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-[0.8fr_1fr_1fr_0.8fr] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                  <span>Asset</span>
                  <span>Current File</span>
                  <span>Page Position</span>
                  <span>Action</span>
                </div>
                <div className="grid grid-cols-[0.8fr_1fr_1fr_0.8fr] gap-4 px-4 py-4 items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center text-teal-600 font-bold">
                      +
                    </div>
                    <span className="font-semibold text-gray-900">Banner</span>
                  </div>
                  <span className="text-gray-700">agri-expo-hero.jpg</span>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Hero banner</option>
                    <option>Middle banner</option>
                    <option>Footer</option>
                  </select>
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 justify-center">
                    <Upload size={16} />
                    Upload
                  </button>
                </div>
              </div>
            </div>

            {/* Expo Content */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Expo Content</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                  <div className="font-semibold text-gray-700">Expo Name</div>
                  <div>
                    <input
                      type="text"
                      defaultValue="Agri Export Expo"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                  <div className="font-semibold text-gray-700">Total Booth</div>
                  <div>
                    <input
                      type="text"
                      defaultValue="148"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                  <div className="font-semibold text-gray-700">Package Setting (Price)</div>
                  <div>
                    <input
                      type="text"
                      defaultValue="$280 per booth"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
                  <div className="font-semibold text-gray-700 pt-2">Short Description</div>
                  <div>
                    <textarea
                      rows={3}
                      defaultValue="Trade expo for export-ready agriculture suppliers and international buyers."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Status</h3>
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Expo Status</div>
                  <div className="text-sm text-teal-600 font-bold">Live</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
