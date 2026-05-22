import { useState } from 'react';
import { Image, Upload, Eye, Trash2, ExternalLink, Plus, X } from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';
import FilterDropdown from './FilterDropdown';

export default function BannerManagement() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const banners = [
    {
      id: 1,
      position: 'Hero Banner',
      image: 'agri-export-hero.jpg',
      size: '1920x600',
      status: 'Active',
      statusColor: 'teal',
      linkUrl: 'https://example.com/expo',
      impressions: '12.4K',
      clicks: '847',
    },
    {
      id: 2,
      position: 'Sidebar Top',
      image: 'textile-week-sidebar.jpg',
      size: '300x250',
      status: 'Active',
      statusColor: 'teal',
      linkUrl: 'https://example.com/textile',
      impressions: '8.2K',
      clicks: '523',
    },
    {
      id: 3,
      position: 'Content Middle',
      image: 'packaging-promo.jpg',
      size: '728x90',
      status: 'Scheduled',
      statusColor: 'amber',
      linkUrl: 'https://example.com/packaging',
      impressions: '0',
      clicks: '0',
    },
    {
      id: 4,
      position: 'Footer Banner',
      image: 'partner-alliance-footer.jpg',
      size: '1200x300',
      status: 'Inactive',
      statusColor: 'red',
      linkUrl: 'https://example.com/alliance',
      impressions: '3.1K',
      clicks: '142',
    },
  ];

  const positions = [
    { name: 'Hero Banner', size: '1920x600', description: 'Top of homepage, full-width banner' },
    { name: 'Sidebar Top', size: '300x250', description: 'Right sidebar, above the fold' },
    { name: 'Sidebar Bottom', size: '300x600', description: 'Right sidebar, scrollable area' },
    { name: 'Content Middle', size: '728x90', description: 'Between content sections' },
    { name: 'Content Top', size: '970x90', description: 'Above main content area' },
    { name: 'Footer Banner', size: '1200x300', description: 'Bottom of all pages' },
  ];

  const handleUploadBanner = () => {
    console.log('Uploading banner:', { selectedPosition, bannerUrl, linkUrl });
    setShowUploadModal(false);
    setSelectedPosition('');
    setBannerUrl('');
    setLinkUrl('');
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-lg sticky top-0 z-[100]">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Partner Site Management / Banner Management
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Banner Management
          </h1>
        </div>
        <div className="flex gap-3 justify-end">
          <DateRangeFilter />
          <FilterDropdown
            label="All Positions"
            icon={<Image size={18} />}
            options={[
              { value: 'all', label: 'All Positions' },
              { value: 'active', label: 'Active Only' },
              { value: 'inactive', label: 'Inactive Only' },
              { value: 'scheduled', label: 'Scheduled Only' },
            ]}
          />
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2"
          >
            <Plus size={18} />
            Upload Banner
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {/* Banner Positions Overview */}
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
              <Image size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Available Banner Positions</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            Manage advertisement banners across different positions on your partner site. Upload images, set links, and track performance.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Positions', value: '6', color: 'from-indigo-500 to-purple-600' },
              { label: 'Active Banners', value: '2', color: 'from-teal-500 to-cyan-600' },
              { label: 'Total Impressions', value: '23.7K', color: 'from-blue-500 to-indigo-600' },
              { label: 'Total Clicks', value: '1,512', color: 'from-amber-500 to-orange-600' },
            ].map((metric, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{metric.label}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Position Cards */}
          <div className="grid grid-cols-3 gap-4">
            {positions.map((position, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg hover:border-teal-200 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                      <Image size={20} className="text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{position.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">{position.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPosition(position.name);
                      setShowUploadModal(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 text-xs font-semibold text-teal-600 hover:bg-teal-50 rounded-lg"
                  >
                    Upload
                  </button>
                </div>
                <p className="text-sm text-gray-600">{position.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Banners */}
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-lg">
              <Upload size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Uploaded Banners</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            View and manage all uploaded banner advertisements with performance metrics.
          </p>

          {/* Banners Table */}
          <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg">
            <div className="grid grid-cols-[1fr_1fr_0.8fr_0.7fr_1fr_0.8fr_0.8fr_0.7fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
              <span>Position</span>
              <span>Image File</span>
              <span>Size</span>
              <span>Status</span>
              <span>Link URL</span>
              <span>Impressions</span>
              <span>Clicks</span>
              <span>Action</span>
            </div>
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="grid grid-cols-[1fr_1fr_0.8fr_0.7fr_1fr_0.8fr_0.8fr_0.7fr] gap-4 px-6 py-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                    <Image size={16} className="text-teal-600" />
                  </div>
                  <strong className="text-gray-900">{banner.position}</strong>
                </div>
                <span className="text-gray-700 truncate">{banner.image}</span>
                <span className="text-gray-700 font-mono text-sm">{banner.size}</span>
                <span>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${
                      banner.statusColor === 'teal'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : banner.statusColor === 'amber'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {banner.status}
                  </span>
                </span>
                <a
                  href={banner.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 truncate flex items-center gap-1 text-sm"
                >
                  <span className="truncate">View link</span>
                  <ExternalLink size={12} />
                </a>
                <span className="text-gray-900 font-semibold">{banner.impressions}</span>
                <span className="text-gray-900 font-semibold">{banner.clicks}</span>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Preview">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Banner Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
                  <Upload size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Upload Banner</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Banner Position
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select position...</option>
                  {positions.map((pos) => (
                    <option key={pos.name} value={pos.name}>
                      {pos.name} ({pos.size})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Banner Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors cursor-pointer bg-gray-50">
                  <Upload size={40} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or GIF (recommended size: {positions.find(p => p.name === selectedPosition)?.size || '1920x600'})
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Link URL (Optional)
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com/promotion"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Where users will be directed when clicking the banner
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-blue-900 mb-2">Banner Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use high-quality images matching the recommended dimensions</li>
                  <li>• File size should not exceed 2MB for optimal loading</li>
                  <li>• Ensure text and important elements are clearly visible</li>
                  <li>• Test banner appearance on both desktop and mobile devices</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-6 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadBanner}
                disabled={!selectedPosition}
                className="flex-1 px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
