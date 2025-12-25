import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-black/30 backdrop-blur-lg">
        <a className="flex items-center justify-center" href="/">
          <img src="/Nexus-N-png.png" alt="Nexus Logo" className="h-8 w-8" />
          <span className="ml-2 font-semibold text-lg">Nexus</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden lg:flex items-center gap-6 sm:gap-8">
          <NavLink to="/" className={({ isActive }) => cn("text-sm font-medium hover:underline underline-offset-4", isActive && "underline")}>Home</NavLink>
          <NavLink to="/features" className={({ isActive }) => cn("text-sm font-medium hover:underline underline-offset-4", isActive && "underline")}>Features</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => cn("text-sm font-medium hover:underline underline-offset-4", isActive && "underline")}>Pricing</NavLink>
          <NavLink to="/contact" className={({ isActive }) => cn("text-sm font-medium hover:underline underline-offset-4", isActive && "underline")}>Contact</NavLink>
          <NavLink to="/coming-soon" className={({ isActive }) => cn("text-sm font-medium hover:underline underline-offset-4", isActive && "underline")}>Coming Soon</NavLink>
          <NavLink to="/login" className={({ isActive }) => cn("text-sm font-medium hover:underline underline-offset-4", isActive && "underline")}>Login</NavLink>
          <a href="/register">
            <Button variant="secondary" size="sm" className="transition-transform duration-300 hover:scale-105">
              Sign Up
            </Button>
          </a>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="ml-auto lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </div>
      </header>

      {/* Custom Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[80vw] sm:w-[50vw] bg-black p-6 pt-10"
            >
              <nav className="flex flex-col items-start gap-6 text-xl font-medium tracking-wide mt-8">
                <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => cn("py-2 hover:text-foreground/80", isActive && "text-foreground")}>Home</NavLink>
                <NavLink to="/features" onClick={handleLinkClick} className={({ isActive }) => cn("py-2 hover:text-foreground/80", isActive && "text-foreground")}>Features</NavLink>
                <NavLink to="/pricing" onClick={handleLinkClick} className={({ isActive }) => cn("py-2 hover:text-foreground/80", isActive && "text-foreground")}>Pricing</NavLink>
                <NavLink to="/contact" onClick={handleLinkClick} className={({ isActive }) => cn("py-2 hover:text-foreground/80", isActive && "text-foreground")}>Contact</NavLink>
                <NavLink to="/coming-soon" onClick={handleLinkClick} className={({ isActive }) => cn("py-2 hover:text-foreground/80", isActive && "text-foreground")}>Coming Soon</NavLink>
                <NavLink to="/login" onClick={handleLinkClick} className={({ isActive }) => cn("py-2 hover:text-foreground/80", isActive && "text-foreground")}>Login</NavLink>
                <a href="/register" onClick={handleLinkClick} className="w-full">
                  <Button variant="secondary" className="w-full text-lg py-2 transition-transform duration-300 hover:scale-105">
                    Sign Up
                  </Button>
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
