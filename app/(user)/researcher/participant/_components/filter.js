'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiCheck, HiSearch } from 'react-icons/hi';

export default function FilterRow() {
  const [roleOpen, setRoleOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');

  const roles = ['Admin', 'Researcher', 'Participant'];
  const expertises = ['Frontend', 'Backend', 'AI', 'Data Science'];

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl flex-col gap-4 md:flex-row md:items-center md:gap-6">
        {/* 🔍 Row 1: Search bar */}
        <div className="relative w-full flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="h-[48px] w-full rounded-[16px] border border-gray-300 bg-white/70 px-5 pr-12 text-gray-700 shadow-sm backdrop-blur-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <HiSearch className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
        </div>

        {/* 🔽 Row 2: Two dropdowns side by side on mobile */}
        <div className="flex w-full gap-4 md:w-auto">
          {/* Role Dropdown */}
          <div className="relative flex-1 md:w-[180px] md:flex-none">
            <button
              onClick={() => {
                setRoleOpen(!roleOpen);
                setExpertiseOpen(false);
              }}
              className={`flex h-[48px] w-full items-center justify-between rounded-[16px] border ${
                selectedRole
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 bg-white/70'
              } px-4 text-gray-800 shadow-sm backdrop-blur-md transition hover:opacity-90`}
            >
              <span className="truncate">{selectedRole || 'Role'}</span>
              <motion.div
                animate={{ rotate: roleOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <HiChevronDown className="h-5 w-5 text-gray-600" />
              </motion.div>
            </button>

            <AnimatePresence>
              {roleOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 z-10 mt-2 w-full rounded-[12px] border border-gray-200 bg-white shadow-md"
                >
                  {roles.map((item) => (
                    <li
                      key={item}
                      onClick={() => {
                        setSelectedRole(selectedRole === item ? '' : item);
                        setRoleOpen(false);
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {item}
                      {selectedRole === item && (
                        <HiCheck className="h-4 w-4 text-blue-500" />
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Expertise Dropdown */}
          <div className="relative flex-1 md:w-[180px] md:flex-none">
            <button
              onClick={() => {
                setExpertiseOpen(!expertiseOpen);
                setRoleOpen(false);
              }}
              className={`flex h-[48px] w-full items-center justify-between rounded-[16px] border ${
                selectedExpertise
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 bg-white/70'
              } px-4 text-gray-800 shadow-sm backdrop-blur-md transition hover:opacity-90`}
            >
              <span className="truncate">
                {selectedExpertise || 'Expertise'}
              </span>
              <motion.div
                animate={{ rotate: expertiseOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <HiChevronDown className="h-5 w-5 text-gray-600" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expertiseOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 z-10 mt-2 w-full rounded-[12px] border border-gray-200 bg-white shadow-md"
                >
                  {expertises.map((item) => (
                    <li
                      key={item}
                      onClick={() => {
                        setSelectedExpertise(
                          selectedExpertise === item ? '' : item
                        );
                        setExpertiseOpen(false);
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {item}
                      {selectedExpertise === item && (
                        <HiCheck className="h-4 w-4 text-blue-500" />
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
