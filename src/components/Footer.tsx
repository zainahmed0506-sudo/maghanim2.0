import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

/**
 * Footer with links, disclaimer, and copyright.
 * Includes the geometric pattern via CSS background.
 * Phase 2: unstyled scaffold.
 */
export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div>
        {/* Links */}
        <div>
          <h3>{t('footer.linksTitle')}</h3>
          <ul>
            <li>
              <Link href="/">{t('footer.links.solutions')}</Link>
            </li>
            <li>
              <Link href="/solutions">{t('footer.links.solutions')}</Link>
            </li>
            <li>
              <Link href="/governance">{t('footer.links.governance')}</Link>
            </li>
            <li>
              <Link href="/contact">{t('footer.links.contact')}</Link>
            </li>
            <li>
              <Link href="/privacy">{t('footer.links.privacy')}</Link>
            </li>
            <li>
              <Link href="/terms">{t('footer.links.terms')}</Link>
            </li>
          </ul>
        </div>

        {/* Social (placeholder) */}
        <div>
          <h3>{t('footer.socialTitle')}</h3>
          <p>[PLACEHOLDER: social links]</p>
        </div>

        {/* Copyright & Disclaimer */}
        <div>
          <p>
            © {year} Maghanim. {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
