import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BLOCK_TYPES } from "@/lib/blockTypes";

export default function AddBlockMenu({ open, onOpenChange, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = BLOCK_TYPES.filter((b) =>
    b.label.toLowerCase().includes(search.toLowerCase())
  );
  const categories = [...new Set(filtered.map((b) => b.category))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add a block</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            autoFocus
            placeholder="Search block types..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
        <div className="max-h-80 overflow-y-auto space-y-5 mt-2">
          {categories.map((cat) => (
            <div key={cat}>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">{cat}</p>
              <div className="grid grid-cols-3 gap-2">
                {filtered
                  .filter((b) => b.category === cat)
                  .map((block) => (
                    <button
                      key={block.type}
                      onClick={() => {
                        onSelect(block.type);
                        onOpenChange(false);
                        setSearch("");
                      }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-[#5AB3C6] hover:bg-[#5AB3C6]/5 transition-colors"
                    >
                      <block.icon className="w-5 h-5 text-[#1A2B4A]" />
                      <span className="text-xs text-gray-600">{block.label}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
