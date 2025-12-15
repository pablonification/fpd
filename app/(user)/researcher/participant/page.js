'use client';

import { useState } from 'react';
import CardProfile from './_components/profile_card';
import ProfileModal from './_components/profile_modal';
import FilterRow from './_components/filter';

export default function TeamSection() {
  const team = [
    {
      imageSrc: 'https://picsum.photos/400/300?random=1',
      name: 'Full name of researcher or team member',
      bidang: 'Position or role of researcher in the team',
      expertise:
        'Main area of expertise of researcher, such as research focus or technology',
      affiliation:
        'Official affiliation of researcher, such as faculty, study program, and university',
      email: 'Official email address of researcher for contact',
      description:
        'Brief summary about researcher role in the team and type of contributions provided',
    },
    {
      imageSrc: 'https://picsum.photos/400/300?random=1',
      name: 'Full name of researcher or team member',
      bidang: 'Position or role of researcher in the team',
      expertise:
        'Main area of expertise of researcher, such as research focus or technology',
      affiliation:
        'Official affiliation of researcher, such as faculty, study program, and university',
      email: 'Official email address of researcher for contact',
      description:
        'Brief summary about researcher role in the team and type of contributions provided',
    },
    {
      imageSrc: 'https://picsum.photos/400/300?random=1',
      name: 'Full name of researcher or team member',
      bidang: 'Position or role of researcher in the team',
      expertise:
        'Main area of expertise of researcher, such as research focus or technology',
      affiliation:
        'Official affiliation of researcher, such as faculty, study program, and university',
      email: 'Official email address of researcher for contact',
      description:
        'Brief summary about researcher role in the team and type of contributions provided',
    },
    {
      imageSrc: 'https://picsum.photos/400/300?random=1',
      name: 'Full name of researcher or team member',
      bidang: 'Position or role of researcher in the team',
      expertise:
        'Main area of expertise of researcher, such as research focus or technology',
      affiliation:
        'Official affiliation of researcher, such as faculty, study program, and university',
      email: 'Official email address of researcher for contact',
      description:
        'Brief summary about researcher role in the team and type of contributions provided',
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
