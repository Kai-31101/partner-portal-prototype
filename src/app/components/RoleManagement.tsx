import { useState, useRef, useEffect } from 'react';
import { Shield, UserPlus, MoreVertical, Filter, Search, X, Mail, Edit, Trash2 } from 'lucide-react';
import FilterDropdown from './FilterDropdown';
import DateRangeFilter from './DateRangeFilter';

export default function RoleManagement() {
  const [activeTab, setActiveTab] = useState<'users' | 'invitations'>('users');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Staff');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const users = [
    { name: 'John Nguyen', email: 'john@vietnamexportalliance.com', role: 'Owner', roleColor: 'purple', status: 'Active', lastActive: '2 min ago' },
    { name: 'Sarah Tran', email: 'sarah@vietnamexportalliance.com', role: 'Admin', roleColor: 'blue', status: 'Active', lastActive: '1 hour ago' },
    { name: 'Michael Pham', email: 'michael@vietnamexportalliance.com', role: 'Staff', roleColor: 'teal', status: 'Active', lastActive: '3 hours ago' },
    { name: 'Linda Chen', email: 'linda@vietnamexportalliance.com', role: 'Staff', roleColor: 'teal', status: 'Inactive', lastActive: '2 days ago' },
  ];

  const invitations = [
    { email: 'alex@example.com', role: 'Admin', roleColor: 'blue', status: 'Pending', sentDate: '2026-05-18', expiryDate: '2026-06-01' },
    { email: 'maria@example.com', role: 'Staff', roleColor: 'teal', status: 'Pending', sentDate: '2026-05-17', expiryDate: '2026-05-31' },
    { email: 'kevin@example.com', role: 'Staff', roleColor: 'teal', status: 'Expired', sentDate: '2026-04-20', expiryDate: '2026-05-04' },
  ];

  const rolePermissions = [
    {
      role: 'Owner',
      color: 'purple',
      count: 1,
      permissions: [
        'Full system access',
        'Add/remove users',
        'Assign roles and permissions',
        'Manage billing and payments',
        'Delete portal data',
      ],
    },
    {
      role: 'Admin',
      color: 'blue',
      count: 1,
      permissions: [
        'Manage expo programs',
        'View all reports',
        'Manage enterprise invitations',
        'Configure site settings',
        'View user activity',
      ],
    },
    {
      role: 'Staff',
      color: 'teal',
      count: 2,
      permissions: [
        'View expo programs',
        'Manage assigned tasks',
        'Send invitations',
        'View basic reports',
        'Update profile',
      ],
    },
  ];

  const handleInviteUser = () => {
    // Handle invite logic here
    console.log('Inviting:', inviteEmail, 'as', inviteRole);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('Staff');
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-lg sticky top-0 z-[100]">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Portal Management / Role Management
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Role Management
          </h1>
        </div>
        <div className="flex gap-3 justify-end">
          <DateRangeFilter />
          <FilterDropdown
            label="All Roles"
            icon={<Filter size={18} />}
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'owner', label: 'Owner Only' },
              { value: 'admin', label: 'Admin Only' },
              { value: 'staff', label: 'Staff Only' },
            ]}
          />
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2"
          >
            <UserPlus size={18} />
            Invite User
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {/* Users Section */}
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-lg">
              <Shield size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Portal Users</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            Manage users with access to this Portal. Only Owner can add users and assign roles with specific permissions.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Users', value: '4', color: 'from-purple-500 to-pink-600' },
              { label: 'Active Users', value: '3', color: 'from-teal-500 to-cyan-600' },
              { label: 'Admin Roles', value: '1', color: 'from-blue-500 to-indigo-600' },
              { label: 'Pending Invites', value: '2', color: 'from-amber-500 to-orange-600' },
            ].map((metric, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{metric.label}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'users'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Active Users
            </button>
            <button
              onClick={() => setActiveTab('invitations')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'invitations'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Invitations
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'users' ? 'Search users by name or email...' : 'Search invitations by email...'}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Active Users Table */}
          {activeTab === 'users' && (
            <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg">
              <div className="grid grid-cols-[1.2fr_1fr_0.7fr_0.7fr_0.8fr_0.5fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
                <span>User</span>
                <span>Email</span>
                <span>Role</span>
                <span>Status</span>
                <span>Last Active</span>
                <span>Action</span>
              </div>
              {users.map((user, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[1.2fr_1fr_0.7fr_0.7fr_0.8fr_0.5fr] gap-4 px-6 py-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-pink-50/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                      user.roleColor === 'purple' ? 'from-violet-500 to-purple-600' :
                      user.roleColor === 'blue' ? 'from-blue-500 to-indigo-600' :
                      'from-teal-500 to-cyan-600'
                    } flex items-center justify-center text-white font-bold shadow-md`}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <strong className="text-gray-900">{user.name}</strong>
                  </div>
                  <span className="text-gray-700">{user.email}</span>
                  <span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${
                      user.roleColor === 'purple' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      user.roleColor === 'blue' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-teal-50 text-teal-700 border border-teal-200'
                    }`}>
                      {user.role}
                    </span>
                  </span>
                  <span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${
                      user.status === 'Active'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {user.status}
                    </span>
                  </span>
                  <span className="text-gray-600 text-sm">{user.lastActive}</span>
                  <div className="relative" ref={openDropdown === idx ? dropdownRef : null}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                      className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openDropdown === idx && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-[9999]">
                        <button
                          onClick={() => {
                            console.log('Edit user:', user.email);
                            setOpenDropdown(null);
                          }}
                          className="w-full px-4 py-3 text-left flex items-center gap-2 text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <Edit size={16} />
                          <span className="font-medium">Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            console.log('Remove user:', user.email);
                            setOpenDropdown(null);
                          }}
                          className="w-full px-4 py-3 text-left flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span className="font-medium">Remove</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Invitations Table */}
          {activeTab === 'invitations' && (
            <div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white shadow-lg">
              <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.9fr_0.9fr_0.6fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
                <span>Email</span>
                <span>Role</span>
                <span>Status</span>
                <span>Sent Date</span>
                <span>Expiry Date</span>
                <span>Action</span>
              </div>
              {invitations.map((invitation, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.9fr_0.9fr_0.6fr] gap-4 px-6 py-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-pink-50/30 transition-all duration-200"
                >
                  <span className="text-gray-900 font-semibold">{invitation.email}</span>
                  <span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${
                      invitation.roleColor === 'blue' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-teal-50 text-teal-700 border border-teal-200'
                    }`}>
                      {invitation.role}
                    </span>
                  </span>
                  <span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${
                      invitation.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {invitation.status}
                    </span>
                  </span>
                  <span className="text-gray-700">{invitation.sentDate}</span>
                  <span className="text-gray-700">{invitation.expiryDate}</span>
                  <div className="relative" ref={openDropdown === idx + 100 ? dropdownRef : null}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === idx + 100 ? null : idx + 100)}
                      className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openDropdown === idx + 100 && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-[9999]">
                        <button
                          onClick={() => {
                            console.log('Resend invitation:', invitation.email);
                            setOpenDropdown(null);
                          }}
                          className="w-full px-4 py-3 text-left flex items-center gap-2 text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <Mail size={16} />
                          <span className="font-medium">Resend</span>
                        </button>
                        <button
                          onClick={() => {
                            console.log('Cancel invitation:', invitation.email);
                            setOpenDropdown(null);
                          }}
                          className="w-full px-4 py-3 text-left flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span className="font-medium">Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Roles & Permissions Section */}
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <Shield size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Roles & Permissions</h2>
          </div>
          <p className="text-gray-600 mb-8 ml-14">
            Overview of role-based permissions. Owner role has full control including user management and role assignment.
          </p>

          {/* Roles Grid */}
          <div className="grid grid-cols-3 gap-6">
            {rolePermissions.map((roleInfo, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                      roleInfo.color === 'purple' ? 'from-violet-500 to-purple-600' :
                      roleInfo.color === 'blue' ? 'from-blue-500 to-indigo-600' :
                      'from-teal-500 to-cyan-600'
                    } flex items-center justify-center shadow-lg`}>
                      <Shield size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{roleInfo.role}</h3>
                      <p className="text-sm text-gray-600">{roleInfo.count} user{roleInfo.count > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Permissions</div>
                  {roleInfo.permissions.map((permission, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
                  <UserPlus size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Invite User</h3>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assign Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The invited user will receive an email with instructions to join the portal. The invitation will expire in 14 days.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-6 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteUser}
                disabled={!inviteEmail}
                className="flex-1 px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
