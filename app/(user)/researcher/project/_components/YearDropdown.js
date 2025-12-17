import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function YearDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [year, setYear] = useState('All'); // default 'All'

  // Generate array tahun dari 2000 sampai 2025
  const options = Array.from({ length: 26 }, (_, i) => (2000 + i).toString());

  const handleSelect = (option) => {
    setYear(year === option ? 'All' : option);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative select-none">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-max items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:opacity-90"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-left">
          {year === 'All' ? 'Select year' : year}
        </span>

        {/* Arrow icon */}
        <img
          src="/icon/arrow-down.png"
          alt="arrow down"
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-30 mt-2 max-h-60 w-40 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            <ul className="flex flex-col py-1 text-gray-700" role="listbox">
              {options.map((opt) => {
                const active = year === opt;
                return (
                  <li
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    role="option"
                    aria-selected={active}
                    className={`cursor-pointer rounded-md px-4 py-2 transition hover:bg-gray-100 ${
                      active ? 'bg-gray-100 font-medium text-black' : ''
                    }`}
                  >
                    {opt}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
