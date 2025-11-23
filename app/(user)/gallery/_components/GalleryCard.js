'use client';

import { useState } from 'react';
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
      className="flex w-full max-w-[360px] cursor-pointer flex-col items-center"
    >
      {/* Thumbnail */}
      <div className="relative w-full">
        <img
          src={imageSrc}
          alt="Card Thumbnail"
          className="h-48 w-full rounded-xl object-cover sm:h-60"
        />

        {/* Video Icon Overlay */}
      </div>

      {/* Text */}
      <div className="mt-4 flex w-full flex-col gap-2 px-2 text-left sm:px-0">
        {texts.map((t, index) => (
          <p
            key={index}
            className={`$${t.bold ? 'font-bold text-black' : 'text-gray-600'} $ {t.size === "large" ? "text-lg" : "text-sm"}`}
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
  const prevCard = cards[index - 1];
  const nextCard = cards[index + 1];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative flex h-[872px] w-[950px] flex-col justify-between rounded-[48px] bg-white p-8"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-3xl text-gray-500 hover:text-black"
          >
            ×
          </button>

          {/* MAIN CONTENT */}
          <div className="mx-auto flex w-[722px] flex-col gap-8">
            {/* IMAGE SECTION */}
            <div className="relative flex h-[550px] w-full items-center justify-center">
              {/* Left preview */}
              {prevCard && (
                <img
                  src={prevCard.imageSrc}
                  className="absolute top-[75px] left-[40px] h-[400px] w-[510px] rounded-[30px] opacity-60"
                />
              )}

              {/* Main image */}
              <img
                src={card.imageSrc}
                className="relative z-10 h-[550px] w-[550px] rounded-[32px] object-cover"
              />

              {/* Right preview */}
              {nextCard && (
                <img
                  src={nextCard.imageSrc}
                  className="absolute top-[75px] right-[40px] h-[400px] w-[510px] rounded-[30px] opacity-60"
                />
              )}
            </div>

            {/* TEXT DETAILS */}
            <div className="flex flex-col gap-3 text-left">
              <h2 className="text-[32px] leading-[40px] font-bold text-black">
                {card?.title || 'Judul'}
              </h2>

              <p className="w-fit rounded-md bg-[#2497A9]/10 px-2 py-1 text-[16px] font-medium text-[#2497A9]">
                {card?.typeLabel || 'Activity type'}
              </p>

              <p className="text-[14px] text-[#989898]">
                {card?.date || 'Wednesday 17 September 2025'}
              </p>

              <p className="max-w-[722px] text-[18px] leading-[24px] text-[#7C7C7C]">
                {card?.description || 'Deskripsi belum tersedia.'}
              </p>
            </div>
          </div>

          {/* LEFT NAV BUTTON */}
          {index > 0 && (
            <button
              onClick={() => setIndex(index - 1)}
              className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* RIGHT NAV BUTTON */}
          {index < cards.length - 1 && (
            <button
              onClick={() => setIndex(index + 1)}
              className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

//---------------------------------------------------------
// VIDEO MODAL (Placeholder)
//---------------------------------------------------------
export function VideoModal({ index, data, onClose }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative flex h-[872px] w-[1062px] flex-col rounded-[48px] bg-white p-[64px]"
        >
          {/* Main Content */}
          <div className="mx-auto flex h-[744px] w-[934px] flex-col gap-[32px]">
            {/* VIDEO */}
            <div className="h-[550px] w-[934px] overflow-hidden rounded-[32px] bg-black">
              <iframe
                src={data.youtubeUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* TEXT SECTION */}
            <div className="flex h-[162px] w-[934px] flex-col gap-[12px]">
              <h1 className="text-[32px] font-bold text-black">{data.title}</h1>

              <span className="text-[16px] font-medium text-[#2497A9]">
                {data.activityType}
              </span>

              <span className="text-[14px] font-normal text-[#989898]">
                {data.date}
              </span>

              <p className="text-[18px] leading-[24px] font-medium text-[#7C7C7C]">
                {data.description}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-4xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
