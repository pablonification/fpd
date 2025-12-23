import Card from './_components/card';
import SkeletonCard from './_components/SkeletonCard';
import Image from 'next/image';
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
                  text:
                    event.description ||
                    'Gallery activity documentation and updates.',
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
      {/* SECTION 1 */}
      <section className="relative flex min-h-screen w-screen snap-start items-center justify-center text-black">
        {/* Background Image */}
        <Image
          src="/img/home.png"
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />

        {/* Gradient Putih - Dari bawah ke atas untuk menyatu dengan section berikutnya */}
        <div className="from-bgMain absolute inset-0 bg-gradient-to-t via-white/30 to-transparent" />

        <div className="relative z-10 flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center sm:gap-8 sm:px-6 lg:px-8">
          {/* Announcement Bar */}
          <div className="h-9 w-full max-w-[465px] rounded-[20px] border border-black/50 bg-white/10 px-4 pt-2 pb-3 text-xs backdrop-blur-md sm:text-sm">
            Si-ZERO
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-2 [text-shadow:_0_2px_10px_rgb(255_255_255_/_30%)] sm:gap-4">
            <h1 className="text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-6xl">
              Silicon Zero-Emission Recycling, Refining and Production
            </h1>
            <p className="mx-auto max-w-2xl text-xs font-medium text-[#656565] sm:text-sm md:text-base lg:text-lg">
              Brief paragraph summarizing what this platform is, who the users
              are, and the main reasons why this platform matters to them.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex flex-col gap-2 sm:gap-4 md:flex-row md:gap-6">
            <a href="/researcher/project">
              <button className="from-primaryGradientStart to-primaryGradientEnd cursor-pointer rounded-full bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5)] shadow-lg transition hover:scale-105 hover:shadow-xl sm:px-6 sm:py-3 sm:text-base">
                Explore Si-ZERO Research Program
              </button>
            </a>

            <a href="/about">
              <button className="cursor-pointer rounded-full border border-[#DCDCDC] bg-white px-4 py-2 text-sm font-semibold text-black transition hover:border-gray-400 hover:bg-gray-50 sm:px-6 sm:py-3 sm:text-base">
                Connect With Si-Zero
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2, 3, 4 - Combined */}
      <section className="bg-bgMain flex w-screen snap-start items-center justify-center py-16 sm:py-20">
        <div className="flex w-full max-w-6xl flex-col items-center gap-16 px-4 sm:gap-20 sm:px-6 md:gap-24 lg:px-8">
          {/* Who Are We */}
          <div className="flex max-w-6xl flex-col items-center gap-4 text-center sm:gap-8">
            <div className="flex flex-col gap-2 sm:gap-4">
              <h1 className="text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-6xl">
                Who We Are
              </h1>
              <p className="max-w-3xl text-xs text-black/50 sm:text-sm md:text-base lg:text-xl">
                Si-ZERO is a global sustainability initiative led by Swinburne
                University of Technology, bringing together partners across
                Australia, India, Indonesia, and the United States to advance a
                circular and low-carbon future for silicon production and
                materials recovery from solar-panel. By integrating innovative
                recycling, processing, and clean-technology solutions, we
                transform end-of-life solar panels into valuable resources,
                supporting a sustainable and resilient renewable-energy supply
                chain. Our mission is to foster collaboration between research,
                industry and government to accelerate circularity and build a
                sustainable, future-ready solar ecosystem
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="mt-14 flex w-full flex-col items-center gap-4 text-center sm:gap-8">
            <div>
              <h1 className="text-grayDark text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
                What We Do
              </h1>
            </div>
            <div className="w-full space-y-6 sm:space-y-8">
              <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-center gap-x-8 gap-y-7 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
                <div className="flex w-full flex-col items-start justify-start gap-4">
                  <Card
                    imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoEBeC-EkOvHutZ0UUBoelSNq0WJpDSLWxsQ&s"
                    texts={[
                      {
                        text: 'Mechanical and Heat Pre-Treatments of Solar PV Panel',
                        bold: true,
                        size: 'large',
                      },
                      {
                        text: 'Partnership: SUT (Australia), Remind (Indonesia), UGM (Indonesia), BRIN (Indonesia) We develop efficient pre-treatment processes that mechanically and thermally separate solar PV components for high-value material recovery. By improving delamination, glass liberation, and EVA removal, this program lays the foundation for scalable end-of-life PV recycling solutions',
                      },
                    ]}
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-4">
                  <Card
                    imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqCNkh-JGAbGpMbsbNUPUPDLVcRTCt4SRGg&s"
                    texts={[
                      {
                        text: 'Slag Optimisation & Distribution Measurement',
                        bold: true,
                        size: 'large',
                      },
                      {
                        text: 'Partnership: SUT (Australia), IIT Hyderabad (India) We engineer high-performance slag systems through advanced modelling and property measurement to support cleaner and more efficient silicon refining. This program provides the thermodynamic insights and slag behaviour data required for next-generation electro-slag and molten-oxide refining technologies.',
                      },
                    ]}
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-4">
                  <Card
                    imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_H9MRm9RyuRxBbaM9rmM32-uSbhS-4ekpRw&s"
                    texts={[
                      {
                        text: 'Blue Laser Melting & Hydrometallurgical Processing for Ag Recovery',
                        bold: true,
                        size: 'large',
                      },
                      {
                        text: 'Partnership: SUT (Australia), UGM (Indonesia), BRIN (Indonesia) We advance selective blue-laser melting technologies to cleanly detach metallic layers from PV cells, enabling high-purity silver extraction. Combined with targeted hydrometallurgical processing, this process unlocks efficient recovery of critical metals from waste PV modules.',
                      },
                    ]}
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-4">
                  <Card
                    imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv5ErhCJhaG4U1pF4dE-oJ1163U-_eflTBqg&s"
                    texts={[
                      {
                        text: 'Zero-Carbon Silicon Electrochemical Production & Refining',
                        bold: true,
                        size: 'large',
                      },
                      {
                        text: 'Partnership: SUT (Australia), Sadoway Labs Foundation (USA), IIT Hyderabad (India), Greenko (India) We advance new pathways for producing and refining silicon with a significantly lower environmental footprint. This program brings together innovative electrical and slag-based refining approaches to create cleaner, more efficient alternatives to conventional silicon manufacturing. ',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Latest Events */}
          <div className="flex w-full flex-col items-center gap-4 text-center sm:gap-8">
            <div>
              <h1 className="text-grayDark text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
                Latest Gallery
              </h1>
            </div>
            <div className="w-full space-y-6 sm:space-y-8">
              <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-center gap-x-7 gap-y-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
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
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-4 py-8 text-center sm:gap-8">
            <div>
              <h1 className="text-grayDark text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
                Latest News
              </h1>
            </div>
            <div className="w-full space-y-6 sm:space-y-8">
              <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-center gap-x-7 gap-y-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - News */}
    </main>
  );
}
