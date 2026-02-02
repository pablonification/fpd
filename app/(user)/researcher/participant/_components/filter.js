'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiCheck } from 'react-icons/hi';

export default function FilterRow({
  search = '',
  onSearchChange,
  roleOptions = [],
  selectedRole = '',
  onRoleChange,
}) {
  const [roleOpen, setRoleOpen] = useState(false);

  const [localRole, setLocalRole] = useState('');
  const [localSearch, setLocalSearch] = useState('');

  const displayedRole = selectedRole || localRole;

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:gap-6">
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
            className="h-[56px] w-full rounded-[16px] border border-gray-300 bg-white/70 px-5 pr-12 text-lg text-gray-700 shadow-sm backdrop-blur-md placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <img
            src="/icon/search.webp"
            alt="Search"
            className="absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2 opacity-50"
          />
        </div>

        <div className="flex w-full gap-4 md:w-auto">
          {/* Role Dropdown */}
          <div className="relative flex-1 md:w-[220px] md:flex-none">
            <button
              onClick={() => {
                setRoleOpen(!roleOpen);
              }}
              className={`flex h-[56px] w-full cursor-pointer items-center justify-between rounded-[16px] border ${
                displayedRole
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 bg-white/70'
              } px-5 text-gray-800 shadow-sm backdrop-blur-md transition hover:opacity-90`}
            >
              <span className="truncate text-lg">
                {displayedRole || 'All Roles'}
              </span>
              <motion.div
                animate={{ rotate: roleOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <HiChevronDown className="h-6 w-6 text-gray-600" />
              </motion.div>
            </button>

            <AnimatePresence>
              {roleOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 z-10 mt-2 max-h-[300px] w-full overflow-y-auto rounded-[12px] border border-gray-200 bg-white shadow-xl"
                >
                  <li
                    onClick={() => {
                      if (onRoleChange) onRoleChange('');
                      setLocalRole('');
                      setRoleOpen(false);
                    }}
                    className="flex cursor-pointer items-center justify-between px-5 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    All Roles
                    {displayedRole === '' && (
                      <HiCheck className="h-5 w-5 text-blue-500" />
                    )}
                  </li>
                  {roleOptions.length > 0 ? (
                    roleOptions.map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          if (onRoleChange) onRoleChange(item);
                          setLocalRole(item);
                          setRoleOpen(false);
                        }}
                        className="flex cursor-pointer items-center justify-between px-5 py-3 text-gray-700 hover:bg-gray-100"
                      >
                        {item}
                        {displayedRole === item && (
                          <HiCheck className="h-5 w-5 text-blue-500" />
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="px-5 py-3 text-gray-400">No roles found</li>
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
