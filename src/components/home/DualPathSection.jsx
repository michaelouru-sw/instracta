import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const paths = [
  {
    icon: Sparkles,
    eyebrow: "Do it yourself",
    title: "Build it yourself with AI",
    description:
      "Describe your topic and our AI builds a complete course outline in seconds. Add your own content, export SCORM or HTML, and publish — no developer or designer needed.",
    bullets: ["Free to start, no credit card", "AI-generated outlines in under 30 seconds", "Export to any LMS"],
    cta: "Start Building Free",
    action: "/signup",
    accent: "from-[#1A2B4A] to-[#5AB3C6]",
  },
  {
    icon: Users2,
    eyebrow: "Done for you",
    title: "Let our team build it for you",
    description:
      "Our PMP®-certified instructional designers and LMS consultants handle everything — strategy, content development, LMS deployment, and training of trainers — for organizations that want an expert team in the driver's seat.",
    bullets: ["Dedicated instructional designers", "LMS consulting & deployment", "15+ major projects delivered globally"],
    cta: "Talk to Our Team",
    action: "#contact",
    accent: "from-[#1A2B4A] to-[#D4A574]",
  },
];

export default function DualPathSection() {
  const navigate = useNavigate();

  const handleClick = (action) => {
    if (action.startsWith("#")) {
      const el = document.querySelector(action);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(action);
    }
  };

  return (
    <section id="software" className="relative py-28 bg-[#F7F8FA] overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#5AB3C6] font-semibold">
            Two Ways to Work With Us
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Software you run yourself.
            <br />
            Services we run for you.
          </h2>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Instracta is both an AI-powered course-authoring platform and an expert eLearning
            consultancy. Pick the path that fits how you want to work — or use both.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,.12)] transition-shadow duration-500"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.accent} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4A574] font-semibold">
                  {path.eyebrow}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">{path.title}</h3>
                <p className="mt-4 text-gray-500 leading-relaxed">{path.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {path.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5AB3C6] shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleClick(path.action)}
                  className="mt-8 w-full h-12 rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white group"
                >
                  {path.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Not sure which fits?{" "}
          <button
            onClick={() => handleClick("#contact")}
            className="text-[#1A2B4A] font-medium hover:underline"
          >
            Talk to us
          </button>{" "}
          and we'll point you the right way.
        </p>
      </div>
    </section>
  );
}
