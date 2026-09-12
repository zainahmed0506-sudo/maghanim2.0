import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

/**
 * Per-request i18n configuration.
 *
 * Uses `requestLocale` rather than `next/root-params`: root params are still behind
 * Next's `experimental.rootParams` flag, and this is a client production site.
 * See CLAUDE.md §12.
 */
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Asia/Dubai'
  };
});
