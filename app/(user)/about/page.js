'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import VisionImage from './_components/VisionIcon.png';
import ValuesImage from './_components/OurValuesIcon.png';
// Simple social icons mapping or generic
import { HiLink } from 'react-icons/hi';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState({
    about_description: '',
    vision: '',
    mission: '',
    values: '',
  });

  const [contactData, setContactData] = useState({
    email: '',
    address: '',
    links: [],
  });

  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resAbout, resContact, resTimeline] = await Promise.all([
          fetch('/api/about'),
          fetch('/api/contact'),
          fetch('/api/about/timeline'),
        ]);

        const about = await resAbout.json();
        const contact = await resContact.json();
        const timeline = await resTimeline.json();

        setAboutData(about || {});
        setContactData(contact || { links: [] });
        if (Array.isArray(timeline)) {
          setTimelineData(timeline); // Logic sort can remain in API or here if needed
        }
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="mx-auto mt-42 flex w-full max-w-6xl flex-col items-center gap-12 px-4 pb-20 text-sm sm:px-6 sm:text-base">
      {/* About Us */}
      <section className="w-full text-left md:text-center">
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
            About Us
          </h1>
          <div className="w-full max-w-[900px]">
            {loading ? (
              <div className="flex w-full animate-pulse flex-col items-center gap-2">
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              </div>
            ) : (
              <p className="max-w-[900px] text-sm leading-relaxed tracking-normal text-[#7C7C7C] sm:text-base">
                {aboutData.about_description}
              </p>
            )}
          </div>
        </header>
      </section>

      {/* Vision & Values */}
      <section className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        {/* Vision */}
        <div className="rounded-2xl border border-neutral-200 p-8 shadow-sm transition hover:shadow-md">
          <div className="mb-4 flex justify-start text-3xl text-blue-400">
            <Image src={VisionImage} alt="Vision Icon" width={32} height={32} />
          </div>
          <h3 className="mb-2 text-xl leading-snug font-semibold sm:text-2xl">
            Vision
          </h3>
          <div className="w-full">
            {loading ? (
              <div className="flex animate-pulse flex-col gap-2">
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-neutral-500 sm:text-base">
                {aboutData.vision}
              </p>
            )}
          </div>
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
          <h3 className="mb-2 text-xl leading-snug font-semibold sm:text-2xl">
            Our Values
          </h3>
          <div className="w-full">
            {loading ? (
              <div className="flex animate-pulse flex-col gap-2">
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-neutral-500 sm:text-base">
                {aboutData.values}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="w-full px-6 py-1 text-center">
        <h2 className="mb-12 text-left text-2xl leading-tight font-bold sm:text-3xl md:text-center md:text-4xl">
          Company Timeline
        </h2>

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-20 w-full rounded-lg bg-gray-100"></div>
            <div className="h-20 w-full rounded-lg bg-gray-100"></div>
          </div>
        ) : timelineData.length > 0 ? (
          <div className="mx-auto max-w-3xl space-y-10 px-6">
            {timelineData.map((item) => (
              <div key={item.id} className="flex items-start gap-4 text-left">
                {/* Timeline Dot */}
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
                  <h4 className="text-left text-lg font-semibold italic sm:text-xl">
                    {item.year}
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-500 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-400">No milestones yet.</p>
        )}
      </section>

      {/* Contact Us */}
      <section
        id="contact-us"
        className="w-full scroll-mt-32 py-16 text-center"
      >
        <h2 className="mb-4 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
          Contact Us
        </h2>

        {loading ? (
          <div className="mx-auto flex w-full max-w-3xl animate-pulse flex-col items-center gap-8">
            <div className="flex w-full max-w-md flex-col items-center gap-3">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4 p-2">
                  <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Address and Email Display if needed, or simple social links */}
            <p className="mx-auto mb-8 max-w-2xl text-neutral-600">
              {contactData.address} <br />
              <span className="font-semibold">{contactData.email}</span>
            </p>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
              {contactData.links && contactData.links.length > 0 ? (
                contactData.links.map((link, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-center gap-4 rounded-xl p-2 transition hover:bg-gray-50"
                  >
                    <a
                      href={link.startsWith('http') ? link : `https://${link}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition hover:bg-gray-300"
                      title={link}
                    >
                      {/* Generic Link Icon - could map specific icons for fb/twitter/insta later */}
                      <HiLink className="h-6 w-6" />
                    </a>
                    <a
                      href={link.startsWith('http') ? link : `https://${link}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium break-all text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      {link}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">
                  No contact links available.
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
