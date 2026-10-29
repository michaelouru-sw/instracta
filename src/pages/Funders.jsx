import { Fragment } from "react";
import { Page, PageHead, Btn } from "@/components/site/parts";

const DOCS = [
  [
    "Child and youth safeguarding policy",
    "Version 1.0",
    "https://drive.google.com/file/d/1V6hDR6_hIeKKM9LR2njFmKxXY_7CkAmQ/view"
  ],
  [
    "Data protection policy (Kenya Data Protection Act 2019)",
    "Version 1.0. ODPC registration in progress",
    "https://drive.google.com/file/d/1zhPbhCqcV2DjJWjZDH1HA7Nfj9DNbWAt/view"
  ],
  [
    "Conflict of interest policy",
    "Version 1.0",
    "https://drive.google.com/file/d/1mc_Z5MhoFAXQfjn_TK_NZipQDNZRZGUS/view"
  ],
  [
    "Anti-corruption, anti-money-laundering and counter-terrorist financing policy",
    "Version 1.0",
    "https://drive.google.com/file/d/1ZcHLMsbu9NegUhCpyP0nBsIpHzotKky_/view"
  ],
  [
    "Complaints and whistleblowing procedure",
    "Version 1.0",
    "https://drive.google.com/file/d/1z5E4vmEeYLw7MPpPP-g9gWfOMlI5m0yb/view"
  ],
  [
    "Evaluation design for Reach",
    "Version 1.0. Evaluator to be appointed",
    "https://drive.google.com/file/d/17pdfp4uCQnWNF8dbnbRzOEYQ4iPS6Fe8/view"
  ],
  [
    "All six policies in one pack",
    "Version 1.0",
    "https://drive.google.com/file/d/1ToC-4Z2_CczUPM1codWqKUac4IG6Ds0G/view"
  ]
];

const MAIL = "michaelouru2@gmail.com";
const req = (what) => `mailto:${MAIL}?subject=${encodeURIComponent("Request: " + what)}`;

function KV({ rows }) {
  return (
    <dl className="mt-4 grid grid-cols-[150px_1fr] gap-x-6 gap-y-3 text-sm">
      {rows.map(([k, v]) => (<Fragment key={k}><dt className="text-gray-500">{k}</dt><dd className="text-[#1A2B4A]">{v}</dd></Fragment>))}
    </dl>
  );
}
const H = ({ children }) => <h2 className="mt-14 text-2xl font-semibold text-[#1A2B4A]">{children}</h2>;

export default function Funders() {
  return (
    <Page>
      <PageHead tag="For funders" title="Everything you need to check us." lead="Documents, people and results, in one place. Gaps are marked." />
      <H>Who we are</H>
      <KV rows={[
        ["Legal name", "Instracta eLearning Solutions"],
        ["Registration", "Business name BN-6ASR3RYZ. Active. Registered 4 February 2026."],
        ["Business", "eLearning consulting services"],
        ["Address", "Eagle House, Ndemi Road, Kilimani, Nairobi. P.O. Box 55888-00100, Nairobi"],
        ["Contact", MAIL + " · +254 715 440 817"],
        ["Structure", "Registered business name today. A company and a not-for-profit or fiscal sponsor are planned before the pilot."],
      ]} />
      <H>People</H>
      <KV rows={[
        ["Advisory board", "A Kenyan advisory board will be appointed before the pilot."],
      ]} />
      <H>Documents</H>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-[#1A2B4A] text-white text-left"><th className="p-3">Document</th><th className="p-3">Status</th><th className="p-3">Updated</th><th className="p-3">PDF</th></tr></thead>
          <tbody>
            {DOCS.map(([d, s, u]) => (
              <tr key={d} className="border-b border-gray-200 even:bg-[#F5F8FB]"><td className="p-3">{d}</td><td className="p-3">{s}</td><td className="p-3 whitespace-nowrap">Oct 2026</td>
                <td className="p-3"><a className="font-medium text-[#1A2B4A] underline" href={u} target="_blank" rel="noopener noreferrer">Open</a></td></tr>
            ))}
            {[["Financial statements"], ["Registration certificate"]].map(([d]) => (
              <tr key={d} className="border-b border-gray-200 even:bg-[#F5F8FB]"><td className="p-3">{d}</td><td className="p-3">Available on request</td><td className="p-3">·</td>
                <td className="p-3"><a className="font-medium text-[#1A2B4A] underline" href={req(d.toLowerCase())}>Request</a></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <H>Results to date</H>
      <p className="mt-3 text-gray-600 max-w-xl">Reach has not started. The first cohort report will be published here after the pilot begins in April 2027.</p>
      <H>Funding</H>
      <p className="mt-3 text-gray-600 max-w-xl">Funders and amounts will be listed here, with the purpose of each grant.</p>
      <div className="mt-8"><Btn to="/contact">Contact us</Btn></div>
    </Page>
  );
}
