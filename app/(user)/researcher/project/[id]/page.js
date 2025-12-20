'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DetailProject() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setProject(data.data);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return 'bg-green-500';
      case 'ongoing':
      case 'running':
        return 'bg-orange-300';
      case 'upcoming':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'running') return 'Ongoing';
    return status?.charAt(0).toUpperCase() + status?.slice(1);
  };

  if (loading) {
    return (
      <main className="mx-auto mt-8 flex min-h-screen w-full items-center justify-center px-4 sm:mt-16 sm:px-6 md:mt-20 lg:mt-32 lg:px-8">
        <div className="text-gray-500">Loading...</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="mx-auto mt-8 flex min-h-screen w-full items-center justify-center px-4 sm:mt-16 sm:px-6 md:mt-20 lg:mt-32 lg:px-8">
        <div className="text-gray-500">Project not found</div>
      </main>
    );
  }

  return (
    <main className="mx-auto mt-26 min-h-screen w-full overflow-visible overflow-x-hidden px-4 sm:mt-16 sm:px-6 md:mt-20 lg:mt-32 lg:px-8">
      <div className="lg:rounded-6xl relative flex w-full flex-col items-start justify-center gap-4 rounded-2xl border border-zinc-300 bg-white p-4 sm:gap-6 sm:rounded-3xl sm:p-6 md:rounded-4xl md:p-8 lg:p-11">
        {/* Header with Status and Year */}
        <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div />
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`}
              />
              <div className="text-xs font-normal text-zinc-800 sm:text-sm lg:text-base">
                {getStatusText(project.status)}
              </div>
            </div>
            <div className="text-xs font-normal text-zinc-800 sm:text-sm lg:text-base">
              {project.year || 'N/A'}
            </div>
          </div>
        </div>

        {/* Title and Info */}
        <div className="flex w-full max-w-full flex-col items-start justify-center gap-1 sm:gap-2 md:gap-3">
          <div className="text-xl font-bold text-black sm:text-2xl md:text-3xl">
            {project.title}
          </div>
          <div className="text-sm font-medium text-black sm:text-base md:text-lg">
            {project.principalInvestigator || 'N/A'}
          </div>
          <div className="text-sm font-medium text-[#2497a9] sm:text-base md:text-lg">
            {project.researcherCategory || 'N/A'}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-zinc-100" />

        {/* Description */}
        {project.description && (
          <div className="w-full text-xs font-normal text-black sm:text-sm md:text-base">
            {project.description}
          </div>
        )}

        {/* Research Results */}
        {project.results && (
          <div className="w-full">
            <div className="mb-2 text-xs font-semibold text-black sm:text-sm md:text-base">
              Research Results / Outcomes
            </div>
            <div className="text-xs font-normal text-black sm:text-sm md:text-base">
              {project.results}
            </div>
          </div>
        )}

        {/* Images Grid */}
        <div className="relative w-full">
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:gap-4">
            <div className="aspect-video w-full rounded-lg bg-zinc-300 sm:rounded-2xl md:rounded-3xl" />
            <div className="aspect-video w-full rounded-lg bg-zinc-300 sm:rounded-2xl md:rounded-3xl" />
            <div className="aspect-video w-full rounded-lg bg-zinc-300 sm:rounded-2xl md:rounded-3xl" />
          </div>
          <div className="mt-3 flex items-center justify-end gap-1 text-xs sm:text-sm md:text-base">
            <div className="font-normal text-black">See More</div>
            <div className="h-4 w-4">
              <svg
                className="h-full w-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
