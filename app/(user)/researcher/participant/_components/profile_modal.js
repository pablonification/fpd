'use client';

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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal box */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-white px-10 py-10 shadow-xl"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
            >
              <X size={26} />
            </button>

            {/* Avatar */}
            <div className="flex w-full flex-col items-center text-center">
              <img
                src={data?.imageSrc}
                alt={data?.name}
                className="h-32 w-32 rounded-2xl object-cover shadow-md"
              />

              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                {data?.name}
              </h2>
            </div>

            {/* Content with arrows */}
            <div className="mt-8 flex w-full items-start justify-center gap-8">
              {/* Left Arrow */}
              <div className="flex items-center">
                {hasPrev && (
                  <button
                    onClick={onPrev}
                    className="rounded-full border border-gray-300 p-3 hover:bg-gray-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}
              </div>

              {/* Middle Content */}
              <div className="w-full max-w-xl space-y-6 text-gray-700">
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

              {/* Right Arrow */}
              <div className="flex items-center">
                {hasNext && (
                  <button
                    onClick={onNext}
                    className="rounded-full border border-gray-300 p-3 hover:bg-gray-100"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
