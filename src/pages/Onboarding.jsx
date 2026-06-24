import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

const ROLES = ["Instructional Designer", "HR Professional", "Educator", "Developer", "Other"];
const USE_CASES = ["Employee training", "Academic courses", "Customer education", "Other"];

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState("");
  const [useCase, setUseCase] = useState("");
  const [saving, setSaving] = useState(false);

  const finish = async (goTo) => {
    setSaving(true);
    try {
      await supabase
        .from("profiles")
        .update({ persona, use_case: useCase, onboarded: true })
        .eq("id", user.id);
    } finally {
      navigate(goTo);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A2B4A] to-[#5AB3C6] px-6 py-32">
      <div className="w-full max-w-lg bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,.12)]">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-[#1A2B4A]" : "bg-gray-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-xl font-bold text-gray-900">What's your role?</h1>
              <div className="mt-6 grid grid-cols-1 gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setPersona(role);
                      setStep(2);
                    }}
                    className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                      persona === role
                        ? "border-[#1A2B4A] bg-[#1A2B4A]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-xl font-bold text-gray-900">What will you build?</h1>
              <div className="mt-6 grid grid-cols-1 gap-2">
                {USE_CASES.map((uc) => (
                  <button
                    key={uc}
                    onClick={() => {
                      setUseCase(uc);
                      setStep(3);
                    }}
                    className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                      useCase === uc
                        ? "border-[#1A2B4A] bg-[#1A2B4A]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {uc}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-xl font-bold text-gray-900">Ready to start?</h1>
              <p className="mt-2 text-sm text-gray-500">
                Jump straight into building your first AI-generated course, or explore the dashboard first.
              </p>
              <div className="mt-6 space-y-3">
                <Button
                  disabled={saving}
                  onClick={() => finish("/new-course")}
                  className="w-full h-12 rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white group"
                >
                  Create my first course
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  disabled={saving}
                  variant="outline"
                  onClick={() => finish("/dashboard")}
                  className="w-full h-12 rounded-xl"
                >
                  Explore the dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
