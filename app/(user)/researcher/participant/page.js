import CardProfile from './_components/profile_card';
import FilterRow from './_components/filter';

export default function TeamSection() {
  return (
    <section className="bg-bgMain mt-26 flex justify-center px-4 py-12 sm:px-8">
      <div className="w-full max-w-7xl">
        <div className="mb-10 w-full">
          <FilterRow />
        </div>
        <div className="grid grid-cols-1 place-items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CardProfile
            imageSrc="https://picsum.photos/400/300?random=1"
            name="John De "
            bidang="Software Engineer"
            description="Berfokus pada pengembangan sistem web modern dan integrasi IoT."
          />
          <CardProfile
            imageSrc="https://picsum.photos/400/300?random=2"
            name="John De "
            bidang="UI/UX Designer"
            description="Menciptakan antarmuka yang intuitif dan mudah digunakan."
          />
          <CardProfile
            imageSrc="https://picsum.photos/400/300?random=3"
            name="John De "
            bidang="Data Analyst"
            description="Mengolah data untuk menghasilkan insight strategis bagi tim produk."
          />
          <CardProfile
            imageSrc="https://picsum.photos/400/300?random=4"
            name="John De "
            bidang="Data Analyst"
            description="Mengolah data untuk menghasilkan insight strategis bagi tim produk."
          />
        </div>
      </div>
    </section>
  );
}
