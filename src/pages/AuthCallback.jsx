import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

// Lands here after OAuth (Google) redirects back. Routes first-time users
// into onboarding and everyone else straight to the dashboard.
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!session?.user) {
        navigate("/login", { replace: true });
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarded")
        .eq("id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      navigate(profile?.onboarded ? "/dashboard" : "/onboarding", { replace: true });
    };

    // The OAuth redirect can take a tick to populate the session.
    const { data: listener } = supabase.auth.onAuthStateChange(() => resolve());
    resolve();

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Signing you in…
    </div>
  );
}
