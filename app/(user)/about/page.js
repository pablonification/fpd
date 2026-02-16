'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import VisionImage from './_components/VisionIcon.webp';
import ValuesImage from './_components/OurValuesIcon.webp';
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

  // Clean HTML by replacing non-breaking spaces with regular spaces
  const cleanHTML = (html) => {
    if (!html) return '';
    return html.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');
  };

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

  useEffect(() => {
    if (!loading && window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [loading]);

  return (
    <>
      <style jsx global>{`
        .rte-content {
          hyphens: none;
          -webkit-hyphens: none;
          -ms-hyphens: none;
          word-break: normal;
          overflow-wrap: break-word;
          white-space: normal;
        }
        .rte-content p {
          margin-bottom: 0.5rem;
          margin-top: 0;
        }
        .rte-content p:first-child {
          margin-top: 0;
        }
        .rte-content p:last-child {
          margin-bottom: 0;
        }
        .rte-content strong,
        .rte-content b {
          color: #2ab2c7;
          font-weight: 700;
          white-space: normal;
        }
        .rte-content ul,
        .rte-content ol {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .rte-content li {
          margin-bottom: 0.25rem;
        }
        .rte-content h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .rte-content h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .rte-content blockquote {
          border-left: 4px solid #2ab2c7;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
        }
        .rte-content a {
          color: #2ab2c7;
          text-decoration: underline;
        }
        .rte-content a:hover {
          color: #0e9db3;
        }
      `}</style>
      <main className="mx-auto mt-42 flex w-full max-w-6xl flex-col items-center gap-12 px-4 pb-20 text-sm sm:px-6 sm:text-base">
        {/* About Us */}
        <section className="w-full text-left md:text-center">
          <header className="flex w-full flex-col items-center gap-3 text-center">
            <h1 className="text-3xl leading-tight font-bold tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
              About Us
            </h1>
            <div className="w-full max-w-6xl">
              {loading ? (
                <div className="flex w-full animate-pulse flex-col items-center gap-2">
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                </div>
              ) : (
                <div
                  className="rte-content max-w-6xl text-sm leading-relaxed tracking-normal text-[#7C7C7C] sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(aboutData.about_description),
                  }}
                />
              )}
            </div>
          </header>
        </section>

        {/* Vision & Values */}
        <section className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {/* Vision */}
          <div className="rounded-2xl border border-neutral-200 p-8 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex justify-start text-3xl text-blue-400">
              <Image
                src={VisionImage}
                alt="Vision Icon"
                width={32}
                height={32}
              />
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
                <div
                  className="rte-content text-sm leading-relaxed text-neutral-500 sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(aboutData.vision),
                  }}
                />
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
                <div
                  className="rte-content text-sm leading-relaxed text-neutral-500 sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(aboutData.values),
                  }}
                />
              )}
            </div>
          </div>
        </section>

        {/* Project Timeline */}
        <section className="w-full px-6 py-1 text-center">
          <h2 className="mb-12 text-left text-2xl leading-tight font-bold sm:text-3xl md:text-center md:text-4xl">
            Acknowledgement of Country
          </h2>

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-20 w-full rounded-lg bg-gray-100"></div>
              <div className="h-20 w-full rounded-lg bg-gray-100"></div>
            </div>
          ) : timelineData.length > 0 ? (
            <div className="mx-auto max-w-3xl px-6">
              <div className="relative">
                {/* Vertical connecting line */}
                <div
                  className="absolute top-[8px] left-[7px] w-[2px] bg-[#DCDCDC]"
                  style={{
                    height: `calc(100% - 16px)`,
                  }}
                />

                {timelineData.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative flex gap-4 pb-10 text-left last:pb-0"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex flex-shrink-0 items-start pt-1">
                      <div className="h-4 w-4 rounded-full bg-[#2AB2C7] ring-4 ring-white" />
                    </div>

                    <div className="flex-1">
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
            </div>
          ) : (
            <p className="text-neutral-400">No milestones yet.</p>
          )}
        </section>

        {/* Contact Us */}
        <section id="contact-us" className="w-full scroll-mt-32 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
              Get In Touch
            </h2>
            <p className="text-neutral-500">
              Connect with us through our channels
            </p>
          </div>

          {loading ? (
            <div className="mx-auto flex w-full max-w-4xl animate-pulse flex-col items-center gap-8">
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-32 w-full rounded-2xl bg-gray-100"
                  ></div>
                ))}
              </div>
              <div className="h-24 w-full rounded-2xl bg-gray-100"></div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              {/* LinkedIn and Address Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* LinkedIn Card */}
                <div className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2ab2c7] to-[#0e9db3] text-white">
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="mb-1 text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                      LinkedIn
                    </h3>
                    <a
                      href="https://www.linkedin.com/company/fluid-process-dynamics-swin/?viewAsMember=true"
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-medium text-neutral-700 transition-colors hover:text-[#2ab2c7]"
                    >
                      Fluid & Process Dynamics
                    </a>
                  </div>
                </div>

                {/* Address Card */}
                {contactData.address && (
                  <div className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2ab2c7] to-[#0e9db3] text-white">
                      <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                        Address
                      </h3>
                      <p className="text-base font-medium text-neutral-700">
                        {contactData.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {!contactData.email &&
                !contactData.address &&
                (!contactData.links || contactData.links.length === 0) && (
                  <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 text-neutral-400">
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-neutral-400 italic">
                      No contact information available.
                    </p>
                  </div>
                )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
