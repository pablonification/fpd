'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileResearchersOpen, setMobileResearchersOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside or Escape key pressed
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <nav className="bg-grayLight fixed top-6 left-1/2 z-50 w-[90%] max-w-[727px] -translate-x-1/2 rounded-[33px] px-6 py-3 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10">
          <img
            src="/institution/sizero-icon.png"
            alt="Si-Zero"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 text-sm font-bold sm:text-base md:flex">
          <Link
            href="/"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            Home
          </Link>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
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
                        onClick={() => setDropdownOpen(false)}
                      >
                        Participant
                      </Link>
                    </li>
                    <li className="hover:bg-grayLight cursor-pointer rounded-md px-4 py-2">
                      <Link
                        href="/researcher/project"
                        className="block w-full"
                        onClick={() => setDropdownOpen(false)}
                      >
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
          <Link
            href="/about"
            className="text-grayDark hover:text-primaryGradientEnd transition"
          >
            About
          </Link>
        </div>

        {/* Sign Up */}
        <Link
          href="/login"
          className="bg-grayDark hidden items-center rounded-3xl px-4 py-2 text-white transition hover:opacity-90 md:flex"
        >
          Sign Up
        </Link>

        {/* Hamburger Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="cursor-pointer"
          >
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-2 pt-2 pb-4 font-bold">
              <Link
                href="/"
                className="text-grayDark hover:text-primaryGradientEnd py-2 transition"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              {/* Dropdown bisa jadi collapsible di mobile */}
              <div>
                <div
                  onClick={() =>
                    setMobileResearchersOpen(!mobileResearchersOpen)
                  }
                  className="text-grayDark flex cursor-pointer items-center justify-between py-2 select-none hover:opacity-90"
                >
                  <span>Researchers</span>
                  <img
                    src="/icon/arrow-down.png"
                    alt="arrow down"
                    className={`h-4 w-4 transition-transform duration-300 ${
                      mobileResearchersOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {mobileResearchersOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2 pb-2 pl-4 text-sm text-gray-600">
                        <Link
                          href="/researcher/participant"
                          className="hover:text-primaryGradientEnd block w-full py-2 transition"
                          onClick={() => setMobileOpen(false)}
                        >
                          Participant
                        </Link>

                        <Link
                          href="/researcher/project"
                          className="hover:text-primaryGradientEnd block w-full py-2 transition"
                          onClick={() => setMobileOpen(false)}
                        >
                          Project
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                href="/login"
                className="bg-grayDark mt-2 flex items-center justify-center rounded-3xl px-4 py-3 text-white transition hover:opacity-90"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
