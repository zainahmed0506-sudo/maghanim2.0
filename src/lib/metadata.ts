import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getPathname} from '@/i18n/navigation';
import {type AppLocale, defaultLocale, locales} from '@/i18n/routing';

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel; the localhost fallback
 * keeps local builds working. Client has not yet confirmed the domain —
 * CLAUDE.md §13.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type Href = Parameters<typeof getPathname>[0]['href'];

/**
 * Canonical URL plus hreflang alternates for one page, in every locale.
 * `x-default` points at the default locale.
 */
export function buildAlternates(
  href: Href,
  locale: AppLocale
): Metadata['alternates'] {
  const languages = Object.fromEntries(
    locales.map((alt) => [alt, getPathname({href, locale: alt})])
  );

  return {
    canonical: getPathname({href, locale}),
    languages: {
      ...languages,
      'x-default': getPathname({href, locale: defaultLocale})
    }
  };
}

type MetadataKey = 'solutions' | 'governance' | 'contact' | 'privacy' | 'terms';

/** Per-page title, description, canonical and hreflang alternates. */
export async function pageMetadata(
  key: MetadataKey,
  locale: AppLocale,
  href: Href
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'metadata'});

  return {
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    alternates: buildAlternates(href, locale),
    openGraph: {
      type: 'website',
      title: t(`${key}.title`),
      description: t(`${key}.description`)
    }
  };
}
