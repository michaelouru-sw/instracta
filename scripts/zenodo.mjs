// Deposit the three Instracta working papers on Zenodo and write the DOIs to src/content/papers/dois.js.
//
// Usage (needs Node 18+ and a Zenodo personal access token with deposit:write and deposit:actions):
//   ZENODO_TOKEN=xxxx node scripts/zenodo.mjs reserve   # creates drafts, reserves DOIs, writes dois.js (nothing public)
//   npm run build && (regenerate PDFs so they show the DOI)
//   ZENODO_TOKEN=xxxx node scripts/zenodo.mjs publish   # uploads PDFs and PUBLISHES (permanent, cannot be undone)
// Add ZENODO_SANDBOX=1 to rehearse on sandbox.zenodo.org with a sandbox token.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import { join } from "node:path";

const mode = process.argv[2];
if (!["reserve", "publish"].includes(mode)) {
  console.error("Usage: node scripts/zenodo.mjs reserve|publish");
  process.exit(1);
}
const token = process.env.ZENODO_TOKEN;
if (!token) { console.error("Set ZENODO_TOKEN"); process.exit(1); }
const base = process.env.ZENODO_SANDBOX ? "https://sandbox.zenodo.org" : "https://zenodo.org";
const stateFile = process.env.ZENODO_SANDBOX ? "scripts/.zenodo-sandbox-state.json" : "scripts/.zenodo-state.json";
const state = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : {};

const out = join(tmpdir(), "instracta-papers.bundle.mjs");
execSync(`npx esbuild src/content/papers/index.js --bundle --format=esm --outfile=${out} --log-level=error`, { stdio: "inherit" });
const { papers } = await import(pathToFileURL(out).href + "?t=" + Date.now());

const api = async (path, opts = {}) => {
  const res = await fetch(path.startsWith("http") ? path : `${base}/api${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${token}`, ...(opts.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${path}: ${text.slice(0, 500)}`);
  return text ? JSON.parse(text) : {};
};

const metadata = (p) => ({
  upload_type: "publication",
  publication_type: "workingpaper",
  title: `${p.title}: ${p.subtitle}`,
  creators: [{ name: "Instracta eLearning Solutions" }],
  description: `<p>${p.abstract}</p><p>${p.series}. Working paper.</p>`,
  keywords: p.keywords,
  publication_date: "2026-10-29",
  language: "eng",
  access_right: "open",
  license: "cc-by-4.0",
  prereserve_doi: true,
  related_identifiers: [{ relation: "isIdenticalTo", identifier: `https://instracta.com/research/${p.slug}`, scheme: "url" }],
});

const json = { "Content-Type": "application/json" };

if (mode === "reserve") {
  const dois = {};
  for (const p of papers) {
    let dep = state[p.slug] ? await api(`/deposit/depositions/${state[p.slug].id}`) : await api("/deposit/depositions", { method: "POST", headers: json, body: "{}" });
    dep = await api(`/deposit/depositions/${dep.id}`, { method: "PUT", headers: json, body: JSON.stringify({ metadata: metadata(p) }) });
    state[p.slug] = { id: dep.id };
    dois[p.slug] = dep.metadata.prereserve_doi.doi;
    console.log(p.slug, "deposition", dep.id, "reserved DOI", dois[p.slug]);
  }
  writeFileSync(stateFile, JSON.stringify(state, null, 2));
  writeFileSync(
    "src/content/papers/dois.js",
    `// Zenodo DOIs (reserved ${new Date().toISOString().slice(0, 10)}).\nexport const DOIS = ${JSON.stringify(dois, null, 2)};\n`,
  );
  console.log("\nDOIs written to src/content/papers/dois.js. Rebuild and regenerate the PDFs, then run: node scripts/zenodo.mjs publish");
} else {
  for (const p of papers) {
    if (!state[p.slug]) throw new Error(`No reserved deposition for ${p.slug}; run reserve first`);
    const file = `public/research/instracta-paper-${p.number}-${p.slug}.pdf`;
    const dep = await api(`/deposit/depositions/${state[p.slug].id}`);
    for (const f of dep.files || []) await api(`/deposit/depositions/${dep.id}/files/${f.id}`, { method: "DELETE" });
    await api(`${dep.links.bucket}/${file.split("/").pop()}`, { method: "PUT", body: readFileSync(file) });
    const done = await api(`/deposit/depositions/${dep.id}/actions/publish`, { method: "POST" });
    console.log(p.slug, "published:", done.doi_url);
  }
}
