'use client';

import { useEffect, useMemo, useState } from 'react';
import { GalleryCard, PhotoModal, VideoModal } from './_components/GalleryCard';
import SkeletonGalleryCard from './_components/SkeletonGalleryCard';
import { AnimatePresence } from 'framer-motion';
import FilterDropdown from './_components/FilterDropdown';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [tab, setTab] = useState('photos');
  const [filter, setFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [openType, setOpenType] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load gallery');
        const result = await res.json();
        if (active) {
          // API returns { success: true, data: [...] }
          const list = result.data || [];
          console.log('📸 Gallery items loaded:', list);
          setItems(list);
        }
      } catch (e) {
        console.error(e);
        setError('Failed to load gallery content');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const getYoutubeId = (url) => {
    const regex = /(?:v=|\.be\/)([A-Za-z0-9_-]{6,11})/;
    const match = url?.match(regex);
    return match ? match[1] : '';
  };

  const processedItems = useMemo(() => {
    return items.map((it) => {
      // API now returns 'type' (photo/video) and 'mediaUrl' directly
      const type = it.type === 'photo' ? 'photo' : 'video';
      const mediaUrl = it.mediaUrl;
      let thumbnail = mediaUrl;

      if (type === 'video') {
        const id = getYoutubeId(mediaUrl);
        thumbnail = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
      }

      return {
        ...it,
        type,
        imageSrc: mediaUrl,
        thumbnail,
        videoUrl: mediaUrl,
        date: it.activityDate,
      };
    });
  }, [items]);

  const filteredList = useMemo(() => {
    return processedItems.filter((item) => {
      if (tab === 'photos' && item.type !== 'photo') return false;
      if (tab === 'videos' && item.type !== 'video') return false;

      if (filter !== 'All') {
        const year = item.date
          ? new Date(item.date).getFullYear().toString()
          : '';
        if (year !== filter) return false;
      }

      return true;
    });
  }, [processedItems, tab, filter]);

  return (
    <main className="mt-32 flex min-h-screen w-full flex-col items-center px-4 py-10 sm:px-6">
      <div className="flex w-full max-w-6xl flex-col">
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="text-[48px] leading-[60px] font-bold tracking-[-1%] text-black sm:text-[60px] sm:leading-[72px]">
            Gallery & Field Activities
          </h1>
          <p className="max-w-[900px] text-[18px] leading-[28px] tracking-[-1%] text-[#7C7C7C] sm:text-[24px] sm:leading-[32px]">
            Collection of photos and videos showcasing laboratory activities,
            field research, seminars, and workshops organized by our team.
          </p>
        </header>

        {loading && (
          <div className="w-full animate-pulse">
            {/* Filter/Tab Skeleton */}
            <div className="mt-4 flex h-[48px] w-full items-center justify-between">
              <div className="flex gap-6">
                <div className="h-8 w-20 rounded bg-gray-200"></div>
                <div className="h-8 w-20 rounded bg-gray-200"></div>
              </div>
              <div className="h-10 w-32 rounded bg-gray-200"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <SkeletonGalleryCard key={i} />
              ))}
            </div>
          </div>
        )}
        {error && <div className="mt-10 text-center text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            <div className="mt-4 flex h-[48px] w-full items-center justify-between">
              <div className="flex gap-6">
                <button
                  onClick={() => setTab('photos')}
                  className={`cursor-pointer pb-1 text-lg ${tab === 'photos' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
                >
                  Photos
                </button>
                <button
                  onClick={() => setTab('videos')}
                  className={`cursor-pointer pb-1 text-lg ${tab === 'videos' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
                >
                  Videos
                </button>
              </div>

              <FilterDropdown
                tab={tab}
                filter={filter}
                setFilter={setFilter}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            </div>

            <section className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {filteredList.map((c, i) => (
                <GalleryCard
                  key={c.id || i}
                  type={c.type}
                  imageSrc={c.type === 'photo' ? c.imageSrc : c.thumbnail}
                  texts={[
                    { text: c.title, bold: true, size: 'large' },
                    { text: c.description, bold: false },
                  ]}
                  onClick={() => {
                    setOpenIndex(i);
                    setOpenType(c.type);
                  }}
                />
              ))}
              {filteredList.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-500">
                  No items found in this category.
                </div>
              )}
            </section>

            <AnimatePresence>
              {openIndex !== null && openType === 'photo' && (
                <PhotoModal
                  cards={filteredList}
                  index={openIndex}
                  setIndex={setOpenIndex}
                  onClose={() => setOpenIndex(null)}
                />
              )}

              {openIndex !== null && openType === 'video' && (
                <VideoModal
                  index={openIndex}
                  data={filteredList[openIndex]}
                  onClose={() => setOpenIndex(null)}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </main>
  );
}
