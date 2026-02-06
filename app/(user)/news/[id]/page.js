'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Card from './../../_components/card';

function decodeHtmlEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchNews();
    }
  }, [params.id]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setNews(data.data);
        // Fetch all news to get related news
        fetchRelatedNews(data.data.slug);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNews = async (currentSlug) => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      if (data.success) {
        // Filter out current news and get only 3 related news
        const related = (data.data || [])
          .filter((item) => item.slug !== currentSlug)
          .slice(0, 3);
        setRelatedNews(related);
      }
    } catch (error) {
      console.error('Error fetching related news:', error);
    }
  };

  if (loading) {
    return (
      <main className="bg-bgMain mt-32 min-h-screen w-full px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="mb-8 h-5 w-32 rounded bg-gray-200" />

          <header className="mb-10 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="h-7 w-28 rounded-full bg-gray-200" />
              <div className="h-6 w-20 rounded-full bg-gray-200" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-10 w-full rounded bg-gray-200" />
              <div className="h-10 w-3/4 rounded bg-gray-200" />
            </div>
          </header>

          <div className="mb-12 aspect-video w-full rounded-2xl bg-gray-200" />

          <div className="flex flex-col gap-4">
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-5 w-4/5 rounded bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (!news) {
    return (
      <main className="mx-auto mt-32 flex min-h-screen w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="font-medium text-gray-500">
            News article not found
          </div>
          <Link
            href="/news"
            className="flex items-center gap-2 font-medium text-[#2AB2C7] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to News
          </Link>
        </div>
      </main>
    );
  }

  const date = new Date(
    news.createdAt || news.created_at || Date.now()
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="bg-bgMain mt-32 min-h-screen w-full px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/news"
          className="group mb-8 inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition-colors hover:text-[#2497A9] sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to News
        </Link>

        <header className="mb-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 sm:text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            {(news.isFeatured || news.is_featured) && (
              <span className="rounded-full bg-[#2AB2C7]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#2497A9] uppercase">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            {news.title}
          </h1>
        </header>

        {(news.imageUrl || news.image_url) && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
            <Image
              src={news.imageUrl || news.image_url}
              alt={news.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        )}

        <article className="prose prose-sm sm:prose-base prose-gray prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-[#2497A9] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:text-gray-600 prose-blockquote:text-gray-600 prose-strong:text-gray-900 max-w-none text-justify [&_*]:text-justify [&_blockquote]:text-justify [&_li]:text-justify [&_p]:text-justify">
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </article>

        {/* Related News Section */}
        {relatedNews.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="mb-8 text-2xl tracking-tight text-neutral-950 sm:text-3xl">
              Other News
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group block h-full"
                >
                  <Card
                    imageSrc={
                      item.imageUrl ||
                      item.image_url ||
                      'https://picsum.photos/400/250'
                    }
                    texts={[
                      {
                        text: item.title,
                        bold: true,
                        size: 'large',
                      },
                      {
                        text: (() => {
                          const plainText = item.content
                            .replace(/<[^>]*>/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
                          const decoded = decodeHtmlEntities(plainText);
                          return (
                            decoded.substring(0, 150) +
                            (decoded.length > 150 ? '...' : '')
                          );
                        })(),
                      },
                      {
                        text:
                          item.isFeatured || item.is_featured
                            ? 'Featured'
                            : 'News',
                      },
                    ]}
                    className="[&_p:first-of-type]:group-hover:text-primaryGradientEnd h-full cursor-pointer [&_img]:transition-all [&_img]:duration-300 [&_img]:ease-out [&_img]:group-hover:brightness-[0.8] [&_p:first-of-type]:transition-colors [&_p:first-of-type]:duration-300 [&_p:first-of-type]:ease-out"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
