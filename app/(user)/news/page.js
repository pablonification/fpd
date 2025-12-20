'use client';

import { useEffect, useState } from 'react';
import Card from './../_components/card';
import SkeletonCard from './../_components/SkeletonCard';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/news', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load news');
        const result = await res.json();
        if (active) {
          const list = result.data || [];
          setNews(list);
        }
      } catch (e) {
        console.error(e);
        setError('Failed to load news content');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const cards = news.map((item) => ({
    imageSrc:
      item.imageUrl || item.image_url || 'https://picsum.photos/400/250',
    texts: [
      {
        text: item.title,
        bold: true,
        size: 'large',
      },
      {
        text:
          item.content.substring(0, 150) +
          (item.content.length > 150 ? '...' : ''),
      },
      {
        text: item.isFeatured || item.is_featured ? 'Featured' : 'News',
      },
    ],
  }));

  return (
    <main className="bg-bgMain mt-42 min-h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* SECTION 1 - Header */}
      <section className="flex min-h-screen w-full snap-start justify-center px-4 sm:px-6 text-black">
        <div className="flex w-full max-w-7xl flex-col gap-12 md:gap-16">
          {/* Title */}
          <header className="flex w-full flex-col items-center gap-3 text-center">
            <h1 className="text-[48px] leading-[60px] font-bold tracking-[-1%] text-black sm:text-[60px] sm:leading-[72px]">
              News
            </h1>
            <p className="max-w-[900px] text-[18px] leading-[28px] tracking-[-1%] text-[#7C7C7C] sm:text-[24px] sm:leading-[32px]">
              Collection of news and updates from our team.
            </p>
          </header>

          {loading && (
            <div className="flex flex-col gap-12 w-full animate-pulse">
              {/* Featured News Skeleton */}
              <div className="grid w-full items-center gap-8 md:grid-cols-2">
                <div className="order-first flex justify-center md:order-last">
                  <div className="h-[300px] w-full max-w-[523px] rounded-xl bg-gray-200 shadow-lg"></div>
                </div>
                <div className="order-last flex flex-col gap-4 md:order-first">
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                  <div className="mt-2 h-4 w-32 rounded bg-gray-200"></div>
                </div>
              </div>

              {/* Other News Grid Skeleton */}
              <div className="flex flex-col gap-12">
                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {error && <div className="text-center text-red-500">{error}</div>}

          {!loading && !error && news.length > 0 && (
            <>
              {/* Featured News - First Item */}
              {news[0] && (
                <div className="grid w-full items-center gap-8 md:grid-cols-2">
                  {/* Kolom Kanan - Image (di mobile tampil dulu) */}
                  <div className="order-first flex justify-center md:order-last">
                    <img
                      src={
                        news[0].imageUrl ||
                        news[0].image_url ||
                        'https://picsum.photos/500/300'
                      }
                      alt={news[0].title}
                      className="w-full max-w-[523px] rounded-xl object-cover shadow-lg"
                    />
                  </div>

                  {/* Kolom Kiri - Teks */}
                  <div className="order-last flex flex-col gap-4 md:order-first">
                    <h2 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                      {news[0].title}
                    </h2>
                    <p className="text-sm text-black/60 sm:text-base md:text-lg">
                      {news[0].content.substring(0, 200)}
                      {news[0].content.length > 200 ? '...' : ''}
                    </p>
                    <p className="mt-2 text-sm sm:text-base md:text-base">
                      {news[0].isFeatured || news[0].is_featured
                        ? 'Featured News'
                        : 'News'}
                    </p>
                  </div>
                </div>
              )}

              {/* Other News - Cards */}
              {cards.length > 1 && (
                <div className="flex flex-col gap-12">
                  <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                    {cards.slice(1).map((c, i) => (
                      <Card
                        key={i}
                        imageSrc={c.imageSrc}
                        texts={c.texts}
                        className="h-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && !error && news.length === 0 && (
            <div className="text-center text-gray-500">
              No news available yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
