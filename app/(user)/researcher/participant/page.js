'use client';

import { useState, useEffect } from 'react';
import CardProfile from './_components/profile_card';
import ProfileModal from './_components/profile_modal';
import FilterRow from './_components/filter';
import SkeletonProfileCard from './_components/SkeletonProfileCard';

export default function TeamSection() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [team, setTeam] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const timestamp = Date.now();
        const [rolesResponse, researchersResponse] = await Promise.all([
          fetch(`/api/researchers/roles?_t=${timestamp}`, {
            cache: 'no-store',
          }),
          fetch(`/api/researchers?_t=${timestamp}`, { cache: 'no-store' }),
        ]);

        const rolesData = await rolesResponse.json();
        const researchersData = await researchersResponse.json();

        if (rolesData.success) {
          setRoles(rolesData.data);
        }

        if (researchersData.success) {
          const transformedData = researchersData.data.map((researcher) => ({
            id: researcher.id,
            imageSrc:
              researcher.avatarUrl ||
              researcher.avatar_url ||
              '/placeholder-avatar.webp',
            name: researcher.name,
            bidang: researcher.role || 'Proffesor',
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
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTeam = team.filter((t) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q
      ? true
      : [t.name, t.affiliation, t.bidang, t.expertise, t.description]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q));

    const matchesRole = !selectedRole
      ? true
      : (t.bidang || '').toLowerCase() === selectedRole.toLowerCase();

    return matchesSearch && matchesRole;
  });

  const roleOptions = Array.from(
    new Set(team.map((t) => t.bidang).filter(Boolean))
  ).sort();

  const getRoleOrder = (roleName) => {
    const role = roles.find(
      (r) => r.name.toLowerCase() === (roleName || '').toLowerCase()
    );
    return role ? role.order : 999;
  };

  const sortedTeam = [...filteredTeam].sort((a, b) => {
    return getRoleOrder(a.bidang) - getRoleOrder(b.bidang);
  });

  const openModal = (i) => {
    setIndex(i);
    setModalOpen(true);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="bg-bgMain mt-32 flex justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-6xl">
          {/* Header Skeleton */}
          <div className="flex w-full flex-col items-center gap-2 text-center sm:gap-3">
            <div className="h-10 w-48 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-full max-w-2xl animate-pulse rounded bg-gray-200"></div>
          </div>

          {/* Filter Skeleton */}
          <div className="mt-10 mb-10 w-full">
            <div className="h-[56px] w-full animate-pulse rounded-[16px] bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonProfileCard key={i} />
            ))}
          </div>
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
      <div className="w-full max-w-6xl">
        <header className="flex w-full flex-col items-center gap-2 text-center sm:gap-3">
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Researchers
          </h1>
          <p className="max-w-7xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Meet our dedicated researchers who are passionate about pushing the
            boundaries of knowledge and making a positive impact on society.
          </p>
        </header>
        {/* Filter */}
        <div className="mt-10 mb-10 w-full">
          <FilterRow
            search={search}
            onSearchChange={setSearch}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            roleOptions={roleOptions}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedTeam.length === 0 ? (
            <div className="col-span-full rounded-xl border border-neutral-200 bg-white p-6 text-center text-neutral-600">
              No matching participants found.
            </div>
          ) : (
            sortedTeam.map((item, i) => (
              <CardProfile key={i} {...item} onClick={() => openModal(i)} />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <ProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={sortedTeam[index]}
        onNext={() => setIndex((i) => Math.min(i + 1, sortedTeam.length - 1))}
        onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
        hasNext={index < sortedTeam.length - 1}
        hasPrev={index > 0}
      />
    </section>
  );
}
