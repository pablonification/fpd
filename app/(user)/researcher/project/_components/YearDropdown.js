import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function YearDropdown({ year = 'All', setYear }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Years from 2015 to 2025
  const options = ['All', ...Array.from({ length: 11 }, (_, i) => (2015 + i).toString()).reverse()];

  const handleSelect = (option) => {
    if (setYear) {
      setYear(option);
    }
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
        className="flex w-max min-w-[140px] items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-[#2AB2C7] hover:bg-gray-50 active:scale-95"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-left">
          {year === 'All' ? 'Select Year' : year}
        </span>

        {/* Arrow icon */}
        <span className={`text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 z-30 mt-2 max-h-60 w-44 overflow-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5"
          >
            <ul className="flex flex-col gap-1 text-gray-600" role="listbox">
              {options.map((opt) => {
                const active = year === opt;
                return (
                  <li
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    role="option"
                    aria-selected={active}
                    className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-[#DFF5F8] hover:text-[#2497A9] ${active ? 'bg-[#2AB2C7] text-white hover:bg-[#2AB2C7] hover:text-white' : ''
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
