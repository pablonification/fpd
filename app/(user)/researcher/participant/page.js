'use client';

import { useState, useEffect } from 'react';
import CardProfile from './_components/profile_card';
import ProfileModal from './_components/profile_modal';
import FilterRow from './_components/filter';

export default function TeamSection() {
  const [search, setSearch] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Fetch researchers from API
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/researchers', { cache: 'no-store' });
        const data = await response.json();

        if (data.success) {
          // Transform API data to match the expected format
          const transformedData = data.data.map((researcher) => ({
            id: researcher.id,
            imageSrc:
              researcher.avatarUrl ||
              researcher.avatar_url ||
              '/placeholder-avatar.png',
            name: researcher.name,
            bidang: researcher.expertise || 'Research',
            expertise: researcher.expertise || '',
            affiliation: researcher.affiliation || '',
            email: researcher.email || '',
            description: researcher.description || '',
          }));
          setTeam(transformedData);
        } else {
          setError('Failed to fetch researchers');
        }
      } catch (err) {
        console.error('Error fetching team:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // Apply filters
  const filteredTeam = team.filter((t) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q
      ? true
      : [t.name, t.affiliation, t.bidang, t.expertise, t.description]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q));

    const matchesExpertise = !selectedExpertise
      ? true
      : (t.expertise || '')
        .toLowerCase()
        .includes(selectedExpertise.toLowerCase());

    return matchesSearch && matchesExpertise;
  });

  // Build expertise options from team data
  const expertiseOptions = Array.from(
    new Set(
      team
        .map((t) => t.bidang)
        .filter(Boolean)
        .map((b) => {
          return b
            .replace(' and ', ' & ')
            .replace('Advanced ', '')
            .replace('Biomedical ', 'Biomedical ')
            .replace('Materials ', 'Materials ')
            .trim();
        })
    )
  );

  const openModal = (i) => {
    setIndex(i);
    setModalOpen(true);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="bg-bgMain mt-26 flex justify-center px-4 py-12 sm:px-8">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-500"></div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="bg-bgMain mt-26 flex justify-center px-4 py-12 sm:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          Error loading researchers: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bgMain mt-32 flex justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-7xl">
        {/* Filter */}
        <div className="mb-10 w-full">
          <FilterRow
            search={search}
            onSearchChange={setSearch}
            selectedExpertise={selectedExpertise}
            onExpertiseChange={setSelectedExpertise}
            expertiseOptions={expertiseOptions}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTeam.length === 0 ? (
            <div className="col-span-full rounded-xl border border-neutral-200 bg-white p-6 text-center text-neutral-600">
              No matching participants found.
            </div>
          ) : (
            filteredTeam.map((item, i) => (
              <CardProfile key={i} {...item} onClick={() => openModal(i)} />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <ProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={filteredTeam[index]}
        onNext={() => setIndex((i) => Math.min(i + 1, filteredTeam.length - 1))}
        onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
        hasNext={index < filteredTeam.length - 1}
        hasPrev={index > 0}
      />
    </section>
  );
}
