'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Globe, Users, FlaskConical } from 'lucide-react';

function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function WhoAreWe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden py-12 sm:py-20 lg:py-24"
      ref={ref}
    >
      <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-30">
        <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#2ab2c7]/20 to-transparent blur-3xl" />
        <div className="absolute top-[40%] -right-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-[#0e9db3]/20 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <span className="h-px w-8 bg-[#2ab2c7]"></span>
              <span className="text-sm font-bold tracking-wider text-[#0e9db3] uppercase">
                About Us
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl leading-tight font-bold text-[#3d3d3d] sm:text-4xl md:text-5xl lg:leading-[1.1]"
            >
              Driving the Future of{' '}
              <span className="bg-gradient-to-r from-[#2ab2c7] to-[#0e9db3] bg-clip-text text-transparent">
                Solar Sustainability
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed text-[#7c7c7c] sm:text-lg"
            >
              Si-ZERO is a global sustainability initiative led by Swinburne
              University of Technology, uniting partners across Australia,
              India, Indonesia, and the United States.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="rounded-2xl border-l-4 border-[#2ab2c7] bg-white p-6 shadow-sm"
            >
              <p className="text-[#555] italic">
                "Our mission is to foster collaboration between research,
                industry and government to accelerate circularity and build a
                sustainable, future-ready solar ecosystem."
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed text-[#7c7c7c]"
            >
              By integrating innovative recycling, processing, and
              clean-technology solutions, we transform end-of-life solar panels
              into valuable resources, supporting a sustainable and resilient
              renewable-energy supply chain.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative z-10 grid items-stretch gap-6 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -5 }}
                className="group flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eefbfd] text-[#2ab2c7] transition-colors duration-300 group-hover:bg-[#2ab2c7] group-hover:text-white">
                  <Globe size={24} />
                </div>
                <div>
                  <div className="mb-1 text-4xl font-bold text-[#3d3d3d]">
                    <Counter value={4} />
                  </div>
                  <div className="text-sm font-medium text-[#7c7c7c]">
                    Partner Countries
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="group flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eefbfd] text-[#2ab2c7] transition-colors duration-300 group-hover:bg-[#2ab2c7] group-hover:text-white">
                  <Users size={24} />
                </div>
                <div>
                  <div className="mb-1 text-4xl font-bold text-[#3d3d3d]">
                    <Counter value={5} suffix="+" />
                  </div>
                  <div className="text-sm font-medium text-[#7c7c7c]">
                    Global Partners
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="group flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eefbfd] text-[#2ab2c7] transition-colors duration-300 group-hover:bg-[#2ab2c7] group-hover:text-white">
                  <FlaskConical size={24} />
                </div>
                <div>
                  <div className="mb-1 text-4xl font-bold text-[#3d3d3d]">
                    <Counter value={4} />
                  </div>
                  <div className="text-sm font-medium text-[#7c7c7c]">
                    Research Programs
                  </div>
                </div>
              </motion.div>

              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#2ab2c7] to-[#0e9db3] p-6 text-white shadow-lg">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-black/10 blur-2xl"></div>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="text-lg leading-tight font-semibold">
                    Advancing Circular Economy
                  </div>
                  <div className="mt-4 h-1 w-12 rounded-full bg-white/50"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
