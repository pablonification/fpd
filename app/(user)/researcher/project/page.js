'use client';

import { useState } from 'react';
import FilterDropdown from './_components/FilterDropdown';
import YearDropdown from './_components/YearDropdown';
import ProjectCard from './_components/ProjectCard';

export default function ResearchProject() {
  const [tab, setTab] = useState('ongoing');
  const [filter, setFilter] = useState('All');

  const options = [
    'Supervisors',
    "Master's Students",
    'Undergraduate Students',
    'Alumni Researchers',
  ];

  // Buat dummy data ProjectCard berdasarkan options
  const projects = options.flatMap((typeLabel) =>
    Array.from({ length: 3 }).map((_, idx) => ({
      typeLabel,
      title: `${typeLabel} Project ${idx + 1}`,
      date: `Wednesday ${10 + idx} September 2025`,
      description: `Brief description for ${typeLabel} project ${idx + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    }))
  );

  // Filter berdasarkan filter dropdown
  const filteredList =
    filter === 'All'
      ? projects
      : projects.filter((c) => c.typeLabel === filter);

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
          {filteredList.map((card, idx) => (
            <ProjectCard
              key={idx}
              title={card.title}
              date={card.date}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
