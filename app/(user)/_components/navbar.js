'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-grayLight fixed top-6 left-1/2 z-50 flex h-[72px] w-[727px] -translate-x-1/2 items-center justify-between rounded-[33px] px-8 shadow-md backdrop-blur-md">
      {/* Kiri - Logo */}
      <div className="bg-grayMid text-grayDark flex h-9 w-9 items-center justify-center rounded-lg text-xl font-semibold">
        F
      </div>

      {/* Tengah - Navigasi */}
      <div className="relative flex gap-6 font-bold">
        <Link
          href="/"
          className="text-grayDark hover:text-primaryGradientEnd flex items-center transition"
        >
          Home
        </Link>

        {/* Dropdown Researchers */}
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-grayDark flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition select-none hover:opacity-90"
          >
            <span>Researchers</span>
            <img
              src="/icon/arrow-down.png"
              alt="arrow down"
              className={`h-4 w-4 transition-transform ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="border-grayMid absolute right-0 mt-1 w-40 rounded-lg border bg-white shadow-md"
              >
                <ul className="text-grayDark flex flex-col">
                  <li className="hover:bg-grayLight cursor-pointer rounded-md px-4 py-2">
                    <Link href="/researcher/1" className="block w-full">
                      Researcher 1
                    </Link>
                  </li>
                  <li className="hover:bg-grayLight cursor-pointer rounded-md px-4 py-2">
                    <Link href="/researcher/2" className="block w-full">
                      Researcher 2
                    </Link>
                  </li>
                  <li className="hover:bg-grayLight cursor-pointer rounded-md px-4 py-2">
                    <Link href="/researcher/3" className="block w-full">
                      Researcher 3
                    </Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/news"
          className="text-grayDark hover:text-primaryGradientEnd flex items-center transition"
        >
          News
        </Link>

        <Link
          href="/gallery"
          className="text-grayDark hover:text-primaryGradientEnd flex items-center transition"
        >
          Gallery
        </Link>
      </div>

      {/* Kanan - Sign Up */}
      <Link
        href="/signup"
        className="bg-grayDark flex items-center rounded-3xl px-4 py-2 text-white transition hover:opacity-90"
      >
        Sign Up
      </Link>
    </nav>
  );
}
