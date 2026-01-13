'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-grayLight fixed top-6 left-1/2 z-50 w-[95%] max-w-[800px] -translate-x-1/2 rounded-[33px] px-4 py-3 shadow-md backdrop-blur-md sm:px-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10"
        >
          <img
            src="/final-logo.svg"
            alt="Si-Zero"
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="hidden items-center gap-4 text-base font-bold lg:flex lg:gap-5">
          <Link
            href="/"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            Home
          </Link>
          <Link
            href="/researcher/participant"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            Researchers
          </Link>
          <Link
            href="/researcher/project"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            Publications
          </Link>
          <Link
            href="/news"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            News
          </Link>
          <Link
            href="/gallery"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            About
          </Link>
        </div>

        <Link
          href="/about#contact-us"
          className="bg-grayDark hidden items-center rounded-3xl px-4 py-2 text-base text-white transition hover:opacity-90 lg:flex"
        >
          Contact Us
        </Link>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="cursor-pointer"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-2 pt-2 pb-4 text-base font-bold">
              <Link
                href="/"
                className="text-grayDark hover:text-primaryGradientEnd py-2 transition"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/researcher/participant"
                className="text-grayDark hover:text-primaryGradientEnd py-2 transition"
                onClick={() => setMobileOpen(false)}
              >
                Researchers
              </Link>
              <Link
                href="/researcher/project"
                className="text-grayDark hover:text-primaryGradientEnd py-2 transition"
                onClick={() => setMobileOpen(false)}
              >
                Publications
              </Link>
              <Link
                href="/news"
                className="text-grayDark hover:text-primaryGradientEnd py-2 transition"
                onClick={() => setMobileOpen(false)}
              >
                News
              </Link>
              <Link
                href="/gallery"
                className="text-grayDark hover:text-primaryGradientEnd py-2 transition"
                onClick={() => setMobileOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="text-grayDark hover:text-primaryGradientEnd py-2 transition"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/about#contact-us"
                className="bg-grayDark mt-2 flex items-center justify-center rounded-3xl px-4 py-3 text-white transition hover:opacity-90"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
