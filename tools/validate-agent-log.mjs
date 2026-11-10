#!/usr/bin/env node
/* Validates js/data/agent.js (the Agent Log) before it can go live.
   Runs in CI on every push and pull request. No dependencies.

   Checks every entry:
   - required fields present, date in the expected format, newest first
   - closer ends with the approved sign-off
   - no banned terms
   - every number in the text also appears in the site's own resume
     content (index.html + js/data/content.js), so no invented facts
   - no quote author used twice
   Exit 0 = valid, 1 = problems found. */
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const SIGN_OFF = '🤖 Unnamed, but employed. I am constantly improving myself. So far, I am receiving good feedback from everyone.';
const BANNED = ['ungovernable', 'Dilbert', 'Dogbert', 'ITIL', 'Six Sigma'];
const FIELDS = ['date', 'item', 'text', 'quote', 'source', 'closer'];
const DATE_RE = /^([A-Z][a-z]+ \d{1,2}, \d{4}) · \d{1,2}:\d{2} (AM|PM) ET$/;
const NUM_RE = /\d+(?:[.,]\d+)?/g;

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(read('js/data/agent.js') + '\nthis.AGENT_LOG = AGENT_LOG;', ctx);
const log = ctx.AGENT_LOG;

const facts = new Set((read('index.html') + read('js/data/content.js')).match(NUM_RE) || []);
const errors = [];
const authors = new Map();
let prev = null;

if (!Array.isArray(log) || !log.length) errors.push('AGENT_LOG is empty or not an array');

(log || []).forEach((e, i) => {
  const where = `entry ${i} (${e.date || 'no date'})`;
  for (const f of FIELDS) if (!e[f] || typeof e[f] !== 'string') errors.push(`${where}: missing ${f}`);
  const m = DATE_RE.exec(e.date || '');
  if (!m) errors.push(`${where}: date must look like "November 2, 2026 · 8:15 AM ET"`);
  else {
    const d = new Date(m[1]);
    if (prev && d > prev) errors.push(`${where}: entries must be newest first`);
    prev = d;
  }
  if (!(e.closer || '').trimEnd().endsWith(SIGN_OFF)) errors.push(`${where}: closer must end with the approved sign-off`);

  const all = FIELDS.map((f) => e[f] || '').join('\n');
  for (const t of BANNED) if (new RegExp(`\\b${t}\\b`, 'i').test(all)) errors.push(`${where}: banned term "${t}"`);

  const checked = [e.text, e.closer].join('\n');
  for (const n of checked.match(NUM_RE) || []) {
    if (!facts.has(n)) errors.push(`${where}: number "${n}" is not in the site's resume content`);
  }

  const author = (e.source || '').split(',')[0].trim().toLowerCase();
  if (author) {
    if (authors.has(author)) errors.push(`${where}: quote author "${author}" already used in entry ${authors.get(author)}`);
    authors.set(author, i);
  }
});

if (errors.length) {
  console.error(`Agent Log: FAIL (${errors.length})`);
  for (const e of errors) console.error(' - ' + e);
  process.exit(1);
}
console.log(`Agent Log: PASS (${log.length} entries)`);
