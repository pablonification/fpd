'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

//---------------------------------------------------------
// CARD COMPONENT (PHOTO & VIDEO)
//---------------------------------------------------------
export function GalleryCard({
  type = 'photo', // "photo" | "video"
  imageSrc,
  texts = [],
  onClick = () => {},
}) {
  return (
    <div
      onClick={onClick}
      className="group flex w-full max-w-[360px] cursor-pointer flex-col items-center"
    >
      {/* Thumbnail */}
      <div className="relative w-full">
        <img
          src={imageSrc}
          alt="Card Thumbnail"
          className="h-48 w-full rounded-xl object-cover transition-all duration-300 ease-out group-hover:brightness-[0.8] sm:h-60"
        />

        {/* Video Icon Overlay */}
      </div>

      {/* Text */}
      <div className="mt-4 flex w-full flex-col gap-2 px-2 text-left sm:px-0">
        {texts.map((t, index) => (
          <p
            key={index}
            className={`${t.bold ? 'leading-tight font-bold text-black' : 'leading-normal text-gray-600'} ${t.size === 'large' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'} ${index === 0 ? 'group-hover:text-primaryGradientEnd transition-colors duration-300 ease-out' : ''}`}
          >
            {t.text}
          </p>
        ))}
      </div>
    </div>
  );
}

//---------------------------------------------------------
// PHOTO MODAL COMPONENT
//---------------------------------------------------------
export function PhotoModal({ cards = [], index = 0, onClose, setIndex }) {
  const card = cards[index];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && index > 0) setIndex(index - 1);
      if (e.key === 'ArrowRight' && index < cards.length - 1)
        setIndex(index + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, index, setIndex, cards.length]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-[70] flex max-h-[90vh] w-full max-w-[700px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:w-[95%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-500 backdrop-blur-sm transition-colors hover:bg-gray-100 hover:text-black"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
            <div className="group relative flex min-h-[300px] w-full items-center justify-center rounded-2xl bg-gray-50 p-2 sm:min-h-[400px]">
              {index > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(index - 1);
                  }}
                  className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white sm:h-12 sm:w-12"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <div className="relative flex h-full w-full items-center justify-center">
                <img
                  src={card.imageSrc}
                  alt={card.title || 'Gallery Image'}
                  className="max-h-[50vh] w-auto max-w-full rounded-lg object-contain shadow-sm"
                />
              </div>

              {index < cards.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(index + 1);
                  }}
                  className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white sm:h-12 sm:w-12"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 text-left">
              <h2 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl md:text-4xl">
                {card?.title || 'Untitled Photo'}
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#2497A9]/10 px-3 py-1 text-xs font-semibold text-[#2497A9] sm:text-sm">
                  {card?.typeLabel || 'Activity'}
                </span>
                <span className="text-xs text-gray-500 sm:text-sm">
                  {card?.date || ''}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                {card?.description || ''}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

//---------------------------------------------------------
// VIDEO MODAL (Placeholder)
//---------------------------------------------------------
export function VideoModal({ index, data, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const regex = /(?:v=|\.be\/)([A-Za-z0-9_-]{6,11})/;
    const match = url.match(regex);
    const id = match ? match[1] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
  };

  const embedUrl = getYoutubeEmbedUrl(data.videoUrl);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-[70] flex max-h-[90vh] w-full max-w-[700px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:w-[95%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-500 backdrop-blur-sm transition-colors hover:bg-gray-100 hover:text-black"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-md">
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={data.title || 'Video Player'}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 text-left">
              <h2 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl md:text-4xl">
                {data.title || 'Untitled Video'}
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#2497A9]/10 px-3 py-1 text-xs font-semibold text-[#2497A9] sm:text-sm">
                  {data.activityType || 'Video'}
                </span>
                <span className="text-xs text-gray-500 sm:text-sm">
                  {data.date ? new Date(data.date).toLocaleDateString() : ''}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                {data.description || ''}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
