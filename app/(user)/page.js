import WhoAreWe from './_components/WhoAreWe';
import HeroSection from './_components/HeroSection';
import WhatWeDo from './_components/WhatWeDo';
import {
  LatestGallerySection,
  LatestNewsSection,
} from './_components/LatestSections';
import Card from './_components/card';
import SkeletonCard from './_components/SkeletonCard';
import Link from 'next/link';

import { Suspense } from 'react';

function getYoutubeThumbnail(url) {
  if (!url) return null;
  const videoIdMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

async function fetchLatestEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/gallery?limit=3`,
    { cache: 'no-store' }
  );
  const result = await res.json();
  return (result.data || []).slice(0, 3);
}

function EventsContent({ events }) {
  if (events.length === 0) {
    return (
      <>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex w-full flex-col items-start justify-start gap-4"
          >
            <div className="h-48 w-full rounded-xl bg-gray-200"></div>
            <div className="mt-4 h-5 w-3/4 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-full rounded bg-gray-200"></div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {events.map((event) => {
        let imageSrc = event.mediaUrl || 'https://picsum.photos/300/200';
        if (event.type === 'video') {
          const thumbnail = getYoutubeThumbnail(event.mediaUrl);
          if (thumbnail) imageSrc = thumbnail;
        }

        const rawDesc =
          event.description || 'Gallery activity documentation and updates.';
        const desc =
          rawDesc.length > 100 ? rawDesc.substring(0, 100) + '...' : rawDesc;

        return (
          <Link key={event.id} href="/gallery" className="group block w-full">
            <Card
              imageSrc={imageSrc}
              texts={[
                {
                  text: event.title || 'Gallery Item',
                  bold: true,
                  size: 'large',
                },
                {
                  text: desc,
                },
              ]}
              className="[&_p:first-of-type]:group-hover:text-primaryGradientEnd cursor-pointer [&_img]:transition-all [&_img]:duration-300 [&_img]:ease-out [&_img]:group-hover:brightness-[0.8] [&_p:first-of-type]:transition-colors [&_p:first-of-type]:duration-300 [&_p:first-of-type]:ease-out"
            />
          </Link>
        );
      })}
    </>
  );
}

async function LatestEvents() {
  const events = await fetchLatestEvents();
  return <EventsContent events={events} />;
}

async function fetchLatestNews() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/news?limit=3`,
    { cache: 'no-store' }
  );
  const result = await res.json();
  return (result.data || []).slice(0, 3);
}

function NewsContent({ newsList }) {
  if (newsList.length === 0) {
    return (
      <>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex w-full flex-col items-start justify-start gap-4"
          >
            <div className="h-48 w-full rounded-xl bg-gray-200"></div>
            <div className="mt-4 h-5 w-3/4 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-full rounded bg-gray-200"></div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {newsList.map((newsItem) => (
        <Link
          key={newsItem.id}
          href={`/news/${newsItem.slug}`}
          className="group block w-full"
        >
          <Card
            imageSrc={newsItem.imageUrl || 'https://picsum.photos/300/200'}
            texts={[
              {
                text: newsItem.title || 'News Item',
                bold: true,
                size: 'large',
              },
              {
                text:
                  newsItem.content.substring(0, 100) +
                  (newsItem.content.length > 100 ? '...' : ''),
              },
            ]}
            className="[&_p:first-of-type]:group-hover:text-primaryGradientEnd cursor-pointer [&_img]:transition-all [&_img]:duration-300 [&_img]:ease-out [&_img]:group-hover:brightness-[0.8] [&_p:first-of-type]:transition-colors [&_p:first-of-type]:duration-300 [&_p:first-of-type]:ease-out"
          />
        </Link>
      ))}
    </>
  );
}

async function LatestNews() {
  const newsList = await fetchLatestNews();
  return <NewsContent newsList={newsList} />;
}

export default function Home() {
  return (
    <main className="overflow-x-clip overflow-y-auto">
      <HeroSection />

      {/* SECTION 2, 3, 4 - Combined */}
      <section className="bg-bgMain flex w-screen snap-start items-center justify-center py-16 sm:py-20">
        <div className="flex w-full max-w-6xl flex-col items-center gap-16 px-4 sm:gap-20 sm:px-6 md:gap-24 lg:px-8">
          <WhoAreWe />

          <WhatWeDo />

          {/* Latest Events */}
          <LatestGallerySection>
            <Suspense
              fallback={
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              }
            >
              <LatestEvents />
            </Suspense>
          </LatestGallerySection>

          {/* Latest News */}
          <LatestNewsSection>
            <Suspense
              fallback={
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              }
            >
              <LatestNews />
            </Suspense>
          </LatestNewsSection>
        </div>
      </section>

      {/* SECTION 5 - News */}
    </main>
  );
}
