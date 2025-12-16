'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import FormField from '../_components/FormField'; // Asumsi path benar
import { CgSpinner } from 'react-icons/cg'; // Menggunakan icon spinner untuk loading

// Menggantikan data mock
// const users = [...]

export default function Researcher() {
  const [users, setUsers] = useState([]); // State untuk menyimpan data pengguna dari API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // <-- user yang sedang diedit
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    status: 'Active', // Active/Inactive
  });

  // --- STATE BARU UNTUK FILE AVATAR ---
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // --- REF BARU UNTUK INPUT FILE ---
  const fileInputRef = useRef(null);
  // --- Fungsi Pengambilan Data (Fetching) ---
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      const usersWithAvatar = data.map((user) => ({
        ...user,
        status: user.is_active ? 'Active' : 'Inactive',
        avatar: user.avatar || '/icon/db-user-1.png',
        name: user.name,
      }));
      setUsers(usersWithAvatar);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // --- Filter Lokal ---
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter ? user.role === roleFilter : true)
  );

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
    setError(null);

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
        setError(`Avatar upload failed: ${err.message}`);
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
      alert(
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

      closeModal();
      fetchUsers(); // Refresh data
    } catch (err) {
      setError(err.message);
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Handler Delete ---
  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      fetchUsers(); // Refresh data
    } catch (err) {
      setError(err.message);
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="flex w-full max-w-full flex-col gap-6">
        {/* Header */}
        <div className="flex w-full flex-col gap-4">
          <h1 className="font-hanken text-2xl leading-8 font-semibold tracking-tight">
            All Researcher
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
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>

          <div className="flex flex-1 justify-end">
            <button
              onClick={() => openModal()}
              className="h-[44px] w-[177px] rounded-[12px] bg-[#2AB2C7] px-6 font-medium text-white transition-opacity hover:opacity-90"
              disabled={loading}
            >
              Add Researcher
            </button>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="flex min-h-[596px] w-full flex-col overflow-hidden rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-[3fr_1fr_1fr] items-center border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
            <span>Users</span>
            <span>Role</span>
            <span className="justify-self-end">Action</span>
          </div>

          {/* Loading State */}
          {loading && users.length === 0 && (
            <div className="flex items-center justify-center py-10">
              <CgSpinner className="animate-spin text-4xl text-[#2AB2C7]" />
              <span className="ml-2 text-gray-500">Loading users...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div
              className="relative m-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="ml-2 block sm:inline">{error}</span>
            </div>
          )}

          {/* Table Rows */}
          {!loading && filteredUsers.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-500">
              No users found.
            </div>
          )}

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-[3fr_1fr_1fr] items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
            >
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar_url} // Menggunakan avatar dari data yang sudah diolah
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

              {/* Role */}
              <span>{user.role}</span>

              {/* Actions */}
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
                  onClick={() => handleDelete(user.id, user.name)}
                />
                <Image
                  src="/icon/db-u-right.png"
                  alt="Info"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  // Logika untuk menampilkan detail pengguna bisa ditambahkan di sini
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="w-max-screen flex h-[40px] w-full items-center justify-between px-4">
          <span className="text-sm text-gray-600">
            Showing {filteredUsers.length} from {users.length} users
          </span>
          <div className="flex gap-2">
            {/* Paginasi yang sebenarnya membutuhkan state dan logika tambahan. Sementara, tombol hanya placeholder. */}
            <button
              className="flex h-[40px] w-[142px] items-center justify-center gap-[10px] rounded-[16px] border border-[#DCDCDC] bg-white px-[20px] py-[8px] text-sm hover:bg-gray-200"
              disabled
            >
              Previous
            </button>
            <button
              className="flex h-[40px] w-[142px] items-center justify-center gap-[10px] rounded-[16px] border border-[#DCDCDC] bg-white px-[24px] py-[8px] text-sm hover:bg-gray-200"
              disabled
            >
              Next
            </button>
          </div>
        </div>
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
            <div className="flex h-[80px] items-center border-b border-gray-200 px-8">
              <button
                type="button"
                onClick={closeModal}
                // Ikon kembali sesuai dengan gaya yang baru (diperbesar dan berlatar)
                className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xl text-black transition-colors hover:bg-zinc-200"
              >
                ←
              </button>
              <h2 className="font-hanken text-3xl leading-10 font-bold text-black">
                {currentUser ? 'Edit Researcher' : 'Create New Researcher'}
              </h2>
            </div>
            {/* Content */}
            {/* Menggunakan padding lebih besar (px-8 py-10) dan wrapper untuk membatasi lebar konten (~855px) */}
            <div className="h-[calc(100%-160px)] overflow-y-auto px-8 py-10">
              <div className="mx-auto flex w-full max-w-[855px] flex-col gap-9">
                {/* 1. Profile Picture */}
                <div className="flex items-center gap-5">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs text-gray-500">
                    <Image
                      src={avatarPreview || '/icon/db-user-1.png'}
                      alt="Profile"
                      width={96} // 24 * 4 = 96px (3rem)
                      height={96}
                      className="h-full w-full rounded-full object-cover"
                    />
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
    </div>
  );
}
