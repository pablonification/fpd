'use client';

import { useState } from 'react';
import CardProfile from './_components/profile_card';
import ProfileModal from './_components/profile_modal';
import FilterRow from './_components/filter';

export default function TeamSection() {
  const team = [
    {
      imageSrc: 'https://picsum.photos/400/300?random=1',
      name: 'John Doe',
      bidang: 'Technical Researcher',
      expertise: 'System development & prototyping',
      affiliation:
        'School of Electrical Engineering and Informatics, Institut Teknologi Bandung',
      email: 'bastian.evandi@email.com',
      description:
        'Mengolah data untuk menghasilkan insight strategis bagi tim produk.',
    },
    {
      imageSrc: 'https://picsum.photos/400/300?random=1',
      name: 'John Doe',
      bidang: 'Technical Researcher',
      expertise: 'System development & prototyping',
      affiliation:
        'School of Electrical Engineering and Informatics, Institut Teknologi Bandung',
      email: 'bastian.evandi@email.com',
      description:
        'Mengolah data untuk menghasilkan insight strategis bagi tim produk.',
    },
    {
      imageSrc: 'https://picsum.photos/400/300?random=1',
      name: 'John Doe',
      bidang: 'Technical Researcher',
      expertise: 'System development & prototyping',
      affiliation:
        'School of Electrical Engineering and Informatics, Institut Teknologi Bandung',
      email: 'bastian.evandi@email.com',
      description:
        'Mengolah data untuk menghasilkan insight strategis bagi tim produk.',
    },
    {
      imageSrc: 'https://picsum.photos/400/300?random=1',
      name: 'John Doe',
      bidang: 'Technical Researcher',
      expertise: 'System development & prototyping',
      affiliation:
        'School of Electrical Engineering and Informatics, Institut Teknologi Bandung',
      email: 'bastian.evandi@email.com',
      description:
        'Mengolah data untuk menghasilkan insight strategis bagi tim produk.',
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openModal = (i) => {
    setIndex(i);
    setModalOpen(true);
  };

  return (
    <section className="bg-bgMain mt-26 flex justify-center px-4 py-12 sm:px-8">
      <div className="w-full max-w-7xl">
        {/* Filter */}
        <div className="mb-10 w-full">
          <FilterRow />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.map((item, i) => (
            <CardProfile key={i} {...item} onClick={() => openModal(i)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={team[index]}
        onNext={() => setIndex((i) => i + 1)}
        onPrev={() => setIndex((i) => i - 1)}
        hasNext={index < team.length - 1}
        hasPrev={index > 0}
      />
    </section>
  );
}
