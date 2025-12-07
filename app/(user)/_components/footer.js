export default function Footer() {
  return (
    <div className="inline-flex w-full flex-col items-center justify-end">
      <div className="inline-flex items-start justify-between self-stretch border-t border-zinc-300 bg-white px-16 py-11">
        <div className="inline-flex w-[525px] flex-col items-start justify-start gap-4">
          <div className="h-28 w-28 bg-zinc-300" />
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="justify-center self-stretch  text-2xl leading-8 font-semibold text-black">
              Fluid & Process Dynamics Research Group
            </div>
            <div className="justify-center self-stretch  text-xl leading-7 font-medium text-neutral-400">
              Advancing innovation through science, engineering, and real-world
              experimentation.
            </div>
          </div>
        </div>
        <div className="inline-flex w-96 flex-col items-start justify-center gap-11">
          <div className="flex flex-col items-start justify-start gap-4 self-stretch">
            <div className="justify-start self-stretch  text-xl leading-7 font-medium text-black">
              Get in Touch & Visit Us
            </div>
            <div className="inline-flex items-center justify-center gap-3">
              <div
                data-property-1="alt"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-2 outline outline-1 outline-offset-[-1px] outline-zinc-300"
              >
                <div className="justify-start  text-lg leading-6 font-medium text-stone-500">
                  Visit Our Facility
                </div>
              </div>
              <div
                data-property-1="left-icon-inactive"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-white py-2 pr-6 pl-5 outline outline-1 outline-offset-[-1px] outline-zinc-300"
              >
                <div className="relative h-5 w-5">
                  <div className="absolute top-[2.50px] left-[2.50px] h-3.5 w-3.5 border border-stone-500 bg-stone-500" />
                </div>
                <div className="justify-start  text-lg leading-6 font-medium text-stone-500">
                  Connect on LinkedIn
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="justify-center self-stretch  text-xl leading-7 font-medium text-black">
              Contact
            </div>
            <div className="inline-flex items-start justify-center gap-8">
              <div className="inline-flex flex-col items-start justify-start gap-1">
                <div className="justify-center self-stretch  text-lg leading-6 font-medium text-black">
                  Prof. M. Akbar Rhamdhani
                </div>
                <div className="justify-center self-stretch  text-lg leading-6 font-medium text-neutral-400">
                  arhamdani@swin.edu.au
                </div>
                <div className="justify-center self-stretch  text-lg leading-6 font-medium text-neutral-400">
                  +61 3921 48528
                </div>
              </div>
              <div className="inline-flex flex-col items-start justify-start gap-1">
                <div className="justify-center self-stretch  text-lg leading-6 font-medium text-black">
                  Dr Bintang A. Nuraeni
                </div>
                <div className="justify-center self-stretch  text-lg leading-6 font-medium text-neutral-400">
                  bnuraeni@swin.edu.au
                </div>
                <div className="justify-center self-stretch  text-lg leading-6 font-medium text-neutral-400">
                  +61 4812 49922
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex items-center justify-center gap-2.5 self-stretch bg-zinc-800 py-4">
        <div className="flex-1 justify-start text-center  text-lg leading-6 font-medium text-neutral-400">
          © 2025 Fluid & Process Dynamics Research Group, Swinburne University
          of Technology. All rights reserved.
        </div>
      </div>
    </div>
  );
}
