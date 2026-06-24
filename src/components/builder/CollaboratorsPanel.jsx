import { useEffect, useState } from "react";
import { Loader2, Users, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listCollaborators, inviteCollaborator, removeCollaborator } from "@/lib/courses";
import { getPlanLimits } from "@/lib/plans";

const ROLES = ["editor", "reviewer", "viewer"];

export default function CollaboratorsPanel({ courseId, subscription, trigger }) {
  const [open, setOpen] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");
  const [error, setError] = useState("");
  const [inviting, setInviting] = useState(false);

  const limit = getPlanLimits(subscription).collaborators;
  const atLimit = Number.isFinite(limit) && collaborators.length >= limit;

  const load = async () => {
    setLoading(true);
    try {
      setCollaborators(await listCollaborators(courseId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  const handleInvite = async (e) => {
    e.preventDefault();
    setError("");
    if (atLimit) {
      setError("You've reached the collaborator limit for your plan. Upgrade to add more.");
      return;
    }
    setInviting(true);
    try {
      await inviteCollaborator(courseId, email, role);
      setEmail("");
      await load();
    } catch (err) {
      setError(err.message || "Couldn't send the invite.");
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (id) => {
    await removeCollaborator(id);
    await load();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Collaborators
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleInvite} className="flex gap-2">
          <Input
            type="email"
            required
            placeholder="teammate@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-xl"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-2 text-sm capitalize"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <Button type="submit" disabled={inviting} className="rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white">
            {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Invite"}
          </Button>
        </form>
        {error && <p className="text-sm text-[#dc2626]">{error}</p>}
        {Number.isFinite(limit) && (
          <p className="text-xs text-gray-400">
            {collaborators.length}/{limit} collaborators used on your plan.
          </p>
        )}

        <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
          {loading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : collaborators.length === 0 ? (
            <p className="text-sm text-gray-400">No collaborators yet.</p>
          ) : (
            collaborators.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2">
                <div>
                  <p className="text-sm text-gray-900">{c.invitee_email}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {c.role} · {c.status}
                  </p>
                </div>
                <button onClick={() => handleRemove(c.id)} className="text-gray-300 hover:text-[#dc2626]">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
        <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
          Invites are recorded here but no email is sent yet — share the course link with your
          teammate directly until invite emails are wired up.
        </p>
      </DialogContent>
    </Dialog>
  );
}
