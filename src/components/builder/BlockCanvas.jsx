import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GripVertical, Trash2, ChevronUp, ChevronDown, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getBlockType, createBlock } from "@/lib/blockTypes";
import AddBlockMenu from "@/components/builder/AddBlockMenu";

function TextBlockEditor({ block, onChange }) {
  return (
    <ReactQuill
      theme="snow"
      value={block.content.html}
      onChange={(html) => onChange({ ...block.content, html })}
    />
  );
}

function ImageBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="Image URL"
        value={block.content.url}
        onChange={(e) => onChange({ ...block.content, url: e.target.value })}
      />
      {block.content.url && (
        <img src={block.content.url} alt={block.content.alt} className="rounded-lg max-h-56" />
      )}
      <Input
        placeholder="Alt text"
        value={block.content.alt}
        onChange={(e) => onChange({ ...block.content, alt: e.target.value })}
      />
      <Input
        placeholder="Caption (optional)"
        value={block.content.caption}
        onChange={(e) => onChange({ ...block.content, caption: e.target.value })}
      />
    </div>
  );
}

function VideoBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="Video URL (mp4 or embed link)"
        value={block.content.url}
        onChange={(e) => onChange({ ...block.content, url: e.target.value })}
      />
      <Input
        placeholder="Caption (optional)"
        value={block.content.caption}
        onChange={(e) => onChange({ ...block.content, caption: e.target.value })}
      />
    </div>
  );
}

function QuoteBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="Quote text"
        value={block.content.text}
        onChange={(e) => onChange({ ...block.content, text: e.target.value })}
      />
      <Input
        placeholder="Author (optional)"
        value={block.content.author}
        onChange={(e) => onChange({ ...block.content, author: e.target.value })}
      />
    </div>
  );
}

function QuizBlockEditor({ block, onChange }) {
  const { question, options, correctIndex } = block.content;
  const updateOption = (i, value) => {
    const next = [...options];
    next[i] = value;
    onChange({ ...block.content, options: next });
  };
  const addOption = () => onChange({ ...block.content, options: [...options, "New option"] });
  const removeOption = (i) => {
    const next = options.filter((_, idx) => idx !== i);
    onChange({
      ...block.content,
      options: next,
      correctIndex: correctIndex >= next.length ? 0 : correctIndex,
    });
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Question"
        value={question}
        onChange={(e) => onChange({ ...block.content, question: e.target.value })}
      />
      <div className="space-y-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              checked={correctIndex === i}
              onChange={() => onChange({ ...block.content, correctIndex: i })}
              title="Mark as correct answer"
            />
            <Input value={opt} onChange={(e) => updateOption(i, e.target.value)} className="flex-1" />
            <button onClick={() => removeOption(i)} className="text-gray-400 hover:text-[#dc2626]">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addOption} className="rounded-lg">
        <Plus className="w-3.5 h-3.5 mr-1" /> Add option
      </Button>
    </div>
  );
}

function HeadingBlockEditor({ block, onChange }) {
  return (
    <div className="flex gap-2">
      <select
        value={block.content.level}
        onChange={(e) => onChange({ ...block.content, level: Number(e.target.value) })}
        className="h-10 rounded-lg border border-gray-200 bg-white px-2 text-sm"
      >
        {[1, 2, 3].map((lvl) => (
          <option key={lvl} value={lvl}>
            H{lvl}
          </option>
        ))}
      </select>
      <Input
        placeholder="Heading text"
        value={block.content.text}
        onChange={(e) => onChange({ ...block.content, text: e.target.value })}
        className="flex-1"
      />
    </div>
  );
}

function ListItemsEditor({ block, onChange }) {
  const { items } = block.content;
  const updateItem = (i, value) => {
    const next = [...items];
    next[i] = value;
    onChange({ ...block.content, items: next });
  };
  const addItem = () => onChange({ ...block.content, items: [...items, ""] });
  const removeItem = (i) => onChange({ ...block.content, items: items.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input value={item} onChange={(e) => updateItem(i, e.target.value)} className="flex-1" />
          <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-[#dc2626]">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="rounded-lg">
        <Plus className="w-3.5 h-3.5 mr-1" /> Add item
      </Button>
    </div>
  );
}

function CalloutBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <select
        value={block.content.tone}
        onChange={(e) => onChange({ ...block.content, tone: e.target.value })}
        className="h-10 rounded-lg border border-gray-200 bg-white px-2 text-sm capitalize"
      >
        {["info", "warning", "success", "error"].map((tone) => (
          <option key={tone} value={tone}>
            {tone}
          </option>
        ))}
      </select>
      <Textarea
        rows={2}
        value={block.content.text}
        onChange={(e) => onChange({ ...block.content, text: e.target.value })}
      />
    </div>
  );
}

function AudioBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="Audio file URL (mp3)"
        value={block.content.url}
        onChange={(e) => onChange({ ...block.content, url: e.target.value })}
      />
      <Input
        placeholder="Caption (optional)"
        value={block.content.caption}
        onChange={(e) => onChange({ ...block.content, caption: e.target.value })}
      />
    </div>
  );
}

function EmbedBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="Embed URL (website, YouTube, etc.)"
        value={block.content.url}
        onChange={(e) => onChange({ ...block.content, url: e.target.value })}
      />
      <Input
        placeholder="Caption (optional)"
        value={block.content.caption}
        onChange={(e) => onChange({ ...block.content, caption: e.target.value })}
      />
    </div>
  );
}

function FileBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="File URL"
        value={block.content.url}
        onChange={(e) => onChange({ ...block.content, url: e.target.value })}
      />
      <Input
        placeholder="Download label"
        value={block.content.label}
        onChange={(e) => onChange({ ...block.content, label: e.target.value })}
      />
    </div>
  );
}

function TableBlockEditor({ block, onChange }) {
  const { headers, rows } = block.content;
  const updateHeader = (i, value) => {
    const next = [...headers];
    next[i] = value;
    onChange({ ...block.content, headers: next });
  };
  const updateCell = (r, c, value) => {
    const next = rows.map((row) => [...row]);
    next[r][c] = value;
    onChange({ ...block.content, rows: next });
  };
  const addColumn = () =>
    onChange({
      ...block.content,
      headers: [...headers, `Column ${headers.length + 1}`],
      rows: rows.map((row) => [...row, ""]),
    });
  const addRow = () => onChange({ ...block.content, rows: [...rows, headers.map(() => "")] });
  const removeRow = (r) => onChange({ ...block.content, rows: rows.filter((_, idx) => idx !== r) });

  return (
    <div className="space-y-2 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-1">
                <Input value={h} onChange={(e) => updateHeader(i, e.target.value)} className="h-8 text-xs" />
              </th>
            ))}
            <th className="w-8" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className="p-1">
                  <Input value={cell} onChange={(e) => updateCell(r, c, e.target.value)} className="h-8 text-xs" />
                </td>
              ))}
              <td>
                <button onClick={() => removeRow(r)} className="text-gray-400 hover:text-[#dc2626]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={addRow} className="rounded-lg">
          <Plus className="w-3.5 h-3.5 mr-1" /> Row
        </Button>
        <Button variant="outline" size="sm" onClick={addColumn} className="rounded-lg">
          <Plus className="w-3.5 h-3.5 mr-1" /> Column
        </Button>
      </div>
    </div>
  );
}

function ButtonBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="Button label"
        value={block.content.label}
        onChange={(e) => onChange({ ...block.content, label: e.target.value })}
      />
      <Input
        placeholder="Link URL"
        value={block.content.url}
        onChange={(e) => onChange({ ...block.content, url: e.target.value })}
      />
    </div>
  );
}

function MultiSelectBlockEditor({ block, onChange }) {
  const { question, options, correctIndexes } = block.content;
  const updateOption = (i, value) => {
    const next = [...options];
    next[i] = value;
    onChange({ ...block.content, options: next });
  };
  const toggleCorrect = (i) => {
    const set = new Set(correctIndexes);
    set.has(i) ? set.delete(i) : set.add(i);
    onChange({ ...block.content, correctIndexes: [...set].sort() });
  };
  const addOption = () => onChange({ ...block.content, options: [...options, "New option"] });
  const removeOption = (i) => {
    onChange({
      ...block.content,
      options: options.filter((_, idx) => idx !== i),
      correctIndexes: correctIndexes.filter((idx) => idx !== i).map((idx) => (idx > i ? idx - 1 : idx)),
    });
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Question"
        value={question}
        onChange={(e) => onChange({ ...block.content, question: e.target.value })}
      />
      <div className="space-y-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={correctIndexes.includes(i)}
              onChange={() => toggleCorrect(i)}
              title="Mark as a correct answer"
            />
            <Input value={opt} onChange={(e) => updateOption(i, e.target.value)} className="flex-1" />
            <button onClick={() => removeOption(i)} className="text-gray-400 hover:text-[#dc2626]">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addOption} className="rounded-lg">
        <Plus className="w-3.5 h-3.5 mr-1" /> Add option
      </Button>
    </div>
  );
}

function TrueFalseBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Textarea
        rows={2}
        placeholder="Statement"
        value={block.content.statement}
        onChange={(e) => onChange({ ...block.content, statement: e.target.value })}
      />
      <div className="flex gap-4">
        {[true, false].map((val) => (
          <label key={String(val)} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={block.content.answer === val}
              onChange={() => onChange({ ...block.content, answer: val })}
            />
            {val ? "True" : "False"}
          </label>
        ))}
      </div>
    </div>
  );
}

function CodeBlockEditor({ block, onChange }) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="Language (e.g. javascript)"
        value={block.content.language}
        onChange={(e) => onChange({ ...block.content, language: e.target.value })}
      />
      <Textarea
        rows={6}
        placeholder="Paste code..."
        value={block.content.code}
        onChange={(e) => onChange({ ...block.content, code: e.target.value })}
        className="font-mono text-sm"
      />
    </div>
  );
}

const EDITORS = {
  text: TextBlockEditor,
  heading: HeadingBlockEditor,
  "bulleted-list": ListItemsEditor,
  "numbered-list": ListItemsEditor,
  callout: CalloutBlockEditor,
  image: ImageBlockEditor,
  video: VideoBlockEditor,
  audio: AudioBlockEditor,
  embed: EmbedBlockEditor,
  file: FileBlockEditor,
  table: TableBlockEditor,
  button: ButtonBlockEditor,
  quote: QuoteBlockEditor,
  quiz: QuizBlockEditor,
  "multi-select": MultiSelectBlockEditor,
  "true-false": TrueFalseBlockEditor,
  code: CodeBlockEditor,
};

function BlockShell({ block, index, total, onChange, onDelete, onMove, dragHandleProps }) {
  const def = getBlockType(block.type);
  const Editor = EDITORS[block.type];

  return (
    <div className="group relative rounded-2xl border border-gray-100 bg-white p-5 hover:border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
          <span {...dragHandleProps} className="cursor-grab text-gray-300 hover:text-gray-500">
            <GripVertical className="w-4 h-4" />
          </span>
          <def.icon className="w-3.5 h-3.5" />
          {def.label}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button disabled={index === 0} onClick={() => onMove(-1)} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
            <ChevronUp className="w-4 h-4" />
          </button>
          <button disabled={index === total - 1} onClick={() => onMove(1)} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
            <ChevronDown className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1 text-gray-400 hover:text-[#dc2626]">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {block.type === "divider" ? (
        <hr className="border-gray-200" />
      ) : Editor ? (
        <Editor block={block} onChange={(content) => onChange(content)} />
      ) : null}
    </div>
  );
}

export default function BlockCanvas({ lesson, onUpdateBlocks }) {
  const [menuOpenAt, setMenuOpenAt] = useState(null); // index to insert at, or null

  const blocks = lesson.blocks || [];

  const updateBlock = (id, content) => {
    onUpdateBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const deleteBlock = (id) => {
    onUpdateBlocks(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (index, dir) => {
    const next = [...blocks];
    const [item] = next.splice(index, 1);
    next.splice(index + dir, 0, item);
    onUpdateBlocks(next);
  };

  const insertBlock = (type) => {
    const block = createBlock(type);
    const next = [...blocks];
    const at = menuOpenAt ?? blocks.length;
    next.splice(at, 0, block);
    onUpdateBlocks(next);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const next = [...blocks];
    const [item] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, item);
    onUpdateBlocks(next);
  };

  return (
    <div className="space-y-3">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(dragProvided) => (
                    <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                      <BlockShell
                        block={block}
                        index={index}
                        total={blocks.length}
                        onChange={(content) => updateBlock(block.id, content)}
                        onDelete={() => deleteBlock(block.id)}
                        onMove={(dir) => moveBlock(index, dir)}
                        dragHandleProps={dragProvided.dragHandleProps}
                      />
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
        onClick={() => setMenuOpenAt(blocks.length)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-gray-200 text-gray-400 hover:border-[#5AB3C6] hover:text-[#5AB3C6] transition-colors text-sm"
      >
        <Plus className="w-4 h-4" /> Add Block
      </button>

      <AddBlockMenu
        open={menuOpenAt !== null}
        onOpenChange={(open) => !open && setMenuOpenAt(null)}
        onSelect={insertBlock}
      />
    </div>
  );
}
