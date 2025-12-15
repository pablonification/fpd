import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterDropdown({ tab, filter, setFilter }) {
  const [open, setOpen] = useState(false);

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
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 select-none hover:opacity-90"
      >
        <span>
          {filter === 'All'
            ? 'Activity type (select to filter documentation by activity type)'
            : filter}
        </span>
        <img
          src="/icon/arrow-down.png"
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
            <ul className="flex flex-col text-gray-700">
              {options.map((opt) => (
                <li
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
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
