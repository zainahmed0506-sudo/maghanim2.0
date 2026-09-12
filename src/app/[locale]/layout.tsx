import type {Metadata} from 'next';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {fontVariables} from '@/app/fonts';
import {localeDirection, localeHtmlLang, routing} from '@/i18n/routing';
import {buildAlternates, siteUrl} from '@/lib/metadata';
import '@/app/globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({locale, namespace: 'metadata'});

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('home.title'),
      template: `%s · ${t('siteName')}`
    },
    description: t('home.description'),
    alternates: buildAlternates('/', locale),
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      title: t('home.title'),
      description: t('home.description')
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opts this segment into static rendering.
  setRequestLocale(locale);

  return (
    <html
      lang={localeHtmlLang[locale]}
      dir={localeDirection[locale]}
      className={fontVariables}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
