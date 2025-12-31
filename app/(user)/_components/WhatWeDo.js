'use client';

import { motion } from 'framer-motion';
import Card from './card';

const cardsData = [
  {
    imageSrc: '/img/upscaled/img1.png',
    priority: true,
    texts: [
      {
        text: 'Mechanical and Heat Pre-Treatments of Solar PV Panel',
        bold: true,
        size: 'large',
        accent: 'gradient',
      },
      {
        text: 'Partnership: SUT (Australia), Remind (Indonesia), UGM (Indonesia), BRIN (Indonesia) We develop efficient pre-treatment processes that mechanically and thermally separate solar PV components for high-value material recovery. By improving delamination, glass liberation, and EVA removal, this program lays the foundation for scalable end-of-life PV recycling solutions',
        highlightWords: [
          'Partnership',
          'pre-treatment',
          'material recovery',
          'end-of-life PV recycling',
        ],
      },
    ],
  },
  {
    imageSrc: '/img/upscaled/img2.png',
    priority: true,
    texts: [
      {
        text: 'Slag Optimisation & Distribution Measurement',
        bold: true,
        size: 'large',
        accent: 'gradient',
      },
      {
        text: 'Partnership: SUT (Australia), IIT Hyderabad (India) We engineer high-performance slag systems through advanced modelling and property measurement to support cleaner and more efficient silicon refining. This program provides the thermodynamic insights and slag behaviour data required for next-generation electro-slag and molten-oxide refining technologies.',
        highlightWords: [
          'Partnership',
          'slag systems',
          'silicon refining',
          'thermodynamic insights',
        ],
      },
    ],
  },
  {
    imageSrc: '/img/upscaled/img3.png',
    priority: false,
    texts: [
      {
        text: 'Blue Laser Melting & Hydrometallurgical Processing for Ag Recovery',
        bold: true,
        size: 'large',
        accent: 'gradient',
      },
      {
        text: 'Partnership: SUT (Australia), UGM (Indonesia), BRIN (Indonesia) We advance selective blue-laser melting technologies to cleanly detach metallic layers from PV cells, enabling high-purity silver extraction. Combined with targeted hydrometallurgical processing, this process unlocks efficient recovery of critical metals from waste PV modules.',
        highlightWords: [
          'Partnership',
          'blue-laser melting',
          'silver extraction',
          'hydrometallurgical processing',
        ],
      },
    ],
  },
  {
    imageSrc: '/img/upscaled/img4.png',
    priority: false,
    texts: [
      {
        text: 'Zero-Carbon Silicon Electrochemical Production & Refining',
        bold: true,
        size: 'large',
        accent: 'gradient',
      },
      {
        text: 'Partnership: SUT (Australia), Sadoway Labs Foundation (USA), IIT Hyderabad (India), Greenko (India) We advance new pathways for producing and refining silicon with a significantly lower environmental footprint. This program brings together innovative electrical and slag-based refining approaches to create cleaner, more efficient alternatives to conventional silicon manufacturing. ',
        highlightWords: [
          'Partnership',
          'environmental footprint',
          'electrical',
          'slag-based refining',
          'silicon manufacturing',
        ],
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    },
  },
};

export default function WhatWeDo() {
  return (
    <div className="mt-14 flex w-full flex-col items-center gap-4 text-center sm:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2"
      >
        <h2 className="text-grayDark text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
          What We Do
        </h2>
        <div className="from-primaryGradientStart to-primaryGradientEnd h-1.5 w-24 rounded-full bg-gradient-to-r opacity-80" />
      </motion.div>

      <div className="w-full space-y-6 sm:space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-center gap-x-8 gap-y-7 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12"
        >
          {cardsData.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex w-full flex-col items-start justify-start gap-4 rounded-xl bg-transparent p-2 transition-[background-color] duration-300 ease-out hover:bg-white/50"
              whileHover={{
                scale: 1.02,
              }}
              transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
            >
              <Card
                imageSrc={card.imageSrc}
                priority={card.priority}
                texts={card.texts}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
