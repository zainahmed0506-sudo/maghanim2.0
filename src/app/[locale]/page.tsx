import {hasLocale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {use} from 'react';
import {Hero} from '@/components/Hero';
import {routing} from '@/i18n/routing';

type Props = {params: Promise<{locale: string}>};

/**
 * Home page. Phase 3: Hero section added.
 * Placeholder content sections below hero pending Phase 4–6.
 */
export default function HomePage({params}: Props) {
  const {locale} = use(params);
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main>
      <Hero />

      {/* Placeholder sections — Phase 4–6 */}
      <section className="section-placeholder">
        <h2>{t('platform.title')}</h2>
      </section>

      <section className="section-placeholder">
        <h2>{t('explorer.title')}</h2>
      </section>

      <section className="section-placeholder">
        <h2>{t('howItWorks.title')}</h2>
      </section>

      <section className="section-placeholder">
        <h2>{t('partners.title')}</h2>
      </section>

      <section className="section-placeholder">
        <h2>{t('governance.title')}</h2>
      </section>

      <section className="section-placeholder">
        <h2>{t('contact.title')}</h2>
      </section>
    </main>
  );
}
