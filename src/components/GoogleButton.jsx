import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5h-1.9V20.4H24v7.2h11.3c-1.6 4.5-5.9 7.7-11.3 7.7-6.9 0-12.5-5.6-12.5-12.5S17.1 10.3 24 10.3c3.1 0 6 1.2 8.2 3.1l5.1-5.1C33.9 5 29.2 3.1 24 3.1 12.4 3.1 3.1 12.4 3.1 24S12.4 44.9 24 44.9c10.7 0 19.9-7.8 19.9-19.9 0-1.5-.1-2.9-.3-4.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.6 5.9 4.3C13.8 15.1 18.5 12.3 24 12.3c3.1 0 6 1.2 8.2 3.1l5.1-5.1C33.9 7 29.2 5.1 24 5.1c-7.8 0-14.5 4.5-17.7 9.5z"
      />
      <path
        fill="#4CAF50"
        d="M24 44.9c5.1 0 9.8-1.9 13.3-5.1l-6.1-5.2c-2 1.4-4.5 2.2-7.2 2.2-5.4 0-9.7-3.2-11.3-7.7l-6 4.6C9.5 40.3 16.2 44.9 24 44.9z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5h-1.9V20.4H24v7.2h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.1 5.2c3.5-3.3 5.8-8.1 5.8-13.9 0-1.5-.1-2.9-.3-4.5z"
      />
    </svg>
  );
}

export default function GoogleButton({ label = "Continue with Google" }) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || "Couldn't start Google sign-in.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        onClick={handleClick}
        className="w-full h-12 rounded-xl border-gray-200 gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleLogo />}
        {label}
      </Button>
      {error && <p className="mt-2 text-sm text-[#dc2626]">{error}</p>}
    </div>
  );
}
