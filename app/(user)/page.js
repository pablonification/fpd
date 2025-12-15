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
            Brief highlight of latest feature or important announcement that can
            be clicked to view details
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Main headline explaining the core value proposition of this
              platform for visitors
            </h1>
            <p className="text-sm text-black/50 sm:text-base md:text-lg lg:text-xl">
              Brief paragraph summarizing what this platform is, who the users
              are, and the main reasons why this platform matters to them.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:gap-6">
            <button className="from-primaryGradientStart to-primaryGradientEnd shadow-primaryGradientEnd/30 rounded-full bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl">
              Main call-to-action text, e.g. Start exploring research here
            </button>

            <button className="rounded-full border border-black/40 px-6 py-3 font-semibold text-black transition hover:bg-black/40 hover:text-white">
              Register Now
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
              Brief description of who we are as an institution or program,
              including our main focus and values we aim to bring. Can also
              include short quotes or testimonials if needed by the client.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="flex h-screen w-screen snap-start items-center justify-center">
        <div className="flex max-w-7xl flex-col items-center gap-8 px-6 text-center">
          <div>
            <h1 className="text-grayDark text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              What We Do
            </h1>
          </div>
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
