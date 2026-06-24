import { supabase } from "@/lib/supabase";

export async function listMyCourses(userId) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("created_by", userId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function listSharedCourses(userId) {
  const { data, error } = await supabase
    .from("collaborators")
    .select("course:courses(*)")
    .eq("invitee_id", userId)
    .eq("status", "active");
  if (error) throw error;
  return (data ?? []).map((row) => row.course).filter(Boolean);
}

export async function createCourse(userId, payload) {
  const { data, error } = await supabase
    .from("courses")
    .insert({ created_by: userId, ...payload })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getCourse(courseId) {
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();
  if (error) throw error;

  const { data: modules, error: modErr } = await supabase
    .from("modules")
    .select("*, lessons(*)")
    .eq("course_id", courseId)
    .order("position", { ascending: true });
  if (modErr) throw modErr;

  modules.forEach((m) => m.lessons.sort((a, b) => a.position - b.position));

  return { ...course, modules };
}

export async function updateCourse(courseId, patch) {
  const { data, error } = await supabase
    .from("courses")
    .update(patch)
    .eq("id", courseId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCourse(courseId) {
  const { error } = await supabase.from("courses").delete().eq("id", courseId);
  if (error) throw error;
}

export async function createModule(courseId, title, position) {
  const { data, error } = await supabase
    .from("modules")
    .insert({ course_id: courseId, title, position })
    .select()
    .single();
  if (error) throw error;
  return { ...data, lessons: [] };
}

export async function updateModule(moduleId, patch) {
  const { data, error } = await supabase
    .from("modules")
    .update(patch)
    .eq("id", moduleId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteModule(moduleId) {
  const { error } = await supabase.from("modules").delete().eq("id", moduleId);
  if (error) throw error;
}

export async function createLesson(moduleId, title, position, type = "standard") {
  const { data, error } = await supabase
    .from("lessons")
    .insert({ module_id: moduleId, title, position, type, blocks: [] })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateLesson(lessonId, patch) {
  const { data, error } = await supabase
    .from("lessons")
    .update(patch)
    .eq("id", lessonId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteLesson(lessonId) {
  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
  if (error) throw error;
}

export async function logExport(userId, courseId, format) {
  const { error } = await supabase
    .from("export_logs")
    .insert({ user_id: userId, course_id: courseId, format });
  if (error) throw error;
}

export async function countExportsToday(userId) {
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const { count, error } = await supabase
    .from("export_logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", since.toISOString());
  if (error) throw error;
  return count ?? 0;
}

export async function listCollaborators(courseId) {
  const { data, error } = await supabase
    .from("collaborators")
    .select("*")
    .eq("course_id", courseId)
    .neq("status", "removed")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function inviteCollaborator(courseId, email, role) {
  const { data, error } = await supabase
    .from("collaborators")
    .insert({ course_id: courseId, invitee_email: email, role, status: "pending" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function removeCollaborator(collaboratorId) {
  const { error } = await supabase
    .from("collaborators")
    .update({ status: "removed" })
    .eq("id", collaboratorId);
  if (error) throw error;
}
