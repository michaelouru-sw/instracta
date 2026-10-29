import { useParams } from "react-router-dom";
import PaperBody from "@/components/site/PaperBody";
import { bySlug } from "@/content/papers";

// Standalone, chrome-free rendering used to generate the PDF editions.
export default function PaperPrint() {
  const { slug } = useParams();
  const p = bySlug(slug);
  if (!p) return null;
  return (
    <div className="paper-print" style={{ maxWidth: "none", padding: 0 }}>
      <div className="print-cover">
        <img src="/instracta-logo.png" alt="Instracta" style={{ height: 56 }} />
        <div className="print-cover-kicker">Instracta eLearning Solutions</div>
      </div>
      <PaperBody p={p} print />
    </div>
  );
}
