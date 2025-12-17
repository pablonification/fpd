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
    <main className="mt-24 min-h-screen w-full overflow-visible overflow-x-hidden sm:mt-16 md:mt-20 lg:mt-32">
      <div className="mx-auto flex w-full max-w-[1296px] flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-10">
        {/* HEADER */}
        <header className="flex w-full flex-col items-center gap-2 text-center sm:gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
            Research & Projects
          </h1>
          <p className="max-w-[900px] text-sm text-gray-600 sm:text-base md:text-lg lg:text-xl">
            Explore our ongoing studies, completed works, upcoming initiatives,
            and scientific publications.
          </p>
        </header>

        {/* NAVBAR KECIL */}
        <div className="mt-2 flex w-full flex-col gap-4 sm:mt-4">
          {/* First row: Tab buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-6">
            <button
              onClick={() => setTab('ongoing')}
              className={`pb-1 text-sm font-medium sm:text-base ${
                tab === 'ongoing' ? 'border-b-2 border-black' : 'text-gray-500'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setTab('completed')}
              className={`pb-1 text-sm font-medium sm:text-base ${
                tab === 'completed'
                  ? 'border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setTab('upcomming')}
              className={`pb-1 text-sm font-medium sm:text-base ${
                tab === 'upcomming'
                  ? 'border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Upcomming
            </button>
          </div>

          {/* Second row: Filter dropdowns */}
          <div className="flex flex-wrap gap-3 sm:gap-6">
            <FilterDropdown filter={filter} setFilter={setFilter} />
            <YearDropdown />
          </div>
        </div>

        {/* GRID PROJECT CARD */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
