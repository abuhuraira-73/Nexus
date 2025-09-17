import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    const scrolled = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrolled / scrollHeight) * 100;

    setScrollProgress(progress);

    if (scrolled > 100) { // Show button after scrolling 100px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 rounded-full transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        "p-[2px]" // This creates the thin border space
      )}
      style={{
        background: `conic-gradient(white ${scrollProgress}%, transparent ${scrollProgress}%)`,
      }}
    >
      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-black text-white shadow-lg flex items-center justify-center"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
}