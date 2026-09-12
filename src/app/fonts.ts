import {GeistSans} from 'geist/font/sans';
import {Fraunces, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic} from 'next/font/google';

/** English display/headings — modern high-contrast serif. */
export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  axes: ['SOFT', 'WONK', 'opsz']
});

/** Arabic headings — geometric Kufic. */
export const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-heading-ar',
  weight: ['400', '500', '600', '700']
});

/** Arabic body — built for UI legibility. */
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-body-ar',
  weight: ['300', '400', '500', '600']
});

/** English body — Geist Sans, self-hosted by the `geist` package. */
export const geistSans = GeistSans;

/** Every font variable, applied once on <html>. */
export const fontVariables = [
  fraunces.variable,
  notoKufiArabic.variable,
  ibmPlexSansArabic.variable,
  geistSans.variable
].join(' ');
