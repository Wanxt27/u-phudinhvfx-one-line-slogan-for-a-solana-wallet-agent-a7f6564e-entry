// One-Line Slogan for a Solana Wallet Agent — make.fun micro #189.
// Writes exactly one slogan, one line, to /output/entry.txt.
// Node 22, standard library only. No network, no randomness, no environment reads.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";

const SLOGAN =
  "Your Solana wallet just grew a brain: ask once, and it handles the rest.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

const MAX_CHARS = 140;
const MAX_WORDS = 20;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Validate the slogan against the competition gate before writing anything.
const words = SLOGAN.trim().split(/\s+/);
if (SLOGAN.trim().length === 0) fail("slogan is empty or only whitespace");
if (SLOGAN.length < 1 || SLOGAN.length > MAX_CHARS) {
  fail(`slogan is ${SLOGAN.length} characters, gate allows 1-${MAX_CHARS}`);
}
if (words.length > MAX_WORDS) {
  fail(`slogan is ${words.length} words, limit is ${MAX_WORDS}`);
}
if (/[\r\n]/.test(SLOGAN)) fail("slogan must be a single line");
// Judge criterion 1: the line must name or clearly evoke the Solana wallet agent.
for (const keyword of ["Solana", "wallet"]) {
  if (!SLOGAN.includes(keyword)) fail(`slogan must mention "${keyword}"`);
}

// The gate measures the file itself, so guard its UTF-8 byte length as well.
const byteLength = Buffer.byteLength(SLOGAN, "utf8");
if (byteLength < 1 || byteLength > MAX_CHARS) {
  fail(`slogan is ${byteLength} bytes, gate allows 1-${MAX_CHARS}`);
}
console.error(
  `slogan ok: ${SLOGAN.length} chars, ${byteLength} bytes, ${words.length} words`,
);
mkdirSync(OUT_DIR, { recursive: true });
rmSync(OUT_FILE, { force: true });
writeFileSync(OUT_FILE, SLOGAN, "utf8");

console.log(SLOGAN);
