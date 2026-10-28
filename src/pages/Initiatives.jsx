import { Link } from "react-router-dom";
import { Page, PageHead, Item, Btn } from "@/components/site/parts";

export default function Initiatives() {
  return (
    <Page>
      <PageHead tag="Initiatives" title="Work we do for learners, not clients." />
      <div className="mt-12">
        <Item title="Instracta Reach" chip="In preparation · pilot planned 2027" actions={<Btn to="/contact">Sponsor or partner</Btn>}>
          <p>Free AI and digital skills for young Kenyans. Sponsors fund seats. Universities and colleges deliver.</p>
          <p className="mt-3 text-sm font-medium text-[#1A2B4A]">Sponsors fund → Institutions teach → We report</p>
        </Item>
        <Item title="Research" chip="Ongoing"><p>Adaptive e-learning for Africa and the wider Global South.</p></Item>
        <Item title="Educator Skills" chip="Planned"><p>Short practical training for teachers, lecturers and trainers on online teaching and using AI well. Open to public and community institutions.</p></Item>
        <Item title="Community Service" chip="Planned" actions={<Btn to="/contact" ghost>Invite us</Btn>}>
          <p>We give time and skills back: free digital skills sessions and learning-technology support for schools, youth groups and community organisations near us in Nairobi.</p>
        </Item>
      </div>
      <div className="mt-10 rounded-2xl bg-[#F7F8FA] p-7 grid md:grid-cols-2 gap-6">
        <div><span className="text-xs uppercase tracking-[0.2em] text-[#5AB3C6] font-semibold">For funders</span><h3 className="mt-2 text-lg font-semibold text-[#1A2B4A]">What you receive</h3></div>
        <div className="text-sm text-gray-600 space-y-2">
          <ul className="list-disc pl-5 space-y-1"><li>Cohort reports on completion and skills gain</li><li>Independent evaluation, published</li><li>Safeguarding and data-protection policies before launch</li></ul>
          <p>Targets are plans, not results. We will report actuals. <Link to="/funders" className="font-semibold text-[#1A2B4A] underline">See governance and documents</Link></p>
        </div>
      </div>
    </Page>
  );
}
