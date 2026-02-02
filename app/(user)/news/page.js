'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from './../_components/card';
import SkeletonCard from './../_components/SkeletonCard';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const stripHtmlAndDecode = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

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

  const cards = news.map((item) => {
    const plainText = stripHtmlAndDecode(item.content);
    return {
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
            plainText.substring(0, 150) + (plainText.length > 150 ? '...' : ''),
        },
        {
          text: item.isFeatured || item.is_featured ? 'Featured' : 'News',
        },
      ],
    };
  });

  return (
    <main className="bg-bgMain mt-42 min-h-screen snap-y snap-mandatory overflow-y-scroll">
      <section className="flex min-h-screen w-full snap-start justify-center px-4 pb-20 text-black sm:px-6">
        <div className="flex w-full max-w-6xl flex-col gap-12 md:gap-16">
          <header className="flex w-full flex-col items-center gap-3 text-center">
            <h1 className="text-3xl leading-tight font-bold tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
              News
            </h1>
            <p className="max-w-[900px] text-sm leading-relaxed tracking-normal text-[#7C7C7C] sm:text-base">
              Collection of news and updates from our team.
            </p>
          </header>

          {loading && (
            <div className="flex w-full animate-pulse flex-col gap-12">
              <div className="grid w-full items-center gap-8 md:grid-cols-2">
                <div className="order-first flex justify-center md:order-last">
                  <div className="aspect-video w-full max-w-[523px] rounded-xl bg-gray-200 shadow-lg"></div>
                </div>
                <div className="order-last flex flex-col gap-4 md:order-first">
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                  <div className="mt-2 h-4 w-32 rounded bg-gray-200"></div>
                </div>
              </div>

              <div className="flex flex-col gap-12">
                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              {news[0] && (
                <Link
                  href={`/news/${news[0].slug}`}
                  className="group block w-full"
                >
                  <div className="grid w-full cursor-pointer items-center gap-8 md:grid-cols-2">
                    <div className="order-first flex justify-center md:order-last">
                      <img
                        src={
                          news[0].imageUrl ||
                          news[0].image_url ||
                          'https://picsum.photos/500/300'
                        }
                        alt={news[0].title}
                        className="aspect-video w-full max-w-[523px] rounded-xl object-cover shadow-lg transition-all duration-300 ease-out group-hover:brightness-[0.8]"
                      />
                    </div>

                    <div className="order-last flex min-w-0 flex-col gap-4 overflow-hidden md:order-first">
                      <h2 className="group-hover:text-primaryGradientEnd text-2xl leading-tight font-bold break-words transition-colors duration-300 ease-out sm:text-3xl md:text-4xl">
                        {news[0].title}
                      </h2>
                      <p className="overflow-hidden text-justify text-sm leading-relaxed break-words text-black/60 sm:text-base">
                        {stripHtmlAndDecode(news[0].content).substring(0, 200)}
                        {stripHtmlAndDecode(news[0].content).length > 200
                          ? '...'
                          : ''}
                      </p>
                      <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                        {news[0].isFeatured || news[0].is_featured
                          ? 'Featured News'
                          : 'News'}
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              {cards.length > 1 && (
                <div className="flex flex-col gap-12">
                  <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.slice(1).map((c, i) => (
                      <Link
                        key={i}
                        href={`/news/${news[i + 1].slug}`}
                        className="group block h-full"
                      >
                        <Card
                          imageSrc={c.imageSrc}
                          texts={c.texts}
                          className="[&_p:first-of-type]:group-hover:text-primaryGradientEnd h-full cursor-pointer [&_img]:transition-all [&_img]:duration-300 [&_img]:ease-out [&_img]:group-hover:brightness-[0.8] [&_p:first-of-type]:transition-colors [&_p:first-of-type]:duration-300 [&_p:first-of-type]:ease-out"
                        />
                      </Link>
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
