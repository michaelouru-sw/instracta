import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function CTASection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Contact from ${form.name} - Instracta`,
          from_name: "Instracta Website",
          to: "michaelouru2@gmail.com",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D4A574]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5AB3C6]/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: CTA Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#5AB3C6] font-semibold">
              Let&apos;s Connect
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Ready to Transform
              <br />
              Your Learning?
            </h2>
            <p className="mt-6 text-gray-500 text-lg font-light leading-relaxed">
              Whether you&apos;re looking to modernize your training programs,
              integrate AI into your learning strategy, or scale your team —
              we&apos;re here to help.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Free consultation & needs assessment",
                "Custom solution roadmap",
                "Dedicated project team within 48 hours",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#5AB3C6]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5AB3C6]" />
                  </div>
                  <span className="text-gray-600 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="p-8 md:p-10 rounded-3xl bg-[#F7F8FA] border border-gray-100">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-gray-500 text-sm">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-full"
                    onClick={() => setStatus("idle")}
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : status === "error" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Oops! Something went wrong
                  </h3>
                  <p className="mt-2 text-gray-500 text-sm">
                    Please try again or email us directly at michaelouru2@gmail.com
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-full"
                    onClick={() => setStatus("idle")}
                  >
                    Try Again
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Full Name
                    </label>
                    <Input
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      className="rounded-xl border-gray-200 bg-white h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      className="rounded-xl border-gray-200 bg-white h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      How Can We Help?
                    </label>
                    <Textarea
                      placeholder="Tell us about your learning goals..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="rounded-xl border-gray-200 bg-white resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#1A2B4A] hover:bg-[#23385C] text-white h-12 rounded-xl transition-all duration-300 group"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Get in Touch
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}