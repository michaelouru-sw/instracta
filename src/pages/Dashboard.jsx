import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, LogOut, FolderOpen, CheckCircle2, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/AuthContext";
import { listMyCourses, listSharedCourses, deleteCourse } from "@/lib/courses";

const STATUS_LABEL = {
  draft: "Draft",
  outline_ready: "Outline Ready",
  in_progress: "In Progress",
  published: "Published",
};

const STATUS_COLOR = {
  draft: "bg-gray-100 text-gray-600",
  outline_ready: "bg-[#2563eb]/10 text-[#2563eb]",
  in_progress: "bg-[#d97706]/10 text-[#d97706]",
  published: "bg-[#16a34a]/10 text-[#16a34a]",
};

const GRADIENTS = {
  beginner: "from-[#1A2B4A] to-[#5AB3C6]",
  intermediate: "from-[#1A2B4A] to-[#D4A574]",
  advanced: "from-[#23385C] to-[#1A2B4A]",
};

function CourseCard({ course, shared, onDelete }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,.08)] transition-shadow">
      <Link to={`/course/${course.id}`}>
        <div
          className={`h-28 bg-gradient-to-br ${GRADIENTS[course.difficulty] || GRADIENTS.beginner} relative`}
        >
          <span
            className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLOR[course.status]}`}
          >
            {STATUS_LABEL[course.status]}
          </span>
          {shared && (
            <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 text-white">
              Shared
            </span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/course/${course.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-1">{course.title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{course.description}</p>
        </Link>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>{course.duration_minutes ? `${course.duration_minutes} min` : "—"}</span>
          <span className="capitalize">{course.difficulty}</span>
          {!shared && (
            <button
              onClick={() => onDelete(course.id)}
              className="text-[#dc2626] hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#5AB3C6]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#5AB3C6]" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: myCourses = [], isLoading } = useQuery({
    queryKey: ["courses", "mine", user.id],
    queryFn: () => listMyCourses(user.id),
  });

  const { data: sharedCourses = [] } = useQuery({
    queryKey: ["courses", "shared", user.id],
    queryFn: () => listSharedCourses(user.id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses", "mine", user.id] }),
  });

  const filtered = myCourses.filter((c) => {
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { icon: FolderOpen, label: "My Courses", value: myCourses.length },
    { icon: CheckCircle2, label: "Published", value: myCourses.filter((c) => c.status === "published").length },
    { icon: Clock, label: "In Progress", value: myCourses.filter((c) => c.status === "in_progress").length },
    { icon: Users, label: "Shared With Me", value: sharedCourses.length },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#1A2B4A]">Instracta</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#5AB3C6]/10 text-[#5AB3C6]">
              AI Studio
            </span>
          </div>
          <div className="flex-1 max-w-sm relative hidden md:block">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-[#F7F8FA] border-gray-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Link to="/account" className="text-sm text-gray-500 hover:text-gray-900 px-2">
              {profile?.full_name || user.email}
            </Link>
            <Button variant="ghost" size="icon" onClick={signOut} title="Logout">
              <LogOut className="w-4 h-4" />
            </Button>
            <Link to="/new-course">
              <Button className="rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white">
                <Plus className="w-4 h-4 mr-1" /> New Course
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {["all", "draft", "outline_ready", "in_progress", "published"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-sm px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? "bg-[#1A2B4A] text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {s === "all" ? "All" : STATUS_LABEL[s]}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Courses</h2>
        {isLoading ? (
          <p className="text-gray-400">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-16 text-center">
            <h3 className="text-lg font-semibold text-gray-900">No courses yet.</h3>
            <p className="mt-2 text-sm text-gray-500">
              Create your first AI-powered course. Just describe your topic and let the AI build a
              complete outline in seconds.
            </p>
            <Link to="/new-course">
              <Button className="mt-6 rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white">
                <Plus className="w-4 h-4 mr-1" /> New Course
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))}
          </div>
        )}

        {sharedCourses.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shared With Me</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {sharedCourses.map((course) => (
                <CourseCard key={course.id} course={course} shared />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
