'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from '../_components/ConfirmModal';
import dynamic from 'next/dynamic';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full animate-pulse rounded-xl bg-gray-100" />
  ),
});
import 'react-quill-new/dist/quill.snow.css';

// FormField Component
function FormField({
  label,
  description,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  className = '',
}) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label className="text-sm font-bold text-gray-700">{label}</label>
      {description && (
        <span className="text-xs text-gray-400">{description}</span>
      )}
      <div className="flex h-[44px] w-full items-center gap-[10px] rounded-[12px] border border-gray-300 bg-white px-4 py-3">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 text-sm outline-none"
        />
      </div>
    </div>
  );
}

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ],
};

export default function ResearchProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [specificYear, setSpecificYear] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const [formData, setFormData] = useState({
    projectTitle: '',
    principalInvestigator: '',
    category: '',
    year: '',
    status: '',
    description: '',
    outputs: '',
    images: [], // Selected image URLs
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
      } else {
        toast.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Error loading projects');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadPromises = files.map(async (file) => {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      return data.publicUrl;
    });

    try {
      toast.loading('Uploading images...', { id: 'upload' });
      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      toast.success('Images uploaded successfully', { id: 'upload' });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload one or more images', { id: 'upload' });
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.projectTitle) {
      toast.error('Project title is required');
      return;
    }

    try {
      setSaving(true);
      const projectData = {
        title: formData.projectTitle,
        principalInvestigator: formData.principalInvestigator,
        researcherCategory: formData.category,
        year: formData.year,
        status: formData.status,
        description: formData.description,
        results: formData.outputs,
        images: formData.images,
      };

      const url = currentProject
        ? `/api/projects/${currentProject.id}`
        : '/api/projects';

      const method = currentProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          currentProject
            ? 'Project updated successfully'
            : 'Project created successfully'
        );
        setIsModalOpen(false);
        fetchProjects();
      } else {
        toast.error(data.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Project deleted successfully');
        setDeleteTarget(null);
        fetchProjects();
      } else {
        toast.error(data.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) &&
      (specificYear ? project.year === specificYear : true)
  );

  const openModal = (project = null) => {
    setCurrentProject(project);
    if (project) {
      setFormData({
        projectTitle: project.title,
        principalInvestigator: project.principalInvestigator || '',
        category: project.researcherCategory || '',
        year: project.year || '',
        status: project.status
          ? project.status.charAt(0).toUpperCase() + project.status.slice(1)
          : '',
        description: project.description || '',
        outputs: project.results || '',
        images: project.media ? project.media.map((m) => m.url) : [],
      });
    } else {
      setFormData({
        projectTitle: '',
        principalInvestigator: '',
        category: '',
        year: '',
        status: '',
        description: '',
        outputs: '',
        images: [],
      });
    }
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return 'bg-green-500';
      case 'ongoing':
        return 'bg-yellow-500';
      case 'upcoming':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="flex w-full max-w-full flex-col gap-6">
        {/* Header */}
        <div className="flex w-full flex-col gap-4">
          <h1 className="font-hanken text-2xl leading-8 font-semibold tracking-tight">
            Research Projects
          </h1>
          <div className="flex h-[52px] w-full max-w-md items-center gap-2 rounded-[16px] border border-gray-300 bg-white px-4">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
            <Image src="/icon/search.webp" alt="Search" width={20} height={20} />
          </div>
        </div>

        {/* Filter & Add Button */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <select
              value={specificYear}
              onChange={(e) => setSpecificYear(e.target.value)}
              className="h-[44px] w-[140px] rounded-[12px] border border-gray-300 bg-white px-4 text-sm font-medium outline-none"
            >
              <option value="">All Years</option>
              {[2025, 2024, 2023, 2022, 2021].map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => openModal()}
            className="h-[44px] rounded-[12px] bg-[#2AB2C7] px-8 font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            Add New Project +
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-hidden overflow-x-auto rounded-[20px] border border-gray-200 bg-white shadow-sm">
          <div className="grid min-w-[900px] grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_1fr] border-b border-gray-200 bg-gray-50/50 px-6 py-4 text-sm font-bold text-gray-700">
            <span>Project Title</span>
            <span>Year</span>
            <span>PI</span>
            <span>Category</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="flex flex-col">
            {loading ? (
              <div className="animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="grid min-w-[900px] grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_1fr] items-center border-b border-gray-100 px-6 py-5"
                  >
                    <div className="h-5 w-48 rounded bg-gray-200" />
                    <div className="h-4 w-12 rounded bg-gray-200" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="h-4 w-28 rounded bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                      <div className="h-4 w-16 rounded bg-gray-200" />
                    </div>
                    <div className="flex items-center justify-end gap-5">
                      <div className="h-5 w-5 rounded bg-gray-200" />
                      <div className="h-5 w-5 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <span className="mb-4 text-4xl"></span>
                <p>No projects found matching your criteria.</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="grid min-w-[900px] grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_1fr] items-center border-b border-gray-100 px-6 py-5 transition-colors hover:bg-gray-50/80"
                >
                  <span className="line-clamp-2 pr-4 text-sm font-bold text-gray-900">
                    {project.title}
                  </span>
                  <span className="text-sm text-gray-600">
                    {project.year || '-'}
                  </span>
                  <span className="truncate pr-4 text-sm text-gray-600">
                    {project.principalInvestigator || '-'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {project.researcherCategory || '-'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${getStatusColor(project.status)}`}
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {project.status || 'upcoming'}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-5">
                    <Image
                      src="/icon/db-u-edit.webp"
                      alt="Edit"
                      width={20}
                      height={20}
                      className="cursor-pointer transition-transform hover:scale-110"
                      onClick={() => openModal(project)}
                    />
                    <Image
                      src="/icon/db-u-trash.webp"
                      alt="Delete"
                      width={20}
                      height={20}
                      className="cursor-pointer transition-transform hover:scale-110"
                      onClick={() => setDeleteTarget(project)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative flex h-full w-full max-w-[1100px] flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300">
            {/* Header */}
            <div className="flex h-[80px] flex-shrink-0 items-center border-b border-gray-200 px-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xl transition-colors hover:bg-zinc-200"
              >
                ←
              </button>
              <h2 className="font-hanken text-2xl font-bold">
                {currentProject
                  ? 'Edit Research Project'
                  : 'Add New Research Project'}
              </h2>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-10">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                {/* Left Column */}
                <div className="flex flex-col gap-8">
                  <FormField
                    label="Project Title"
                    description="The full official title of the research project."
                    placeholder="Enter project title"
                    value={formData.projectTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, projectTitle: e.target.value })
                    }
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">
                        Project Year
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({ ...formData, year: e.target.value })
                        }
                        className="h-[44px] w-full rounded-[12px] border border-gray-300 bg-white px-4 text-sm outline-none"
                      >
                        <option value="">Select Year</option>
                        {[2025, 2024, 2023, 2022, 2021].map((y) => (
                          <option key={y} value={y.toString()}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="h-[44px] w-full rounded-[12px] border border-gray-300 bg-white px-4 text-sm outline-none"
                      >
                        <option value="">Select Status</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                    </div>
                  </div>

                  <FormField
                    label="Principal Investigator"
                    description="Lead researcher responsible for the project."
                    placeholder="Enter name"
                    value={formData.principalInvestigator}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        principalInvestigator: e.target.value,
                      })
                    }
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      Researcher Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="h-[44px] w-full rounded-[12px] border border-gray-300 bg-white px-4 text-sm outline-none"
                    >
                      <option value="">Category</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Master's Student">Masters Student</option>
                      <option value="Undergraduate Student">
                        Undergraduate Student
                      </option>
                      <option value="Alumni Researchers">
                        Alumni Researchers
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      Description
                    </label>
                    <span className="text-xs text-gray-400">
                      Detailed overview of goals and methods.
                    </span>
                    <div className="min-h-[250px] overflow-hidden rounded-xl border border-gray-300 bg-white">
                      <ReactQuill
                        theme="snow"
                        value={formData.description}
                        onChange={(val) =>
                          setFormData({ ...formData, description: val })
                        }
                        modules={QUILL_MODULES}
                        className="h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      Research Outputs
                    </label>
                    <span className="text-xs text-gray-400">
                      Summarize key findings and results.
                    </span>
                    <div className="min-h-[250px] overflow-hidden rounded-xl border border-gray-300 bg-white">
                      <ReactQuill
                        theme="snow"
                        value={formData.outputs}
                        onChange={(val) =>
                          setFormData({ ...formData, outputs: val })
                        }
                        modules={QUILL_MODULES}
                        className="h-full"
                      />
                    </div>
                  </div>

                  {/* Supporting Documents / Image Upload */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-gray-700">
                      Supporting Documents (Images)
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100"
                    >
                      <span className="text-3xl"></span>
                      <p className="text-xs font-medium text-gray-500">
                        Click to upload project images (JPG, PNG)
                      </p>
                      <button className="rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-xs font-bold text-gray-700 shadow-sm">
                        Select Files
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />

                    {/* Image Preview Grid */}
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      {formData.images.map((url, idx) => (
                        <div
                          key={idx}
                          className="group relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                        >
                          <Image
                            src={url}
                            alt={`Media ${idx}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(idx);
                            }}
                            className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex h-[100px] flex-shrink-0 items-center justify-end gap-4 border-t border-gray-200 bg-gray-50 px-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-[52px] min-w-[140px] rounded-xl border border-gray-300 bg-white font-bold text-gray-600 transition-colors hover:bg-gray-100"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex h-[52px] min-w-[160px] items-center justify-center rounded-xl bg-[#2AB2C7] font-bold text-white shadow-lg shadow-[#2AB2C7]/20 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                disabled={saving}
              >
                {saving ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : currentProject ? (
                  'Update Project'
                ) : (
                  'Save Project'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles for Quill */}
      <style jsx global>{`
        .ql-container {
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          border: none !important;
          font-family: inherit;
        }
        .ql-toolbar {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          border: none !important;
          border-bottom: 1px solid #e5e7eb !important;
        }
        .ql-editor {
          min-h-[200px];
        }
      `}</style>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.projectTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
