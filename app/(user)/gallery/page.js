'use client';

import { useState } from 'react';
import { GalleryCard, PhotoModal, VideoModal } from './_components/GalleryCard';
import { motion, AnimatePresence } from 'framer-motion';
import FilterDropdown from './_components/FilterDropdown';

export default function GalleryPage() {
  const [tab, setTab] = useState('photos');
  const [filter, setFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null); // index card yang terbuka
  const [openType, setOpenType] = useState(null);
  const photoCards = [
    {
      type: 'photo',
      imageSrc: 'https://picsum.photos/400/250?random=1',
      title: 'Photo title explaining the field activity documented here',
      typeLabel: 'Field Research',
      date: 'Date of activity according to this photo documentation',
      description:
        'Brief description of what is happening in the photo, such as activity and location',
    },
    {
      type: 'photo',
      imageSrc: 'https://picsum.photos/400/250?random=2',
      title: 'Photo title explaining the field activity documented here',
      typeLabel: 'Laboratory Activities',
      date: 'Date of activity according to this photo documentation',
      description:
        'Brief description of what is happening in the photo, such as activity and location',
    },
    {
      type: 'photo',
      imageSrc: 'https://picsum.photos/400/250?random=1',
      title: 'Photo title explaining the field activity documented here',
      typeLabel: 'Field Research',
      date: 'Date of activity according to this photo documentation',
      description:
        'Brief description of what is happening in the photo, such as activity and location',
    },
    {
      type: 'photo',
      imageSrc: 'https://picsum.photos/400/250?random=2',
      title: 'Photo title explaining the field activity documented here',
      typeLabel: 'Laboratory Activities',
      date: 'Date of activity according to this photo documentation',
      description:
        'Brief description of what is happening in the photo, such as activity and location',
    },
  ];

  const videoCards = [
    {
      type: 'video',
      title:
        'Video title summarizing the main content of the documented activity',
      activityType:
        'Type of activity shown in the video, such as field visit or educational session',
      date: 'Date of activity recorded in the video',
      typeLabel: 'Field Research',
      description: 'Brief summary of what viewers will see in this video',
      youtubeUrl: 'https://www.youtube.com/embed/o6zb6_TTVWo',
      thumbnail: 'https://picsum.photos/400/250?random=3',
    },
    {
      type: 'video',
      title:
        'Video title summarizing the main content of the documented activity',
      activityType:
        'Type of activity shown in the video, such as field visit or educational session',
      typeLabel: 'Field Research',
      date: 'Date of activity recorded in the video',
      description: 'Brief summary of what viewers will see in this video',
      youtubeUrl: 'https://www.youtube.com/embed/o6zb6_TTVWo',
      thumbnail: 'https://picsum.photos/400/250?random=4',
    },
    {
      type: 'video',
      title:
        'Video title summarizing the main content of the documented activity',
      activityType:
        'Type of activity shown in the video, such as field visit or educational session',
      date: 'Date of activity recorded in the video',
      typeLabel: 'Laboratories Activity',
      description: 'Brief summary of what viewers will see in this video',
      youtubeUrl: 'https://www.youtube.com/embed/o6zb6_TTVWo',
      thumbnail: 'https://picsum.photos/400/250?random=3',
    },
    {
      type: 'video',
      title:
        'Video title summarizing the main content of the documented activity',
      activityType:
        'Type of activity shown in the video, such as field visit or educational session',
      date: 'Date of activity recorded in the video',
      typeLabel: 'Laboratories Activity',
      description: 'Brief summary of what viewers will see in this video',
      youtubeUrl: 'https://www.youtube.com/embed/o6zb6_TTVWo',
      thumbnail: 'https://picsum.photos/400/250?random=4',
    },
  ];

  const activeList = tab === 'photos' ? photoCards : videoCards;

  const filteredList =
    filter === 'All'
      ? activeList
      : activeList.filter((c) => c.typeLabel === filter);

  return (
    <main className="mt-32 min-h-screen w-full overflow-visible overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-[1296px] flex-col gap-6 px-4 py-10">
        {/* ----------------------------------------------------- */}
        {/* HEADER */}
        {/* ----------------------------------------------------- */}
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="text-[48px] leading-[60px] font-bold tracking-[-1%] text-black sm:text-[60px] sm:leading-[72px]">
            Gallery & Field Activities
          </h1>

          <p className="max-w-[900px] text-[18px] leading-[28px] tracking-[-1%] text-[#7C7C7C] sm:text-[24px] sm:leading-[32px]">
            Collection of photos and videos showcasing laboratory activities,
            field research, seminars, and workshops organized by our team.
          </p>
        </header>

        {/* ----------------------------------------------------- */}
        {/* NAVBAR KECIL */}
        {/* ----------------------------------------------------- */}

        {/* Dropdown kanan */}
        {/* NAVBAR KECIL */}
        <div className="mt-4 flex h-[48px] w-full items-center justify-between">
          {/* Left buttons */}
          <div className="flex gap-6">
            <button
              onClick={() => setTab('photos')}
              className={`pb-1 text-lg ${
                tab === 'photos'
                  ? 'border-b-2 border-black font-semibold'
                  : 'text-gray-500'
              }`}
            >
              Photos
            </button>

            <button
              onClick={() => setTab('videos')}
              className={`pb-1 text-lg ${
                tab === 'videos'
                  ? 'border-b-2 border-black font-semibold'
                  : 'text-gray-500'
              }`}
            >
              Videos
            </button>
          </div>

          {/* RIGHT DROPDOWN */}
          <FilterDropdown
            tab={tab}
            filter={filter}
            setFilter={setFilter}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>

        {/* ----------------------------------------------------- */}
        {/* MAIN CONTENT */}
        {/* ----------------------------------------------------- */}
        <section className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {filteredList.map((c, i) => (
            <GalleryCard
              key={i}
              type={c.type}
              imageSrc={c.type === 'photo' ? c.imageSrc : c.thumbnail} // bedakan
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
              data={filteredList[openIndex]} // << WAJIB tambahkan ini
              onClose={() => setOpenIndex(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
