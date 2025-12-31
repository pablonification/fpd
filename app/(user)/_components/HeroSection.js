'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-screen snap-start items-center justify-center overflow-hidden text-black"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 h-[120%] w-full"
      >
        <Image
          src="/img/home4.png"
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-opacity duration-700"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqXW5r+31C7t4bmWOKOZkRFbgAoJAHXwcVH/dV7/Vx/KKKoP/2Q=="
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
        />
      </div>

      <div className="from-bgMain absolute inset-0 z-0 bg-gradient-to-t via-white/30 to-transparent" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center sm:gap-8 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-9 w-full max-w-[465px] rounded-[20px] border border-black/50 bg-white/10 px-4 pt-2 pb-3 text-xs backdrop-blur-md sm:text-sm"
        >
          Si-ZERO
        </motion.div>

        <div className="flex flex-col gap-2 [text-shadow:_0_2px_10px_rgb(255_255_255_/_30%)] sm:gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Silicon Zero-Emission Recycling, Refining and Production
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-2 flex flex-col gap-2 sm:gap-4 md:flex-row md:gap-6"
        >
          <Link href="/researcher/project">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
              className="from-primaryGradientStart to-primaryGradientEnd cursor-pointer rounded-full bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5)] shadow-lg transition-all sm:px-6 sm:py-3 sm:text-base"
            >
              Explore Si-ZERO Research Program
            </motion.button>
          </Link>

          <Link href="/about#contact-us">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: '#f9fafb',
                borderColor: '#9ca3af',
              }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer rounded-full border border-[#DCDCDC] bg-white px-4 py-2 text-sm font-semibold text-black transition-all sm:px-6 sm:py-3 sm:text-base"
            >
              Connect With Si-Zero
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
