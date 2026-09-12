'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {motion} from 'motion/react';
import {useEffect, useState} from 'react';

/**
 * Hero section with animated coin.
 * CLAUDE.md §8: slow float + tilt + shadow animation, weighty feel.
 * Prefers-reduced-motion respected.
 */
export function Hero() {
  const t = useTranslations('hero');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const coinTransition = {
    duration: prefersReducedMotion ? 0.01 : 6,
    repeat: Infinity,
    ease: [0.42, 0, 0.58, 1] as const // easeInOut cubic bezier
  };

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Calligraphy mark */}
        <motion.div
          className="hero-mark"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.2}}
        >
          <Image
            src="/brand/logo-default.png"
            alt={t('coinAlt')}
            width={80}
            height={80}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero-headline"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.4}}
        >
          {t('headline')}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="hero-subheading"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.6}}
        >
          {t('subheadline')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="hero-cta"
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.8, delay: 0.8}}
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
        >
          {t('cta')}
        </motion.button>

        {/* Animated Coin */}
        <motion.div
          className="hero-coin-wrapper"
          animate={{
            y: prefersReducedMotion ? 0 : [0, -8, 0],
            rotateZ: prefersReducedMotion ? 0 : [-2, 2, -2]
          }}
          transition={coinTransition}
        >
          <div className="hero-coin-container">
            <Image
              src="/brand/coin-full.png"
              alt={t('coinAlt')}
              width={550}
              height={550}
              priority
              quality={85}
            />
            {/* Shadow beneath coin */}
            <motion.div
              className="coin-shadow"
              animate={{
                boxShadow: prefersReducedMotion
                  ? '0 20px 30px rgba(0, 0, 0, 0.3)'
                  : ['0 20px 30px rgba(0, 0, 0, 0.15)', '0 28px 40px rgba(0, 0, 0, 0.3)', '0 20px 30px rgba(0, 0, 0, 0.15)']
              }}
              transition={coinTransition}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
