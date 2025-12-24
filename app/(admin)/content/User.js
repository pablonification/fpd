'use client';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import FormField from '../_components/FormField';
import ConfirmModal from '../_components/ConfirmModal';
import { CgSpinner } from 'react-icons/cg';
import toast from 'react-hot-toast';

export default function UserForm() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    status: 'Active',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const fileInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      const usersWithAvatar = data.map((user) => ({
        ...user,
        status: user.isActive ? 'Active' : 'Inactive',
        avatar: user.avatarUrl || '/icon/db-user-1.png',
        name: user.name,
      }));
      setUsers(usersWithAvatar);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) &&
        (roleFilter ? user.role === roleFilter : true)
    );
  }, [users, search, roleFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  // --- Modal Logic ---
  const openModal = (user = null) => {
    setCurrentUser(user);
    if (user) {
      setFormData({
        fullName: user.name,
        email: user.email,
        password: '', // Jangan isi password saat edit
        role: user.role,
        status: user.status, // Ambil dari data yang sudah diolah
      });
      setAvatarPreview(user.avatar);
    } else {
      setFormData({
        fullName: '',
        email: '',
        password: '',
        role: 'admin', // Default role
        status: 'Active',
      });
    }
    setAvatarFile(null); // Reset file yang dipilih
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      role: '',
      status: 'Active',
    });
    setAvatarFile(null); // Reset file
    setAvatarPreview(null); // Reset preview
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Membuat URL lokal untuk preview
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarFile(null);
      setAvatarPreview(currentUser?.avatar || null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // --- Handler Submit Form (Create/Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isCreating = !currentUser;

    // 1. Upload Avatar ke Supabase Storage (JIKA ADA FILE BARU)
    let avatarUrl = currentUser?.avatar; // Default: gunakan URL yang sudah ada

    if (avatarFile) {
      try {
        const formData = new FormData();
        formData.append('file', avatarFile);

        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) throw new Error(uploadData.message);

        avatarUrl = uploadData.publicUrl;
        console.log(avatarUrl);
      } catch (err) {
        toast.error(`Avatar upload failed: ${err.message}`);
        setLoading(false);
        return;
      }
    }

    // 2. Persiapan Payload Pengguna
    const payload = {
      name: formData.fullName,
      email: formData.email,
      role: formData.role,
      isActive: formData.status === 'Active',
      avatar: avatarUrl, // Tambahkan URL avatar yang baru/lama
    };

    console.log(payload);

    if (formData.password || isCreating) {
      payload.password = formData.password;
    }

    // ... (Validasi dasar tetap sama) ...
    if (
      !payload.name ||
      !payload.email ||
      !payload.role ||
      (isCreating && !payload.password)
    ) {
      toast.error(
        'Please fill in all required fields (Full Name, Email, Role, and Password for new user).'
      );
      setLoading(false);
      return;
    }

    // 3. Panggil API User (Create/Update)
    try {
      let response;
      if (isCreating) {
        // CREATE
        response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // UPDATE
        response = await fetch(`/api/users/${currentUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.message ||
            `Failed to ${isCreating ? 'create' : 'update'} user`
        );
      }

      toast.success(isCreating ? 'User created' : 'User updated');
      closeModal();
      fetchUsers(); // Refresh data
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/users/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      toast.success('User deleted');
      setDeleteTarget(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="flex w-full max-w-full flex-col gap-6">
        {/* Header */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
            <img src="/icon/search.png" alt="Search" className="h-5 w-5" />
          </div>
        </div>

        {/* Filter & Add User */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-[44px] w-full rounded-md border border-gray-300 px-4 text-sm md:w-[143px]"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>

          <div className="flex w-full justify-end md:w-auto">
            <button
              onClick={() => openModal()}
              className="h-[44px] w-full rounded-[12px] bg-[#2AB2C7] px-6 font-medium text-white transition-opacity hover:opacity-90 md:w-[177px]"
              disabled={loading}
            >
              Add New User +
            </button>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="flex min-h-[596px] w-full flex-col overflow-x-auto rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid min-w-[600px] grid-cols-[3fr_1fr_1fr] items-center border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
            <span>Users</span>
            <span>Role</span>
            <span className="justify-self-end">Action</span>
          </div>

          {/* Loading State */}
          {loading && users.length === 0 && (
            <div className="animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="grid min-w-[600px] grid-cols-[3fr_1fr_1fr] items-center border-b border-gray-100 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-32 rounded bg-gray-200" />
                      <div className="h-3 w-40 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="h-4 w-16 rounded bg-gray-200" />
                  <div className="flex items-center justify-end gap-4">
                    <div className="h-5 w-5 rounded bg-gray-200" />
                    <div className="h-5 w-5 rounded bg-gray-200" />
                    <div className="h-5 w-5 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Table Rows */}
          {!loading && filteredUsers.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-500">
              No users found.
            </div>
          )}

          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="grid min-w-[600px] grid-cols-[3fr_1fr_1fr] items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </div>

              <span>{user.role}</span>

              <div className="flex items-center justify-end gap-4">
                <Image
                  src="/icon/db-u-edit.png"
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
                  onClick={() => setDeleteTarget(user)}
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

        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 px-4 md:flex-row md:justify-between">
            <span className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
              {filteredUsers.length} users
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-[40px] w-[142px] items-center justify-center gap-[10px] rounded-[16px] border border-zinc-300 bg-white px-[20px] py-[8px] text-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-[40px] w-[40px] items-center justify-center rounded-lg text-sm transition-colors ${
                        currentPage === page
                          ? 'bg-[#2AB2C7] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex h-[40px] w-[142px] items-center justify-center gap-[10px] rounded-[16px] border border-zinc-300 bg-white px-[24px] py-[8px] text-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {totalPages <= 1 && filteredUsers.length > 0 && (
          <div className="px-4">
            <span className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </span>
          </div>
        )}
      </div>

      {/* --- Modal Overlay --- */}
      {isModalOpen && (
        <div className="bg-opacity-20 fixed inset-0 z-50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            // Ganti w-[1070px] agar lebih responsif, tapi tetap lebar
            className={`max-w-8xl fixed top-0 right-0 h-full w-full bg-white shadow-2xl transition-transform duration-300 sm:w-[500px] md:w-[700px] lg:w-[1070px] ${
              isModalOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex h-[80px] items-center border-b border-gray-200 px-4 md:px-8">
              <button
                type="button"
                onClick={closeModal}
                // Ikon kembali sesuai dengan gaya yang baru (diperbesar dan berlatar)
                className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xl text-black transition-colors hover:bg-zinc-200"
              >
                ←
              </button>
              <h2 className="font-hanken text-xl leading-10 font-bold text-black md:text-3xl">
                {currentUser ? 'Edit User' : 'Create New User'}
              </h2>
            </div>
            {/* Content */}
            {/* Menggunakan padding lebih besar (px-8 py-10) dan wrapper untuk membatasi lebar konten (~855px) */}
            <div className="h-[calc(100%-160px)] overflow-y-auto px-4 py-6 md:px-8 md:py-10">
              <div className="mx-auto flex w-full max-w-[855px] flex-col gap-9">
                {/* 1. Profile Picture */}
                <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
                  <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs text-gray-500">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="text-base font-medium text-black">
                        Profile Picture
                      </div>
                      <div className="text-xs font-normal text-neutral-400">
                        Upload a profile image to display on the user list and
                        profile page.
                      </div>
                    </div>

                    {/* Tombol Upload New Photo (Menggantikan Browse File) */}
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-zinc-300 bg-white px-5 py-2 text-base font-medium text-zinc-800 outline outline-1 outline-offset-[-1px] transition-colors hover:bg-zinc-50"
                      disabled={loading}
                    >
                      Upload New Photo
                    </button>
                    {avatarFile && (
                      <p className="mt-1 text-xs text-green-600">
                        File selected: **{avatarFile.name}**
                      </p>
                    )}
                  </div>
                </div>

                {/* Input File Tersembunyi (Tidak diubah) */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* 2. Form Fields Lainnya (Menggunakan FormField dengan gaya baru) */}
                {/* Catatan: Karena kita tidak dapat mengubah internal FormField, kita hanya dapat memengaruhi styling eksternal.
            Jika FormField Anda mendukung styling baru (rounded-2xl, px-4 py-3, dll.) ini akan terlihat lebih baik.
            Untuk saat ini, kita mengasumsikan FormField telah diperbarui atau hanya mempengaruhi label/deskripsi. */}

                <div className="flex flex-col gap-6">
                  <FormField
                    label="Full Name"
                    description="Enter the user's full name as it should appear across the system."
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    // Anda mungkin perlu menambahkan `inputClassName="rounded-2xl px-4 py-3 border border-zinc-300"` jika FormField mendukung
                  />

                  <FormField
                    label="Email Address"
                    description="Provide a valid email address for account identification and notifications."
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <FormField
                    label="Password"
                    description={
                      currentUser
                        ? 'Set a new password. Leave blank to keep current password.'
                        : 'Set a secure password for this user.'
                    }
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                {/* 3. Role Dropdown */}
                <div className="flex w-full flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-medium text-black">
                      Role
                    </label>
                    <span className="text-xs font-normal text-neutral-400">
                      Select the role that defines the user’s access level and
                      permissions.
                    </span>
                  </div>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="h-[44px] w-full appearance-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base transition-colors outline-none focus:border-[#2AB2C7]" // rounded-xl dan outline style baru
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                {/* 4. Status Radio Buttons */}
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-medium text-black">
                      Status
                    </label>
                    <span className="text-xs font-normal text-neutral-400">
                      Choose whether the user is currently active in the system.
                    </span>
                  </div>
                  <div className="flex gap-6">
                    {/* Active */}
                    <label className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === 'Active'}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        // Styling radio button yang lebih modern
                        className="h-6 w-6 border-[1.71px] border-[#2AB2C7] text-[#2AB2C7] focus:ring-0"
                      />
                      <span
                        className={`text-sm leading-5 ${formData.status === 'Active' ? 'text-[#2AB2C7]' : 'text-gray-400'}`}
                      >
                        Active
                      </span>
                    </label>
                    {/* Inactive */}
                    <label className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === 'Inactive'}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        // Styling radio button yang lebih modern
                        className="h-6 w-6 border-[1.71px] border-gray-400 text-[#2AB2C7] focus:ring-0"
                      />
                      <span
                        className={`text-sm leading-5 ${formData.status === 'Inactive' ? 'text-[#2AB2C7]' : 'text-gray-400'}`}
                      >
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>
              </div>{' '}
              {/* Akhir dari wrapper max-w-[855px] */}
            </div>{' '}
            {/* Akhir dari Content */}
            {/* Footer Buttons */}
            {/* Menggunakan styling dan ukuran font baru: rounded-xl/2xl, font-semibold, text-xl */}
            <div className="absolute right-0 bottom-0 left-0 flex h-[80px] items-center justify-end gap-5 border-t border-gray-200 px-8">
              <button
                type="button"
                onClick={closeModal}
                className="flex h-auto w-48 items-center justify-center gap-5 rounded-xl border border-stone-300 bg-white px-6 py-3 text-xl font-semibold text-neutral-600 outline outline-1 outline-offset-[-1px] transition-colors hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex h-auto w-48 items-center justify-center gap-3 rounded-2xl bg-[#2AB2C7] px-6 py-3 text-xl font-semibold text-white transition-opacity hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <CgSpinner className="animate-spin text-xl" />
                ) : currentUser ? (
                  'Update'
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
