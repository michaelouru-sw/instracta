import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "@/components/GoogleButton";
import { useAuth } from "@/lib/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-6 py-32">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-500 text-center">Log in to continue building.</p>

        <div className="mt-8">
          <GoogleButton label="Continue with Google" />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-wide">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 h-12 rounded-xl"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1.5 h-12 rounded-xl"
            />
          </div>
          {error && <p className="text-sm text-[#dc2626]">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#1A2B4A] hover:bg-[#23385C] text-white"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#1A2B4A] font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
