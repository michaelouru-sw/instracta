import { citeAs } from "@/content/papers";
import { FIGURES } from "@/components/site/Figures";

function Table({ t }) {
  return (
    <figure className="my-8">
      <figcaption className="text-sm font-semibold text-[#1A2B4A] mb-3">{t.caption}</figcaption>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse paper-table">
          <thead>
            <tr>
              {t.head.map((h) => (
                <th key={h} className="text-left align-bottom font-semibold text-[#1A2B4A] border-y-2 border-[#1A2B4A] py-2 pr-4">{h}</th>
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
      {t.note && <p className="mt-2 text-xs text-gray-500">{t.note}</p>}
    </figure>
  );
}

function Figure({ f }) {
  const C = FIGURES[f.id];
  if (!C) return null;
  return (
    <figure className="my-10 paper-figure">
      <div className="border border-gray-200 rounded p-3 bg-white"><C /></div>
      <figcaption className="mt-3 text-sm text-gray-700 leading-relaxed">
        <span className="font-semibold text-[#1A2B4A]">{f.label} </span>
        {f.caption}
      </figcaption>
    </figure>
  );
}

function Block({ s }) {
  return (
    <>
      {(s.p || []).map((t, k) => (
        <p key={k} className="mt-4 text-gray-700 leading-[1.8] text-[1.0625rem]">{t}</p>
      ))}
      {s.list && (
        <ol className="mt-4 ml-5 list-decimal space-y-2 text-gray-700 leading-[1.7] text-[1.0625rem]">
          {s.list.map((l, k) => <li key={k}>{l}</li>)}
        </ol>
      )}
      {s.fig && <Figure f={s.fig} />}
      {s.table && <Table t={s.table} />}
      {(s.p2 || []).map((t, k) => (
        <p key={k} className="mt-4 text-gray-700 leading-[1.8] text-[1.0625rem]">{t}</p>
      ))}
      {(s.subs || []).map((sub, i) => (
        <div key={i} className="mt-6">
          <h3 className="text-lg font-semibold text-[#1A2B4A]">{sub.h}</h3>
          <Block s={sub} />
        </div>
      ))}
    </>
  );
}

export function countWords(p) {
  const grab = (s) => [
    ...(s.p || []), ...(s.p2 || []), ...(s.list || []),
    ...(s.subs || []).flatMap(grab),
    ...(s.table ? s.table.rows.flat() : []),
  ];
  const body = [...p.sections, ...(p.back || [])].flatMap(grab).join(" ");
  return body.split(/\s+/).filter(Boolean).length;
}

export default function PaperBody({ p, print = false }) {
  const wc = countWords(p) + p.abstract.split(/\s+/).length;
  const all = [...p.sections, ...(p.back || [])];
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

      {p.highlights && (
        <section className="mt-8 border-y border-gray-200 py-5">
          <h2 className="text-sm uppercase tracking-widest font-semibold text-[#1A2B4A]">Highlights</h2>
          <ul className="mt-3 ml-5 list-disc space-y-1.5 text-gray-700 text-[0.95rem] leading-relaxed">
            {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </section>
      )}

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
            {all.map((s, i) => (
              <li key={i}><a href={`#s${i}`} className="hover:underline">{s.h}</a></li>
            ))}
            <li><a href="#refs" className="hover:underline">References</a></li>
            {p.appendix && <li><a href="#appx" className="hover:underline">{p.appendix.h}</a></li>}
          </ol>
        </nav>
      )}

      <div className="mt-10">
        {all.map((s, i) => (
          <section key={i} id={`s${i}`} className="mt-10 first:mt-0 paper-section">
            <h2 className="text-2xl font-semibold text-[#1A2B4A]">{s.h}</h2>
            <Block s={s} />
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

      {p.appendix && (
        <section id="appx" className="mt-14 paper-section">
          <h2 className="text-2xl font-semibold text-[#1A2B4A]">{p.appendix.h}</h2>
          <Block s={p.appendix} />
        </section>
      )}

      <section className="mt-12 p-5 border border-gray-200 rounded text-sm text-gray-700 leading-relaxed">
        <div className="font-semibold text-[#1A2B4A]">How to cite</div>
        <p className="mt-2">{citeAs(p)}</p>
        <p className="mt-3 text-gray-500">Approximately {Math.floor(wc / 100) * 100} words, excluding references and appendix. This is a working paper and has not been peer reviewed. Comments and corrections are welcome through the Contact page.</p>
      </section>
    </article>
  );
}
