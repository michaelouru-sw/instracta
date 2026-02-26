import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, TrendingUp, Users, FileCheck } from "lucide-react";

const caseStudies = [
  {
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    client: "Oxfam Novib",
    location: "Netherlands (Global Impact)",
    duration: "7 months",
    budget: "$58,000",
    title: "Digital Influencing eLearning Module",
    tags: ["Humanitarian", "SCORM", "Instructional Design", "SME Coordination"],
    challenge: "Transform live digital influencing webinars into a comprehensive, self-paced eLearning module accessible to humanitarian organizations worldwide.",
    solution: "Led end-to-end instructional design and development, coordinating SMEs and cross-functional teams to create an engaging, fully-fledged eLearning experience deployed on DisasterReady.org.",
    results: [
      { icon: TrendingUp, label: "Improved Compliance", value: "10%" },
      { icon: Users, label: "Humanitarian Reach", value: "Global" },
      { icon: Clock, label: "Project Delivery", value: "On-Time" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    client: "Ministry of Education, Eswatini & UNICEF",
    location: "Eswatini (National Impact)",
    duration: "18 months",
    budget: "$420,000",
    title: "National E-Learning Platform Development",
    tags: ["Government", "LMS", "600+ Courses", "Multimedia", "Accessibility"],
    challenge: "Develop a comprehensive Learning Management System and 600+ interactive courses to enhance learning accessibility for students with varying literacy levels and connectivity conditions across Eswatini.",
    solution: "Led end-to-end project management in collaboration with Ministry of Education and UNICEF, overseeing stakeholder coordination, content development, technology implementation, and quality assurance. Integrated engaging multimedia, gamification, and adaptive learning techniques optimized for low to middle literacy levels with seamless device and connectivity access.",
    results: [
      { icon: Users, label: "Students Reached", value: "500,000+" },
      { icon: Users, label: "Educators Trained", value: "10,000+" },
      { icon: FileCheck, label: "Courses Developed", value: "600+" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    client: "AfroCloud Technologies",
    location: "United States (Multi-Regional)",
    duration: "2 years",
    budget: "$385,000",
    title: "Enterprise LMS Deployment",
    tags: ["Moodle", "AWS", "Azure", "SCORM/xAPI", "Agile"],
    challenge: "Deploy scalable, cloud-based learning management systems for multiple clients with 10,000+ users while ensuring accessibility and high performance.",
    solution: "Architected and deployed Moodle & Learning Passport LMS platforms on AWS & Azure infrastructure. Led distributed teams across time zones using Agile methodologies.",
    results: [
      { icon: Users, label: "Active Users", value: "10,000+" },
      { icon: TrendingUp, label: "Platform Uptime", value: "99.9%" },
      { icon: FileCheck, label: "Client Retention", value: "100%" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    client: "KCA University",
    location: "Kenya",
    duration: "Ongoing",
    budget: "$95,000",
    title: "LMS & Media Services Transformation",
    tags: ["Higher Education", "Moodle", "Capacity Building", "Video Production"],
    challenge: "Modernize university's online learning infrastructure, improve content quality, and build capacity for faculty to create engaging multimedia learning materials.",
    solution: "Leading complete overhaul of LMS operations and media production. Implementing instructional design best practices, training faculty on multimedia content creation, and ensuring seamless integration of all learning assets.",
    results: [
      { icon: TrendingUp, label: "LMS Accessibility", value: "100%" },
      { icon: Users, label: "Training Program", value: "Faculty" },
      { icon: FileCheck, label: "Learning Experience", value: "Enhanced" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    client: "Multiple NGO & Corporate Clients",
    location: "East Africa & Global",
    duration: "2+ years",
    budget: "$180,000+",
    title: "Custom eLearning Solutions",
    tags: ["Custom Development", "NGO", "Corporate Training", "ToT Programs"],
    challenge: "Deliver tailored eLearning solutions for diverse organizations including NGOs, corporations, and government entities across multiple sectors and regions.",
    solution: "Founded The Filament Foundry to provide end-to-end eLearning services including instructional design, LMS consulting, custom content development, and training of trainers programs using PMP-certified project management methodologies.",
    results: [
      { icon: FileCheck, label: "Projects Delivered", value: "15" },
      { icon: TrendingUp, label: "Client Satisfaction", value: "98%" },
      { icon: Users, label: "Continents Served", value: "3" },
    ],
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="projects" className="relative py-20 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5AB3C6]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4A574] font-semibold">
            Proven Track Record
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Real Projects, <span className="text-[#5AB3C6]">Real Results</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            From humanitarian organizations to universities and enterprises, we've delivered
            impactful eLearning solutions that drive measurable outcomes.
          </p>
        </motion.div>

        <div className="space-y-20">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              {/* Image */}
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B4A]/80 via-[#1A2B4A]/40 to-transparent" />
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#5AB3C6]" />
                    {study.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D4A574]" />
                    {study.duration}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-2">{study.client}</h3>
                <h4 className="text-xl text-gray-700 mb-4">{study.title}</h4>

                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">{study.budget}</span>
                  <span className="text-sm text-gray-500">Project Budget</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-1">Challenge</h5>
                    <p className="text-sm text-gray-600">{study.challenge}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-1">Solution</h5>
                    <p className="text-sm text-gray-600">{study.solution}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">Results & Impact</h5>
                  <div className="grid grid-cols-3 gap-4">
                    {study.results.map((result) => {
                      const Icon = result.icon;
                      return (
                        <div key={result.label} className="text-center">
                          <div className="w-10 h-10 rounded-xl bg-[#5AB3C6]/10 flex items-center justify-center mx-auto mb-2">
                            <Icon className="w-5 h-5 text-[#5AB3C6]" />
                          </div>
                          <div className="text-lg font-bold text-gray-900">{result.value}</div>
                          <div className="text-xs text-gray-500">{result.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}