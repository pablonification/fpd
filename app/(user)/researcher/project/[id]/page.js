'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

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
      <main className="mx-auto mt-26 min-h-screen w-full overflow-visible overflow-x-hidden px-4 sm:mt-16 sm:px-6 md:mt-20 lg:mt-32 lg:px-8">
        <div className="lg:rounded-6xl relative flex w-full animate-pulse flex-col items-start justify-center gap-4 rounded-2xl border border-zinc-300 bg-white p-4 shadow-sm sm:gap-6 sm:rounded-3xl sm:p-6 md:rounded-4xl md:p-8 lg:p-11">
          <div className="flex w-full items-center justify-between">
            <div />
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
              <div className="h-4 w-12 rounded bg-gray-200" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-48 rounded bg-gray-200" />
            <div className="h-5 w-32 rounded bg-gray-200" />
          </div>

          <div className="h-px w-full bg-zinc-100" />

          <div className="flex w-full flex-col gap-3">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-4/5 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>

          <div className="mt-4 w-full">
            <div className="mb-3 h-6 w-48 rounded bg-gray-200" />
            <div className="flex flex-col gap-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-8 w-full">
            <div className="mb-4 h-6 w-40 rounded bg-gray-200" />
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-video w-full rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
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
      <div className="lg:rounded-6xl relative flex w-full flex-col items-start justify-center gap-4 rounded-2xl border border-zinc-300 bg-white p-4 shadow-sm sm:gap-6 sm:rounded-3xl sm:p-6 md:rounded-4xl md:p-8 lg:p-11">
        {/* Header with Status and Year */}
        <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div />
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`}
              />
              <div className="text-xs font-normal text-zinc-800 sm:text-sm">
                {getStatusText(project.status)}
              </div>
            </div>
            <div className="text-xs font-normal text-zinc-800 sm:text-sm">
              {project.year || 'N/A'}
            </div>
          </div>
        </div>

        {/* Title and Info */}
        <div className="flex w-full max-w-full flex-col items-start justify-center gap-1 break-words sm:gap-2 md:gap-3">
          <div className="text-3xl leading-tight font-bold text-black sm:text-4xl md:text-5xl">
            {project.title}
          </div>
          <div className="text-sm font-medium text-black sm:text-base">
            {project.principalInvestigator || 'N/A'}
          </div>
          <div className="text-sm font-medium text-[#2497a9] sm:text-base">
            {project.researcherCategory || 'N/A'}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-zinc-100" />

        {/* Description */}
        {project.description && (
          <div className="prose prose-sm md:prose-base w-full max-w-none overflow-hidden break-words text-zinc-700">
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>
        )}

        {/* Research Results */}
        {project.results && (
          <div className="mt-4 w-full">
            <h3 className="mb-3 text-lg font-bold text-black sm:text-xl">
              Research Results / Outcomes
            </h3>
            <div className="prose prose-sm sm:prose-base w-full max-w-none overflow-hidden break-words text-zinc-700">
              <div dangerouslySetInnerHTML={{ __html: project.results }} />
            </div>
          </div>
        )}

        {/* Images Grid */}
        {project.media && project.media.length > 0 && (
          <div className="relative mt-8 w-full">
            <h3 className="mb-4 text-lg font-bold text-black sm:text-xl">
              Supporting Documents
            </h3>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {project.media.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm transition-all hover:shadow-md"
                >
                  <Image
                    src={item.url}
                    alt={`Supporting doc ${idx + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
