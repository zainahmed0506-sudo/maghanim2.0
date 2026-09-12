import {defineRouting} from 'next-intl/routing';

export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en' satisfies (typeof locales)[number];

export type AppLocale = (typeof locales)[number];

/** Text direction per locale. Logos and the coin never flip — see CLAUDE.md §5. */
export const localeDirection: Record<AppLocale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl'
};

/** `lang` attribute values, also used for hreflang alternates. */
export const localeHtmlLang: Record<AppLocale, string> = {
  en: 'en',
  ar: 'ar'
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // `always` keeps the default locale visible at /en so both locales are symmetrical
  // and `/` redirects to `/en`.
  localePrefix: 'always'
});
