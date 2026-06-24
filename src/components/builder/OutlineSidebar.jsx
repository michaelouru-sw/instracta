import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  FileText,
  ListChecks,
  ClipboardCheck,
  Video,
  Puzzle,
  Home,
  Trash2,
} from "lucide-react";

const LESSON_ICONS = {
  standard: FileText,
  quiz: ListChecks,
  assignment: ClipboardCheck,
  video: Video,
  interactive: Puzzle,
};

export default function OutlineSidebar({
  course,
  activeLessonId,
  onSelectHome,
  onSelectLesson,
  onAddModule,
  onAddLesson,
  onDeleteModule,
  onDeleteLesson,
  onReorderModules,
  onReorderLessons,
}) {
  const [collapsed, setCollapsed] = useState({});

  const toggle = (id) => setCollapsed((c) => ({ ...c, [id]: !c[id] }));

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { type, source, destination } = result;
    if (type === "module") {
      onReorderModules(source.index, destination.index);
    } else {
      onReorderLessons(source.droppableId, source.index, destination.droppableId, destination.index);
    }
  };

  return (
    <aside className="w-72 shrink-0 border-r border-gray-100 bg-white h-full overflow-y-auto">
      <button
        onClick={onSelectHome}
        className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-medium border-b border-gray-100 ${
          activeLessonId === null ? "bg-[#5AB3C6]/10 text-[#1A2B4A]" : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Home className="w-4 h-4" /> Course Home
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="modules" type="module">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="py-2">
              {course.modules.map((mod, mi) => (
                <Draggable key={mod.id} draggableId={mod.id} index={mi}>
                  {(modProvided) => (
                    <div ref={modProvided.innerRef} {...modProvided.draggableProps} className="mb-1">
                      <div
                        {...modProvided.dragHandleProps}
                        className="flex items-center justify-between px-4 py-2 group"
                      >
                        <button
                          onClick={() => toggle(mod.id)}
                          className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 flex-1 text-left"
                        >
                          {collapsed[mod.id] ? (
                            <ChevronRight className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                          {mod.title}
                        </button>
                        <button
                          onClick={() => onDeleteModule(mod.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-[#dc2626]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {!collapsed[mod.id] && (
                        <Droppable droppableId={mod.id} type="lesson">
                          {(lessonProvided) => (
                            <div ref={lessonProvided.innerRef} {...lessonProvided.droppableProps}>
                              {mod.lessons.map((lesson, li) => {
                                const Icon = LESSON_ICONS[lesson.type] || FileText;
                                return (
                                  <Draggable key={lesson.id} draggableId={lesson.id} index={li}>
                                    {(lessonDrag) => (
                                      <div
                                        ref={lessonDrag.innerRef}
                                        {...lessonDrag.draggableProps}
                                        {...lessonDrag.dragHandleProps}
                                        className={`group flex items-center justify-between gap-2 pl-8 pr-3 py-2 text-sm cursor-pointer ${
                                          activeLessonId === lesson.id
                                            ? "bg-[#5AB3C6]/10 text-[#1A2B4A] font-medium"
                                            : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                        onClick={() => onSelectLesson(lesson.id)}
                                      >
                                        <span className="flex items-center gap-2 truncate">
                                          <Icon className="w-3.5 h-3.5 shrink-0" />
                                          <span className="truncate">{lesson.title}</span>
                                        </span>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteLesson(mod.id, lesson.id);
                                          }}
                                          className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-[#dc2626] shrink-0"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {lessonProvided.placeholder}
                              <button
                                onClick={() => onAddLesson(mod.id)}
                                className="w-full flex items-center gap-2 pl-8 pr-3 py-2 text-xs text-gray-400 hover:text-[#5AB3C6]"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add lesson
                              </button>
                            </div>
                          )}
                        </Droppable>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={onAddModule}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-400 hover:text-[#5AB3C6] border-t border-gray-100"
      >
        <Plus className="w-4 h-4" /> Add module
      </button>
    </aside>
  );
}
