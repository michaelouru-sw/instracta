import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  const [scrolledState, setScrolled] = useState(false);
  const scrolled = true; // pages are light; keep the nav solid
  void scrolledState;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "What we stand for", href: "/stand" },
    { label: "Initiatives", href: "/initiatives" },
    { label: "Products", href: "/products" },
    { label: "Work with us", href: "/work" },
    { label: "For funders", href: "/funders" },
    { label: "Pricing", href: "/pricing" },
  ];

  const goToLink = (href) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + href);
        return;
      }
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
            : "bg-white/10 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src="/instracta-logo.png"
              alt="Instracta"
              className="h-10 w-auto"
            />
            <span
              className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Instracta
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5 whitespace-nowrap">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => goToLink(link.href)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-500 hover:text-gray-900"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled ? "text-gray-500 hover:text-gray-900" : "text-white/60 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className={`text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 ${
                    scrolled
                      ? "bg-[#1A2B4A] text-white hover:bg-[#23385C]"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => goToLink("/contact")}
                  className={`text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-300 ${
                    scrolled
                      ? "border-gray-200 text-gray-700 hover:border-gray-300"
                      : "border-white/20 text-white/80 hover:bg-white/5"
                  }`}
                >
                  Contact
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className={`text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 ${
                    scrolled
                      ? "bg-[#1A2B4A] text-white hover:bg-[#23385C]"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden" aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className={scrolled ? "text-gray-900" : "text-white"} />
            ) : (
              <Menu className={scrolled ? "text-gray-900" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => goToLink(link.href)}
                    className="block w-full text-left text-gray-700 text-sm font-medium py-2"
                  >
                    {link.label}
                  </button>
                ))}
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-left text-gray-700 text-sm font-medium py-2"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut();
                      }}
                      className="w-full bg-[#1A2B4A] text-white text-sm font-medium py-3 rounded-xl mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => goToLink("/contact")}
                      className="w-full border border-gray-200 text-gray-700 text-sm font-medium py-3 rounded-xl mt-2"
                    >
                      Contact
                    </button>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/login");
                      }}
                      className="w-full bg-[#1A2B4A] text-white text-sm font-medium py-3 rounded-xl mt-2"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#1A2B4A]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white rounded-lg px-2 py-1.5">
                  <img src="/instracta-logo.png" alt="Instracta" className="h-8 w-auto" />
                </span>
                <span className="text-lg font-bold text-white tracking-tight">Instracta</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Learning programmes and tools that track what changes. Nairobi, Kenya.
              </p>
              <p className="mt-4 text-white/40 text-xs leading-relaxed">
                Instracta eLearning Solutions · Business name BN-6ASR3RYZ<br />
                Eagle House, Ndemi Road, Kilimani, Nairobi
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-4">Explore</h4>
              <ul className="space-y-2.5 text-sm">
                {[["What we stand for", "/stand"], ["Initiatives", "/initiatives"], ["Products", "/products"], ["Work with us", "/work"], ["For funders", "/funders"], ["Contact", "/contact"]].map(([l, h]) => (
                  <li key={h}><Link to={h} className="text-white/60 hover:text-white">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-4">Instracta Builder</h4>
              <ul className="space-y-2.5 text-sm">
                {[["Pricing", "/pricing"], ["Start free", "/signup"], ["Log in", "/login"]].map(([l, h]) => (
                  <li key={h}><Link to={h} className="text-white/60 hover:text-white">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/40">© 2026 Instracta. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}