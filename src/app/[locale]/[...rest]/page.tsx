import {notFound} from 'next/navigation';

/**
 * The `[locale]` segment behaves like a catch-all, so unknown paths would
 * otherwise fall through. This renders the localised 404 instead.
 */
export default function CatchAllPage() {
  notFound();
}
