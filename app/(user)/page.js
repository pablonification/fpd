import Card from './_components/card';

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* SECTION 1 */}
      <section className="flex h-screen w-screen snap-start items-center justify-center text-black">
        <div className="flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
          {/* Announcement Bar */}
          <div className="h-9 w-full max-w-[465px] rounded-[20px] border border-black/50 bg-white/10 px-4 pt-1 pb-3 text-xs backdrop-blur-md sm:text-sm md:text-sm">
            Suatu fitur baru penting yang dapat langsung di-klik redirect
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing.
            </h1>
            <p className="text-sm text-black/50 sm:text-base md:text-lg lg:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:gap-6">
            <button className="from-primaryGradientStart to-primaryGradientEnd shadow-primaryGradientEnd/30 rounded-full bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl">
              PlaceHolder CTA
            </button>

            <button className="rounded-full border border-black/40 px-6 py-3 font-semibold text-black transition hover:bg-black/40 hover:text-white">
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="bg-bgMain flex h-screen w-screen snap-start items-center justify-center">
        <div className="flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Who Are We
            </h1>
            <p className="text-sm text-black/50 sm:text-base md:text-lg lg:text-xl">
              Ini deskripsi about dari client. Jika ada testimoni yang ingin
              ditambahkan bisa. Tapi konten ini masih bisa berubah-ubah, depends
              on brief yang dikasih
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="flex h-screen w-screen snap-start items-center justify-center">
        <div className="flex max-w-full flex-col items-center gap-8 px-6 text-center">
          <div>
            <h1 className="text-grayDark text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              What We Do
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Card
              imageSrc="https://picsum.photos/300/200"
              texts={[
                { text: 'Judul Random', bold: true, size: 'large' },
                { text: 'Gambar ini diambil secara acak dari internet.' },
              ]}
            />
            <Card
              imageSrc="https://picsum.photos/300/200"
              texts={[
                { text: 'Judul Random', bold: true, size: 'large' },
                { text: 'Gambar ini diambil secara acak dari internet.' },
              ]}
            />
            <Card
              imageSrc="https://picsum.photos/300/200"
              texts={[
                { text: 'Judul Random', bold: true, size: 'large' },
                { text: 'Gambar ini diambil secara acak dari internet.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 - Latest Events */}
      <section className="flex h-screen w-screen snap-start items-center justify-center">
        <div className="flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Latest Events
            </h1>
            <p className="text-sm text-black/50 sm:text-base md:text-lg lg:text-xl">
              tunggu hasil component gallery
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 - News */}
      <section className="flex h-screen w-screen snap-start items-center justify-center text-black">
        <div className="flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              News
            </h1>
            <p className="text-sm text-black/50 sm:text-base md:text-lg lg:text-xl">
              tunggu hasil component news
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
