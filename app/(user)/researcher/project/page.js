'use client';

import { useState, useEffect } from 'react';
import FilterDropdown from './_components/FilterDropdown';
import YearDropdown from './_components/YearDropdown';
import ProjectCard from './_components/ProjectCard';

export default function ResearchProject() {
  const [tab, setTab] = useState('ongoing');
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = [
    'Supervisors',
    "Master's Students",
    'Undergraduate Students',
    'Alumni Researchers',
  ];

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, [tab]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const statusMap = {
        ongoing: 'running',
        completed: 'completed',
        upcomming: 'upcoming',
      };

      const url = `/api/projects?status=${statusMap[tab]}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter berdasarkan filter dropdown
  const filteredList =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.researcherCategory === filter);

  return (
    <main className="mt-32 min-h-screen w-full overflow-visible overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-[1296px] flex-col gap-6 px-4 py-10">
        {/* HEADER */}
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="text-[48px] leading-[60px] font-bold tracking-[-1%] text-black sm:text-[60px] sm:leading-[72px]">
            Research & Projects
          </h1>
          <p className="max-w-[900px] text-[18px] leading-[28px] tracking-[-1%] text-[#7C7C7C] sm:text-[24px] sm:leading-[32px]">
            Explore our ongoing studies, completed works, upcoming initiatives,
            and scientific publications.
          </p>
        </header>

        {/* NAVBAR KECIL */}
        <div className="mt-4 flex h-[48px] w-full items-center justify-between">
          <div className="flex gap-6">
            <FilterDropdown filter={filter} setFilter={setFilter} />
            <button
              onClick={() => setTab('ongoing')}
              className={`pb-1 text-lg ${
                tab === 'ongoing'
                  ? 'border-b-2 border-black font-semibold'
                  : 'text-gray-500'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setTab('completed')}
              className={`pb-1 text-lg ${
                tab === 'completed'
                  ? 'border-b-2 border-black font-semibold'
                  : 'text-gray-500'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setTab('upcomming')}
              className={`pb-1 text-lg ${
                tab === 'upcomming'
                  ? 'border-b-2 border-black font-semibold'
                  : 'text-gray-500'
              }`}
            >
              Upcomming
            </button>
          </div>

          <YearDropdown />
        </div>

        {/* GRID PROJECT CARD */}
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-8">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-8">
              <span className="text-gray-500">No projects found</span>
            </div>
          ) : (
            filteredList.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                date={project.year || 'N/A'}
                description={project.description || 'No description available'}
                category={project.researcherCategory}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
