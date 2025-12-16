import '../../globals.css';

export default function Home() {
  return (
    <div className="inline-flex h-[944px] w-[1172px] flex-col items-start justify-start gap-4 p-10">
      {/* Welcome Section */}
      <div className="flex w-80 flex-col items-start justify-start gap-1">
        <div className="justify-start self-stretch text-3xl leading-10 font-bold text-black">
          Welcome, Admin!
        </div>
        <div className="justify-start self-stretch text-center text-lg leading-6 font-medium text-neutral-500">
          Here’s an overview of today’s updates.
        </div>
      </div>

      {/* Overview Cards */}
      <div className="flex flex-col items-start justify-center gap-4 self-stretch">
        {/* Row 1 */}
        <div className="inline-flex items-center justify-start gap-4 self-stretch">
          {/* Researchers Card */}
          <div className="inline-flex flex-1 flex-col items-start justify-start gap-6 rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Researchers
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                32
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                active
              </div>
            </div>
          </div>

          {/* Projects Card */}
          <div className="inline-flex flex-1 flex-col items-start justify-start gap-6 self-stretch rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Projects
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="flex items-center justify-start gap-2">
                <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                  25
                </div>
                <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                  ongoing
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200" />
              <div className="flex items-center justify-start gap-2">
                <div className="justify-start text-2xl leading-8 font-semibold text-black">
                  8
                </div>
                <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                  completed
                </div>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="inline-flex flex-1 flex-col items-start justify-start gap-6 self-stretch rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Users
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                25
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                active
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="inline-flex items-center justify-start gap-4 self-stretch">
          {/* Gallery Items Card */}
          <div className="inline-flex flex-1 flex-col items-start justify-start gap-6 rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Gallery Items
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                128
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                media
              </div>
            </div>
          </div>

          {/* News Articles Card */}
          <div className="inline-flex flex-1 flex-col items-start justify-start gap-6 self-stretch rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                News Articles
              </div>
              <div className="bg-primary-100 flex h-8 w-8 items-center justify-center gap-1 rounded-lg p-1">
                <div data-style="bulk" className="relative h-4 w-4">
                  <div className="bg-primary-700 absolute top-[1.33px] left-[1.33px] h-3.5 w-3.5 opacity-40" />
                  <div className="bg-primary-700 absolute top-[4.67px] left-[4.67px] h-1.5 w-1.5" />
                  <div className="absolute top-0 left-0 h-4 w-4 opacity-0" />
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                125
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                published
              </div>
            </div>
          </div>

          {/* Website Traffic Summary Card */}
          <div className="inline-flex flex-1 flex-col items-start justify-start gap-6 rounded-3xl px-6 pt-6 pb-5 outline outline-1 outline-offset-[-1px] outline-neutral-200">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-start text-center text-lg leading-6 font-medium text-black">
                Website Traffic Summary
              </div>
              <div data-style="bulk" className="relative h-8 w-8">
                <div className="bg-primary-700 absolute top-[2.67px] left-[2.68px] h-7 w-7 opacity-40" />
                <div className="bg-primary-700 absolute top-[19.83px] left-[14.67px] h-[2.67px] w-[2.67px]" />
                <div className="bg-primary-700 absolute top-[9.84px] left-[15px] h-2 w-0.5" />
                <div className="absolute top-0 left-0 h-8 w-8 opacity-0" />
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-2">
              <div className="justify-start text-center text-2xl leading-8 font-semibold text-black">
                1,230
              </div>
              <div className="justify-start text-center text-base leading-5 font-normal text-neutral-500">
                visits this month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Updates */}
      <div className="flex flex-col items-start justify-start gap-3 self-stretch rounded-3xl p-6 outline outline-1 outline-offset-[-1px] outline-neutral-200">
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="justify-start text-lg leading-6 font-medium text-black">
            Latest updates across the platform
          </div>
        </div>
        <div className="h-px self-stretch bg-neutral-200" />
        <div className="flex flex-col items-start justify-start gap-1 self-stretch">
          <div className="inline-flex items-center justify-center gap-1 self-stretch p-2">
            <div className="flex-1 justify-start text-base leading-5 font-normal text-neutral-800">
              Researcher profile updated: Dr. Bintang A. Nuraeni
            </div>
            <div className="justify-start text-sm leading-4 font-normal text-neutral-400">
              1d
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-1 self-stretch p-2">
            <div className="flex-1 justify-start text-base leading-5 font-normal text-neutral-800">
              New photo added to Laboratory Gallery
            </div>
            <div className="justify-start text-sm leading-4 font-normal text-neutral-400">
              2hr
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
