import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle shadow, border, and blur when scrolling down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Added top-4 and side padding so it doesn't touch the edges of the screen
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6 lg:px-8">
      <header
        className={`w-full max-w-5xl rounded-2xl transition-all duration-300 ${scrolled
            ? "bg-white/80 backdrop-blur-xl border border-gray-200/60 shadow-lg shadow-black/[0.03]"
            : "bg-transparent border border-transparent"
          }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">

          {/* Logo */}
          <a
            href="/"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#635BFF] to-[#4B42E4] text-base font-bold text-white shadow-[0_4px_14px_0_rgb(99,91,255,0.39)]">
              RF
            </div>

            <div className="leading-none">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                RoleFit
                <span className="ml-1 text-[#635BFF]">AI</span>
              </h1>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-500 transition-colors">
                Resume Intelligence
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center">
            <a
              href="#analyze"
              className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl bg-[#635BFF] px-6 text-sm font-medium text-white shadow-[0_4px_14px_0_rgb(99,91,255,0.39)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5548F6] hover:shadow-[0_6px_20px_rgba(99,91,255,0.23)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Analyse Resume
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute inset-x-0 top-full mt-2 origin-top overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${open ? "scale-y-100 border border-gray-200/60 opacity-100 shadow-xl" : "scale-y-0 opacity-0"
            }`}
        >
          <div className="p-4">
            <a
              href="#analyze"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#635BFF] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#5548F6] active:scale-[0.98]"
            >
              Analyse Resume
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}