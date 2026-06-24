import {
  Type,
  Image,
  Video,
  ListChecks,
  Quote,
  Minus,
  Heading,
  List,
  ListOrdered,
  AlertCircle,
  Code,
  Globe,
  FileDown,
  AudioLines,
  Table,
  MousePointerClick,
  CheckSquare,
  ToggleLeft,
  Layers,
  ChevronsUpDown,
  PanelsTopLeft,
  GitCommitHorizontal,
  MapPin,
  Shuffle,
  PenLine,
  FolderKanban,
  Images,
} from "lucide-react";

// Subset of the spec's 27 block types, prioritized by usage. Each entry
// knows how to create a default content payload and is rendered by
// BlockCanvas's editors and the HTML/SCORM exporter.
export const BLOCK_TYPES = [
  {
    type: "text",
    label: "Text",
    icon: Type,
    category: "Content",
    defaultContent: { html: "<p>Start writing...</p>" },
  },
  {
    type: "heading",
    label: "Heading",
    icon: Heading,
    category: "Content",
    defaultContent: { text: "Section heading", level: 2 },
  },
  {
    type: "bulleted-list",
    label: "Bulleted List",
    icon: List,
    category: "Content",
    defaultContent: { items: ["First point", "Second point"] },
  },
  {
    type: "numbered-list",
    label: "Numbered List",
    icon: ListOrdered,
    category: "Content",
    defaultContent: { items: ["First step", "Second step"] },
  },
  {
    type: "callout",
    label: "Callout",
    icon: AlertCircle,
    category: "Content",
    defaultContent: { text: "Heads up — important note goes here.", tone: "info" },
  },
  {
    type: "quote",
    label: "Quote",
    icon: Quote,
    category: "Content",
    defaultContent: { text: "", author: "" },
  },
  {
    type: "divider",
    label: "Divider",
    icon: Minus,
    category: "Layout",
    defaultContent: {},
  },
  {
    type: "image",
    label: "Image",
    icon: Image,
    category: "Media",
    defaultContent: { url: "", alt: "", caption: "" },
  },
  {
    type: "video",
    label: "Video",
    icon: Video,
    category: "Media",
    defaultContent: { url: "", caption: "" },
  },
  {
    type: "audio",
    label: "Audio",
    icon: AudioLines,
    category: "Media",
    defaultContent: { url: "", caption: "" },
  },
  {
    type: "embed",
    label: "Embed",
    icon: Globe,
    category: "Media",
    defaultContent: { url: "", caption: "" },
  },
  {
    type: "file",
    label: "File Download",
    icon: FileDown,
    category: "Media",
    defaultContent: { url: "", label: "Download attachment" },
  },
  {
    type: "table",
    label: "Table",
    icon: Table,
    category: "Layout",
    defaultContent: {
      headers: ["Column A", "Column B"],
      rows: [["", ""], ["", ""]],
    },
  },
  {
    type: "button",
    label: "Button",
    icon: MousePointerClick,
    category: "Layout",
    defaultContent: { label: "Continue", url: "" },
  },
  {
    type: "quiz",
    label: "Quiz",
    icon: ListChecks,
    category: "Assessment",
    defaultContent: {
      question: "Your question here?",
      options: ["Option A", "Option B", "Option C"],
      correctIndex: 0,
    },
  },
  {
    type: "multi-select",
    label: "Multi-Select",
    icon: CheckSquare,
    category: "Assessment",
    defaultContent: {
      question: "Select all that apply.",
      options: ["Option A", "Option B", "Option C"],
      correctIndexes: [0],
    },
  },
  {
    type: "true-false",
    label: "True / False",
    icon: ToggleLeft,
    category: "Assessment",
    defaultContent: { statement: "This statement is true.", answer: true },
  },
  {
    type: "code",
    label: "Code Snippet",
    icon: Code,
    category: "Content",
    defaultContent: { code: "", language: "javascript" },
  },
  {
    type: "flashcards",
    label: "Flashcards",
    icon: Layers,
    category: "Interactive",
    defaultContent: {
      cards: [
        { front: "Term", back: "Definition" },
        { front: "Term 2", back: "Definition 2" },
      ],
    },
  },
  {
    type: "accordion",
    label: "Accordion",
    icon: ChevronsUpDown,
    category: "Interactive",
    defaultContent: {
      items: [
        { title: "Section 1", body: "Details for section 1." },
        { title: "Section 2", body: "Details for section 2." },
      ],
    },
  },
  {
    type: "tabs",
    label: "Tabs",
    icon: PanelsTopLeft,
    category: "Interactive",
    defaultContent: {
      items: [
        { title: "Tab 1", body: "Content for tab 1." },
        { title: "Tab 2", body: "Content for tab 2." },
      ],
    },
  },
  {
    type: "process",
    label: "Process / Steps",
    icon: GitCommitHorizontal,
    category: "Interactive",
    defaultContent: {
      steps: [
        { title: "Step 1", body: "What happens first." },
        { title: "Step 2", body: "What happens next." },
      ],
    },
  },
  {
    type: "labeled-graphic",
    label: "Labeled Graphic",
    icon: MapPin,
    category: "Interactive",
    defaultContent: {
      imageUrl: "",
      markers: [{ x: 50, y: 50, label: "Hotspot 1", body: "Details about this point." }],
    },
  },
  {
    type: "matching",
    label: "Matching",
    icon: Shuffle,
    category: "Assessment",
    defaultContent: {
      pairs: [
        { left: "Term A", right: "Match A" },
        { left: "Term B", right: "Match B" },
      ],
    },
  },
  {
    type: "fill-in-blank",
    label: "Fill in the Blank",
    icon: PenLine,
    category: "Assessment",
    defaultContent: {
      template: "The capital of France is ___.",
      answer: "Paris",
    },
  },
  {
    type: "categorize",
    label: "Categorize",
    icon: FolderKanban,
    category: "Assessment",
    defaultContent: {
      categories: ["Category A", "Category B"],
      items: [
        { label: "Item 1", category: 0 },
        { label: "Item 2", category: 1 },
      ],
    },
  },
  {
    type: "gallery",
    label: "Gallery",
    icon: Images,
    category: "Media",
    defaultContent: {
      images: [{ url: "", caption: "" }],
    },
  },
];

export function getBlockType(type) {
  return BLOCK_TYPES.find((b) => b.type === type);
}

export function createBlock(type) {
  const def = getBlockType(type);
  if (!def) throw new Error(`Unknown block type: ${type}`);
  return {
    id: crypto.randomUUID(),
    type,
    content: structuredClone(def.defaultContent),
  };
}
