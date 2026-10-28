import { Link } from "react-router-dom";

export const NAVY = "#1A2B4A";

export function Page({ children }) {
  return <div className="pt-28 md:pt-32 pb-24 max-w-6xl mx-auto px-6">{children}</div>;
}

export function PageHead({ tag, title, lead }) {
  return (
    <div className="max-w-2xl">
      {tag && <span className="text-xs uppercase tracking-[0.2em] text-[#5AB3C6] font-semibold">{tag}</span>}
      <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[#1A2B4A] leading-tight">{title}</h1>
      {lead && <p className="mt-5 text-lg text-gray-500 leading-relaxed">{lead}</p>}
    </div>
  );
}

export function Chip({ children }) {
  return (
    <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-[#EEF7FA] text-[#1F5B6B] border border-[#5AB3C6]/30">
      {children}
    </span>
  );
}

export function Btn({ to, href, children, ghost }) {
  const cls = ghost
    ? "inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium border border-gray-300 text-[#1A2B4A] hover:border-[#1A2B4A]"
    : "inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-[#1A2B4A] text-white hover:bg-[#23385C]";
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link className={cls} to={to}>{children}</Link>;
}

export function Item({ title, chip, children, actions }) {
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4 md:gap-10 py-8 border-t border-gray-200 first:border-t-0">
      <div>
        <h2 className="text-xl font-semibold text-[#1A2B4A]">{title}</h2>
        {chip && <div className="mt-2"><Chip>{chip}</Chip></div>}
      </div>
      <div>
        <div className="text-gray-600 leading-relaxed max-w-2xl">{children}</div>
        {actions && <div className="mt-4 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </div>
  );
}

export function Three({ items }) {
  return (
    <div className="mt-14 grid md:grid-cols-3 gap-10">
      {items.map(([h, p], i) => (
        <div key={h} className="border-t-4 border-[#5AB3C6] pt-5">
          <div className="text-sm font-semibold text-[#D4A574]">0{i + 1}</div>
          <h3 className="mt-1 text-xl font-semibold text-[#1A2B4A]">{h}</h3>
          <p className="mt-2 text-gray-600 leading-relaxed">{p}</p>
        </div>
      ))}
    </div>
  );
}
