import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {type AppLocale, localeDirection} from '@/i18n/routing';

/**
 * Localised 404.
 *
 * Known limitation (Phase 7): because the root layout lives inside the
 * `[locale]` segment, Next renders 404s in its own <html> shell, so `lang`
 * and `dir` are not inherited and the body arrives as flight data rather than
 * server HTML. The wrapper below restores direction and language for the
 * content itself. Next 16's `global-not-found` convention is the intended fix
 * but is not picked up in 16.3.5 with a locale-rooted layout — revisit in
 * Phase 7. See CLAUDE.md §13.
 */
export default function LocaleNotFound() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations('pages.notFound');

  return (
    <div lang={locale} dir={localeDirection[locale]}>
      <main>
        <h1>{t('title')}</h1>
        <p>{t('body')}</p>
        <Link href="/">{t('cta')}</Link>
      </main>
    </div>
  );
}
