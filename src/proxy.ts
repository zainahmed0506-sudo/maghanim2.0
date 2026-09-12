import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match everything except Next internals, the API surface and static files
  // (anything containing a dot), so `/` redirects to `/en` and unprefixed paths
  // are rewritten onto a locale.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
