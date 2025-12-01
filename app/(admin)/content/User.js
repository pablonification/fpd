'use client';
import { useState } from 'react';
import Image from 'next/image';
import FormField from '../_components/FormField';

const users = [
  {
    id: 1,
    name: 'Clement Nathanael',
    email: 'clement@example.com',
    role: 'Admin',
    avatar: '/icon/db-user-1.png',
  },
  {
    id: 2,
    name: 'Muhammad Zaki',
    email: 'zaki@example.com',
    role: 'Editor',
    avatar: '/icon/db-user-1.png',
  },
  {
    id: 3,
    name: 'Alfian Hanif',
    email: 'alfian@example.com',
    role: 'Viewer',
    avatar: '/icon/db-user-1.png',
  },
];

export default function UserForm() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // <-- user yang sedang diedit
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    status: 'Active',
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter ? user.role === roleFilter : true)
  );

  // Fungsi untuk membuka modal baru atau edit
  const openModal = (user = null) => {
    setCurrentUser(user);
    if (user) {
      setFormData({
        fullName: user.name,
        email: user.email,
        password: '',
        role: user.role,
        status: 'Active', // bisa sesuaikan jika ada field status di user
      });
    } else {
      setFormData({
        fullName: '',
        email: '',
        password: '',
        role: '',
        status: 'Active',
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="flex w-full max-w-full flex-col gap-6">
        {/* Header */}
        <div className="flex w-full flex-col gap-4">
          <h1 className="font-hanken text-2xl leading-8 font-semibold tracking-tight">
            All Users
          </h1>
          <div className="flex h-[52px] w-full max-w-md items-center gap-2 rounded-[16px] border border-gray-300 px-4">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
            <button className="text-sm text-gray-500">🔍</button>
          </div>
        </div>

        {/* Filter & Add User */}
        <div className="flex w-full max-w-screen items-center justify-between">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-[44px] w-[143px] rounded-md border border-gray-300 px-4 text-sm"
          >
            <option value="">Role</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>

          <div className="flex flex-1 justify-end">
            <button
              onClick={() => openModal()}
              className="h-[44px] w-[177px] rounded-[12px] bg-[#2AB2C7] px-6 font-medium text-white"
            >
              Add New User +
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex min-h-[596px] w-full flex-col overflow-hidden rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-[3fr_1fr_1fr] items-center border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
            <span>Users</span>
            <span>Role</span>
            <span className="justify-self-end">Action</span>{' '}
            {/* Pastikan header Action sejajar kanan */}
          </div>

          {/* Table Row */}
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-[3fr_1fr_1fr] items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
            >
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </div>

              {/* Role */}
              <span>{user.role}</span>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4">
                <Image
                  src="/icon/db-u-edit.png" // icon dari folder public
                  alt="Edit"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => openModal(user)}
                />
                <Image
                  src="/icon/db-u-trash.png"
                  alt="Delete"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
                <Image
                  src="/icon/db-u-right.png"
                  alt="Info"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="w-max-screen flex h-[40px] w-full items-center justify-between px-4">
          <span className="text-sm text-gray-600">
            Showing 10 from 1000 users
          </span>
          <div className="flex gap-2">
            <button className="flex h-[40px] w-[142px] items-center justify-center gap-[10px] rounded-[16px] border border-[#DCDCDC] bg-white px-[20px] py-[8px] text-sm hover:bg-gray-200">
              Previous
            </button>
            <button className="flex h-[40px] w-[142px] items-center justify-center gap-[10px] rounded-[16px] border border-[#DCDCDC] bg-white px-[24px] py-[8px] text-sm hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 backdrop-blur-md">
          <div
            className={`fixed top-0 right-0 h-full w-[1070px] bg-white shadow-2xl transition-transform duration-300 ${
              isModalOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex h-[80px] items-center border-b border-gray-200 px-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-4 text-2xl text-gray-600 hover:text-gray-800"
              >
                ←
              </button>
              <h2 className="text-2xl font-semibold">
                {currentUser ? 'Edit User' : 'Create New User'}
              </h2>
            </div>

            {/* Content */}
            <div className="h-[calc(100%-160px)] overflow-y-auto px-8 py-6">
              {/* Profile Picture */}
              <div className="mb-6 flex items-center gap-4">
                <div className="h-[80px] w-[80px] rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-bold text-gray-700">
                    Profile Picture
                  </p>
                  <p className="text-xs text-gray-400">
                    Upload a picture to display on the user list and profile
                    page
                  </p>
                  <button className="mt-2 text-sm font-medium text-[#2AB2C7]">
                    Browse File
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-6">
                <FormField
                  label="Full Name"
                  description="Enter the user's full name as it should appear across the system"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />

                <FormField
                  label="Email Address"
                  description="Provide a valid email address for account identification and notifications"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <FormField
                  label="Password"
                  description="Set a secure password for this user. Leave blank if you don't want to change the password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                {/* Role Dropdown */}
                <div className="flex w-full flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">
                    Role
                  </label>
                  <span className="text-xs text-gray-400">
                    Select the role that defines the users access level and
                    permissions
                  </span>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="h-[44px] w-full rounded-[12px] border border-gray-300 px-4 py-3 text-sm outline-none"
                  >
                    <option value="">Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                {/* Status Radio Buttons */}
                <div className="flex w-full flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">
                    Status
                  </label>
                  <span className="text-xs text-gray-400">
                    Choose whether the user is currently active in the system
                  </span>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === 'Active'}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Active</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === 'Inactive'}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Inactive</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="absolute right-0 bottom-0 left-0 flex h-[80px] items-center justify-end gap-4 border-t border-gray-200 px-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-[44px] w-[120px] rounded-[12px] border border-gray-300 bg-white px-6 font-medium text-gray-700"
              >
                Cancel
              </button>
              <button className="h-[44px] w-[120px] rounded-[12px] bg-[#2AB2C7] px-6 font-medium text-white">
                {currentUser ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
