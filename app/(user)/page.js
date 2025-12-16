import Card from './_components/card';
import Footer from './_components/footer';

export default function Home() {
  return (
    <main className="overflow-x-clip overflow-y-auto">
      {/* SECTION 1 */}
      <section className="to-bgMain flex h-screen w-screen snap-start items-center justify-center bg-gradient-to-b from-[#DFF5F8] text-black">
        <div className="flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
          {/* Announcement Bar */}
          <div className="h-9 w-full max-w-[465px] rounded-[20px] border border-black/50 bg-white/10 px-4 pt-1 pb-3 text-xs backdrop-blur-md sm:text-sm md:text-sm">
            Si-ZERO
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Silicon Zero-Emission Recycling, Refining and Production
            </h1>
            <p className="text-sm text-black/50 sm:text-base md:text-lg lg:text-xl">
              Brief paragraph summarizing what this platform is, who the users
              are, and the main reasons why this platform matters to them.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:gap-6">
            <button className="from-primaryGradientStart to-primaryGradientEnd shadow-primaryGradientEnd/30 rounded-full bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl">
              Explore Si-ZERO’s Research Program
            </button>

            <button className="rounded-full border border-black/40 px-6 py-3 font-semibold text-black transition hover:bg-black/40 hover:text-white">
              Connect With Si-Zero
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="bg-bgMain flex h-screen w-screen snap-start items-center justify-center">
        <div className="flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Who Are We
            </h1>
            <p className="text-sm text-black/50 sm:text-base md:text-lg lg:text-xl">
              Si-ZERO is a global sustainability initiative led by Swinburne
              University of Technology, bringing together partners across
              Australia, India, Indonesia, and the United States to advance a
              circular and low-carbon future for silicon production and
              materials recovery from solar-panel. By integrating innovative
              recycling, processing, and clean-technology solutions, we
              transform end-of-life solar panels into valuable resources,
              supporting a sustainable and resilient renewable-energy supply
              chain. Our mission is to foster collaboration between research,
              industry and government to accelerate circularity and build a
              sustainable, future-ready solar ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="flex h-screen w-screen snap-start items-center justify-center">
        <div className="max-w-9xl flex flex-col items-center gap-8 px-6 text-center">
          <div>
            <h1 className="text-grayDark text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              What We Do
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Card
              imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoEBeC-EkOvHutZ0UUBoelSNq0WJpDSLWxsQ&s"
              texts={[
                {
                  text: 'Mechanical and Heat Pre-Treatments of Solar PV Panel',
                  bold: true,
                  size: 'large',
                },
                {
                  text: 'Partnership: SUT (Australia), Remind (Indonesia), UGM (Indonesia), BRIN (Indonesia) We develop efficient pre-treatment processes that mechanically and thermally separate solar PV components for high-value material recovery. By improving delamination, glass liberation, and EVA removal, this program lays the foundation for scalable end-of-life PV recycling solutions',
                },
              ]}
            />
            <Card
              imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqCNkh-JGAbGpMbsbNUPUPDLVcRTCt4SRGg&s"
              texts={[
                {
                  text: 'Slag Optimisation & Distribution Measurement',
                  bold: true,
                  size: 'large',
                },
                {
                  text: 'Partnership: SUT (Australia), IIT Hyderabad (India) We engineer high-performance slag systems through advanced modelling and property measurement to support cleaner and more efficient silicon refining. This program provides the thermodynamic insights and slag behaviour data required for next-generation electro-slag and molten-oxide refining technologies.',
                },
              ]}
            />
            <Card
              imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_H9MRm9RyuRxBbaM9rmM32-uSbhS-4ekpRw&s"
              texts={[
                {
                  text: 'Blue Laser Melting & Hydrometallurgical Processing for Ag Recovery',
                  bold: true,
                  size: 'large',
                },
                {
                  text: 'Partnership: SUT (Australia), UGM (Indonesia), BRIN (Indonesia) We advance selective blue-laser melting technologies to cleanly detach metallic layers from PV cells, enabling high-purity silver extraction. Combined with targeted hydrometallurgical processing, this process unlocks efficient recovery of critical metals from waste PV modules.',
                },
              ]}
            />
            <Card
              imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv5ErhCJhaG4U1pF4dE-oJ1163U-_eflTBqg&s"
              texts={[
                {
                  text: 'Zero-Carbon Silicon Electrochemical Production & Refining',
                  bold: true,
                  size: 'large',
                },
                {
                  text: 'Partnership: SUT (Australia), Sadoway Labs Foundation (USA), IIT Hyderabad (India), Greenko (India) We advance new pathways for producing and refining silicon with a significantly lower environmental footprint. This program brings together innovative electrical and slag-based refining approaches to create cleaner, more efficient alternatives to conventional silicon manufacturing. ',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 - Latest Events */}
      <section className="flex h-screen w-screen snap-start items-center justify-center">
        <div className="flex max-w-7xl flex-col items-center gap-8 px-6 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Latest Events
            </h1>
            <div className="flex flex-wrap justify-center gap-8">
              <Card
                imageSrc="https://picsum.photos/300/200"
                texts={[
                  {
                    text: 'Service or research area title to be highlighted',
                    bold: true,
                    size: 'large',
                  },
                  {
                    text: 'Brief sentence explaining the content or main benefits of this service or research activity.',
                  },
                ]}
              />
              <Card
                imageSrc="https://picsum.photos/300/200"
                texts={[
                  {
                    text: 'Service or research area title to be highlighted',
                    bold: true,
                    size: 'large',
                  },
                  {
                    text: 'Brief sentence explaining the content or main benefits of this service or research activity.',
                  },
                ]}
              />
              <Card
                imageSrc="https://picsum.photos/300/200"
                texts={[
                  {
                    text: 'Service or research area title to be highlighted',
                    bold: true,
                    size: 'large',
                  },
                  {
                    text: 'Brief sentence explaining the content or main benefits of this service or research activity.',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - News */}
      <section className="flex h-screen w-screen snap-start items-center justify-center text-black">
        <div className="flex max-w-7xl flex-col items-center gap-8 px-6 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              News
            </h1>
            <div className="flex flex-wrap justify-center gap-8">
              <Card
                imageSrc="https://picsum.photos/300/200"
                texts={[
                  {
                    text: 'Service or research area title to be highlighted',
                    bold: true,
                    size: 'large',
                  },
                  {
                    text: 'Brief sentence explaining the content or main benefits of this service or research activity.',
                  },
                ]}
              />
              <Card
                imageSrc="https://picsum.photos/300/200"
                texts={[
                  {
                    text: 'Service or research area title to be highlighted',
                    bold: true,
                    size: 'large',
                  },
                  {
                    text: 'Brief sentence explaining the content or main benefits of this service or research activity.',
                  },
                ]}
              />
              <Card
                imageSrc="https://picsum.photos/300/200"
                texts={[
                  {
                    text: 'Service or research area title to be highlighted',
                    bold: true,
                    size: 'large',
                  },
                  {
                    text: 'Brief sentence explaining the content or main benefits of this service or research activity.',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
}
