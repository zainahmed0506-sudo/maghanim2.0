/**
 * The four solution areas — CLAUDE.md §2.
 * `slug` drives /solutions/[pillar]; `key` indexes the message catalogues.
 */
export const pillars = [
  {slug: 'payments', key: 'payments'},
  {slug: 'cards', key: 'cards'},
  {slug: 'business', key: 'business'},
  {slug: 'financing', key: 'financing'}
] as const;

export type Pillar = (typeof pillars)[number];
export type PillarSlug = Pillar['slug'];

export function isPillarSlug(value: string): value is PillarSlug {
  return pillars.some((pillar) => pillar.slug === value);
}
