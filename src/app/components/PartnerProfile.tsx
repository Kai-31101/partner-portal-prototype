import { Building2, Save, Upload, Globe, Mail, Phone, MapPin } from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';

export default function PartnerProfile() {
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-lg sticky top-0 z-[100]">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Portal Management / Partner Profile
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Partner Profile
          </h1>
        </div>
        <div className="flex gap-3 justify-end">
          <DateRangeFilter />
          <button className="px-6 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <Globe size={18} />
            Preview Profile
          </button>
          <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Partner Information</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            Manage the Partner organization profile, contact information, and business details visible across the platform.
          </p>

          {/* Partner Logo */}
          <div className="mb-8 border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Partner Logo</h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center border-2 border-gray-200">
                <Building2 size={40} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Upload your organization logo (recommended size: 400x400px)</p>
                <button className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2">
                  <Upload size={18} />
                  Upload Logo
                </button>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Business Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Legal Name</label>
                  <input
                    type="text"
                    defaultValue="Vietnam Export Alliance"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Business Registration Number</label>
                  <input
                    type="text"
                    defaultValue="VN-BRN-2024-00123"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Vietnam</option>
                    <option>Thailand</option>
                    <option>Singapore</option>
                    <option>Malaysia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Industry Sector</label>
                  <input
                    type="text"
                    defaultValue="Agriculture, Textile, Packaging"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Description</label>
                <textarea
                  rows={4}
                  defaultValue="Leading export alliance facilitating international trade for agriculture, textile, and packaging industries across Southeast Asia."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Primary Email
                  </label>
                  <input
                    type="email"
                    defaultValue="contact@vietnamexportalliance.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+84 28 1234 5678"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  Business Address
                </label>
                <textarea
                  rows={2}
                  defaultValue="123 Trade Center Boulevard, District 1, Ho Chi Minh City, Vietnam"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    defaultValue="https://vietnamexportalliance.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tax ID</label>
                  <input
                    type="text"
                    defaultValue="VN-TAX-0123456789"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Active Capabilities */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Active Capabilities</h3>
            <div className="space-y-3">
              {[
                { name: 'Expo Programs', enabled: true },
                { name: 'Trade Credit Wallet', enabled: true },
                { name: 'Package Bundle Management', enabled: true },
                { name: 'Analytics & Reports', enabled: false },
              ].map((capability, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{capability.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {capability.enabled ? 'Active and available to all users' : 'Currently disabled'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={capability.enabled} className="sr-only peer" />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
