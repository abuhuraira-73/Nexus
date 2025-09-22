import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-black/30 backdrop-blur-lg">
      <a className="flex items-center justify-center" href="/">
        <img src="/Nexus-N-png.png" alt="Nexus Logo" className="h-8 w-8" />
        <span className="ml-2 font-semibold text-lg">Nexus</span>
      </a>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "text-sm font-medium hover:underline underline-offset-4",
              isActive && "underline"
            )
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/features"
          className={({ isActive }) =>
            cn(
              "text-sm font-medium hover:underline underline-offset-4",
              isActive && "underline"
            )
          }
        >
          Features
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            cn(
              "text-sm font-medium hover:underline underline-offset-4",
              isActive && "underline"
            )
          }
        >
          Pricing
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            cn(
              "text-sm font-medium hover:underline underline-offset-4",
              isActive && "underline"
            )
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            cn(
              "text-sm font-medium hover:underline underline-offset-4",
              isActive && "underline"
            )
          }
        >
          Login
        </NavLink>
        <a href="/register">
          <Button variant="secondary" size="sm" className="transition-transform duration-300 hover:scale-105">
            Sign Up
          </Button>
        </a>
      </nav>
    </header>
  );
}
