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
      <main className="mx-auto mt-[159px] flex min-h-screen w-full items-center justify-center px-[159px]">
        <div className="text-gray-500">Loading...</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="mx-auto mt-[159px] flex min-h-screen w-full items-center justify-center px-[159px]">
        <div className="text-gray-500">Project not found</div>
      </main>
    );
  }

  return (
    <main className="mx-auto mt-[159px] min-h-screen w-full overflow-visible overflow-x-hidden px-[159px]">
      <div className="relative flex w-full flex-col items-start justify-center gap-8 rounded-[48px] p-11 outline outline-1 outline-offset-[-1px] outline-zinc-300">
        <div className="flex w-full items-center justify-end gap-8">
          <div className="flex items-center gap-4">
            <div
              className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`}
            />
            <div className="text-base leading-5 font-normal text-zinc-800">
              {getStatusText(project.status)}
            </div>
          </div>
          <div className="text-base leading-5 font-normal text-zinc-800">
            {project.year || 'N/A'}
          </div>
        </div>

        <div className="flex w-full max-w-[1034px] flex-col items-start justify-center gap-3">
          <div className="justify-center self-stretch text-3xl leading-10 font-bold text-black">
            {project.title}
          </div>
          <div className="justify-center self-stretch text-lg leading-6 font-medium text-black">
            {project.principalInvestigator || 'N/A'}
          </div>
          <div className="text-Primary800 justify-start self-stretch text-lg leading-6 font-medium">
            {project.researcherCategory || 'N/A'}
          </div>
        </div>

        {project.description && (
          <div className="justify-center self-stretch text-base leading-5 font-normal text-black">
            {project.description}
          </div>
        )}

        {project.results && (
          <div className="justify-center self-stretch">
            <span className="text-base leading-5 font-normal text-black">
              Research Results / Outcomes
              <br />
            </span>
            <span className="text-base leading-5 font-normal text-black">
              {project.results}
            </span>
          </div>
        )}

        <div className="relative inline-flex items-center justify-center gap-2 self-stretch">
          <div className="h-64 w-96 rounded-[36px] bg-zinc-300" />
          <div className="h-64 w-96 rounded-[36px] bg-zinc-300" />
          <div className="h-64 flex-1 rounded-[36px] bg-zinc-300" />
          <div className="absolute top-[115px] left-[877px] flex items-center justify-start gap-2">
            <div className="justify-center text-base leading-5 font-normal text-black">
              See More
            </div>
            <div data-style="linear" className="relative h-5 w-5">
              <div className="absolute top-[4.94px] left-[12.03px] h-2.5 w-[5.06px] outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-900" />
              <div className="absolute top-[10px] left-[2.92px] h-0 w-3.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-900" />
              <div className="absolute top-[20px] left-[20px] h-5 w-5 origin-top-left -rotate-180 opacity-0" />
            </div>
          </div>
        </div>
        <div className="absolute top-[80px] left-[44px] h-px w-[1034px] bg-zinc-100" />
      </div>
    </main>
  );
}
