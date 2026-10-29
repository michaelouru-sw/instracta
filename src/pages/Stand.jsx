import { Link } from "react-router-dom";
import { Page, PageHead, Three } from "@/components/site/parts";
import Leadership from "@/components/site/Leadership";

export default function Stand() {
  return (
    <Page>
      <PageHead tag="What we stand for" title="Learning should be open, measured and local." />
      <Three items={[
        ["Access", "Skills should not depend on who can pay. We offer free tiers where we can, and set targets to reach young women, learners with disabilities and displaced youth."],
        ["Evidence", "We measure what changes and share it. We report actual results, including where we fall short, and plan independent evaluation of our programmes."],
        ["Local", "Built in Kenya, with local partners, for African learners. Our team is based in Nairobi, and we design with the people who will use the learning."],
      ]} />
      <div className="mt-12 grid md:grid-cols-3 gap-10 text-sm">
        {[["access", "Read the paper on Access"], ["evidence", "Read the paper on Evidence"], ["local", "Read the paper on Local"]].map(([s, l]) => (
          <Link key={s} to={`/research/${s}`} className="text-[#1F5B6B] font-medium hover:underline">{l} →</Link>
        ))}
      </div>
      <Leadership />
    </Page>
  );
}
