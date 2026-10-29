import { citeAs } from "@/content/papers";

function Table({ t }) {
  return (
    <figure className="my-8">
      <figcaption className="text-sm font-semibold text-[#1A2B4A] mb-3">{t.caption}</figcaption>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse paper-table">
          <thead>
            <tr>
              {t.head.map((h) => (
                <th key={h} className="text-left align-bottom font-semibold text-[#1A2B4A] border-b-2 border-[#1A2B4A] pb-2 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r, i) => (
              <tr key={i} className="align-top">
                {r.map((c, j) => (
                  <td key={j} className={"py-3 pr-4 border-b border-gray-200 text-gray-700 leading-relaxed " + (j === 0 ? "font-medium text-[#1A2B4A]" : "")}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function PaperBody({ p, print = false }) {
  const wc = p.sections.flatMap((s) => [...(s.p || []), ...(s.p2 || []), ...(s.list || [])]).join(" ").split(/\s+/).length;
  return (
    <article className="paper">
      <header className="paper-head">
        <div className="text-xs uppercase tracking-[0.2em] text-[#5AB3C6] font-semibold">
          {p.series} · Pillar: {p.pillar}
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[#1A2B4A] leading-tight">{p.title}</h1>
        <p className="mt-3 text-xl text-gray-600 leading-snug">{p.subtitle}</p>
        <p className="mt-5 text-sm text-gray-700">
          <span className="font-semibold">{p.authors.join(", ")}</span>
          <br />
          {p.affiliation}
          <br />
          {p.date} · {p.status}
        </p>
      </header>

      <section className="mt-8 p-6 bg-[#F4F8FA] border-l-4 border-[#5AB3C6] rounded-r">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-[#1A2B4A]">Abstract</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">{p.abstract}</p>
        <p className="mt-4 text-sm text-gray-600">
          <span className="font-semibold text-[#1A2B4A]">Keywords: </span>
          {p.keywords.join("; ")}
        </p>
      </section>

      {!print && (
        <nav className="mt-8 text-sm" aria-label="Contents">
          <h2 className="text-sm uppercase tracking-widest font-semibold text-[#1A2B4A]">Contents</h2>
          <ol className="mt-3 space-y-1 text-[#1F5B6B]">
            {p.sections.map((s, i) => (
              <li key={i}><a href={`#s${i}`} className="hover:underline">{s.h}</a></li>
            ))}
            <li><a href="#refs" className="hover:underline">References</a></li>
          </ol>
        </nav>
      )}

      <div className="mt-10">
        {p.sections.map((s, i) => (
          <section key={i} id={`s${i}`} className="mt-10 first:mt-0 paper-section">
            <h2 className="text-2xl font-semibold text-[#1A2B4A]">{s.h}</h2>
            {(s.p || []).map((t, k) => (
              <p key={k} className="mt-4 text-gray-700 leading-[1.8] text-[1.0625rem]">{t}</p>
            ))}
            {s.list && (
              <ol className="mt-4 ml-5 list-decimal space-y-2 text-gray-700 leading-[1.7] text-[1.0625rem]">
                {s.list.map((l, k) => <li key={k}>{l}</li>)}
              </ol>
            )}
            {s.table && <Table t={s.table} />}
            {(s.p2 || []).map((t, k) => (
              <p key={k} className="mt-4 text-gray-700 leading-[1.8] text-[1.0625rem]">{t}</p>
            ))}
          </section>
        ))}
      </div>

      <section id="refs" className="mt-14 paper-section">
        <h2 className="text-2xl font-semibold text-[#1A2B4A]">References</h2>
        <ol className="mt-5 space-y-3 text-sm text-gray-700 leading-relaxed list-none">
          {p.references.map((r, i) => (
            <li key={i} className="pl-8 -indent-8 break-words">{r}</li>
          ))}
        </ol>
      </section>

      <section className="mt-12 p-5 border border-gray-200 rounded text-sm text-gray-700 leading-relaxed">
        <div className="font-semibold text-[#1A2B4A]">How to cite</div>
        <p className="mt-2">{citeAs(p)}</p>
        <p className="mt-3 text-gray-500">Approximately {Math.round(wc / 100) * 100} words excluding references. This paper is a working paper and has not been peer reviewed. Comments and corrections are welcome through the Contact page.</p>
      </section>
    </article>
  );
}
