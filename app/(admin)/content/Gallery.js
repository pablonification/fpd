'use client';

import { useEffect, useState, useMemo } from 'react';

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [contentType, setContentType] = useState('image');
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activityType: '',
    imageUrl: '',
    youtubeUrl: '',
    activityDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
        const response = await res.json();
        if (!active) return;
        const list = response.data || [];
        setItems(list);
      } catch (e) {
        setError(e.message || 'Failed to load gallery');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const openModal = (type, data = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (data) {
      setCurrentEditId(data.id);
      const itemType = data.media_type_column || data.type;
      const rawDate = data.activity_date || data.activityDate;
      const formattedDateForInput = rawDate
        ? new Date(rawDate).toISOString().split('T')[0]
        : '';
      setFormData({
        title: data.title || '',
        description: data.description || '',
        activityType: data.category || '',
        imageUrl:
          itemType === 'image' || itemType === 'photo'
            ? data.media_url || data.mediaUrl
            : '',
        youtubeUrl: itemType === 'video' ? data.media_url || data.mediaUrl : '',
        activityDate: formattedDateForInput,
      });
      setContentType(
        itemType === 'image' || itemType === 'photo' ? 'image' : 'video'
      );
    } else {
      setCurrentEditId(null);
      setFormData({
        title: '',
        description: '',
        activityType: '',
        imageUrl: '',
        youtubeUrl: '',
        activityDate: '',
      });
      setContentType('image');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      activityType: '',
      imageUrl: '',
      youtubeUrl: '',
      activityDate: '',
    });
    setContentType('image');
    setCurrentEditId(null);
    setModalError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const youtubeEmbedUrl = useMemo(() => {
    if (!formData.youtubeUrl) return '';
    const regex = /(?:v=|\.be\/)([A-Za-z0-9_-]{6,11})/;
    const match = formData.youtubeUrl.match(regex);
    const id = match ? match[1] : null;
    return id ? `https://www.youtube.com/embed/${id}` : '';
  }, [formData.youtubeUrl]);

  const onUploadImage = async (file) => {
    if (!file) return;
    setUploading(true);
    setModalError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const { publicUrl } = await res.json();
      setFormData((prev) => ({ ...prev, imageUrl: publicUrl }));
    } catch (e) {
      setModalError(e.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setModalError('');
    if (!formData.title.trim()) {
      setModalError('Title is required');
      return;
    }
    if (!formData.activityType) {
      setModalError('Activity Type is required');
      return;
    }
    if (!formData.activityDate) {
      setModalError('Activity Date is required');
      return;
    }
    if (contentType === 'image' && !formData.imageUrl.trim()) {
      setModalError('Please upload an image');
      return;
    }
    if (contentType === 'video' && !formData.youtubeUrl.trim()) {
      setModalError('Please enter a YouTube URL');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        type: contentType === 'image' ? 'photo' : 'video',
        mediaUrl:
          contentType === 'image'
            ? formData.imageUrl.trim()
            : formData.youtubeUrl.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.activityType,
        activityDate: formData.activityDate,
      };

      if (currentEditId) {
        const res = await fetch(`/api/gallery/${currentEditId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Update failed: ${res.status}`);
        }
        const result = await res.json();
        setItems((prev) =>
          prev.map((it) => (it.id === currentEditId ? result.data : it))
        );
      } else {
        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Create failed: ${res.status}`);
        }
        const result = await res.json();
        setItems((prev) => [result.data, ...prev]);
      }
      closeModal();
    } catch (e) {
      setModalError(e.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this item?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (e) {
      setError(e.message || 'Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  // Filter and pagination
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemType = item.type || item.media_type_column;
      if (filterType && itemType !== filterType) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(query);
        const matchDescription = item.description
          ?.toLowerCase()
          .includes(query);
        if (!matchTitle && !matchDescription) return false;
      }

      return true;
    });
  }, [items, filterType, searchQuery]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-zinc-50 p-6">
      {/* Header with Search */}
      <div className="inline-flex w-full flex-col items-start justify-start gap-4">
        <div className="text-2xl leading-8 font-semibold text-black">
          All Gallery
        </div>
        <div className="inline-flex w-full items-center justify-start gap-3 self-stretch rounded-2xl bg-white px-5 py-4 outline outline-1 outline-offset-[-1px] outline-zinc-300 md:w-auto">
          <input
            type="text"
            placeholder="Search here.."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 text-base leading-5 font-normal text-black outline-none placeholder:text-neutral-400"
          />
          <img src="/icon/search.png" alt="Search" className="h-5 w-5" />
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Filter Section & Add Button */}
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="h-[44px] w-full rounded-xl border border-zinc-300 px-4 text-sm transition-colors outline-none focus:border-[#2AB2C7] md:w-[180px]"
          >
            <option value="">All Types</option>
            <option value="photo">Photos</option>
            <option value="video">Videos</option>
          </select>
          <div className="text-sm text-neutral-500">
            Showing {filteredItems.length} items
          </div>
        </div>
        <button
          onClick={() => openModal('add')}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#2AB2C7] px-6 py-3 text-white transition-opacity hover:opacity-90 md:w-auto"
        >
          <div className="text-base leading-5 font-medium">Add New Content</div>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
              <div className="mb-6 text-2xl font-semibold text-zinc-800">
                {modalType === 'add' ? 'Add New Content' : 'Edit Content'}
              </div>

              {modalError && (
                <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                  {modalError}
                </div>
              )}

              {/* Content Type Selector */}
              <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <div className="text-base text-neutral-600">Content Type:</div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setContentType('image')}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                      contentType === 'image'
                        ? 'bg-primary-700 text-white'
                        : 'bg-zinc-100 text-neutral-600 hover:bg-zinc-200'
                    }`}
                  >
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentType('video')}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                      contentType === 'video'
                        ? 'bg-primary-700 text-white'
                        : 'bg-zinc-100 text-neutral-600 hover:bg-zinc-200'
                    }`}
                  >
                    Video (YouTube)
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter content title"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                    rows={4}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Activity Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="activityType"
                    value={formData.activityType}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  >
                    <option value="">Select Activity Type</option>
                    <option value="Laboratory Activities">
                      Laboratory Activities
                    </option>
                    <option value="Field Research">Field Research</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Activity Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="activityDate"
                    value={formData.activityDate}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                {contentType === 'image' ? (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      Upload Image <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col gap-3">
                      {/* Custom Upload Area */}
                      <div
                        onClick={() =>
                          !uploading &&
                          document.getElementById('fileInput')?.click()
                        }
                        className={`inline-flex cursor-pointer flex-col items-center justify-start gap-4 self-stretch rounded-2xl px-5 py-8 outline outline-1 outline-offset-[-1px] outline-stone-300 transition-colors hover:bg-zinc-50 ${uploading ? 'pointer-events-none opacity-50' : ''}`}
                      >
                        {uploading ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2AB2C7] border-t-transparent" />
                            <div className="text-base font-medium text-[#2AB2C7]">
                              Uploading...
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col items-center justify-start gap-2">
                              <div className="relative h-8 w-8">
                                <div className="absolute top-[14.67px] left-[9.33px] h-2 w-[2.67px] outline outline-1 outline-offset-[-0.55px] outline-stone-500" />
                                <div className="absolute top-[14.67px] left-[12px] h-[2.67px] w-[2.67px] outline outline-1 outline-offset-[-0.55px] outline-stone-500" />
                                <div className="absolute top-[2.67px] left-[2.67px] h-7 w-7 outline outline-1 outline-offset-[-0.55px] outline-stone-500" />
                                <div className="absolute top-[2.67px] left-[18.67px] h-2.5 w-2.5 outline outline-1 outline-offset-[-0.55px] outline-stone-500" />
                                <div className="absolute top-0 left-0 h-8 w-8 opacity-0" />
                              </div>
                              <div className="max-w-[240px] text-center text-base leading-5 font-normal text-stone-500">
                                Attach documents, PDFs, or images related to
                                your gallery content
                              </div>
                            </div>
                            <div className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-5 py-2 outline outline-1 outline-offset-[-1px] outline-zinc-300">
                              <div className="text-base leading-5 font-medium text-zinc-800">
                                Browse File
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => onUploadImage(e.target.files?.[0])}
                        className="hidden"
                      />
                      {formData.imageUrl && (
                        <div className="overflow-hidden rounded-xl border border-zinc-200">
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="h-64 w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      YouTube Link <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="youtubeUrl"
                      value={formData.youtubeUrl}
                      onChange={handleInputChange}
                      placeholder="Paste YouTube link here"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {youtubeEmbedUrl && (
                      <div className="mt-3 overflow-hidden rounded-xl border border-zinc-200">
                        <div className="relative h-0 pb-[56.25%]">
                          <iframe
                            src={youtubeEmbedUrl}
                            title="YouTube preview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 h-full w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  onClick={closeModal}
                  disabled={saving || uploading}
                  className="rounded-xl border border-zinc-300 bg-white px-6 py-3 text-base font-medium text-neutral-600 hover:bg-zinc-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving || uploading}
                  className="bg-primary-700 hover:bg-primary-700 rounded-xl px-6 py-3 text-base font-medium text-white disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Content */}
      <div className="overflow-x-auto rounded-2xl bg-white px-6 py-3 shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-100">
        <div className="min-w-[900px] border-b border-zinc-100 py-4">
          <div className="flex items-center justify-between">
            <div className="flex w-[548px] items-center gap-6">
              <div className="w-5 text-base text-neutral-400">Pin</div>
              <div className="w-96 text-base text-neutral-400">Content</div>
            </div>
            <div className="w-36 text-base text-neutral-400">Category</div>
            <div className="w-20 text-base text-neutral-400">Date</div>
            <div className="w-28 text-base text-neutral-400">Actions</div>
          </div>
        </div>

        {/* Gallery Items */}
        {paginatedItems.map((item) => {
          const itemType = item.media_type_column || item.type;
          const mediaUrl = item.media_url || item.mediaUrl;
          const activityDate = item.activity_date || item.activityDate;

          return (
            <div
              key={item.id}
              className="flex min-w-[900px] items-center justify-between rounded-[56px] py-3"
            >
              <div className="flex items-center gap-6">
                <div className="relative h-6 w-6">
                  <div className="absolute top-[2.08px] left-[2px] h-5 w-5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-24 w-32 overflow-hidden rounded-3xl bg-stone-300">
                    {(itemType === 'image' || itemType === 'photo') &&
                      mediaUrl && (
                        <img
                          src={mediaUrl}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    {itemType === 'video' && (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-600 text-xs font-semibold text-white">
                        Video
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 px-2">
                    <div className="line-clamp-2 self-stretch text-base leading-5 font-normal text-black">
                      {item.title}
                    </div>
                    <div className="w-80 text-sm leading-4 font-normal text-neutral-500">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-36 text-base leading-5 font-normal text-zinc-800">
                {itemType === 'image' || itemType === 'photo'
                  ? 'Image'
                  : 'Video'}
              </div>
              <div className="w-20 text-base leading-5 font-normal text-zinc-800">
                {activityDate
                  ? new Date(activityDate).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '-'}
              </div>
              <div className="flex w-28 items-center gap-4">
                <button
                  onClick={() => openModal('edit', item)}
                  className="relative h-5 w-5 cursor-pointer"
                  title="Edit"
                >
                  <svg
                    className="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="relative h-5 w-5 cursor-pointer"
                  title="Delete"
                >
                  <svg
                    className="h-5 w-5 text-red-500 hover:text-red-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}

        {paginatedItems.length === 0 && !loading && (
          <div className="py-12 text-center text-neutral-400">
            No gallery items yet. Click Add New Content to get started.
          </div>
        )}

        {loading && (
          <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex min-w-[900px] items-center justify-between rounded-[56px] py-3"
              >
                <div className="flex items-center gap-6">
                  <div className="h-6 w-6 rounded bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <div className="h-24 w-32 rounded-3xl bg-gray-200" />
                    <div className="flex flex-col gap-2 px-2">
                      <div className="h-5 w-48 rounded bg-gray-200" />
                      <div className="h-4 w-64 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
                <div className="h-5 w-16 rounded bg-gray-200" />
                <div className="h-5 w-20 rounded bg-gray-200" />
                <div className="flex w-28 items-center gap-4">
                  <div className="h-5 w-5 rounded bg-gray-200" />
                  <div className="h-5 w-5 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 px-4 md:flex-row md:justify-between">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{' '}
            {filteredItems.length} items
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-[40px] w-[142px] items-center justify-center gap-[10px] rounded-[16px] border border-zinc-300 bg-white px-[24px] py-[8px] text-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
