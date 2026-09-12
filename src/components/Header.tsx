'use client';

import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import {useState} from 'react';
import {Link} from '@/i18n/navigation';
import {type AppLocale} from '@/i18n/routing';

/**
 * Header with logo, nav, and language toggle.
 * Phase 2: unstyled scaffold. Styling and mobile menu added in review.
 */
export function Header() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isSwitching, setIsSwitching] = useState(false);

  const navItems = [
    {key: 'home' as const, href: '/'},
    {key: 'solutions' as const, href: '/solutions'},
    {key: 'governance' as const, href: '/governance'},
    {key: 'contact' as const, href: '/contact'}
  ];

  const switchLocale = (nextLocale: AppLocale) => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = nextLocale;
    setIsSwitching(true);
    router.push(`/${segments.join('/')}`);
  };

  return (
    <header>
      <div>
        {/* Logo */}
        <Link href="/">
          <Image
            src="/brand/logo-default.png"
            alt="Maghanim"
            width={200}
            height={60}
            priority
          />
        </Link>

        {/* Nav */}
        <nav>
          <ul>
            {navItems.map(({key, href}) => (
              <li key={key}>
                <Link href={href}>{t(`nav.${key}`)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language Toggle */}
        <button
          onClick={() => {
            const next = locale === 'en' ? 'ar' : 'en';
            switchLocale(next);
          }}
          disabled={isSwitching}
        >
          {locale === 'en' ? 'العربية' : 'English'}
        </button>
      </div>
    </header>
  );
}
