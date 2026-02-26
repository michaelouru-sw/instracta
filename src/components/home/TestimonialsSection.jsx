import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The team's ability to transform our live webinars into a comprehensive eLearning module was exceptional. Their project management expertise ensured seamless coordination with our SMEs and on-time delivery to DisasterReady.org. The quality exceeded our expectations.",
    name: "PM",
    role: "Program Manager",
    department: "Digital Influencing Initiative",
    company: "Oxfam Novib",
    gradient: "from-[#5AB3C6] to-[#4A9FB0]",
  },
  {
    quote: "Leading our LMS and media services transformation required not just technical skills but strategic vision. The instructional design methodology and capacity building for our faculty has elevated our entire online learning program. Truly transformational work.",
    name: "DL",
    role: "Director of Digital Learning",
    department: "Academic Technology",
    company: "KCA University",
    gradient: "from-[#D4A574] to-[#C49565]",
  },
  {
    quote: "Deploying Moodle for 10,000+ users across multiple regions is no small feat. The technical expertise, Agile approach, and ability to manage distributed teams made this project a success. 1,500+ modules delivered with consistent quality.",
    name: "CT",
    role: "CTO",
    department: "Technology Leadership",
    company: "AfroCloud Technologies",
    gradient: "from-[#5AB3C6] to-[#D4A574]",
  },
  {
    quote: "What sets this team apart is the combination of PMP certification, deep technical knowledge, and understanding of instructional design. They don't just build courses—they architect learning experiences that work across cultures and continents.",
    name: "LH",
    role: "Learning & Development Head",
    department: "Global HR Operations",
    company: "International NGO",
    gradient: "from-[#4A9FB0] to-[#5AB3C6]",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 bg-[#F7F8FA] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A574]/10 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#5AB3C6] font-semibold">
            Client Testimonials
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Trusted by Organizations <span className="text-[#5AB3C6]">Worldwide</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            From humanitarian organizations to universities and tech companies, our clients value
            our expertise in delivering impactful eLearning solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className={`absolute top-0 left-0 w-2 h-full rounded-l-2xl bg-gradient-to-b ${testimonial.gradient}`}
              />
              <Quote className="w-10 h-10 text-gray-200 mb-4" />
              <p className="text-gray-600 leading-relaxed mb-6 italic">{testimonial.quote}</p>
              <div>
                <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
                <div className="text-xs text-gray-400 mt-1">{testimonial.department}</div>
                <div
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${testimonial.gradient} text-white`}
                >
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}