'use client';

import { useState, useEffect } from 'react';
import ProfileCard from './_components/profile_card';
import Filter from './_components/filter';
import SkeletonProfileCard from './_components/SkeletonProfileCard';

// 1. Definisikan Hirarki Role (Semakin kecil angka, semakin tinggi posisi)
const ROLE_HIERARCHY = {
  "Director": 1,
  "Co-Deputy Director": 2,
  "Principal Investigator": 3,
  "PhD Student": 4,
  "Master Student": 5,
  "Undergraduate Student": 6,
  "Research Assistant": 7,
};

export default function ResearcherPage() {
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState(''); // State untuk filter Role

  useEffect(() => {
    const fetchResearchers = async () => {
      try {
        const response = await fetch('/api/researchers');
        const data = await response.json();
        
        // 2. Logika Sorting Custom
        const sortedData = data.sort((a, b) => {
          // Ambil nilai prioritas, jika tidak ada di list beri nilai besar (999) agar di bawah
          const priorityA = ROLE_HIERARCHY[a.role] || 999;
          const priorityB = ROLE_HIERARCHY[b.role] || 999;
          
          return priorityA - priorityB;
        });

        setResearchers(sortedData);
      } catch (error) {
        console.error('Failed to fetch researchers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchers();
  }, []);

  // 3. Filter Logic
  const filteredResearchers = researchers.filter((item) => {
    // Filter by Name (Search)
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by Role (Dropdown)
    const matchesRole = selectedRole ? item.role === selectedRole : true;

    return matchesSearch && matchesRole;
  });

  // Ambil list role unik untuk opsi dropdown
  const uniqueRoles = [...new Set(researchers.map(r => r.role))].filter(Boolean);

  return (
    <main className="min-h-screen bg-zinc-50 pb-20 pt-24 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl text-center sm:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Our Researchers
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            Meet the team dedicated to advancing fluid and process dynamics.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mt-10">
            <Filter 
            search={searchQuery}
            onSearchChange={setSearchQuery} 
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole} 
            roleOptions={uniqueRoles} // Kirim opsi role ke dropdown
            />
        </div>

        {/* Grid List */}
        <div className="mt-10 grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {loading ? (
             [...Array(6)].map((_, i) => <SkeletonProfileCard key={i} />)
          ) : filteredResearchers.length > 0 ? (
            filteredResearchers.map((researcher) => (
              <ProfileCard 
                key={researcher.id} 
                data={researcher} 
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No researchers found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}