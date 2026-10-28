import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TOPICS = [
  "Sponsoring or partnering on Reach",
  "Instracta Builder",
  "Instracta LMS",
  "Instracta Retain",
  "Learning services",
  "Something else",
];

// Same Web3Forms integration as before (VITE_WEB3FORMS_KEY), with topic and organisation added.
export default function ContactForm({ defaultTopic = TOPICS[0] }) {
  const [form, setForm] = useState({ name: "", email: "", org: "", topic: defaultTopic, message: "" });
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: form.name,
          email: form.email,
          organisation: form.org,
          topic: form.topic,
          message: form.message,
          subject: `New contact from ${form.name} (${form.topic}) - Instracta`,
          from_name: "Instracta Website",
          to: "michaelouru2@gmail.com",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
      if (data.success) setForm({ name: "", email: "", org: "", topic: defaultTopic, message: "" });
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  if (status === "sent")
    return (
      <div className="p-8 rounded-2xl bg-[#F7F8FA] border border-gray-100 text-center" role="status">
        <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
        <h3 className="mt-3 text-xl font-semibold text-[#1A2B4A]">Message sent</h3>
        <p className="mt-1 text-sm text-gray-500">We will reply within 5 working days.</p>
        <Button variant="outline" className="mt-5 rounded-full" onClick={() => setStatus("idle")}>Send another</Button>
      </div>
    );

  const label = "text-sm font-medium text-gray-700 mb-1.5 block";
  return (
    <form onSubmit={submit} className="p-6 md:p-8 rounded-2xl bg-[#F7F8FA] border border-gray-100 space-y-5">
      <div><label className={label} htmlFor="cf-name">Name</label>
        <Input id="cf-name" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 rounded-xl bg-white" /></div>
      <div><label className={label} htmlFor="cf-email">Email</label>
        <Input id="cf-email" type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 rounded-xl bg-white" /></div>
      <div><label className={label} htmlFor="cf-org">Organisation</label>
        <Input id="cf-org" autoComplete="organization" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} className="h-12 rounded-xl bg-white" /></div>
      <div><label className={label} htmlFor="cf-topic">I am interested in</label>
        <select id="cf-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full h-12 rounded-xl border border-input bg-white px-3 text-sm">
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select></div>
      <div><label className={label} htmlFor="cf-msg">Message</label>
        <Textarea id="cf-msg" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-xl bg-white resize-none" /></div>
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">Something went wrong. Please try again or email michaelouru2@gmail.com.</p>
      )}
      <Button type="submit" disabled={status === "sending"} className="w-full h-12 rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white">
        {status === "sending" ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>) : "Send"}
      </Button>
    </form>
  );
}
