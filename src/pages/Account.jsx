import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

const PLAN_LABEL = { free: "Free", pro: "Pro", enterprise: "Enterprise" };

export default function Account() {
  const { user, profile, signOut } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [aiProvider, setAiProvider] = useState(profile?.ai_provider || "default");
  const [aiKey, setAiKey] = useState(profile?.ai_api_key || "");
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await supabase
      .from("profiles")
      .update({ full_name: fullName, ai_provider: aiProvider, ai_api_key: aiKey })
      .eq("id", user.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-10 px-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

        <form onSubmit={handleSave} className="mt-8 bg-white rounded-2xl border border-gray-100 p-8 space-y-5">
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
          <div>
            <Label>Full name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5 h-11 rounded-xl" />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user.email} disabled className="mt-1.5 h-11 rounded-xl bg-gray-50" />
          </div>
          <div>
            <Label>Role</Label>
            <p className="mt-1.5 text-sm text-gray-500 capitalize">{profile?.role || "user"}</p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">AI Provider</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Provider</Label>
                <select
                  value={aiProvider}
                  onChange={(e) => setAiProvider(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm capitalize"
                >
                  {["default", "openai", "anthropic", "gemini"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>API key</Label>
                <div className="relative mt-1.5">
                  <Input
                    type={showKey ? "text" : "password"}
                    value={aiKey}
                    onChange={(e) => setAiKey(e.target.value)}
                    className="h-11 rounded-xl pr-10"
                    disabled={profile?.subscription === "free"}
                    placeholder={profile?.subscription === "free" ? "Pro plan required" : ""}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Billing</h2>
            <div className="flex items-center justify-between">
              <span className="text-sm px-3 py-1.5 rounded-full bg-[#5AB3C6]/10 text-[#1A2B4A] font-medium">
                {PLAN_LABEL[profile?.subscription || "free"]} plan
              </span>
              <div className="flex gap-2">
                {profile?.subscription === "free" && (
                  <Link to="/pricing">
                    <Button type="button" variant="outline" size="sm" className="rounded-lg">
                      Upgrade
                    </Button>
                  </Link>
                )}
                <Button type="button" variant="outline" size="sm" className="rounded-lg" disabled>
                  Manage Billing
                </Button>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Stripe Customer Portal integration is not wired up yet — add `STRIPE_SECRET_KEY` and a
              webhook handler to enable real billing.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <Button type="submit" disabled={saving} className="rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? "Saved" : "Save changes"}
            </Button>
            <button type="button" onClick={signOut} className="text-sm text-[#dc2626] hover:underline">
              Log out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
