import { Link } from "react-router-dom";
import { Page, PageHead, Chip } from "@/components/site/parts";
import { papers } from "@/content/papers";

export default function Research() {
  return (
    <Page>
      <PageHead
        tag="Research"
        title="The evidence behind what we stand for."
        lead="Three working papers, one for each pillar: Access, Evidence and Local. Each reviews published research, states its limits, and sets out what it means for how we work."
      />
      <div className="mt-14 space-y-12">
        {papers.map((p) => (
          <article key={p.slug} className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-10 pt-10 border-t border-gray-200">
            <div>
              <div className="text-sm font-semibold text-[#D4A574]">Paper {p.number}</div>
              <div className="mt-1 text-lg font-semibold text-[#1A2B4A]">{p.pillar}</div>
              <div className="mt-2"><Chip>Working paper</Chip></div>
            </div>
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A2B4A] leading-tight">
                <Link to={`/research/${p.slug}`} className="hover:underline">{p.title}</Link>
              </h2>
              <p className="mt-2 text-lg text-gray-600">{p.subtitle}</p>
              <p className="mt-3 text-sm text-gray-500">{p.authors.join(", ")} · {p.date}</p>
              <p className="mt-4 text-gray-600 leading-relaxed line-clamp-5">{p.abstract}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={`/research/${p.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-[#1A2B4A] text-white hover:bg-[#23385C]">Read paper</Link>
                <a href={`/research/instracta-paper-${p.number}-${p.slug}.pdf`} className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium border border-gray-300 text-[#1A2B4A] hover:border-[#1A2B4A]">Download PDF</a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-14 text-sm text-gray-500 max-w-2xl leading-relaxed">
        These are working papers prepared by Instracta and have not been peer reviewed. They are narrative reviews of published sources, not original studies. We are an interested party, which each paper states. If you find an error or know of evidence we have missed, please tell us through the <Link to="/contact" className="underline">Contact</Link> page.
      </p>
    </Page>
  );
}
