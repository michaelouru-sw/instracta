import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    setMobileOpen(false);
    // For hash links, scroll to section
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
            : "bg-white/10 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c583cd6b465700f40ad97/e89c8f1da_Copilot_20260203_095333-removebg-preview-removebg-preview-removebg-preview.png"
              alt="Instracta"
              className="h-10 w-auto"
            />
            <span
              className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Instracta
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-500 hover:text-gray-900"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#contact")}
              className={`text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-[#1A2B4A] text-white hover:bg-[#23385C]"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className={scrolled ? "text-gray-900" : "text-white"} />
            ) : (
              <Menu className={scrolled ? "text-gray-900" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left text-gray-700 text-sm font-medium py-2"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="w-full bg-[#1A2B4A] text-white text-sm font-medium py-3 rounded-xl mt-2"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#1A2B4A] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-white/10 rounded-lg px-2 py-1">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c583cd6b465700f40ad97/e89c8f1da_Copilot_20260203_095333-removebg-preview-removebg-preview-removebg-preview.png"
                    alt="Instracta"
                    className="h-9 w-auto"
                  />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Instracta
                </span>
              </div>
              <p className="text-white/35 text-sm leading-relaxed max-w-sm">
                Trackable Learning Journeys. Transforming static training into
                living learning ecosystems that drive performance and
                accountability.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/25 font-semibold mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  "Custom eLearning",
                  "Instructional Design",
                  "AI Generation",
                  "LMS Integration",
                ].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/25 font-semibold mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {["About Us", "Careers", "Blog", "Contact"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              © 2026 Instracta. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <span
                  key={item}
                  className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}