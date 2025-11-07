import Card from './_components/card';

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* SECTION 1 */}
      <section className="flex h-screen w-screen snap-start items-center justify-center text-black">
        <div className="flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
          {/* Announcement Bar */}
          <div className="h-9 w-full max-w-[465px] rounded-[20px] border border-black/50 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
            Suatu fitur baru penting yang dapat langsung di-klik redirect
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl leading-tight font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing.
            </h1>
            <p className="text-lg text-black/50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex gap-6">
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
          {' '}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl leading-tight font-bold">Who Are We</h1>
            <p className="text-lg text-black/50">
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
            <h1 className="text-grayDark text-4xl font-bold">What We Do</h1>
          </div>
          <div className="flex flex-row gap-6">
            {' '}
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

      {/* SECTION 3 */}
      <section className="flex h-screen w-screen snap-start items-center justify-center">
        <div className="flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
          {' '}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl leading-tight font-bold">Latest Events</h1>
            <p className="text-lg text-black/50">
              tunggu hasil component gallery
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="flex h-screen w-screen snap-start items-center justify-center text-black">
        <div className="flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
          {' '}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl leading-tight font-bold">News</h1>
            <p className="text-lg text-black/50">tunggu hasil component news</p>
          </div>
        </div>
      </section>
    </main>
  );
}
