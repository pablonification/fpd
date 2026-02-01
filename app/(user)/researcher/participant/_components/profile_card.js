'use client';

import { useState } from 'react';
import ProfileModal from './profile_modal'; 

export default function ProfileCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  // Fallback values untuk menghindari error jika data kosong
  const imageSrc = data.image || null;
  const name = data.name || 'Unknown Researcher';
  const role = data.role || 'Member';
  const expertise = data.expertise || '-';
  const institution = data.institution || 'Swinburne University';

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group relative flex w-full max-w-[360px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-zinc-200"
      >
        {/* Image Section */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 sm:aspect-[1/1]">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-400">
              <span className="text-4xl">👤</span>
            </div>
          )}
          
          {/* Overlay Gradient (Optional aesthetic) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Info Section */}
        <div className="flex flex-1 flex-col p-5">
          {/* 1. ROLE (Paling Atas - Aksen Warna) */}
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-teal-600">
            {role}
          </p>

          {/* 2. NAMA */}
          <h3 className="text-lg font-bold text-zinc-900 group-hover:text-teal-700 transition-colors">
            {name}
          </h3>

          {/* 3. EXPERTISE */}
          <div className="mt-3 mb-4">
             <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Expertise</p>
             <p className="text-sm text-zinc-700 line-clamp-2 leading-relaxed">
               {expertise}
             </p>
          </div>

          {/* 4. INSTITUTION (Footer Info) */}
          <div className="mt-auto border-t border-zinc-100 pt-3">
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
              {/* Icon Building/University */}
              <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="truncate">{institution}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detail (Pastikan file profile_modal.js ada) */}
      <ProfileModal 
        isOpen={isOpen} 
        closeModal={() => setIsOpen(false)} 
        data={data} 
      />
    </>
  );
}