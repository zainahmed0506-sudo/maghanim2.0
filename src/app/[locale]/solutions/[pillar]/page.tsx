import type {Metadata} from 'next';
import {hasLocale, useTranslations} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {use} from 'react';
import {buildAlternates} from '@/lib/metadata';
import {routing} from '@/i18n/routing';
import {isPillarSlug, pillars} from '@/lib/pillars';

type Props = {params: Promise<{locale: string; pillar: string}>};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    pillars.map(({slug}) => ({locale, pillar: slug}))
  );
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, pillar} = await params;
  if (!hasLocale(routing.locales, locale) || !isPillarSlug(pillar)) notFound();

  const t = await getTranslations({locale, namespace: 'explorer.pillars'});

  return {
    title: t(`${pillar}.title`),
    description: t(`${pillar}.summary`),
    alternates: buildAlternates(`/solutions/${pillar}`, locale)
  };
}

export default function PillarPage({params}: Props) {
  const {locale, pillar} = use(params);
  if (!hasLocale(routing.locales, locale) || !isPillarSlug(pillar)) notFound();
  setRequestLocale(locale);

  const t = useTranslations('explorer.pillars');
  const features = t.raw(`${pillar}.features`) as string[];

  return (
    <main>
      <h1>{t(`${pillar}.title`)}</h1>
      <p>{t(`${pillar}.summary`)}</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </main>
  );
}
