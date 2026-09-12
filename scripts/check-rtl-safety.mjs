#!/usr/bin/env node
/**
 * RTL safety net — CLAUDE.md §5.
 *
 * The Arabic layout must genuinely mirror, which only works if every directional
 * utility is logical (start/end, ms/me, ps/pe) rather than physical (left/right).
 * This fails the build if a physical utility reaches the source.
 *
 * Also checks that en.json and ar.json stay structurally identical, so a missing
 * Arabic key can never ship as a blank string.
 */
import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';

const SOURCE_DIR = 'src';
const problems = [];

/** Physical Tailwind utilities that break RTL mirroring. */
const FORBIDDEN = [
  /\b-?(ml|mr|pl|pr)-[\w./[\]-]+/g,
  /\b(left|right)-[\w./[\]-]+/g,
  /\btext-(left|right)\b/g,
  /\bborder-(l|r)(-[\w./[\]-]+)?\b/g,
  /\brounded-(tl|tr|bl|br|l|r)-[\w./[\]-]+/g,
  /\bfloat-(left|right)\b/g
];

const SUGGESTIONS = {
  ml: 'ms', mr: 'me', pl: 'ps', pr: 'pe',
  left: 'start', right: 'end'
};

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx?|css)$/.test(path)) scan(path);
  }
}

function scan(path) {
  readFileSync(path, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      // Lines explicitly opted out (e.g. a logo that must not flip).
      if (line.includes('rtl-safe-ignore')) return;

      for (const pattern of FORBIDDEN) {
        for (const match of line.matchAll(pattern)) {
          const token = match[0];
          const base = token.replace(/^-/, '').split('-')[0];
          const hint = SUGGESTIONS[base];
          problems.push(
            `${path}:${index + 1}  "${token}"` +
              (hint ? ` — use "${hint}-" instead` : ' — use a logical property')
          );
        }
      }
    });
}

function messageKeys(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) return [`${path}[${value.length}]`];
    if (value && typeof value === 'object') return messageKeys(value, path);
    return [path];
  });
}

function checkMessages() {
  const en = JSON.parse(readFileSync('messages/en.json', 'utf8'));
  const ar = JSON.parse(readFileSync('messages/ar.json', 'utf8'));
  const enKeys = messageKeys(en);
  const arKeys = new Set(messageKeys(ar));

  for (const key of enKeys) {
    if (!arKeys.has(key)) problems.push(`messages/ar.json  missing key: ${key}`);
  }
  for (const key of arKeys) {
    if (!enKeys.includes(key)) problems.push(`messages/en.json  missing key: ${key}`);
  }
}

walk(SOURCE_DIR);
checkMessages();

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} issue(s):\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  console.error('');
  process.exit(1);
}

console.log('✓ RTL-safe: no physical direction utilities; en/ar keys match.');
