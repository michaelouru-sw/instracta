import { Page, PageHead } from "@/components/site/parts";
import ContactForm from "@/components/site/ContactForm";

export default function Contact() {
  return (
    <Page>
      <PageHead tag="Contact" title="Tell us what you are working on." />
      <p className="mt-4 text-gray-500">Eagle House, Ndemi Road, Kilimani, Nairobi · P.O. Box 55888-00100<br />michaelouru2@gmail.com · +254 715 440 817</p>
      <div className="mt-10 max-w-xl"><ContactForm /></div>
    </Page>
  );
}
