'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiCheck } from 'react-icons/hi';

export default function FilterRow({
  search = '',
  onSearchChange,
  expertiseOptions = [],
  selectedExpertise = '',
  onExpertiseChange,
}) {
  const [roleOpen, setRoleOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState('');

  // Local fallback if onExpertiseChange is not provided (though page passes it)
  const [localExpertise, setLocalExpertise] = useState('');

  // Local search state fallback
  const [localSearch, setLocalSearch] = useState('');

  const roles = ['Supervisor', 'Researcher', 'Participant']; // Updated to likely roles
  const displayedExpertise = selectedExpertise || localExpertise;

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="relative w-full flex-grow">
          <input
            type="text"
            placeholder="Search researchers by name or expertise"
            value={onSearchChange ? search : localSearch}
            onChange={(e) => {
              const val = e.target.value;
              if (onSearchChange) {
                onSearchChange(val);
              } else {
                setLocalSearch(val);
              }
            }}
            className="h-[56px] w-full rounded-[16px] border border-gray-300 bg-white/70 px-5 pr-12 text-lg text-gray-700 shadow-sm backdrop-blur-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
          />
          <img
            src="/icon/search.png"
            alt="Search"
            className="absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2 opacity-50"
          />
        </div>

        <div className="flex w-full gap-4 md:w-auto">
          {/* Role Dropdown - Keeping logic but maybe not used by parent yet? 
              The parent page does not seem to pass role or handle it, 
              but we will keep it for UI consistency if needed. 
              Alternatively, since user said 'filter bar', maybe just expertise?
              I'll leave it but resize it.
          */}
          {/* Expertise Dropdown */}
          <div className="relative flex-1 md:w-[220px] md:flex-none">
            <button
              onClick={() => {
                setExpertiseOpen(!expertiseOpen);
                setRoleOpen(false);
              }}
              className={`flex h-[56px] w-full items-center justify-between rounded-[16px] border ${displayedExpertise
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 bg-white/70'
                } px-5 text-gray-800 shadow-sm backdrop-blur-md transition hover:opacity-90`}
            >
              <span className="truncate text-lg">
                {displayedExpertise || 'All Expertise'}
              </span>
              <motion.div
                animate={{ rotate: expertiseOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <HiChevronDown className="h-6 w-6 text-gray-600" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expertiseOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 z-10 mt-2 max-h-[300px] w-full overflow-y-auto rounded-[12px] border border-gray-200 bg-white shadow-xl"
                >
                  <li
                    onClick={() => {
                      if (onExpertiseChange) onExpertiseChange('');
                      setLocalExpertise('');
                      setExpertiseOpen(false);
                    }}
                    className="flex cursor-pointer items-center justify-between px-5 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    All Expertise
                    {displayedExpertise === '' && (
                      <HiCheck className="h-5 w-5 text-blue-500" />
                    )}
                  </li>
                  {expertiseOptions.length > 0 ? (
                    expertiseOptions.map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          if (onExpertiseChange) onExpertiseChange(item);
                          setLocalExpertise(item);
                          setExpertiseOpen(false);
                        }}
                        className="flex cursor-pointer items-center justify-between px-5 py-3 text-gray-700 hover:bg-gray-100"
                      >
                        {item}
                        {displayedExpertise === item && (
                          <HiCheck className="h-5 w-5 text-blue-500" />
                        )}
                      </li>
                    ))
                  ) : (
                    // Fallback if no options passed
                    <li className="px-5 py-3 text-gray-400">
                      No expertise found
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
