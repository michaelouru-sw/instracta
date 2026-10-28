import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Page, Btn } from "@/components/site/parts";
import Leadership from "@/components/site/Leadership";

const DOORS = [
  ["What we stand for", "Access, evidence, local ownership", "The three commitments behind our work.", "/stand"],
  ["Initiatives", "Free skills for young people", "Instracta Reach, educator skills, community service and research.", "/initiatives"],
  ["Products", "Tools to build, run and track learning", "Course builder, learning platform, Retain and Moodle tools.", "/products"],
];

export default function Home() {
  return (
    <Page>
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1A2B4A] leading-[1.08]">Learning that shows its results.</h1>
          <p className="mt-6 text-xl text-gray-500 leading-relaxed">We build learning programmes and tools that track what changes.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/initiatives">See our initiatives</Btn>
            <Btn to="/products" ghost>See our products</Btn>
          </div>
        </div>
        <figure className="relative m-0">
          <img src="/img/learner-standing.jpg" alt="A learner standing beside computers in a training room" width="1600" height="1247" className="w-full aspect-[4/3] object-cover rounded-3xl" />
          <span className="absolute left-4 bottom-4 bg-white rounded-xl px-2.5 py-2 shadow-md">
            <img src="/instracta-logo.png" alt="Instracta" className="h-7 w-auto" />
          </span>
        </figure>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 md:gap-5">
        {[
          ["/img/group.jpg", "Learners and a facilitator in a shared workspace"],
          ["/img/peer-learning.jpg", "Two learners working together at a laptop"],
          ["/img/hands-on.jpg", "A learner practising on a laptop in a community venue"],
        ].map(([src, alt]) => (
          <img key={src} src={src} alt={alt} loading="lazy" width="1066" height="1600" className="w-full aspect-[4/5] object-cover rounded-2xl" />
        ))}
      </div>
      <div className="mt-20 grid md:grid-cols-3 gap-6">
        {DOORS.map(([tag, h, p, to]) => (
          <Link key={to} to={to} className="group block rounded-2xl border border-gray-200 p-7 hover:border-[#5AB3C6] hover:shadow-sm transition">
            <span className="text-xs uppercase tracking-[0.2em] text-[#5AB3C6] font-semibold">{tag}</span>
            <h3 className="mt-3 text-xl font-semibold text-[#1A2B4A]">{h}</h3>
            <p className="mt-2 text-gray-500 text-sm leading-relaxed">{p}</p>
            <span className="mt-5 inline-flex items-center text-sm font-medium text-[#1A2B4A]">Read more <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
        ))}
      </div>
      <Leadership />
      <p className="mt-14 text-sm text-gray-500">Past clients include Oxfam Novib, UNICEF, UNESCO, ILO and KCA University.</p>
    </Page>
  );
}
