import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  PenTool,
  Cpu,
  Layers,
  Users,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Instructional Design & Content Development",
    description:
      "Expert instructional designers create engaging, learner-centered educational content. SCORM-compliant eLearning courses, interactive modules, video-based learning, and comprehensive curriculum development.",
    features: ["Custom Course Development", "SCORM/xAPI Compliance", "Interactive Assessments", "Multimedia Production"],
    accent: "from-[#5AB3C6] to-[#4A9FB0]",
    glow: "bg-[#5AB3C6]/10",
  },
  {
    icon: Layers,
    title: "LMS Consulting & Implementation",
    description:
      "Complete learning management system services including Moodle, Canvas, Blackboard, Cornerstone, and custom LMS solutions. Expert guidance from selection through deployment and ongoing optimization.",
    features: ["Platform Selection & Setup", "LMS Migration", "Integration Services", "User Training & Support"],
    accent: "from-[#D4A574] to-[#C49563]",
    glow: "bg-[#D4A574]/10",
  },
  {
    icon: Cpu,
    title: "eLearning Project Management",
    description:
      "Professional project management for online training initiatives, virtual learning programs, and digital course development. Agile methodologies ensure on-time, on-budget delivery.",
    features: ["Agile Project Delivery", "Vendor Management", "Quality Assurance", "Stakeholder Reporting"],
    accent: "from-[#5AB3C6] to-[#D4A574]",
    glow: "bg-[#5AB3C6]/10",
  },
  {
    icon: Users,
    title: "Training of Trainers (ToT) Programs",
    description:
      "Comprehensive train-the-trainer programs that empower your team to deliver effective instruction. Includes facilitation skills, adult learning principles, virtual training delivery, and coaching.",
    features: ["Facilitator Training", "Virtual Training Skills", "Coaching & Mentoring", "Train-the-Trainer Certification"],
    accent: "from-[#1A2B4A] to-[#23385C]",
    glow: "bg-[#1A2B4A]/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#5AB3C6] font-semibold">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Core eLearning & Training Services
          </h2>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Professional instructional design services, LMS consulting, custom eLearning development, and training of trainers programs. We deliver SCORM-compliant courses, virtual training, and complete learning solutions.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative p-8 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-xl transition-all duration-500 cursor-default"
              >
                {/* Glow on hover */}
                <div
                  className={`absolute inset-0 ${service.glow} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`}
                />

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-[#5AB3C6] transition-colors duration-300">
                  <span>Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}