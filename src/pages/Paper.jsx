import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import PaperBody from "@/components/site/PaperBody";
import { bySlug, papers } from "@/content/papers";

function setMeta(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

export function useScholarMeta(p) {
  useEffect(() => {
    if (!p) return;
    const prevTitle = document.title;
    document.title = `${p.title} | Instracta Research Papers`;
    const els = [
      setMeta("description", p.abstract.slice(0, 280) + "…"),
      setMeta("citation_title", `${p.title}: ${p.subtitle}`),
      setMeta("citation_author", p.authors[0]),
      setMeta("citation_publication_date", "2026/10"),
      setMeta("citation_publisher", "Instracta eLearning Solutions"),
      setMeta("citation_technical_report_institution", "Instracta eLearning Solutions"),
      setMeta("citation_keywords", p.keywords.join("; ")),
    ];
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: p.title,
      alternativeHeadline: p.subtitle,
      author: { "@type": "Person", name: p.authors[0] },
      publisher: { "@type": "Organization", name: "Instracta eLearning Solutions" },
      datePublished: "2026-10",
      abstract: p.abstract,
      keywords: p.keywords.join(", "),
      inLanguage: "en",
    });
    document.head.appendChild(ld);
    return () => {
      document.title = prevTitle;
      els.forEach((e) => e && e.parentNode && e.parentNode.removeChild(e));
      ld.remove();
    };
  }, [p]);
}

export default function Paper() {
  const { slug } = useParams();
  const p = bySlug(slug);
  useScholarMeta(p);
  if (!p) return <Navigate to="/research" replace />;
  const others = papers.filter((x) => x.slug !== p.slug);
  return (
    <div className="pt-28 md:pt-32 pb-24 max-w-3xl mx-auto px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <Link to="/research" className="text-[#1F5B6B] hover:underline">← All research</Link>
        <a href={`/research/instracta-paper-${p.number}-${p.slug}.pdf`} className="inline-flex items-center px-4 py-2 rounded-full font-medium border border-gray-300 text-[#1A2B4A] hover:border-[#1A2B4A]">Download PDF</a>
      </div>
      <div className="mt-8"><PaperBody p={p} /></div>
      <aside className="mt-14 pt-8 border-t border-gray-200">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-[#1A2B4A]">Read next</h2>
        <ul className="mt-4 space-y-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/research/${o.slug}`} className="text-[#1F5B6B] hover:underline font-medium">Paper {o.number} · {o.pillar}: {o.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
