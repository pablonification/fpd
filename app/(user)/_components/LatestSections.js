'use client';

import { useEffect } from 'react';
import { motion, useInView, useAnimate, stagger } from 'framer-motion';

export function LatestGallerySection({ children }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    animate('header', { opacity: 1, y: 0 }, { duration: 0.6, ease: 'easeOut' });

    const animateCards = () => {
      if (scope.current.querySelectorAll('.group').length > 0) {
        animate(
          '.group',
          { opacity: 1, y: 0, scale: 1 },
          { delay: stagger(0.15), duration: 0.5, ease: 'easeOut' }
        );
      }
    };

    animateCards();

    const observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some((m) => m.addedNodes.length > 0);
      if (hasAddedNodes) {
        animateCards();
      }
    });

    if (scope.current) {
      observer.observe(scope.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [isInView, animate, scope]);

  return (
    <div
      ref={scope}
      className="relative mt-14 flex w-full flex-col items-center gap-6 overflow-hidden text-center sm:gap-10"
    >
      <div className="absolute top-1/2 left-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        className="bg-bgMain relative z-10 px-6"
      >
        <h2 className="text-grayDark relative inline-block text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
          Latest Gallery
          <motion.span
            className="from-primaryGradientStart to-primaryGradientEnd absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'circOut' }}
          />
        </h2>
      </motion.header>

      <div className="relative w-full px-4">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-center gap-x-7 gap-y-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12 [&_.group]:translate-y-8 [&_.group]:scale-95 [&_.group]:opacity-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LatestNewsSection({ children }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    animate('header', { opacity: 1, y: 0 }, { duration: 0.6, ease: 'easeOut' });

    const animateCards = () => {
      if (scope.current.querySelectorAll('.group').length > 0) {
        animate(
          '.group',
          { opacity: 1, y: 0, scale: 1 },
          { delay: stagger(0.15), duration: 0.5, ease: 'easeOut' }
        );
      }
    };

    animateCards();

    const observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some((m) => m.addedNodes.length > 0);
      if (hasAddedNodes) {
        animateCards();
      }
    });

    if (scope.current) {
      observer.observe(scope.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [isInView, animate, scope]);

  return (
    <div
      ref={scope}
      className="relative mt-14 flex w-full flex-col items-center gap-6 overflow-hidden text-center sm:gap-10"
    >
      <div className="absolute top-1/2 left-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        className="bg-bgMain relative z-10 px-6"
      >
        <h2 className="text-grayDark relative inline-block text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
          Latest News
          <motion.span
            className="from-primaryGradientStart to-primaryGradientEnd absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'circOut' }}
          />
        </h2>
      </motion.header>

      <div className="relative w-full px-4">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-center gap-x-7 gap-y-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12 [&_.group]:translate-y-8 [&_.group]:scale-95 [&_.group]:opacity-0">
          {children}
        </div>
      </div>
    </div>
  );
}
