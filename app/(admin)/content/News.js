'use client';

import { useEffect, useState, useMemo } from 'react';

export default function NewsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    imageUrl: '',
    isFeatured: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/news', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
        const response = await res.json();
        if (!active) return;
        const list = response.data || [];
        setItems(list);
      } catch (e) {
        setError(e.message || 'Failed to load news');
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
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        content: data.content || '',
        imageUrl: data.imageUrl || data.image_url || '',
        isFeatured: data.isFeatured || data.is_featured || false,
      });
    } else {
      setCurrentEditId(null);
      setFormData({
        title: '',
        slug: '',
        content: '',
        imageUrl: '',
        isFeatured: false,
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      slug: '',
      content: '',
      imageUrl: '',
      isFeatured: false,
    });
    setCurrentEditId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Auto-generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setFormData((prev) => ({ ...prev, slug }));
  };

  const onUploadImage = async (file) => {
    if (!file) return;
    setLoading(true);
    setError('');
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
      setError(e.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.slug.trim()) {
      setError('Slug is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl.trim(),
        isFeatured: formData.isFeatured,
      };

      if (currentEditId) {
        const res = await fetch(`/api/news/${currentEditId}`, {
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
        const res = await fetch('/api/news', {
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
      setError(e.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this news?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
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
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(query);
        const matchContent = item.content?.toLowerCase().includes(query);
        if (!matchTitle && !matchContent) return false;
      }

      return true;
    });
  }, [items, searchQuery]);

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
          All News
        </div>
        <div className="inline-flex w-full md:w-auto items-center justify-start gap-3 self-stretch rounded-2xl bg-white px-5 py-4 outline outline-1 outline-offset-[-1px] outline-zinc-300">
          <div className="relative h-5 w-5">
            <div className="absolute top-[1.67px] left-[1.67px] h-4 w-4 outline outline-[1.25px] outline-offset-[-0.63px] outline-neutral-400" />
            <div className="absolute top-[16.67px] left-[16.67px] h-[1.67px] w-[1.67px] outline outline-[1.25px] outline-offset-[-0.63px] outline-neutral-400" />
            <div className="absolute top-0 left-0 h-5 w-5 opacity-0" />
          </div>
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
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Filter Section & Add Button */}
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-neutral-500">
            Showing {filteredItems.length} items
          </div>
        </div>
        <button
          onClick={() => openModal('add')}
          className="flex w-full md:w-auto items-center justify-center gap-2.5 rounded-2xl bg-[#2AB2C7] px-6 py-3 text-white transition-opacity hover:opacity-90"
        >
          <div className="text-base leading-5 font-medium">Add New News</div>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
              <div className="mb-6 text-2xl font-semibold text-zinc-800">
                {modalType === 'add' ? 'Add New News' : 'Edit News'}
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
                    onBlur={generateSlug}
                    placeholder="Enter news title"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="url-friendly-slug"
                      className="flex-1 rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-zinc-50"
                    >
                      Auto-generate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Enter news content"
                    rows={8}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Featured Image
                  </label>
                  <div className="flex flex-col gap-3">
                    {/* Custom Upload Area */}
                    <div
                      onClick={() =>
                        document.getElementById('newsFileInput')?.click()
                      }
                      className="inline-flex cursor-pointer flex-col items-center justify-start gap-4 self-stretch rounded-2xl px-5 py-8 outline outline-1 outline-offset-[-1px] outline-stone-300 transition-colors hover:bg-zinc-50"
                    >
                      <div className="flex flex-col items-center justify-start gap-2">
                        <div className="relative h-8 w-8">
                          <div className="absolute top-[14.67px] left-[9.33px] h-2 w-[2.67px] outline outline-1 outline-offset-[-0.55px] outline-stone-500" />
                          <div className="absolute top-[14.67px] left-[12px] h-[2.67px] w-[2.67px] outline outline-1 outline-offset-[-0.55px] outline-stone-500" />
                          <div className="absolute top-[2.67px] left-[2.67px] h-7 w-7 outline outline-1 outline-offset-[-0.55px] outline-stone-500" />
                          <div className="absolute top-[2.67px] left-[18.67px] h-2.5 w-2.5 outline outline-1 outline-offset-[-0.55px] outline-stone-500" />
                          <div className="absolute top-0 left-0 h-8 w-8 opacity-0" />
                        </div>
                        <div className="w-60 text-center text-base leading-5 font-normal text-stone-500">
                          Attach a featured image for this news article
                        </div>
                      </div>
                      <div className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-5 py-2 outline outline-1 outline-offset-[-1px] outline-zinc-300">
                        <div className="text-base leading-5 font-medium text-zinc-800">
                          Browse File
                        </div>
                      </div>
                    </div>
                    <input
                      id="newsFileInput"
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

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="h-5 w-5 rounded border-zinc-300 text-[#2AB2C7] focus:ring-2 focus:ring-[#2AB2C7]"
                  />
                  <label className="text-sm font-medium text-zinc-700">
                    Mark as Featured News
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="rounded-xl border border-zinc-300 bg-white px-6 py-3 text-base font-medium text-neutral-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="rounded-xl bg-[#2AB2C7] px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Content */}
      <div className="overflow-x-auto rounded-2xl bg-white px-6 py-3 shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-100">
        <div className="min-w-[900px] border-b border-zinc-100 py-4">
          <div className="flex items-center justify-between">
            <div className="flex w-[548px] items-center gap-6">
              <div className="w-5 text-base text-neutral-400">Pin</div>
              <div className="w-96 text-base text-neutral-400">Content</div>
            </div>
            <div className="w-36 text-base text-neutral-400">Featured</div>
            <div className="w-20 text-base text-neutral-400">Date</div>
            <div className="w-28 text-base text-neutral-400">Actions</div>
          </div>
        </div>

        {/* News Items */}
        {paginatedItems.map((item) => {
          const imageUrl = item.imageUrl || item.image_url;
          const createdAt = item.createdAt || item.created_at;
          const isFeatured = item.isFeatured || item.is_featured;

          return (
            <div
              key={item.id}
              className="min-w-[900px] flex items-center justify-between rounded-[56px] py-3"
            >
              <div className="flex items-center gap-6">
                <div className="relative h-6 w-6">
                  <div className="absolute top-[2.08px] left-[2px] h-5 w-5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-24 w-32 overflow-hidden rounded-3xl bg-stone-300">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 px-2">
                    <div className="line-clamp-2 self-stretch text-base leading-5 font-normal text-black">
                      {item.title}
                    </div>
                    <div className="line-clamp-2 w-80 text-sm leading-4 font-normal text-neutral-500">
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-36 text-base leading-5 font-normal text-zinc-800">
                {isFeatured ? (
                  <span className="rounded-full bg-[#2AB2C7]/10 px-3 py-1 text-sm font-medium text-[#2AB2C7]">
                    Featured
                  </span>
                ) : (
                  <span className="text-neutral-400">-</span>
                )}
              </div>
              <div className="w-20 text-base leading-5 font-normal text-zinc-800">
                {createdAt
                  ? new Date(createdAt).toLocaleDateString('id-ID', {
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
            No news yet. Click Add New News to get started.
          </div>
        )}

        {loading && (
          <div className="py-12 text-center text-neutral-400">Loading...</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between px-4">
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
                    className={`flex h-[40px] w-[40px] items-center justify-center rounded-lg text-sm transition-colors ${currentPage === page
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
