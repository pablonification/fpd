'use client';

import { useState } from 'react';
import CardProfile from './_components/profile_card';
import ProfileModal from './_components/profile_modal';
import FilterRow from './_components/filter';

export default function TeamSection() {
  const [search, setSearch] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const team = [
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/AkbarRhamdani.jpeg',
      name: 'Prof Akbar Rhamdhani',
      bidang: 'Sustainable metallurgy and low-carbon metals processing',
      expertise:
        'Metal recycling, critical materials recovery, next-generation refining technologies',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'Prof. Rhamdhani is an expert in sustainable metallurgy and low-carbon metals processing. He leads research on metal recycling, critical materials, and next-generation refining technologies, and collaborates extensively with industry and international partners.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/AlanDuffy.jpeg',
      name: 'Prof Alan Duffy',
      bidang: 'Astrophysics and space-enabled technologies',
      expertise:
        'Dark matter, simulated universes, multidisciplinary research partnerships, science communication',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'Prof. Duffy is a leading astrophysicist driving large-scale, multidisciplinary research across government, industry, and academia, with strong impact in research leadership, public engagement, and entrepreneurship.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/Yvone.jpeg',
      name: 'A/Prof Yvonne Durandet',
      bidang: 'Advanced manufacturing and materials processing',
      expertise:
        'Laser processing, joining, casting, metal surface engineering',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'A/Prof Durandet specialises in advanced manufacturing with extensive industry engagement. She has led major R&D programs and brings strong industrial experience from her previous role at BHP.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/Bintang.jpeg',
      name: 'Dr Bintang A. Nuraeni',
      bidang: 'Battery recycling and critical materials',
      expertise:
        'Lithium-ion battery recycling, safe and cost-effective recovery processes',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'Dr Nuraeni is a researcher specialising in lithium-ion battery recycling. She completed her PhD at Swinburne and a postdoctoral fellowship at Argonne National Laboratory, contributing to sustainable battery technologies.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/Reiza.jpeg',
      name: 'Dr Reiza Mukhlis',
      bidang: 'High-temperature metallurgy and low-carbon metal processes',
      expertise:
        'Critical minerals recovery, battery recycling, decarbonisation technologies',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'Dr Mukhlis focuses on high-temperature metallurgy and sustainable metal processing, collaborating closely with CSIRO and industry to develop scalable low-carbon extraction pathways.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/zhou.jpeg',
      name: 'A/Prof Hailing Zhou',
      bidang: 'Robotics, AI, and advanced engineering systems',
      expertise:
        'Robotic vision, artificial intelligence, intelligent engineering applications',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'A/Prof Zhou specialises in robotic vision and AI, leading major R&D projects and collaborating globally across industry and academia with extensive publication and IEEE involvement.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/joy.jpeg',
      name: 'Prof Joy Sumner',
      bidang: 'Materials science for extreme energy environments',
      expertise: 'Degradation and performance of metals in energy systems',
      affiliation: 'Cranfield University / Swinburne collaborations',
      email: '',
      description:
        'Prof Sumner is a materials science expert focusing on metals performance in extreme energy environments, supporting the energy transition through industry-linked research and STEM outreach.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/rifai.jpeg',
      name: 'A/Prof Rifai Chai',
      bidang: 'Biomedical engineering and AI-driven systems',
      expertise:
        'Brain–computer interfaces, assistive technologies, robotics, medical AI',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'A/Prof Chai specialises in biomedical engineering and AI, leading research in assistive technologies and intelligent systems to improve human health and performance.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/justin.jpeg',
      name: 'Prof Justin Leontini',
      bidang: 'Fluid dynamics and applied physics',
      expertise:
        'Oscillatory flows, wave energy, respiratory flows, aeroelasticity',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'Prof Leontini is a fluid dynamics specialist whose work combines advanced simulations with real-world engineering challenges across energy, aerospace, and biomedical applications.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/rosalie.jpeg',
      name: 'A/Prof Rosalie Hocking',
      bidang: 'Electrochemical engineering and green chemistry',
      expertise:
        'Hydrogen and ammonia production, electrochemical sensing technologies',
      affiliation: 'James Cook University',
      email: '',
      description:
        'A/Prof Hocking develops electrochemical technologies for green chemical production and low-cost sensing, with extensive experience across leading global research institutions.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/mathhew.jpeg',
      name: 'Dr Matthew Humbert',
      bidang: 'Green steel and low-carbon metallurgy',
      expertise:
        'Molten-oxide electrolysis, techno-economic analysis of green steel',
      affiliation: 'Swinburne University of Technology',
      email: '',
      description:
        'Dr Humbert works on assessing and developing low-carbon steelmaking routes, focusing on the scalability, cost, and energy use of emerging electrochemical processes.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/donald.jpeg',
      name: 'Emeritus Prof Donald R. Sadoway',
      bidang: 'Electrochemical energy and green metallurgy',
      expertise:
        'Liquid-metal batteries, molten-oxide electrolysis, sustainable metal production',
      affiliation: 'Massachusetts Institute of Technology (MIT)',
      email: '',
      description:
        'Prof Sadoway is a pioneer in electrochemical technologies, known for inventing the liquid-metal battery and advancing carbon-free metal production, with major global impact in clean energy.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/ashoke.jpeg',
      name: 'Asst/Prof Ashok Kamaraj',
      bidang: 'Extractive metallurgy and materials engineering',
      expertise:
        'Alloy development, AI/ML in metallurgy, waste management systems',
      affiliation: 'Indian Institute of Technology',
      email: '',
      description:
        'Asst/Prof Kamaraj works across extractive metallurgy and advanced materials, integrating AI and fluid dynamics to improve sustainable metal production technologies.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/bayu.jpeg',
      name: 'Prof Himawan Bayu Petrus',
      bidang: 'Mineral and materials processing',
      expertise:
        'Extractive metallurgy, hydrometallurgy, critical metal recovery',
      affiliation: 'Universitas Gadjah Mada',
      email: '',
      description:
        'Prof Petrus is an expert in mineral processing and hydrometallurgy, with patented technologies in silica materials and critical metal extraction supporting sustainable resource utilisation.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/widi-2.png',
      name: 'Prof Widi Astuti',
      bidang: 'Materials chemistry and nanomaterials',
      expertise:
        'Adsorption, water treatment, photocatalysis, functional materials',
      affiliation: 'Universitas Gadjah Mada',
      email: '',
      description:
        'Prof Astuti focuses on materials chemistry and nanomaterials for environmental applications and is one of Indonesia’s most prolific researchers in applied materials science.',
    },
    {
      imageSrc:
        'https://ybnyfebxqvtcmkjjhlws.supabase.co/storage/v1/object/public/ContentBLOB/yayat.png',
      name: 'Dr Yayat Supriyatna',
      bidang: 'Mineral processing and extractive metallurgy',
      expertise:
        'Hydrometallurgy, critical metals extraction, sustainable processing routes',
      affiliation: 'Indonesian research institutions',
      email: '',
      description:
        'Dr Supriyatna specialises in mineral processing and materials recovery, supporting Indonesia’s strategic mineral development through sustainable extraction and beneficiation research.',
    },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Apply filters from FilterRow
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

  // Build expertise options from team data (unique keywords from bidang)
  const expertiseOptions = Array.from(
    new Set(
      team
        .map((t) => t.bidang)
        .filter(Boolean)
        .map((b) => {
          // Normalise bidang to concise category labels
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

  return (
    <section className="bg-bgMain mt-26 flex justify-center px-4 py-12 sm:px-8">
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
