import access from "./access";
import evidence from "./evidence";
import local from "./local";
import { AUTHOR_LIST } from "./authors";
import { DOIS } from "./dois";

export const papers = [access, evidence, local].map((p) => ({
  ...p,
  authors: AUTHOR_LIST.map((a) => a.name),
  authorRecords: AUTHOR_LIST,
  doi: DOIS[p.slug] || "",
  status: "Working paper",
}));

export const bySlug = (slug) => papers.find((p) => p.slug === slug);

export const doiUrl = (p) => (p.doi ? `https://doi.org/${p.doi}` : "");

export function citeAs(p) {
  const year = p.date.split(" ").pop();
  const names = p.authorRecords.map((a) => `${a.family}, ${a.initials}`);
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}` : names[0];
  const link = p.doi ? doiUrl(p) : `https://instracta.com/research/${p.slug}`;
  return `${list} (${year}). ${p.title}: ${p.subtitle} (Working Paper No. ${p.number}). Instracta eLearning Solutions. ${link}`;
}
