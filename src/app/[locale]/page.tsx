import {hasLocale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {use} from 'react';
import {routing} from '@/i18n/routing';

type Props = {params: Promise<{locale: string}>};

/**
 * Phase 1 placeholder. Renders the heading of every section the home page will
 * carry (CLAUDE.md §7 / brief §8) so the message wiring and locale direction
 * can be reviewed before any design work begins.
 */
export default function HomePage({params}: Props) {
  const {locale} = use(params);
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = useTranslations();
  const sections = [
    'hero.headline',
    'platform.title',
    'explorer.title',
    'howItWorks.title',
    'partners.title',
    'governance.title',
    'contact.title'
  ] as const;

  return (
    <main>
      <h1>{t('hero.headline')}</h1>
      <p>{t('hero.subheadline')}</p>
      <ol>
        {sections.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ol>
    </main>
  );
}
