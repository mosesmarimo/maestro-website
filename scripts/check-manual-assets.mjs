import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manualRoot = join(repositoryRoot, "content", "manual");
const publicMediaRoot = join(repositoryRoot, "public", "manual-media");
const failures = [];
let references = 0;

for (const entry of readdirSync(manualRoot)) {
  if (!entry.endsWith(".md")) continue;
  const file = join(manualRoot, entry);
  const source = readFileSync(file, "utf8");
  const targets = [
    ...[...source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1]),
    ...[...source.matchAll(/\b(?:src|poster)="([^"]+)"/g)].map((match) => match[1]),
  ];

  for (const rawTarget of targets) {
    const target = rawTarget.trim().replace(/^<|>$/g, "").split(/[?#]/, 1)[0];
    const relative = target.startsWith("media/")
      ? target.slice("media/".length)
      : target.startsWith("/manual-media/")
        ? target.slice("/manual-media/".length)
        : null;
    if (!relative) continue;

    references += 1;
    const published = resolve(publicMediaRoot, relative);
    if (!published.startsWith(`${publicMediaRoot}/`) || !existsSync(published)) {
      failures.push(`${entry} -> ${target} (missing public asset)`);
      continue;
    }
    if (!statSync(published).isFile() || statSync(published).size === 0) {
      failures.push(`${entry} -> ${target} (empty public asset)`);
      continue;
    }
    if (published.endsWith(".mp4")) {
      const header = readFileSync(published).subarray(0, 12).toString("ascii");
      if (!header.includes("ftyp")) failures.push(`${entry} -> ${target} (invalid MP4 header)`);
    }
  }
}

if (failures.length) {
  console.error(`Broken manual media:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Checked ${references} manual media references; all public assets exist.`);
