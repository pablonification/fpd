'use client';

import Card from './../_components/card';

export default function NewsPage() {
  const cards = [
    {
      imageSrc: 'https://picsum.photos/400/250?random=1',
      texts: [
        {
          text: 'Short headline for each additional news item to be displayed',
          bold: true,
          size: 'large',
        },
        {
          text: 'Brief summary of one to two sentences explaining the content of this news',
        },
        { text: 'News category' },
      ],
    },
    {
      imageSrc: 'https://picsum.photos/400/250?random=2',
      texts: [
        {
          text: 'Short headline for each additional news item to be displayed',
          bold: true,
          size: 'large',
        },
        {
          text: 'Brief summary of one to two sentences explaining the content of this news',
        },
        { text: 'News category' },
      ],
    },
    {
      imageSrc: 'https://picsum.photos/400/250?random=3',
      texts: [
        {
          text: 'Short headline for each additional news item to be displayed',
          bold: true,
          size: 'large',
        },
        {
          text: 'Brief summary of one to two sentences explaining the content of this news',
        },
        { text: 'News category' },
      ],
    },
    {
      imageSrc: 'https://picsum.photos/400/250?random=4',
      texts: [
        {
          text: 'Short headline for each additional news item to be displayed',
          bold: true,
          size: 'large',
        },
        {
          text: 'Brief summary of one to two sentences explaining the content of this news',
        },
        { text: 'News category' },
      ],
    },
  ];

  return (
    <main className="bg-bgMain mt-32 min-h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* SECTION 1 - Header */}
      <section className="flex min-h-screen w-full snap-start items-center justify-center px-4 text-black">
        <div className="flex w-full max-w-5xl flex-col gap-12 md:gap-16">
          {/* Title */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              News
            </h1>
          </div>

          {/* Bagian 1 - 2 Columns */}
          <div className="grid w-full items-center gap-8 md:grid-cols-2">
            {/* Kolom Kanan - Image (di mobile tampil dulu) */}
            <div className="order-first flex justify-center md:order-last">
              <img
                src="https://picsum.photos/500/300"
                alt="Featured News"
                className="w-full max-w-[523px] rounded-xl object-cover shadow-lg"
              />
            </div>

            {/* Kolom Kiri - Teks */}
            <div className="order-last flex flex-col gap-4 md:order-first">
              <h2 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                Main news headline that summarizes the key information in one
                clear sentence
              </h2>
              <p className="text-sm text-black/60 sm:text-base md:text-lg">
                Brief summary of 2-3 sentences explaining the news context, what
                happened, and why this information is important to readers.
              </p>
              <p className="mt-2 text-sm sm:text-base md:text-base">
                News category
              </p>
            </div>
          </div>

          {/* Bagian 2 - Cards */}
          <div className="flex flex-col gap-12">
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              {cards.map((c, i) => (
                <Card
                  key={i}
                  imageSrc={c.imageSrc}
                  texts={c.texts}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
