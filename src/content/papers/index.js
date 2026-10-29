import access from "./access";
import evidence from "./evidence";
import local from "./local";
import { DOIS } from "./dois";

export const PUBLISHER = "Instracta eLearning Solutions";

export const papers = [access, evidence, local].map((p) => ({
  ...p,
  doi: DOIS[p.slug] || "",
  status: "Working paper",
}));

export const bySlug = (slug) => papers.find((p) => p.slug === slug);

export const doiUrl = (p) => (p.doi ? `https://doi.org/${p.doi}` : "");

export function citeAs(p) {
  const year = p.date.split(" ").pop();
  const link = p.doi ? doiUrl(p) : `https://instracta.com/research/${p.slug}`;
  return `${PUBLISHER} (${year}). ${p.title}: ${p.subtitle} (Working Paper No. ${p.number}). ${PUBLISHER}. ${link}`;
}
