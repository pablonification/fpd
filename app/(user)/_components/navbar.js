'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-grayLight fixed top-6 left-1/2 z-50 w-[90%] max-w-[727px] -translate-x-1/2 rounded-[33px] px-6 py-3 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="bg-grayMid text-grayDark flex h-9 w-9 items-center justify-center rounded-lg text-xl font-semibold">
          F
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 font-bold md:flex">
          <Link
            href="/"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            Home
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-grayDark flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition select-none hover:opacity-90"
            >
              <span>Researchers</span>
              <img
                src="/icon/arrow-down.png"
                alt="arrow down"
                className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
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
                      <Link
                        href="/researcher/participant"
                        className="block w-full"
                      >
                        Participant
                      </Link>
                    </li>
                    <li className="hover:bg-grayLight cursor-pointer rounded-md px-4 py-2">
                      <Link href="/researcher/project" className="block w-full">
                        Project
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
        </div>

        {/* Sign Up */}
        <Link
          href="/signup"
          className="bg-grayDark hidden items-center rounded-3xl px-4 py-2 text-white transition hover:opacity-90 md:flex"
        >
          Sign Up
        </Link>

        {/* Hamburger Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-3 flex flex-col gap-2 px-2 font-bold md:hidden"
          >
            <Link
              href="/"
              className="text-grayDark hover:text-primaryGradientEnd transition"
            >
              Home
            </Link>

            {/* Dropdown bisa jadi collapsible di mobile */}
            <div>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-grayDark flex cursor-pointer items-center gap-2 px-2 py-1 select-none hover:opacity-90"
              >
                Researchers
                <img
                  src="/icon/arrow-down.png"
                  alt="arrow down"
                  className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1 pl-4"
                  >
                    <Link
                      href="/researcher/1"
                      className="text-grayDark hover:text-primaryGradientEnd transition"
                    >
                      Researcher 1
                    </Link>
                    <Link
                      href="/researcher/2"
                      className="text-grayDark hover:text-primaryGradientEnd transition"
                    >
                      Researcher 2
                    </Link>
                    <Link
                      href="/researcher/3"
                      className="text-grayDark hover:text-primaryGradientEnd transition"
                    >
                      Researcher 3
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              href="/signup"
              className="bg-grayDark flex items-center justify-center rounded-3xl px-4 py-2 text-white transition hover:opacity-90"
            >
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
