import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  Smartphone,
  Gamepad2,
  BarChart3,
  Accessibility,
  Palette,
  Award,
  CheckCircle,
  Globe2,
  Lightbulb,
} from "lucide-react";

const additionalServices = [
  {
    icon: Video,
    title: "Virtual Instructor-Led Training (VILT)",
    description: "Live online training programs with expert facilitators, interactive sessions, and measurable results.",
  },
  {
    icon: Smartphone,
    title: "Mobile Learning Solutions",
    description: "Responsive, mobile-first eLearning content optimized for learning on-the-go across all devices.",
  },
  {
    icon: Gamepad2,
    title: "Gamification & Microlearning",
    description: "Engaging bite-sized learning experiences with game mechanics to boost motivation and retention.",
  },
  {
    icon: BarChart3,
    title: "Learning Analytics & Reporting",
    description: "Data-driven insights to measure learning effectiveness, track ROI, and optimize training programs.",
  },
  {
    icon: Accessibility,
    title: "Accessibility & WCAG Compliance",
    description: "ADA and WCAG 2.1 compliant eLearning ensuring inclusive learning experiences for all users.",
  },
  {
    icon: Palette,
    title: "Learning Experience Design (LXD)",
    description: "User-centered design approach creating memorable, impactful learning journeys.",
  },
  {
    icon: Award,
    title: "Corporate Training Solutions",
    description: "Employee onboarding, compliance training, skills development, and leadership programs.",
  },
  {
    icon: CheckCircle,
    title: "Certification & Assessment Programs",
    description: "Professional certification courses, competency-based assessments, and digital badging systems.",
  },
  {
    icon: Globe2,
    title: "Localization & Translation",
    description: "Multi-language eLearning content with cultural adaptation for global training initiatives.",
  },
  {
    icon: Lightbulb,
    title: "Learning Strategy Consulting",
    description: "Comprehensive learning needs analysis, strategy development, and digital transformation roadmaps.",
  },
];

export default function AdditionalServicesSection() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5AB3C6]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4A574] font-semibold">
            Complete eLearning Services
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Full-Spectrum Training &<br />
            <span className="text-[#5AB3C6]">Development Solutions</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            From course creation to delivery and analytics, we provide everything you need for
            successful online learning programs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-xl bg-[#F7F8FA] border border-gray-100 hover:border-[#5AB3C6]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A2B4A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#5AB3C6]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Expertise Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#1A2B4A] to-[#23385C]"
        >
          <h3 className="text-center text-white text-lg font-semibold mb-6">
            Industry-Leading eLearning Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "SCORM Development",
              "xAPI/Tin Can API",
              "Articulate Storyline",
              "Adobe Captivate",
              "Rise 360",
              "Lectora",
              "H5P Interactive Content",
              "Video-Based Learning",
              "Scenario-Based Training",
              "Blended Learning",
              "Employee Training Programs",
              "Compliance Training",
              "Leadership Development",
              "Sales Enablement",
              "Customer Education",
              "Competency-Based Training",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}