import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileCode,
  Loader2,
  Plus,
  X,
  Eye,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/AuthContext";
import {
  getCourse,
  updateCourse,
  createModule,
  updateModule,
  deleteModule,
  createLesson,
  updateLesson,
  deleteLesson,
  logExport,
  countExportsToday,
} from "@/lib/courses";
import { downloadCourseHtml } from "@/lib/exportHtml";
import { downloadCourseScorm } from "@/lib/exportScorm";
import { getPlanLimits } from "@/lib/plans";
import OutlineSidebar from "@/components/builder/OutlineSidebar";
import BlockCanvas from "@/components/builder/BlockCanvas";
import CollaboratorsPanel from "@/components/builder/CollaboratorsPanel";

function HomeEditor({ course, onUpdate }) {
  const [objective, setObjective] = useState("");

  const addObjective = () => {
    if (!objective.trim()) return;
    onUpdate({ objectives: [...(course.objectives || []), objective.trim()] });
    setObjective("");
  };

  const removeObjective = (i) => {
    onUpdate({ objectives: course.objectives.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Title</label>
        <Input
          value={course.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1.5 text-xl font-bold h-12 rounded-xl"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Description</label>
        <Textarea
          value={course.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={3}
          className="mt-1.5 rounded-xl"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Learning objectives
        </label>
        <ul className="mt-2 space-y-2">
          {(course.objectives || []).map((obj, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5AB3C6] shrink-0" />
              <span className="flex-1 text-sm text-gray-700">{obj}</span>
              <button onClick={() => removeObjective(i)} className="text-gray-300 hover:text-[#dc2626]">
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Add a learning objective..."
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addObjective())}
            className="rounded-xl"
          />
          <Button variant="outline" onClick={addObjective} className="rounded-xl">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Modules overview</h3>
        <div className="space-y-2">
          {course.modules.map((mod) => (
            <div key={mod.id} className="flex items-center justify-between text-sm py-2 px-4 rounded-xl bg-[#F7F8FA]">
              <span className="text-gray-700">{mod.title}</span>
              <span className="text-gray-400">{mod.lessons.length} lessons</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CourseBuilder() {
  const { id } = useParams();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const saveTimer = useRef(null);

  useEffect(() => {
    getCourse(id).then((data) => {
      setCourse(data);
      setLoading(false);
    });
  }, [id]);

  const activeModule = course?.modules.find((m) => m.lessons.some((l) => l.id === activeLessonId));
  const activeLesson = activeModule?.lessons.find((l) => l.id === activeLessonId);

  const updateCourseField = useCallback(
    (patch) => {
      setCourse((c) => ({ ...c, ...patch }));
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => updateCourse(id, patch), 1200);
    },
    [id]
  );

  const updateLessonBlocks = (lessonId, blocks) => {
    setCourse((c) => ({
      ...c,
      modules: c.modules.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, blocks } : l)),
      })),
    }));
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => updateLesson(lessonId, { blocks }), 1200);
  };

  const handleAddModule = async () => {
    const mod = await createModule(id, "New Module", course.modules.length);
    setCourse((c) => ({ ...c, modules: [...c.modules, mod] }));
  };

  const handleAddLesson = async (moduleId) => {
    const mod = course.modules.find((m) => m.id === moduleId);
    const lesson = await createLesson(moduleId, "New Lesson", mod.lessons.length);
    setCourse((c) => ({
      ...c,
      modules: c.modules.map((m) => (m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m)),
    }));
    setActiveLessonId(lesson.id);
  };

  const handleDeleteModule = async (moduleId) => {
    await deleteModule(moduleId);
    setCourse((c) => ({ ...c, modules: c.modules.filter((m) => m.id !== moduleId) }));
  };

  const handleDeleteLesson = async (moduleId, lessonId) => {
    await deleteLesson(lessonId);
    setCourse((c) => ({
      ...c,
      modules: c.modules.map((m) =>
        m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m
      ),
    }));
    if (activeLessonId === lessonId) setActiveLessonId(null);
  };

  const handleReorderModules = (from, to) => {
    setCourse((c) => {
      const modules = [...c.modules];
      const [item] = modules.splice(from, 1);
      modules.splice(to, 0, item);
      modules.forEach((m, i) => updateModule(m.id, { position: i }));
      return { ...c, modules };
    });
  };

  const handleReorderLessons = (fromModuleId, fromIndex, toModuleId, toIndex) => {
    setCourse((c) => {
      const modules = c.modules.map((m) => ({ ...m, lessons: [...m.lessons] }));
      const fromMod = modules.find((m) => m.id === fromModuleId);
      const toMod = modules.find((m) => m.id === toModuleId);
      const [item] = fromMod.lessons.splice(fromIndex, 1);
      toMod.lessons.splice(toIndex, 0, item);
      toMod.lessons.forEach((l, i) => updateLesson(l.id, { position: i, module_id: toMod.id }));
      if (fromMod.id !== toMod.id) {
        fromMod.lessons.forEach((l, i) => updateLesson(l.id, { position: i }));
      }
      return { ...c, modules };
    });
  };

  const handleExport = async (format) => {
    setExportError("");
    const limits = getPlanLimits(profile?.subscription);
    if (Number.isFinite(limits.exportsPerDay)) {
      const count = await countExportsToday(user.id);
      if (count >= limits.exportsPerDay) {
        setExportError("You've reached your daily export limit. Upgrade to Pro for unlimited exports.");
        return;
      }
    }
    setExporting(true);
    try {
      if (format === "html") {
        downloadCourseHtml(course);
      } else {
        await downloadCourseScorm(course);
      }
      await logExport(user.id, course.id, format);
    } catch (err) {
      setExportError(err.message || "Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handlePublish = () => updateCourseField({ status: "published" });

  if (loading || !course) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading…</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/dashboard" className="text-gray-400 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="font-semibold text-gray-900 truncate max-w-xs">{course.title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize shrink-0">
            {course.status.replace("_", " ")}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <CollaboratorsPanel
            courseId={course.id}
            subscription={profile?.subscription}
            trigger={
              <Button variant="outline" size="sm" className="rounded-lg">
                <Users className="w-4 h-4 mr-1.5" /> Collaborators
              </Button>
            }
          />
          <Button variant="outline" size="sm" className="rounded-lg" onClick={() => handleExport("html")} disabled={exporting}>
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 mr-1.5" />}
            HTML
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg" onClick={() => handleExport("scorm")} disabled={exporting}>
            <FileCode className="w-4 h-4 mr-1.5" /> SCORM
          </Button>
          <Button size="sm" className="rounded-lg bg-[#1A2B4A] hover:bg-[#23385C] text-white" onClick={handlePublish}>
            <Eye className="w-4 h-4 mr-1.5" /> Publish
          </Button>
        </div>
      </header>

      {exportError && (
        <div className="px-6 py-2 bg-[#dc2626]/5 text-[#dc2626] text-sm border-b border-[#dc2626]/10">
          {exportError}
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <OutlineSidebar
          course={course}
          activeLessonId={activeLessonId}
          onSelectHome={() => setActiveLessonId(null)}
          onSelectLesson={setActiveLessonId}
          onAddModule={handleAddModule}
          onAddLesson={handleAddLesson}
          onDeleteModule={handleDeleteModule}
          onDeleteLesson={handleDeleteLesson}
          onReorderModules={handleReorderModules}
          onReorderLessons={handleReorderLessons}
        />

        <main className="flex-1 overflow-y-auto p-10">
          {activeLesson ? (
            <div className="max-w-2xl">
              <Input
                value={activeLesson.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setCourse((c) => ({
                    ...c,
                    modules: c.modules.map((m) => ({
                      ...m,
                      lessons: m.lessons.map((l) => (l.id === activeLesson.id ? { ...l, title } : l)),
                    })),
                  }));
                  clearTimeout(saveTimer.current);
                  saveTimer.current = setTimeout(() => updateLesson(activeLesson.id, { title }), 1200);
                }}
                className="text-xl font-bold h-12 rounded-xl mb-6"
              />
              <BlockCanvas
                lesson={activeLesson}
                onUpdateBlocks={(blocks) => updateLessonBlocks(activeLesson.id, blocks)}
              />
            </div>
          ) : (
            <HomeEditor course={course} onUpdate={updateCourseField} />
          )}
        </main>
      </div>
    </div>
  );
}
