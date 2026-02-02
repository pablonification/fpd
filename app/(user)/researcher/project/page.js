'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './_components/ProjectCard';
import SkeletonProjectCard from './_components/SkeletonProjectCard';

export default function ResearchProject() {
  const [tab, setTab] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filteredList = projects.filter((p) => {
    if (tab === 'all') return true;
    return p.status === tab;
  });

  return (
    <main className="mt-32 min-h-screen w-full overflow-visible overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-10">
        {/* HEADER */}
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Research & Projects
          </h1>
          <p className="max-w-[900px] text-sm leading-relaxed tracking-normal text-[#7C7C7C] sm:text-base">
            Explore our ongoing studies, completed works, upcoming initiatives,
            and scientific publications.
          </p>
        </header>

        {/* NAVBAR KECIL */}
        <div className="mt-2 flex w-full flex-col gap-4 sm:mt-4">
          <div className="flex flex-wrap gap-3 sm:gap-6">
            <button
              onClick={() => setTab('all')}
              className={`cursor-pointer pb-1 text-sm font-medium sm:text-base ${
                tab === 'all' ? 'border-b-2 border-black' : 'text-gray-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTab('ongoing')}
              className={`cursor-pointer pb-1 text-sm font-medium sm:text-base ${
                tab === 'ongoing' ? 'border-b-2 border-black' : 'text-gray-500'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setTab('completed')}
              className={`cursor-pointer pb-1 text-sm font-medium sm:text-base ${
                tab === 'completed'
                  ? 'border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setTab('upcoming')}
              className={`cursor-pointer pb-1 text-sm font-medium sm:text-base ${
                tab === 'upcoming' ? 'border-b-2 border-black' : 'text-gray-500'
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        {/* GRID PROJECT CARD */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            [...Array(8)].map((_, i) => <SkeletonProjectCard key={i} />)
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
                date={project.author || 'N/A'}
                description={project.abstract || ''}
                category={project.doi}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
