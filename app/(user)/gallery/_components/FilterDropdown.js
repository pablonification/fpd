'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterDropdown({ tab, filter, setFilter }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const photoOptions = ['Laboratory Activities', 'Field Research'];
  const videoOptions = ['Workshops', 'Seminars', 'Experiments'];

  const options = tab === 'photos' ? photoOptions : videoOptions;

  const handleSelect = (option) => {
    if (filter === option) {
      setFilter('All');
    } else {
      setFilter(option);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 select-none hover:opacity-90 focus:ring-2 focus:ring-gray-300 focus:outline-none"
      >
        <span>{filter === 'All' ? 'All Activities' : filter}</span>
        <img
          src="/icon/arrow-down.webp"
          alt="arrow down"
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-0 z-30 mt-2 w-56 rounded-lg border border-gray-300 bg-white shadow-md"
          >
            <ul className="flex flex-col text-gray-700" role="listbox">
              {options.map((opt) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={filter === opt}
                  tabIndex={0}
                  onClick={() => handleSelect(opt)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(opt);
                    }
                  }}
                  className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {opt}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
