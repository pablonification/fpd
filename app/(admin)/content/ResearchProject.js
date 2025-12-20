'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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
      <div className="flex h-[44px] w-full items-center gap-[10px] rounded-[12px] border border-gray-300 px-4 py-3">
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

// TextArea Component
function TextAreaField({
  label,
  description,
  placeholder = '',
  value,
  onChange,
  rows = 4,
  className = '',
}) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label className="text-sm font-bold text-gray-700">{label}</label>
      {description && (
        <span className="text-xs text-gray-400">{description}</span>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full resize-none rounded-[12px] border border-gray-300 px-4 py-3 text-sm outline-none"
      />
    </div>
  );
}

export default function ResearchProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
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
  });

  // Fetch projects from API
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

  const handleSubmit = async () => {
    try {
      const projectData = {
        title: formData.projectTitle,
        principalInvestigator: formData.principalInvestigator,
        researcherCategory: formData.category,
        year: formData.year,
        status: formData.status,
        description: formData.description,
        results: formData.outputs,
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
        fetchProjects(); // Refresh list
      } else {
        toast.error(data.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Error saving project');
    }
  };

  const handleDelete = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Project deleted successfully');
        fetchProjects();
      } else {
        toast.error(data.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project');
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
      case 'running':
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
          <h1 className="text-2xl leading-8 font-semibold tracking-tight">
            All Research Projects
          </h1>
          <div className="flex h-[52px] w-full max-w-md items-center gap-2 rounded-[16px] border border-gray-300 px-4">
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
          </div>
        </div>

        {/* Filter & Add Button */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full gap-4 md:w-auto">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="h-[44px] flex-1 rounded-[12px] border border-gray-300 px-4 text-sm outline-none md:flex-none md:w-[120px]"
            >
              <option value="">Year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>

            <select
              value={specificYear}
              onChange={(e) => setSpecificYear(e.target.value)}
              className="h-[44px] flex-1 rounded-[12px] border border-gray-300 px-4 text-sm outline-none md:flex-none md:w-[120px]"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <button
            onClick={() => openModal()}
            className="h-[44px] w-full rounded-[12px] bg-[#2AB2C7] px-6 font-medium text-white hover:opacity-90 md:w-auto"
          >
            Add New Project +
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid min-w-[900px] grid-cols-[2fr_0.8fr_1.5fr_1.2fr_0.8fr_0.8fr] gap-4 border-b border-gray-200 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-700">
            <span>Project Title</span>
            <span>Year</span>
            <span>Principal Investigator</span>
            <span>Researcher Category</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Table Rows */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <span className="text-gray-500">No projects found</span>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="grid min-w-[900px] grid-cols-[2fr_0.8fr_1.5fr_1.2fr_0.8fr_0.8fr] items-center gap-4 border-b border-gray-100 px-6 py-4 hover:bg-gray-50"
              >
                <span className="text-sm">{project.title}</span>
                <span className="text-sm">{project.year || '-'}</span>
                <span className="text-sm">
                  {project.principalInvestigator || '-'}
                </span>
                <span className="text-sm">
                  {project.researcherCategory || '-'}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`}
                  ></span>
                  <span className="text-sm capitalize">
                    {project.status || 'upcoming'}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <div className="flex items-center justify-end gap-4">
                    <Image
                      src="/icon/db-u-edit.png"
                      alt="Edit"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => openModal(project)}
                    />
                    <Image
                      src="/icon/db-u-trash.png"
                      alt="Delete"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => handleDelete(project.id)}
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
              </div>
            ))
          )}
        </div>

        {/* Footer Pagination */}
        <div className="flex h-[40px] w-full items-center justify-between px-4">
          <span className="text-sm text-gray-600">
            Showing 1 to 15 of 1000 entries
          </span>
          <div className="flex gap-2">
            <button className="flex h-[40px] w-[120px] items-center justify-center rounded-[16px] border border-gray-300 bg-white text-sm hover:bg-gray-50">
              ← Previous
            </button>
            <button className="flex h-[40px] w-[120px] items-center justify-center rounded-[16px] border border-gray-300 bg-white text-sm hover:bg-gray-50">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 backdrop-blur-sm">
          <div
            className={`fixed top-0 right-0 h-full bg-white shadow-2xl transition-transform duration-300 
              w-full sm:w-[500px] md:w-[700px] lg:w-[1070px]
              ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Header */}
            <div className="flex h-[80px] items-center border-b border-gray-200 px-4 md:px-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
              >
                ←
              </button>
              <h2 className="text-xl md:text-2xl font-semibold">
                {currentProject
                  ? 'Edit Research Project'
                  : 'Create New Research Project'}
              </h2>
            </div>

            {/* Content */}
            <div className="h-[calc(100%-160px)] overflow-y-auto px-4 py-6 md:px-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                  <FormField
                    label="Project Title"
                    description="Provide the full title of the research project."
                    placeholder="Enter project title"
                    value={formData.projectTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, projectTitle: e.target.value })
                    }
                  />

                  <FormField
                    label="Principal Investigator"
                    description="Enter the name of the lead researcher responsible for this project."
                    placeholder="Enter name"
                    value={formData.principalInvestigator}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        principalInvestigator: e.target.value,
                      })
                    }
                  />

                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      Researcher Category
                    </label>
                    <span className="text-xs text-gray-400">
                      Select the researcher category that matches the role or
                      level of the researcher.
                    </span>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="h-[44px] w-full rounded-[12px] border border-gray-300 px-4 text-sm outline-none"
                    >
                      <option value="">Researcher category</option>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex w-full flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">
                        Year
                      </label>
                      <span className="text-xs text-gray-400">
                        Choose the year this research was conducted.
                      </span>
                      <select
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({ ...formData, year: e.target.value })
                        }
                        className="h-[44px] w-full rounded-[12px] border border-gray-300 px-4 text-sm outline-none"
                      >
                        <option value="">Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                      </select>
                    </div>

                    <div className="flex w-full flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">
                        Status
                      </label>
                      <span className="text-xs text-gray-400">
                        Select the current status of the research.
                      </span>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="h-[44px] w-full rounded-[12px] border border-gray-300 px-4 text-sm outline-none"
                      >
                        <option value="">Status</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                    </div>
                  </div>

                  <TextAreaField
                    label="Description"
                    description="Write a brief overview of the research scope, objectives, or focus."
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={6}
                  />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                  <TextAreaField
                    label="Research Outputs"
                    description="Summarize the key findings or results produced from the research."
                    placeholder="Enter research outputs"
                    value={formData.outputs}
                    onChange={(e) =>
                      setFormData({ ...formData, outputs: e.target.value })
                    }
                    rows={10}
                  />

                  {/* File Upload Area */}
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      Supporting Documents
                    </label>
                    <span className="text-xs text-gray-400">
                      Upload supporting documents or images such as reports,
                      publications, or research data.
                    </span>
                    <div className="flex h-[200px] w-full flex-col items-center justify-center gap-3 rounded-[12px] border-2 border-dashed border-gray-300 bg-gray-50">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                        ⏱️
                      </div>
                      <p className="max-w-[300px] text-center text-xs text-gray-500">
                        Upload supporting documents or images such as reports,
                        publications, or research data.
                      </p>
                      <button className="rounded-[12px] border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Browse File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="absolute right-0 bottom-0 left-0 flex h-[80px] items-center justify-end gap-4 border-t border-gray-200 px-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-[44px] w-[120px] rounded-[12px] border border-gray-300 bg-white font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="h-[44px] w-[120px] rounded-[12px] bg-[#2AB2C7] font-medium text-white hover:opacity-90"
              >
                {currentProject ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
