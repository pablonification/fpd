export default function Footer() {
  return (
    <div className="mt-16 inline-flex w-full flex-col items-center justify-end">
      {/* Main Footer Content */}
      <div className="flex w-full flex-col items-start justify-between gap-6 border-t border-zinc-300 bg-white px-4 py-6 sm:px-8 sm:py-11 lg:flex-row lg:gap-8 lg:px-16">
        {/* Left Section - Logo & Description */}
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="h-20 w-20 bg-zinc-300 sm:h-28 sm:w-28" />
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="text-lg font-semibold text-black sm:text-xl lg:text-2xl">
              Fluid & Process Dynamics Research Group
            </div>
            <div className="text-xs font-medium text-neutral-400 sm:text-sm lg:text-base">
              Advancing innovation through science, engineering, and real-world
              experimentation.
            </div>
          </div>
        </div>

        {/* Right Section - Get in Touch (top) + Contact (bottom) */}
        <div className="flex w-full flex-col items-start justify-start gap-6 sm:items-center lg:w-auto">
          {/* Get in Touch & Visit Us */}
          <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="text-sm font-medium text-black sm:text-base lg:text-lg">
              Get in Touch & Visit Us
            </div>
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <button className="flex items-center justify-center gap-2.5 rounded-2xl bg-white px-4 py-2 text-xs font-medium text-stone-500 outline outline-1 outline-zinc-300 transition hover:bg-zinc-50 sm:px-6 sm:py-2 sm:text-sm">
                Visit Our Facility
              </button>
              <button className="flex items-center justify-center gap-2.5 rounded-2xl bg-white px-4 py-2 text-xs font-medium text-stone-500 outline outline-1 outline-zinc-300 transition hover:bg-zinc-50 sm:px-6 sm:py-2 sm:text-sm">
                <div className="h-4 w-4 border-2 border-stone-500" />
                Connect on LinkedIn
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="text-sm font-medium text-black sm:text-base lg:text-lg">
              Contact
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-3 sm:flex-row sm:gap-6 lg:gap-8">
              {/* Contact 1 */}
              <div className="flex flex-col items-start justify-start gap-1">
                <div className="text-xs font-medium text-black sm:text-sm lg:text-base">
                  Prof. M. Akbar Rhamdhani
                </div>
                <div className="text-xs font-medium text-neutral-400 sm:text-sm lg:text-base">
                  arhamdani@swin.edu.au
                </div>
                <div className="text-xs font-medium text-neutral-400 sm:text-sm lg:text-base">
                  +61 3921 48528
                </div>
              </div>
              {/* Contact 2 */}
              <div className="flex flex-col items-start justify-start gap-1">
                <div className="text-xs font-medium text-black sm:text-sm lg:text-base">
                  Dr Bintang A. Nuraeni
                </div>
                <div className="text-xs font-medium text-neutral-400 sm:text-sm lg:text-base">
                  bnuraeni@swin.edu.au
                </div>
                <div className="text-xs font-medium text-neutral-400 sm:text-sm lg:text-base">
                  +61 4812 49922
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="flex w-full items-center justify-center gap-2.5 bg-zinc-800 px-4 py-3 sm:py-4">
        <div className="text-center text-xs font-medium text-neutral-400 sm:text-sm">
          © 2025 Fluid & Process Dynamics Research Group, Swinburne University
          of Technology. All rights reserved.
        </div>
      </div>
    </div>
  );
}
