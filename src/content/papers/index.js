import access from "./access";
import evidence from "./evidence";
import local from "./local";

export const papers = [access, evidence, local];

export const bySlug = (slug) => papers.find((p) => p.slug === slug);

export function citeAs(p) {
  const year = p.date.split(" ").pop();
  return `${p.authors[0].split(" ").slice(-1)[0]}, ${p.authors[0].split(" ").slice(0, -1).map((n) => n[0] + ".").join(" ")} (${year}). ${p.title}: ${p.subtitle}. ${p.series}. Instracta eLearning Solutions. https://instracta.com/research/${p.slug}`;
}
