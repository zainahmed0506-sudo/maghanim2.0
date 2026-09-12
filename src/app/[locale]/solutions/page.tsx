import type {Metadata} from 'next';
import {hasLocale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {use} from 'react';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {pageMetadata} from '@/lib/metadata';
import {pillars} from '@/lib/pillars';

type Props = {params: Promise<{locale: string}>};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return pageMetadata('solutions', locale, '/solutions');
}

export default function SolutionsPage({params}: Props) {
  const {locale} = use(params);
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = useTranslations('pages.solutions');
  const tPillars = useTranslations('platform.pillars');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('body')}</p>
      <ul>
        {pillars.map(({slug, key}) => (
          <li key={slug}>
            <Link href={`/solutions/${slug}`}>{tPillars(`${key}.title`)}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
