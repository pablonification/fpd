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
      <main className="mx-auto mt-8 flex min-h-screen w-full items-center justify-center px-4 sm:mt-16 sm:px-6 md:mt-20 lg:mt-32 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2AB2C7] border-t-transparent" />
          <span className="text-gray-500 font-medium">Loading project details...</span>
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
      <div className="lg:rounded-6xl relative flex w-full flex-col items-start justify-center gap-4 rounded-2xl border border-zinc-300 bg-white p-4 sm:gap-6 sm:rounded-3xl sm:p-6 md:rounded-4xl md:p-8 lg:p-11 shadow-sm">
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
        <div className="flex w-full max-w-full flex-col items-start justify-center gap-1 sm:gap-2 md:gap-3 break-words">
          <div className="text-xl font-bold text-black sm:text-2xl md:text-3xl leading-tight">
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
          <div className="prose prose-sm md:prose-base max-w-none w-full text-zinc-700 break-words overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>
        )}

        {/* Research Results */}
        {project.results && (
          <div className="w-full mt-4">
            <h3 className="mb-3 text-lg font-bold text-black sm:text-xl">
              Research Results / Outcomes
            </h3>
            <div className="prose prose-sm md:prose-base max-w-none w-full text-zinc-700 break-words overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: project.results }} />
            </div>
          </div>
        )}

        {/* Images Grid */}
        {project.media && project.media.length > 0 && (
          <div className="relative w-full mt-8">
            <h3 className="mb-4 text-lg font-bold text-black">Supporting Documents</h3>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {project.media.map((item, idx) => (
                <div key={idx} className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm transition-all hover:shadow-md">
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
