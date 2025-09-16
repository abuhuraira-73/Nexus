import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-black/30 backdrop-blur-lg">
      <a className="flex items-center justify-center" href="/">
        <Zap className="h-6 w-6" />
        <span className="ml-2 font-semibold text-lg">Nexus</span>
      </a>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
          Home
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/features">
          Features
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
          Pricing
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
          Contact
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/login">
          Login
        </a>
        <a href="/register">
          <Button variant="secondary" size="sm" className="transition-transform duration-300 hover:scale-105">
            Sign Up
          </Button>
        </a>
      </nav>
    </header>
  );
}
