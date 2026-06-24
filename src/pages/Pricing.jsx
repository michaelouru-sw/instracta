import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    cta: "Get Started Free",
    highlight: false,
    features: {
      Courses: "3",
      "Exports/day": "2",
      "Block types": "Core 15",
      "AI generations": "5/mo",
      Collaborators: "1",
      Analytics: "Basic",
      "Custom AI key": false,
      "Team seats": false,
      "Priority support": false,
      "White-label export": false,
    },
  },
  {
    name: "Pro",
    monthly: 29,
    annual: 24,
    cta: "Start Pro Trial",
    highlight: true,
    features: {
      Courses: "Unlimited",
      "Exports/day": "Unlimited",
      "Block types": "All 27",
      "AI generations": "50/mo",
      Collaborators: "5",
      Analytics: "Full",
      "Custom AI key": true,
      "Team seats": false,
      "Priority support": false,
      "White-label export": false,
    },
  },
  {
    name: "Enterprise",
    monthly: 99,
    annual: 82,
    perSeat: true,
    cta: "Contact Sales",
    highlight: false,
    features: {
      Courses: "Unlimited",
      "Exports/day": "Unlimited",
      "Block types": "All 27",
      "AI generations": "Unlimited",
      Collaborators: "Unlimited",
      Analytics: "Full + Export",
      "Custom AI key": true,
      "Team seats": true,
      "Priority support": true,
      "White-label export": true,
    },
  },
];

const FEATURE_ROWS = [
  "Courses",
  "Exports/day",
  "Block types",
  "AI generations",
  "Collaborators",
  "Analytics",
  "Custom AI key",
  "Team seats",
  "Priority support",
  "White-label export",
];

const FAQS = [
  {
    q: "Do I need a credit card to start for free?",
    a: "No. The Free plan is free forever and doesn't require a credit card. You can upgrade to Pro whenever you're ready.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade or downgrade at any time from your Account Settings. Changes take effect immediately, and billing is prorated.",
  },
  {
    q: "What happens to my courses if I downgrade?",
    a: "Your existing courses stay intact, but you won't be able to create new ones beyond your plan's limit until you upgrade again.",
  },
  {
    q: "What counts as an 'export'?",
    a: "Each time you generate a SCORM package or standalone HTML file counts as one export. Free accounts get 2 combined exports per day.",
  },
  {
    q: "Can I use my own OpenAI, Anthropic, or Gemini API key?",
    a: "Yes, on Pro and Enterprise plans you can connect your own AI provider key in Account Settings for unmetered generation costs.",
  },
  {
    q: "How does Enterprise seat pricing work?",
    a: "Enterprise is billed per seat per month. Your admin can add or remove team members at any time from the Team Seats page.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes. Pro plans come with a 30-day money-back guarantee, no questions asked.",
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes, reach out to our sales team via the Enterprise contact form below and we'll work out a custom quote.",
  },
];

function FeatureCell({ value }) {
  if (value === true) {
    return <Check className="w-4 h-4 text-[#16a34a] mx-auto" />;
  }
  if (value === false) {
    return <X className="w-4 h-4 text-gray-300 mx-auto" />;
  }
  return <span className="text-sm text-gray-700">{value}</span>;
}

function EnterpriseQuoteForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          subject: `Enterprise Quote Request from ${form.name} - Instracta`,
          from_name: "Instracta Pricing Page",
          to: "michaelouru2@gmail.com",
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", company: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Enterprise quote submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Request Sent!</h3>
        <p className="mt-2 text-gray-500 text-sm">
          Our sales team will reach out within 1 business day with a custom quote.
        </p>
        <Button variant="outline" className="mt-6 rounded-full" onClick={() => setStatus("idle")}>
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
          <Input
            placeholder="John Smith"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="rounded-xl border-gray-200 bg-white h-12"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Work Email</label>
          <Input
            type="email"
            placeholder="john@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="rounded-xl border-gray-200 bg-white h-12"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Company</label>
        <Input
          placeholder="Acme Corp"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
          className="rounded-xl border-gray-200 bg-white h-12"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">
          Team size & needs
        </label>
        <Textarea
          placeholder="Tell us how many seats you need and what you're looking to build..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
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
            Request Custom Quote
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
      {status === "error" && (
        <p className="text-sm text-[#dc2626] text-center">
          Something went wrong. Please try again or email michaelouru2@gmail.com directly.
        </p>
      )}
    </form>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-br from-[#1A2B4A] to-[#5AB3C6]">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.25em] text-[#5AB3C6] font-semibold"
          >
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Simple, honest pricing.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-white/70 text-lg font-light leading-relaxed"
          >
            Start free. Upgrade when your team is ready. No hidden fees, no long-term contracts.
          </motion.p>

          {/* Toggle */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? "text-white" : "text-white/50"}`}>
              Monthly
            </span>
            <Switch checked={annual} onCheckedChange={setAnnual} />
            <span className={`text-sm font-medium flex items-center gap-2 ${annual ? "text-white" : "text-white/50"}`}>
              Annual
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white">
                2 months free
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="relative -mt-10 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => {
              const price = annual ? plan.annual : plan.monthly;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-3xl p-8 border ${
                    plan.highlight
                      ? "bg-[#1A2B4A] border-[#1A2B4A] shadow-[0_8px_30px_rgba(0,0,0,.12)] md:-translate-y-3"
                      : "bg-white border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,.06)]"
                  }`}
                >
                  {plan.highlight && (
                    <span className="inline-block mb-4 text-xs uppercase tracking-[0.2em] font-semibold text-[#5AB3C6]">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`text-xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                      ${price}
                    </span>
                    <span className={`text-sm ${plan.highlight ? "text-white/50" : "text-gray-400"}`}>
                      /mo{plan.perSeat ? "/seat" : ""}
                    </span>
                  </div>
                  {annual && plan.monthly > 0 && (
                    <p className={`mt-1 text-xs ${plan.highlight ? "text-white/40" : "text-gray-400"}`}>
                      <span className="line-through">${plan.monthly}/mo</span> billed annually
                    </p>
                  )}

                  <Button
                    className={`mt-6 w-full rounded-xl h-12 ${
                      plan.highlight
                        ? "bg-[#5AB3C6] hover:bg-[#4a9fb1] text-white"
                        : "bg-[#1A2B4A] hover:bg-[#23385C] text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  <ul className="mt-8 space-y-3">
                    {FEATURE_ROWS.map((feature) => {
                      const value = plan.features[feature];
                      return (
                        <li key={feature} className="flex items-center justify-between gap-3 text-sm">
                          <span className={plan.highlight ? "text-white/60" : "text-gray-500"}>
                            {feature}
                          </span>
                          {value === true ? (
                            <Check className={`w-4 h-4 ${plan.highlight ? "text-[#5AB3C6]" : "text-[#16a34a]"}`} />
                          ) : value === false ? (
                            <X className={`w-4 h-4 ${plan.highlight ? "text-white/20" : "text-gray-300"}`} />
                          ) : (
                            <span className={`font-medium ${plan.highlight ? "text-white" : "text-gray-700"}`}>
                              {value}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Money-back guarantee badge */}
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="w-5 h-5 text-[#16a34a]" />
            30-day money-back guarantee on Pro plans
          </div>

          {/* Consulting escape hatch */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Need a fully custom, done-for-you solution instead of self-serve software?{" "}
            <a href="/#contact" className="text-[#1A2B4A] font-medium hover:underline">
              Talk to our consulting team →
            </a>
          </div>
        </div>
      </section>

      {/* Full comparison table (desktop) */}
      <section className="hidden lg:block pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F7F8FA]">
                  <th className="text-left font-semibold text-gray-500 px-6 py-4">Feature</th>
                  {PLANS.map((plan) => (
                    <th key={plan.name} className="text-center font-semibold text-gray-900 px-6 py-4">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_ROWS.map((row, idx) => (
                  <tr key={row} className={idx % 2 === 0 ? "bg-white" : "bg-[#F7F8FA]/50"}>
                    <td className="px-6 py-4 text-gray-600">{row}</td>
                    {PLANS.map((plan) => (
                      <td key={plan.name} className="px-6 py-4 text-center">
                        <FeatureCell value={plan.features[row]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#F7F8FA]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center tracking-tight">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-gray-200">
                <AccordionTrigger className="text-left text-gray-900 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Enterprise quote form */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#5AB3C6] font-semibold">
              Enterprise
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight">
              Need a custom quote?
            </h2>
            <p className="mt-3 text-gray-500">
              Tell us about your team and we'll put together an Enterprise plan that fits.
            </p>
          </div>
          <div className="p-8 md:p-10 rounded-3xl bg-[#F7F8FA] border border-gray-100">
            <EnterpriseQuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
