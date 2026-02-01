'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiCheck } from 'react-icons/hi';

export default function FilterRow({
  search = '',
  onSearchChange,
  roleOptions = [],       // Menerima opsi Role dari parent
  selectedRole = '',      // Menerima state role yang dipilih
  onRoleChange,           // Menerima fungsi pengubah role
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  // Teks yang ditampilkan di tombol dropdown
  const displayedLabel = selectedRole || 'All Role';

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:gap-6">
        
        {/* SEARCH INPUT */}
        <div className="relative w-full flex-grow">
          <input
            type="text"
            placeholder="Search researchers by name..."
            value={onSearchChange ? search : localSearch}
            onChange={(e) => {
              const val = e.target.value;
              if (onSearchChange) {
                onSearchChange(val);
              } else {
                setLocalSearch(val);
              }
            }}
            className="h-[56px] w-full rounded-[16px] border border-zinc-300 bg-white/70 px-5 pr-12 text-lg text-zinc-700 shadow-sm backdrop-blur-md placeholder:text-zinc-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
          />
          {/* Icon Search */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-50">
             <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
        </div>

        {/* DROPDOWN FILTER (ROLE) */}
        <div className="flex w-full gap-4 md:w-auto">
          <div className="relative flex-1 md:w-[240px] md:flex-none">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex h-[56px] w-full cursor-pointer items-center justify-between rounded-[16px] border ${
                selectedRole
                  ? 'border-teal-500 bg-teal-50 text-teal-800'
                  : 'border-zinc-300 bg-white/70 text-zinc-800'
              } px-5 shadow-sm backdrop-blur-md transition hover:bg-zinc-50`}
            >
              <span className="truncate text-lg font-medium">
                {displayedLabel}
              </span>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiChevronDown className={`h-6 w-6 ${selectedRole ? 'text-teal-600' : 'text-zinc-500'}`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 z-20 mt-2 max-h-[300px] w-full overflow-y-auto rounded-xl border border-zinc-200 bg-white shadow-xl ring-1 ring-black/5"
                >
                  {/* Pilihan Default: All Role */}
                  <li
                    onClick={() => {
                      if (onRoleChange) onRoleChange('');
                      setDropdownOpen(false);
                    }}
                    className="flex cursor-pointer items-center justify-between px-5 py-3 text-zinc-700 hover:bg-zinc-100 transition-colors"
                  >
                    All Role
                    {selectedRole === '' && (
                      <HiCheck className="h-5 w-5 text-teal-500" />
                    )}
                  </li>
                  
                  {/* Pilihan Dinamis dari Props */}
                  {roleOptions.length > 0 ? (
                    roleOptions.map((role) => (
                      <li
                        key={role}
                        onClick={() => {
                          if (onRoleChange) onRoleChange(role);
                          setDropdownOpen(false);
                        }}
                        className="flex cursor-pointer items-center justify-between px-5 py-3 text-zinc-700 hover:bg-zinc-100 transition-colors"
                      >
                        {role}
                        {selectedRole === role && (
                          <HiCheck className="h-5 w-5 text-teal-500" />
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="px-5 py-3 text-sm text-zinc-400 italic">
                      No roles found
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