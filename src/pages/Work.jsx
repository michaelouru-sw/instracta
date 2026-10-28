import { Page, PageHead, Three, Btn } from "@/components/site/parts";

export default function Work() {
  return (
    <Page>
      <PageHead tag="Work with us" title="Need a team instead of a tool?" lead="We design and build learning for organisations." />
      <Three items={[
        ["Course design", "SCORM and xAPI courses, video and interactive modules."],
        ["Moodle and LMS", "Selection, set-up, migration and training."],
        ["Training of trainers", "Facilitation and virtual delivery skills."],
      ]} />
      <div className="mt-12"><Btn to="/contact">Talk to us</Btn></div>
    </Page>
  );
}
