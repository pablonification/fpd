'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProfileModal({
  isOpen,
  onClose,
  data,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal box */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-[70] max-h-[90vh] w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[30px] bg-white px-6 py-8 shadow-xl sm:px-10 sm:py-10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 sm:top-6 sm:right-6"
            >
              <X size={26} />
            </button>

            {/* Avatar */}
            <div className="flex w-full flex-col items-center text-center">
              <img
                src={data?.imageSrc}
                alt={data?.name}
                className="h-24 w-24 rounded-2xl object-cover shadow-md sm:h-32 sm:w-32"
              />

              <h2 className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                {data?.name}
              </h2>
            </div>

            {/* Content with arrows */}
            <div className="mt-6 flex w-full flex-col items-center gap-4 sm:mt-8 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
              {/* Left Arrow - hidden on mobile, shown on sm+ */}
              <div className="hidden items-center sm:flex">
                {hasPrev && (
                  <button
                    onClick={onPrev}
                    className="cursor-pointer rounded-full border border-[#DCDCDC] p-3 hover:bg-gray-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}
              </div>

              {/* Middle Content */}
              <div className="w-full max-w-xl space-y-4 text-gray-700 sm:space-y-6">
                {/* Biography */}
                {data?.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      About
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-600">
                      {data.description}
                    </p>
                  </div>
                )}

                {/* Position */}
                <div>
                  <p className="text-sm text-gray-400">Position</p>
                  <p className="text-base font-medium">{data?.bidang}</p>
                </div>

                {/* Expertise */}
                {data?.expertise && (
                  <div>
                    <p className="text-sm text-gray-400">Area of Expertise</p>
                    <p className="text-base font-medium">{data.expertise}</p>
                  </div>
                )}

                {/* Affiliation */}
                {data?.affiliation && (
                  <div>
                    <p className="text-sm text-gray-400">Affiliation</p>
                    <p className="text-base font-medium">{data.affiliation}</p>
                  </div>
                )}

                {/* Contact */}
                {data?.email && (
                  <div>
                    <p className="text-sm text-gray-400">Contact/Email</p>
                    <p className="text-base font-medium">{data.email}</p>
                  </div>
                )}
              </div>

              {/* Right Arrow - hidden on mobile */}
              <div className="hidden items-center sm:flex">
                {hasNext && (
                  <button
                    onClick={onNext}
                    className="cursor-pointer rounded-full border border-[#DCDCDC] p-3 hover:bg-gray-100"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="mt-6 flex justify-center gap-4 sm:hidden">
              {hasPrev && (
                <button
                  onClick={onPrev}
                  className="cursor-pointer rounded-full border border-[#DCDCDC] p-3 hover:bg-gray-100"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {hasNext && (
                <button
                  onClick={onNext}
                  className="cursor-pointer rounded-full border border-[#DCDCDC] p-3 hover:bg-gray-100"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
