'use client';

import { useEffect, useState } from 'react';
import Card from './../_components/card';

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
    <main className="bg-bgMain mt-32 min-h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* SECTION 1 - Header */}
      <section className="flex min-h-screen w-full snap-start items-center justify-center px-4 text-black">
        <div className="flex w-full max-w-5xl flex-col gap-12 md:gap-16">
          {/* Title */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              News
            </h1>
          </div>

          {loading && (
            <div className="text-center text-gray-500">Loading news...</div>
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
