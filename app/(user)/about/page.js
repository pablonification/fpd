import Image from 'next/image';

// Anda masih perlu mengimpor komponen logo di sini
import VisionImage from './_components/VisionIcon.png'; 
import ValuesImage from './_components/OurValuesIcon.png';
// Karena Anda tidak menggunakan konfigurasi Tailwind 'font-hanken', 
// kita akan menggunakan class CSS yang sudah ada atau class default yang mungkin Anda miliki.

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center text-[14px] md:text-[14px]"> 
      
      {/* About Us Section */}
      <section className="max-w-4xl text-left md:text-center py-16 px-6">
        <h1 className="text-[24px] md:text-[44px] font-bold mb-4">About Us</h1>
        <p className="leading-relaxed text-neutral-500 text-[16px] md:text-[24px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit.
        </p>
      </section>

      {/* Vision & Values */}
      <section className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-20">
        
        {/* Vision */}
        <div className="border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <div className="mb-4 text-blue-400 text-3xl flex justify-start"> 
            <Image 
              src={VisionImage} 
              alt="Vision Icon" 
              width={32} // Tentukan ukuran yang Anda inginkan (misalnya 32px)
              height={32} // Tentukan ukuran yang Anda inginkan (misalnya 32px)
              className="text-blue-500" // Gunakan className untuk styling
            />
          </div>
          <h3 className="text-[16px] md:text-[20px] font-semibold mb-2">Vision</h3>
          <p className="text-neutral-500 text-sm-[16px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Our Values*/}
        <div className="border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <div className="mb-4 text-blue-400 text-3xl flex justify-start">
            <Image 
              src={ValuesImage} 
              alt="Our Values Icon" 
              width={32} // Samakan ukurannya
              height={32} // Samakan ukurannya
              className="text-blue-500" 
            />
          </div>
          <h3 className="text-[20px] font-semibold mb-2">Our Values</h3>
          <p className="text-neutral-500 text-sm-[16px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>
      

      {/* Company Timeline */}
      <section className="w-full py-1 px-6">
        <h2 className="text-[24px] md:text-[44px] font-bold text-left md:text-center mb-12">Company Timeline</h2>

        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 items-start">
              {/* PENGGANTIAN: Menggunakan kode SVG yang Anda berikan */}
              <div className="mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#2AB2C7" />
                </svg>
              </div>
              
              <div>
                <h4 className="text-left font-semibold italic">17 Agustus 1945</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Contact Us */}
      <section className="py-16 text-center">
        <h2 className="text-[24px] md:text-[44px] font-bold mb-10">Contact Us</h2>

        <div className="flex justify-center gap-6">
          {["●", "●", "●", "●"].map((c, i) => (
            <div
              key={i}
              className="w-12 h-12 md:w-18 md:h-18 bg-gray-300 rounded-full flex items-center justify-center"
            >
              {/* Placeholder icon */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
