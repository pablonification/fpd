'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import VisionImage from './_components/VisionIcon.png';
import ValuesImage from './_components/OurValuesIcon.png';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState({
    about_description: '',
    vision: '',
    mission: '',
    values: '',
  });

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => setAboutData(data));
  }, []);

  return (
    <main className="mt-42 flex w-full max-w-7xl flex-col items-center gap-12 px-4 pb-20 sm:px-6 mx-auto text-[14px] md:text-[14px]">
      {/* About Us */}
      <section className="w-full text-left md:text-center">
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="text-[48px] leading-[60px] font-bold tracking-[-1%] text-black sm:text-[60px] sm:leading-[72px]">
            About Us
          </h1>
          <p className="max-w-[900px] text-[18px] leading-[28px] tracking-[-1%] text-[#7C7C7C] sm:text-[24px] sm:leading-[32px]">
            {aboutData.about_description || 'Loading description...'}
          </p>
        </header>

      </section>

      {/* Vision & Values */}
      <section className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        {/* Vision */}
        <div className="rounded-2xl border border-neutral-200 p-8 shadow-sm transition hover:shadow-md">
          <div className="mb-4 flex justify-start text-3xl text-blue-400">
            <Image src={VisionImage} alt="Vision Icon" width={32} height={32} />
          </div>
          <h3 className="mb-2 text-[16px] font-semibold md:text-[20px]">
            Vision
          </h3>
          <p className="text-sm-[16px] leading-relaxed text-neutral-500">
            {aboutData.vision || 'Loading vision...'}
          </p>
        </div>

        {/* Our Values */}
        <div className="rounded-2xl border border-neutral-200 p-8 shadow-sm transition hover:shadow-md">
          <div className="mb-4 flex justify-start text-3xl text-blue-400">
            <Image
              src={ValuesImage}
              alt="Our Values Icon"
              width={32}
              height={32}
            />
          </div>
          <h3 className="mb-2 text-[16px] font-semibold md:text-[20px]">
            Our Values
          </h3>
          <p className="text-sm-[16px] leading-relaxed text-neutral-500">
            {aboutData.values || 'Loading values...'}
          </p>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="w-full px-6 py-1">
        <h2 className="mb-12 text-left text-[24px] font-bold md:text-center md:text-[44px]">
          Company Timeline
        </h2>

        <div className="mx-auto max-w-3xl space-y-10 px-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-4">
              {/* PENGGANTIAN: Menggunakan kode SVG yang Anda berikan */}
              <div className="mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#2AB2C7" />
                </svg>
              </div>

              <div>
                <h4 className="text-left font-semibold italic">
                  17 Agustus 1945
                </h4>
                <p className="text-sm leading-relaxed text-neutral-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 text-center">
        <h2 className="mb-10 text-[24px] font-bold md:text-[44px]">
          Contact Us
        </h2>

        <div className="flex justify-center gap-6">
          {['●', '●', '●', '●'].map((c, i) => (
            <div
              key={i}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 md:h-18 md:w-18"
            >
              {/* Placeholder icon */}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
