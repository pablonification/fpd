'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState(null);
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
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
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
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#2497A9]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to News
        </Link>

        <header className="mb-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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

          <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[3.5rem]">
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

        <article className="prose prose-lg prose-gray prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#2497A9] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none">
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </article>
      </div>
    </main>
  );
}
