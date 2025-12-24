'use client';
import { useState, useEffect } from 'react';
import '../../globals.css';

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function Home() {
  const [stats, setStats] = useState({
    researchers: { active: 0 },
    projects: { ongoing: 0, completed: 0, total: 0 },
    users: { active: 0 },
    gallery: { total: 0 },
    news: { published: 0 },
    latestUpdates: [],
  });
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, userRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/auth/me'),
        ]);

        const statsJson = await statsRes.json();
        if (statsJson.success) {
          setStats(statsJson.data);
        }

        const userJson = await userRes.json();
        if (userJson.success && userJson.data?.name) {
          const firstName = userJson.data.name.split(' ')[0];
          setUserName(firstName);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const SkeletonStatCard = () => (
    <div className="flex w-full animate-pulse flex-col items-start justify-start gap-6 rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200 md:flex-1">
      <div className="flex w-full items-center justify-between self-stretch">
        <div className="h-6 w-24 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded-lg bg-gray-200" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-12 rounded bg-gray-200" />
        <div className="h-5 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );

  const SkeletonProjectsCard = () => (
    <div className="flex w-full animate-pulse flex-col items-start justify-start gap-6 self-stretch rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200 md:flex-1">
      <div className="flex w-full items-center justify-between self-stretch">
        <div className="h-6 w-20 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded-lg bg-gray-200" />
      </div>
      <div className="flex w-full items-center justify-between self-stretch">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="h-5 w-16 rounded bg-gray-200" />
        </div>
        <div className="h-8 w-px bg-neutral-200" />
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="h-5 w-20 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );

  const SkeletonLatestUpdates = () => (
    <div className="flex animate-pulse flex-col gap-1 self-stretch">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-2">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-8 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-full min-h-screen w-full flex-col items-start justify-start gap-4 p-4 md:p-10">
        <div className="flex w-full flex-col items-start justify-start gap-1 md:w-80">
          <div className="justify-start self-stretch text-2xl leading-10 font-bold text-black md:text-3xl">
            Welcome{userName ? `, ${userName}` : ''}!
          </div>
          <div className="justify-start self-stretch text-base leading-6 font-medium text-neutral-500 md:text-lg">
            Here&apos;s an overview of today&apos;s updates.
          </div>
        </div>

        <div className="flex flex-col items-start justify-center gap-4 self-stretch">
          <div className="flex w-full flex-col items-center justify-start gap-4 self-stretch md:flex-row">
            <SkeletonStatCard />
            <SkeletonProjectsCard />
            <SkeletonStatCard />
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-4 self-stretch md:flex-row">
            <SkeletonStatCard />
            <SkeletonStatCard />
            <SkeletonStatCard />
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-3 self-stretch rounded-3xl p-6 outline outline-1 outline-offset-[-1px] outline-neutral-200">
          <div className="inline-flex items-center justify-between self-stretch">
            <div className="justify-start text-lg leading-6 font-medium text-black">
              Latest updates across the platform
            </div>
          </div>
          <div className="h-px self-stretch bg-neutral-200" />
          <SkeletonLatestUpdates />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-start justify-start gap-4 p-4 md:p-10">
      {/* Welcome Section */}
      <div className="flex w-full flex-col items-start justify-start gap-1 md:w-80">
        <div className="justify-start self-stretch text-2xl leading-10 font-bold text-black md:text-3xl">
          Welcome{userName ? `, ${userName}` : ''}!
        </div>
        <div className="justify-start self-stretch text-base leading-6 font-medium text-neutral-500 md:text-lg">
          Here&apos;s an overview of today&apos;s updates.
        </div>
      </div>

      {/* Overview Cards */}
      <div className="flex flex-col items-start justify-center gap-4 self-stretch">
        {/* Row 1 */}
        <div className="flex w-full flex-col items-center justify-start gap-4 self-stretch md:flex-row">
          {/* Researchers Card */}
          <div className="flex w-full flex-col items-start justify-start gap-6 rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200 md:flex-1">
            <div className="flex w-full items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Researchers
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                {stats.researchers.active}
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                active
              </div>
            </div>
          </div>

          {/* Projects Card */}
          <div className="flex w-full flex-col items-start justify-start gap-6 self-stretch rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200 md:flex-1">
            <div className="flex w-full items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Projects
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between self-stretch">
              <div className="flex items-center justify-start gap-2">
                <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                  {stats.projects.ongoing}
                </div>
                <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                  ongoing
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200" />
              <div className="flex items-center justify-start gap-2">
                <div className="justify-start text-2xl leading-8 font-semibold text-black">
                  {stats.projects.completed}
                </div>
                <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                  completed
                </div>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="flex w-full flex-col items-start justify-start gap-6 self-stretch rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200 md:flex-1">
            <div className="flex w-full items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Users
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                {stats.users.active}
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                active
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex w-full flex-col items-center justify-start gap-4 self-stretch md:flex-row">
          {/* Gallery Items Card */}
          <div className="flex w-full flex-col items-start justify-start gap-6 rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200 md:flex-1">
            <div className="flex w-full items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Gallery Items
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                {stats.gallery.total}
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                media
              </div>
            </div>
          </div>

          {/* News Articles Card */}
          <div className="flex w-full flex-col items-start justify-start gap-6 self-stretch rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200 md:flex-1">
            <div className="flex w-full items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                News Articles
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                {stats.news.published}
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                published
              </div>
            </div>
          </div>

          {/* Total Projects Card */}
          <div className="flex w-full flex-col items-start justify-start gap-6 rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200 md:flex-1">
            <div className="flex w-full items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Total Projects
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                {stats.projects.total}
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                all time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Updates */}
      <div className="flex flex-col items-start justify-start gap-3 self-stretch rounded-3xl p-6 outline outline-1 outline-offset-[-1px] outline-neutral-200">
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="justify-start text-lg leading-6 font-medium text-black">
            Latest updates across the platform
          </div>
        </div>
        <div className="h-px self-stretch bg-neutral-200" />
        <div className="flex flex-col items-start justify-start gap-1 self-stretch">
          {stats.latestUpdates.length === 0 ? (
            <div className="p-4 text-center text-neutral-400">
              No recent updates.
            </div>
          ) : (
            stats.latestUpdates.map((update, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center gap-1 self-stretch p-2"
              >
                <div className="flex-1 justify-start text-base leading-5 font-normal text-neutral-800">
                  {update.text}
                </div>
                <div className="justify-start text-sm leading-4 font-normal text-neutral-400">
                  {timeAgo(update.time)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
