import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, Globe } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Technical Excellence",
    text: "Specializing in SCORM/xAPI-compliant development, Moodle administration, instructional video production, and LMS architecture.",
  },
  {
    icon: Target,
    title: "Project Management",
    text: "PMP®-certified leadership ensuring on-time, on-budget delivery using Agile methodologies for distributed teams.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    text: "Serving NGOs, universities, and enterprises across East Africa, Europe, and North America with culturally-adapted solutions.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 bg-[#F7F8FA] overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#5AB3C6]/5 blur-[150px] -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4A574] font-semibold">
              About Instracta
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              PMP®-Certified
              <br />
              <span className="text-[#5AB3C6]">eLearning Excellence</span>
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed text-lg font-light">
              Founded by Michael Ouru, PMP®-certified project manager with expertise at the intersection of computer science, strategic project management, and innovative eLearning (EdTech). Since 2021, we've successfully delivered 15 major projects and deployed LMS platforms reaching 510,000+ students and educators across NGOs, universities, and enterprises.
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Our portfolio includes projects with Oxfam Novib (DisasterReady.org deployment), KCA University (comprehensive LMS transformation), AfroCloud Technologies (enterprise-scale Moodle implementations), and numerous NGO and corporate clients across East Africa, Europe, and North America.
            </p>

            {/* Accent line */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-[#5AB3C6] to-[#D4A574]" />
              <span className="text-sm text-gray-400 font-medium">
                Defining the next era of corporate learning
              </span>
            </div>
          </motion.div>

          {/* Right: Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="flex gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#1A2B4A] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#5AB3C6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}