'use client';

import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-auto w-full">
      {/* Main Footer Content */}
      <div className="border-t border-zinc-200 bg-white px-6 py-10 sm:px-10 sm:py-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 - Logo & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/final-logo-full.svg"
                alt="SiZero Logo"
                className="h-14 w-14 object-contain"
              />
              <span className="text-lg font-bold text-zinc-800">Si-ZERO</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Fluid & Process Dynamics Research Group
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Advancing innovation through science, engineering, and
                real-world experimentation.
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-500">
                Department of Industry Science and Resources (DISR)
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <p className="text-xs leading-relaxed text-zinc-500">
                  The Si-ZERO Research Program initiation is funded by the
                  Australian Government through the Department of Industry,
                  Science and Resources, and the Department of Climate Change,
                  Energy, the Environment and Water.
                </p>
                <img
                  src="/arc.png"
                  alt="Australian Government"
                  className="h-auto w-full max-w-[220px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* Column 2 - Partners */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-zinc-900">Partners</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="https://www.swinburne.edu.au/research/centres-groups-clinics/fluid-process-dynamics-research-group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                >
                  FPD Research Group | Swinburne
                </a>
              </li>
              <li>
                <a
                  href="https://msme.iith.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                >
                  IITH - Materials Science & Metallurgical Engineering
                </a>
              </li>
              <li>
                <a
                  href="https://www.greenkogroup.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                >
                  Greenko Group
                </a>
              </li>
              <li>
                <a
                  href="https://remind.co.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                >
                  Ethical Circular Material - Remind
                </a>
              </li>
              <li>
                <a
                  href="https://brin.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                >
                  BRIN - Badan Riset dan Inovasi Nasional
                </a>
              </li>
              <li>
                <a
                  href="https://ugm.ac.id/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                >
                  Universitas Gadjah Mada
                </a>
              </li>
              <li>
                <a
                  href="https://www.pvrs.org.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 transition-colors hover:text-teal-900 hover:underline"
                >
                  PV Solar Panel Recycling and Sustainability (PVRS)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Get in Touch & Contact */}
          <div className="flex flex-col gap-6">
            {/* Get in Touch */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold text-zinc-900">
                Get in Touch & Visit Us
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/about#contact-us"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
                >
                  Visit Our Facility
                </Link>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold text-zinc-900">Contact</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Contact 1 */}
                <div className="flex flex-col gap-0.5 text-sm">
                  <a
                    href="https://experts.swinburne.edu.au/949-akbar-rhamdhani/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-zinc-900 hover:text-teal-700 hover:underline"
                  >
                    Prof. M. Akbar Rhamdhani
                  </a>
                  <span className="text-zinc-500">arhamdhani@swin.edu.au</span>
                  <span className="text-zinc-500">+61 3921 48528</span>
                </div>
                {/* Contact 2 */}
                <div className="flex flex-col gap-0.5 text-sm">
                  <a
                    href="https://experts.swinburne.edu.au/5626-bintang-ayu-nuraeni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-zinc-900 hover:text-teal-700 hover:underline"
                  >
                    Dr Bintang A. Nuraeni
                  </a>
                  <span className="text-zinc-500">bnuraeni@swin.edu.au</span>
                  <span className="text-zinc-500">+61 4812 49922</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-zinc-800 px-6 py-4">
        <p className="text-center text-xs text-zinc-400 sm:text-sm">
          © 2025 Fluid & Process Dynamics Research Group, Swinburne University
          of Technology. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
