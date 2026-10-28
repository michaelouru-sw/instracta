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
      <Leadership />
    </Page>
  );
}
