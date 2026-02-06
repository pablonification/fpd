'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import FormField from '../_components/FormField';
import ConfirmModal from '../_components/ConfirmModal';
import { CgSpinner } from 'react-icons/cg';
import toast from 'react-hot-toast';

export default function ResearcherForm() {
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResearcher, setCurrentResearcher] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    expertise: '',
    affiliation: '',
    description: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const PREDEFINED_ROLES = [
    'Principal Investigator',
    "Master's Student",
    'Undergraduate Student',
    'Alumni Researcher',
    'Collaborator',
  ];

  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [deleteRoleTarget, setDeleteRoleTarget] = useState(null);
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  const [newRoleInput, setNewRoleInput] = useState('');
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [addedRoles, setAddedRoles] = useState([]);
  const [showAddRoleInput, setShowAddRoleInput] = useState(false);

  const allRolesInData = [...new Set(researchers.map((r) => r.role))];
  const AVAILABLE_ROLES = [
    ...new Set([...PREDEFINED_ROLES, ...allRolesInData, ...addedRoles]),
  ];

  const handleAddNewRoleFromDropdown = async () => {
    const trimmed = newRoleInput.trim();
    if (!trimmed) return;

    const exists = AVAILABLE_ROLES.some(
      (r) => r.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      toast.error('Role already exists');
      return;
    }

    setIsAddingRole(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setAddedRoles((prev) => [...prev, trimmed]);
      setFormData((prev) => ({ ...prev, role: trimmed }));
      setNewRoleInput('');
      setShowAddRoleInput(false);
      toast.success(`New role '${trimmed}' added`);
    } catch (err) {
      toast.error('Failed to add role');
    } finally {
      setIsAddingRole(false);
    }
  };

  // Fetch researchers
  const fetchResearchers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/researchers', { cache: 'no-store' });
      const data = await response.json();

      if (data.success) {
        setResearchers(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch researchers');
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResearchers();
  }, [fetchResearchers]);

  // Filter researchers
  const filteredResearchers = researchers.filter(
    (researcher) =>
      researcher.name.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter ? researcher.role === roleFilter : true)
  );

  // Modal handlers
  const openModal = (researcher = null) => {
    setCurrentResearcher(researcher);
    if (researcher) {
      setFormData({
        name: researcher.name,
        role: researcher.role,
        expertise: researcher.expertise || '',
        affiliation: researcher.affiliation || '',
        description: researcher.description || '',
      });
      setAvatarPreview(researcher.avatarUrl || researcher.avatar_url || null);
    } else {
      setFormData({
        name: '',
        role: '',
        expertise: '',
        affiliation: '',
        description: '',
      });
      setAvatarPreview(null);
    }
    setAvatarFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentResearcher(null);
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarFile(null);
      setAvatarPreview(
        currentResearcher?.avatarUrl || currentResearcher?.avatar_url || null
      );
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let avatarUrl =
      currentResearcher?.avatarUrl || currentResearcher?.avatar_url || null;

    if (avatarFile) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append('file', avatarFile);

        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.message);
        avatarUrl = uploadData.publicUrl;
      } catch (err) {
        toast.error(`Upload failed: ${err.message}`);
        setLoading(false);
        return;
      }
    }

    try {
      const url = currentResearcher
        ? `/api/researchers/${currentResearcher.id}`
        : '/api/researchers';
      const method = currentResearcher ? 'PUT' : 'POST';

      const finalRole = formData.role.trim();

      if (!finalRole) {
        toast.error('Role is required');
        setLoading(false);
        return;
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: '',
          role: finalRole,
          avatarUrl,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Failed to save');

      toast.success(
        currentResearcher ? 'Researcher updated!' : 'Researcher created!'
      );
      closeModal();
      fetchResearchers();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/researchers/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete');

      toast.success('Researcher deleted');
      setDeleteTarget(null);
      fetchResearchers();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteRole = async () => {
    if (!deleteRoleTarget) return;

    setIsDeletingRole(true);
    try {
      const response = await fetch(
        `/api/researchers/roles?role=${encodeURIComponent(deleteRoleTarget)}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete role');

      toast.success(`Role "${deleteRoleTarget}" deleted`);
      setDeleteRoleTarget(null);
      setAddedRoles((prev) => prev.filter((r) => r !== deleteRoleTarget));
      fetchResearchers();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeletingRole(false);
    }
  };

  const handleAddRole = async (e) => {
    e?.preventDefault();
    if (!newRoleInput.trim()) return;

    const roleToAdd = newRoleInput.trim();
    const exists = AVAILABLE_ROLES.some(
      (r) => r.toLowerCase() === roleToAdd.toLowerCase()
    );

    if (exists) {
      toast.error('Role already exists');
      return;
    }

    setIsAddingRole(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setAddedRoles((prev) => [...prev, roleToAdd]);
      setNewRoleInput('');
      toast.success('Role added successfully');
    } catch (err) {
      toast.error('Failed to add role');
    } finally {
      setIsAddingRole(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="flex w-full max-w-full flex-col gap-6">
        {/* Header */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="font-hanken text-2xl leading-8 font-semibold tracking-tight">
            All Researchers
          </h1>
          <div className="flex h-[52px] w-full max-w-md items-center gap-2 rounded-[16px] border border-gray-300 bg-white px-4">
            <input
              type="text"
              placeholder="Search researchers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
            <Image
              src="/icon/search.webp"
              alt="Search"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* Filter & Add */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-[44px] w-full rounded-md border border-gray-300 bg-white px-4 text-sm md:w-[220px]"
            >
              <option value="">All Roles</option>
              {AVAILABLE_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIsRolesModalOpen(true)}
              className="h-[44px] w-full rounded-[12px] border border-gray-300 bg-white px-4 font-medium text-gray-700 transition-colors hover:bg-gray-50 md:w-auto"
            >
              Manage Roles
            </button>
          </div>

          <button
            onClick={() => openModal()}
            className="h-[44px] w-full rounded-[12px] bg-[#2AB2C7] px-6 font-medium text-white transition-opacity hover:opacity-90 md:w-auto"
            disabled={loading}
          >
            Add New Researcher +
          </button>
        </div>

        {/* Table */}
        <div className="flex min-h-[500px] w-full flex-col overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <div className="grid min-w-[1000px] grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr] items-center border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
            <span>Researcher</span>
            <span>Role</span>
            <span>Expertise</span>
            <span>Affiliation</span>
            <span className="justify-self-end">Action</span>
          </div>

          {loading && researchers.length === 0 && (
            <div className="animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="grid min-w-[1000px] grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr] items-center border-b border-gray-100 px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200" />
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-32 rounded bg-gray-200" />
                      <div className="h-3 w-40 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="flex items-center justify-end gap-5">
                    <div className="h-5 w-5 rounded bg-gray-200" />
                    <div className="h-5 w-5 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredResearchers.length === 0 && (
            <div className="flex items-center justify-center py-20 text-gray-500">
              No researchers found.
            </div>
          )}

          {filteredResearchers.map((item) => (
            <div
              key={item.id}
              className="grid min-w-[1000px] grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr] items-center border-b border-gray-100 px-4 py-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    src={
                      item.avatarUrl ||
                      item.avatar_url ||
                      '/icon/db-user-1.webp'
                    }
                    alt={item.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    {item.name}
                  </span>
                  {/* <span className="text-xs text-gray-500">{item.email}</span> */}
                </div>
              </div>

              <span className="text-sm text-gray-600">{item.role}</span>
              <span className="truncate pr-4 text-sm text-gray-600">
                {item.expertise || '-'}
              </span>
              <span className="truncate pr-4 text-sm text-gray-600">
                {item.affiliation || '-'}
              </span>

              <div className="flex items-center justify-end gap-5">
                <Image
                  src="/icon/db-u-edit.webp"
                  alt="Edit"
                  width={20}
                  height={20}
                  className="cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() => openModal(item)}
                />
                <Image
                  src="/icon/db-u-trash.webp"
                  alt="Delete"
                  width={20}
                  height={20}
                  className="cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() => setDeleteTarget(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          />

          <form
            onSubmit={handleSubmit}
            className="relative flex h-full w-full max-w-[800px] flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300"
          >
            {/* Modal Header */}
            <div className="flex h-[80px] flex-shrink-0 items-center border-b border-gray-200 px-8">
              <button
                type="button"
                onClick={closeModal}
                className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xl text-black transition-colors hover:bg-zinc-200"
              >
                ←
              </button>
              <h2 className="font-hanken text-2xl font-bold text-black">
                {currentResearcher
                  ? 'Edit Researcher'
                  : 'Create New Researcher'}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-8 py-10">
              <div className="mx-auto flex w-full max-w-[650px] flex-col gap-9">
                {/* Profile Picture Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        Profile Picture
                      </h4>
                      <p className="text-xs text-gray-500">
                        Upload a professional photo for the researcher profile.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="inline-flex h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Upload New Photo
                    </button>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="flex flex-col gap-6">
                  <FormField
                    label="Full Name"
                    description="The official name of the researcher."
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-gray-900">
                      Role
                    </label>
                    <span className="text-xs text-gray-500 italic">
                      Select a role for the researcher.
                    </span>
                    <select
                      value={formData.role}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '__ADD_NEW__') {
                          setShowAddRoleInput(true);
                          setFormData({ ...formData, role: '' });
                        } else {
                          setShowAddRoleInput(false);
                          setFormData({ ...formData, role: value });
                        }
                      }}
                      className="h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-base outline-none focus:border-[#2AB2C7]"
                      required
                    >
                      <option value="" disabled>
                        -- Select Role --
                      </option>
                      {AVAILABLE_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                      <option value="__ADD_NEW__">+ Add New Role</option>
                    </select>

                    {showAddRoleInput && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={newRoleInput}
                          onChange={(e) => setNewRoleInput(e.target.value)}
                          placeholder="Enter new role name"
                          className="h-[44px] flex-1 rounded-xl border border-zinc-300 bg-white px-4 text-sm outline-none focus:border-[#2AB2C7]"
                        />
                        <button
                          type="button"
                          onClick={handleAddNewRoleFromDropdown}
                          disabled={!newRoleInput.trim() || isAddingRole}
                          className="flex h-[44px] min-w-[80px] items-center justify-center rounded-xl bg-[#2AB2C7] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                          {isAddingRole ? (
                            <CgSpinner className="animate-spin text-xl" />
                          ) : (
                            'Add'
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <FormField
                    label="Expertise"
                    description="Main area of research focus (e.g., AI, Biotechnology)."
                    placeholder="Enter area of expertise"
                    value={formData.expertise}
                    onChange={(e) =>
                      setFormData({ ...formData, expertise: e.target.value })
                    }
                  />

                  <FormField
                    label="Affiliation"
                    description="Current institution or university."
                    placeholder="Enter institution name"
                    value={formData.affiliation}
                    onChange={(e) =>
                      setFormData({ ...formData, affiliation: e.target.value })
                    }
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-gray-900">
                      Description
                    </label>
                    <span className="text-xs text-gray-500 italic">
                      A brief biography or research summary.
                    </span>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter a brief description..."
                      rows={4}
                      className="min-h-[120px] w-full rounded-xl border border-zinc-300 p-4 text-base outline-none focus:border-[#2AB2C7]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex h-[100px] flex-shrink-0 items-center justify-end gap-4 border-t border-gray-200 bg-gray-50 px-8">
              <button
                type="button"
                onClick={closeModal}
                className="h-[52px] min-w-[160px] rounded-xl border border-gray-300 bg-white px-6 text-lg font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex h-[52px] min-w-[160px] items-center justify-center gap-2 rounded-xl bg-[#2AB2C7] px-6 text-lg font-semibold text-white transition-opacity hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <CgSpinner className="animate-spin text-2xl" />
                ) : currentResearcher ? (
                  'Update'
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {isRolesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsRolesModalOpen(false)}
          />
          <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Manage Roles
              </h3>
              <button
                onClick={() => setIsRolesModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="flex w-full flex-col">
              <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-4">
                <label className="text-sm font-medium text-gray-900">
                  Add New Role
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newRoleInput}
                    onChange={(e) => setNewRoleInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddRole(e)}
                    placeholder="Enter role name"
                    className="h-[44px] flex-1 rounded-xl border border-zinc-300 bg-white px-4 text-sm outline-none focus:border-[#2AB2C7]"
                  />
                  <button
                    onClick={handleAddRole}
                    disabled={!newRoleInput.trim() || isAddingRole}
                    className="flex h-[44px] min-w-[100px] items-center justify-center rounded-xl bg-[#2AB2C7] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {isAddingRole ? (
                      <CgSpinner className="animate-spin text-xl" />
                    ) : (
                      'Add Role'
                    )}
                  </button>
                </div>
              </div>

              <div className="flex max-h-[50vh] flex-col overflow-y-auto px-6 py-4">
                <div className="flex flex-col gap-2">
                  {AVAILABLE_ROLES.map((role) => {
                    const isPredefined = PREDEFINED_ROLES.includes(role);
                    return (
                      <div
                        key={role}
                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3"
                      >
                        <span className="font-medium text-gray-700">
                          {role}
                        </span>
                        {!isPredefined && (
                          <button
                            onClick={() => setDeleteRoleTarget(role)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
                            title="Delete Role"
                          >
                            <Image
                              src="/icon/db-u-trash.webp"
                              alt="Delete"
                              width={16}
                              height={16}
                            />
                          </button>
                        )}
                        {isPredefined && (
                          <span className="text-xs text-gray-400">Default</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setIsRolesModalOpen(false)}
                className="w-full rounded-xl bg-[#2AB2C7] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteRoleTarget}
        onClose={() => setDeleteRoleTarget(null)}
        onConfirm={handleDeleteRole}
        title="Delete Role"
        message={`Are you sure you want to delete the role "${deleteRoleTarget}"? This will update all researchers with this role.`}
        confirmText="Delete Role"
        isLoading={isDeletingRole}
        variant="danger"
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Researcher"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
