import { Link } from "react-router-dom";
import { Page, PageHead, Item, Btn } from "@/components/site/parts";

export default function Products() {
  return (
    <Page>
      <PageHead tag="Products" title="Tools to build, run and track learning." />
      <div className="mt-12">
        <Item title="Instracta Builder" chip="Free plan available" actions={<><Btn to="/signup">Try the builder</Btn><Btn to="/pricing" ghost>See pricing</Btn></>}>
          Create courses with AI. Export to SCORM or HTML. For teachers and trainers who need a first draft fast and then edit it themselves.
        </Item>
        <Item title="Instracta LMS" chip="In preparation" actions={<Btn to="/contact" ghost>Ask about the LMS</Btn>}>
          A ready-to-use learning management system for schools, colleges and training providers. Built on Moodle, set up with Instracta Theme, and supported by our team. Courses made in Instracta Builder load straight in.
        </Item>
        <Item title="Instracta Retain" chip="In development">Flags students at risk of dropping out, inside Moodle. Shows staff who needs support early, so they can reach out in time.</Item>
        <Item title="Instracta Theme" chip="Open source" actions={<Btn href="https://github.com/michaelouru-sw/instracta_moodle_theme" ghost>Download free on GitHub</Btn>}>A clean, accessible theme for Moodle 5. Free to use and adapt.</Item>
        <Item title="Instracta Access" chip="Moodle plugin · Planned" actions={<Btn to="/contact" ghost>Ask about Access</Btn>}>
          Accessibility for every learner in Moodle. A toolbar for text size, spacing, contrast and dyslexia-friendly fonts. Voice navigation and screen-reader support. Captions and transcripts for media. A checker that flags accessibility gaps in courses before they go live.
        </Item>
        <Item title="Instracta Nudge" chip="Moodle plugin · In development">Sends timely, friendly reminders to learners who are falling behind, based on activity in the course.</Item>
        <Item title="Instracta Audit" chip="Moodle plugin">A dashboard that checks courses against a quality checklist, so gaps are found and fixed before learners see them.</Item>
        <Item title="Instracta Marks" chip="Moodle plugin">Lets students report missing marks and lets staff track each case to a result.</Item>
      </div>
      <p className="mt-8 text-sm text-gray-600">Where we can, we publish our tools as open source. Each product shows its status. <Link to="/contact" className="font-semibold text-[#1A2B4A] underline">Ask us about access</Link></p>
    </Page>
  );
}
