import type {Metadata} from 'next';
import {hasLocale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {use} from 'react';
import {routing} from '@/i18n/routing';
import {pageMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: string}>};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return pageMetadata('governance', locale, '/governance');
}

export default function GovernancePage({params}: Props) {
  const {locale} = use(params);
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = useTranslations('pages.governance');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('body')}</p>
    </main>
  );
}
