import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/AuthContext";
import { generateOutline } from "@/lib/generateOutline";
import { createCourse, createModule, createLesson, listMyCourses } from "@/lib/courses";
import { getPlanLimits } from "@/lib/plans";

const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

export default function NewCourse() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("ai"); // ai | manual
  const [form, setForm] = useState({
    topic: "",
    audience: "",
    difficulty: "beginner",
    duration: 60,
  });
  const [outline, setOutline] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [generating, setGenerating] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (form.topic.trim().length < 10) {
      setError("Describe your topic in at least 10 characters.");
      return;
    }
    setError("");
    setGenerating(true);
    try {
      const modules = await generateOutline(form, profile);
      setOutline(modules);
      setExpanded(Object.fromEntries(modules.map((_, i) => [i, true])));
    } catch (err) {
      setError(err.message || "Course generation failed. Please try again or refine your topic.");
    } finally {
      setGenerating(false);
    }
  };

  const startBuilding = async (modules) => {
    setCreating(true);
    setError("");
    try {
      const limits = getPlanLimits(profile?.subscription);
      if (Number.isFinite(limits.courses)) {
        const existing = await listMyCourses(user.id);
        if (existing.length >= limits.courses) {
          setError("Free accounts are limited to 3 courses. Upgrade to Pro to create more.");
          setCreating(false);
          return;
        }
      }

      const course = await createCourse(user.id, {
        title: form.topic,
        description: `${form.difficulty} course on ${form.topic} for ${form.audience || "learners"}`,
        topic: form.topic,
        audience: form.audience,
        difficulty: form.difficulty,
        duration_minutes: Number(form.duration) || null,
        status: modules?.length ? "outline_ready" : "draft",
      });

      if (modules?.length) {
        for (let mi = 0; mi < modules.length; mi++) {
          const mod = await createModule(course.id, modules[mi].title, mi);
          for (let li = 0; li < (modules[mi].lessons || []).length; li++) {
            const lesson = modules[mi].lessons[li];
            await createLesson(mod.id, lesson.title, li, lesson.type || "standard");
          }
        }
      }

      navigate(`/course/${course.id}`);
    } catch (err) {
      setError(err.message || "Couldn't create the course. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Create a new course</h1>
        <p className="mt-2 text-sm text-gray-500">
          Describe your topic and let AI build the outline, or start from a blank course.
        </p>

        <div className="mt-6 inline-flex rounded-xl border border-gray-200 bg-white p-1">
          {["ai", "manual"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setOutline(null);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                mode === m ? "bg-[#1A2B4A] text-white" : "text-gray-500"
              }`}
            >
              {m === "ai" ? "AI Generated" : "Manual"}
            </button>
          ))}
        </div>

        {!outline ? (
          <form onSubmit={mode === "ai" ? handleGenerate : (e) => { e.preventDefault(); startBuilding([]); }} className="mt-8 space-y-5 bg-white rounded-2xl p-8 border border-gray-100">
            <div>
              <Label>Topic</Label>
              <Textarea
                required
                rows={3}
                placeholder="e.g. Onboarding new sales reps on our CRM workflow"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label>Audience</Label>
              <Input
                placeholder="e.g. New hires in their first 30 days"
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
                className="mt-1.5 h-11 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Difficulty</Label>
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                  className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm capitalize"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Estimated duration (min)</Label>
                <Input
                  type="number"
                  min={5}
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="mt-1.5 h-11 rounded-xl"
                />
              </div>
            </div>

            {error && <p className="text-sm text-[#dc2626]">{error}</p>}

            <Button
              type="submit"
              disabled={generating || creating}
              className="w-full h-12 rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white group"
            >
              {generating || creating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === "ai" ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" /> Generate Outline
                </>
              ) : (
                <>
                  Start Building
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-100">
            <h2 className="font-semibold text-gray-900">Review your outline</h2>
            <p className="text-sm text-gray-500 mt-1">Expand modules to see lessons. You can edit everything after building.</p>

            <div className="mt-5 space-y-3">
              {outline.map((mod, mi) => (
                <div key={mi} className="rounded-xl border border-gray-100">
                  <button
                    onClick={() => setExpanded({ ...expanded, [mi]: !expanded[mi] })}
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="font-medium text-gray-900 text-sm">{mod.title}</span>
                    {expanded[mi] ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {expanded[mi] && (
                    <ul className="px-4 pb-3 space-y-1.5">
                      {mod.lessons.map((lesson, li) => (
                        <li key={li} className="text-sm text-gray-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5AB3C6]" />
                          {lesson.title}
                          <span className="text-xs text-gray-300 capitalize">({lesson.type})</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {error && <p className="mt-4 text-sm text-[#dc2626]">{error}</p>}

            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="rounded-xl" onClick={() => setOutline(null)}>
                Back
              </Button>
              <Button
                disabled={creating}
                onClick={() => startBuilding(outline)}
                className="flex-1 h-12 rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white group"
              >
                {creating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Start Building
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
