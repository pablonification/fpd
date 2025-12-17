import Card from './_components/card';

import { Suspense } from 'react';

function getYoutubeThumbnail(url) {
  const videoIdMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : url;
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
    return <div className="text-gray-500">No events available yet.</div>;
  }

  return (
    <>
      {events.map((event) => {
        let imageSrc = event.mediaUrl || 'https://picsum.photos/300/200';
        if (event.type === 'video') {
          imageSrc = getYoutubeThumbnail(event.mediaUrl);
        }
        return (
          <Card
            key={event.id}
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
          />
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
    return <div className="text-gray-500">No news available yet.</div>;
  }

  return (
    <>
      {newsList.map((newsItem) => (
        <Card
          key={newsItem.id}
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
        />
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
      <section className="to-bgMain flex min-h-screen w-screen snap-start items-center justify-center bg-gradient-to-b from-[#DFF5F8] text-black">
        <div className="flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center sm:gap-8 sm:px-6">
          {/* Announcement Bar */}
          <div className="h-9 w-full max-w-[465px] rounded-[20px] border border-black/50 bg-white/10 px-4 pt-1 pb-3 text-xs backdrop-blur-md sm:text-sm">
            Si-ZERO
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-2 sm:gap-4">
            <h1 className="text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-6xl">
              Silicon Zero-Emission Recycling, Refining and Production
            </h1>
            <p className="text-xs text-black/50 sm:text-sm md:text-base lg:text-xl">
              Brief paragraph summarizing what this platform is, who the users
              are, and the main reasons why this platform matters to them.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex flex-col gap-2 sm:gap-4 md:flex-row md:gap-6">
            <button className="from-primaryGradientStart to-primaryGradientEnd shadow-primaryGradientEnd/30 rounded-full bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl sm:px-6 sm:py-3 sm:text-base">
              Explore Si-ZERO Research Program
            </button>

            <button className="rounded-full border border-black/40 px-4 py-2 text-sm font-semibold text-black transition hover:bg-black/40 hover:text-white sm:px-6 sm:py-3 sm:text-base">
              Connect With Si-Zero
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="bg-bgMain flex min-h-screen w-screen snap-start items-center justify-center">
        <div className="flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center sm:gap-8 sm:px-6">
          <div className="flex flex-col gap-2 sm:gap-4">
            <h1 className="text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-6xl">
              Who Are We
            </h1>
            <p className="text-xs text-black/50 sm:text-sm md:text-base lg:text-xl">
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
      </section>

      {/* SECTION 3 */}
      <section className="flex min-h-screen w-screen snap-start items-center justify-center">
        <div className="max-w-9xl flex w-full flex-col items-center gap-4 px-4 py-8 text-center sm:gap-8 sm:px-6">
          <div>
            <h1 className="text-grayDark text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
              What We Do
            </h1>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-wrap sm:justify-center sm:gap-8">
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
      </section>

      {/* SECTION 4 - Latest Events */}
      <section className="flex min-h-screen w-screen snap-start items-center justify-center">
        <div className="max-w-9xl flex w-full flex-col items-center gap-4 px-4 py-8 text-center sm:gap-8 sm:px-6">
          <div>
            <h1 className="text-grayDark text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
              Latest Events
            </h1>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-wrap sm:justify-center sm:gap-8">
            <Suspense
              fallback={<div className="text-gray-500">Loading events...</div>}
            >
              <LatestEvents />
            </Suspense>
          </div>
        </div>
      </section>

      {/* SECTION 5 - News */}
      <section className="flex min-h-screen w-screen snap-start items-center justify-center text-black">
        <div className="max-w-9xl flex w-full flex-col items-center gap-4 px-4 py-8 text-center sm:gap-8 sm:px-6">
          <div>
            <h1 className="text-grayDark text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
              News
            </h1>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-wrap sm:justify-center sm:gap-8">
            <Suspense
              fallback={<div className="text-gray-500">Loading news...</div>}
            >
              <LatestNews />
            </Suspense>
          </div>
        </div>
      </section>

    </main>
  );
}
