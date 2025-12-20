'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import FormField from '../_components/FormField';

export default function Researcher() {
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResearcher, setCurrentResearcher] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Principal Investigator',
    expertise: '',
    affiliation: '',
    description: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const RESEARCHER_ROLES = [
    'Principal Investigator',
    "Master's Student",
    'Undergraduate Student',
    'Alumni Researcher',
    'Collaborator',
  ];

  // Fetch researchers
  const fetchResearchers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/researchers', { cache: 'no-store' });
      const data = await response.json();

      if (data.success) {
        setResearchers(data.data);
      } else {
        setError(data.error || 'Failed to fetch researchers');
      }
    } catch (err) {
      console.error('Error fetching researchers:', err);
      setError(err.message);
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
    if (researcher) {
      setCurrentResearcher(researcher);
      setFormData({
        name: researcher.name,
        email: researcher.email,
        role: researcher.role,
        expertise: researcher.expertise || '',
        affiliation: researcher.affiliation || '',
        description: researcher.description || '',
      });
      // Check both avatarUrl (camelCase from schema) and avatar_url (from DB)
      const avatarUrl = researcher.avatarUrl || researcher.avatar_url;
      console.log(
        'Opening modal - Avatar URL:',
        avatarUrl,
        'Researcher:',
        researcher
      );
      setAvatarPreview(avatarUrl || null);
    } else {
      setCurrentResearcher(null);
      setFormData({
        name: '',
        email: '',
        role: 'Principal Investigator',
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
    setFormData({
      name: '',
      email: '',
      role: 'Principal Investigator',
      expertise: '',
      affiliation: '',
      description: '',
    });
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get existing avatar URL - check both field names
      let avatarUrl =
        currentResearcher?.avatarUrl || currentResearcher?.avatar_url || null;
      console.log('Form submit - Current avatar URL:', avatarUrl);

      // Upload avatar if new file selected
      if (avatarFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', avatarFile);

        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok && uploadData.publicUrl) {
          avatarUrl = uploadData.publicUrl;
          console.log('Image uploaded successfully:', avatarUrl);
        } else {
          console.error('Upload failed:', uploadData);
          setError(uploadData.message || 'Failed to upload image');
          return;
        }
      }

      const url = currentResearcher
        ? `/api/researchers/${currentResearcher.id}`
        : '/api/researchers';

      const method = currentResearcher ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          avatarUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchResearchers();
        closeModal();
      } else {
        setError(data.error || 'Failed to save researcher');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
  };

  // Handle delete
  const handleDelete = async (researcherId, researcherName) => {
    if (confirm(`Delete ${researcherName}?`)) {
      try {
        const response = await fetch(`/api/researchers/${researcherId}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          await fetchResearchers();
        } else {
          setError(data.error || 'Failed to delete researcher');
        }
      } catch (err) {
        console.error('Error deleting researcher:', err);
        setError(err.message);
      }
    }
  };

  return (
    <main className="flex h-screen flex-col bg-white">
      {/* HEADER */}
      <div className="flex h-16 w-full items-center justify-between border-b border-zinc-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-black">Manage Researchers</h1>
        <button
          onClick={() => openModal()}
          className="rounded-lg bg-black px-6 py-2 text-white hover:bg-gray-800"
        >
          + Add Researcher
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mx-8 mt-4 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* SEARCH & FILTER */}
      <div className="flex items-center gap-4 border-b border-zinc-100 px-8 py-4">
        <input
          type="text"
          placeholder="Search researchers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-zinc-200 px-4 py-2 text-sm"
        >
          <option value="">All Roles</option>
          {RESEARCHER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE HEADER */}
      <div className="self-stretch border-b border-zinc-100 px-8 py-4">
        <div className="inline-flex w-full items-center justify-between">
          <div className="w-52 text-base leading-5 font-medium text-neutral-400">
            Researchers
          </div>
          <div className="w-40 text-base leading-5 font-medium text-neutral-400">
            Role
          </div>
          <div className="w-40 text-base leading-5 font-medium text-neutral-400">
            Expertise
          </div>
          <div className="w-40 text-base leading-5 font-medium text-neutral-400">
            Affiliation
          </div>
          <div className="w-40 text-base leading-5 font-medium text-neutral-400">
            Contact / Email
          </div>
          <div className="flex items-center justify-end gap-8">
            <div className="w-28 text-base leading-5 font-medium text-neutral-400">
              Actions
            </div>
          </div>
        </div>
      </div>

      {/* TABLE BODY */}
      <div className="flex-1 overflow-y-auto px-8">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : filteredResearchers.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-gray-500">No researchers found</span>
          </div>
        ) : (
          filteredResearchers.map((researcher) => (
            <div
              key={researcher.id}
              className="inline-flex items-center justify-between self-stretch border-b border-zinc-100 py-4 hover:bg-gray-50"
            >
              <div className="flex w-52 items-center gap-3">
                <img
                  src={researcher.avatarUrl || '/placeholder-avatar.png'}
                  alt={researcher.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-black">
                  {researcher.name}
                </span>
              </div>
              <div className="w-40 text-sm text-gray-600">
                {researcher.role}
              </div>
              <div className="w-40 truncate text-sm text-gray-600">
                {researcher.expertise || '-'}
              </div>
              <div className="w-40 truncate text-sm text-gray-600">
                {researcher.affiliation || '-'}
              </div>
              <div className="w-40 text-sm text-gray-600">
                {researcher.email}
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => openModal(researcher)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(researcher.id, researcher.name)}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-black">
              {currentResearcher ? 'Edit Researcher' : 'Add New Researcher'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Section */}
              <div className="mb-6 flex flex-col items-center gap-4">
                <div
                  onClick={triggerFileInput}
                  className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-zinc-300 bg-gray-100 transition hover:border-blue-500"
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">
                      Click to upload
                    </span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <FormField
                label="Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Full name"
                required
              />

              <FormField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email address"
                required
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                  required
                >
                  {RESEARCHER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <FormField
                label="Expertise"
                type="text"
                value={formData.expertise}
                onChange={(e) =>
                  setFormData({ ...formData, expertise: e.target.value })
                }
                placeholder="Main areas of expertise"
              />

              <FormField
                label="Affiliation"
                type="text"
                value={formData.affiliation}
                onChange={(e) =>
                  setFormData({ ...formData, affiliation: e.target.value })
                }
                placeholder="University or institution"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Researcher description"
                  rows="4"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-zinc-200 px-6 py-2 text-black hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-black px-6 py-2 text-white hover:bg-gray-800"
                >
                  {currentResearcher ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
