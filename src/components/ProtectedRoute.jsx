import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading, supabaseConfigured } = useAuth();

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-6">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-gray-900">Supabase isn't configured yet</h1>
          <p className="mt-3 text-sm text-gray-500">
            Add <code className="bg-gray-100 px-1.5 py-0.5 rounded">VITE_SUPABASE_URL</code> and{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> to a{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">.env</code> file (see{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">.env.example</code>) and run the
            migration in <code className="bg-gray-100 px-1.5 py-0.5 rounded">supabase/migrations</code>{" "}
            to enable accounts and course storage.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
