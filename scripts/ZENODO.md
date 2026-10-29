# Publishing the papers on Zenodo

1. Create a Zenodo personal access token (Zenodo > Account > Applications) with `deposit:write` and `deposit:actions`.
2. `ZENODO_TOKEN=... node scripts/zenodo.mjs reserve` creates private drafts, reserves a DOI per paper and writes them to `src/content/papers/dois.js`.
3. `npm run build`, regenerate the PDFs so they carry the DOI, commit and deploy.
4. `ZENODO_TOKEN=... node scripts/zenodo.mjs publish` uploads the PDFs and publishes. Publishing is permanent.

Rehearse first with `ZENODO_SANDBOX=1` and a token from sandbox.zenodo.org.
Metadata: type working paper, licence CC BY 4.0 (change in `scripts/zenodo.mjs` if you prefer another), three creators with ORCID.
Confirm with Dr Riany and Daisy before step 4: their names and ORCIDs become public.
