import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-20 md:pt-24 flex items-center justify-center overflow-hidden bg-[#1A2B4A]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#5AB3C6]/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#D4A574]/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[#5AB3C6]/10 blur-[80px]"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#D4A574]" />
            <span className="text-sm text-white/70 tracking-wide">
              The Future of eLearning
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          <span className="text-white">Trackable</span>
          <br />
          <span className="bg-gradient-to-r from-[#5AB3C6] via-[#7BC4D4] to-[#D4A574] bg-clip-text text-transparent">
            Learning Journeys
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          We transform static training into living learning ecosystems
          that drive performance, accountability, and lasting impact — 
          built to endure for the next 50 years.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("#contact")}
            className="bg-[#5AB3C6] hover:bg-[#4A9FB0] text-white px-8 py-6 text-base rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(90,179,198,0.4)] group"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("#additional-services")}
            className="border-white/15 text-white/80 hover:text-white hover:bg-white/5 px-8 py-6 text-base rounded-full bg-transparent"
          >
            Explore Services
          </Button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="m-24 pt-10 border-t border-white/5"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/25 mb-6">
            Trusted by industry leaders worldwide
          </p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
            {["Fortune 500", "Global NGOs", "Gov Agencies", "EdTech Leaders"].map(
              (name, i) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="text-sm text-white/20 font-medium tracking-wide"
                >
                  {name}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
