
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile'; // New import

interface SuggestionButtonProps {
  onClick: () => void;
  className?: string;
}

export const SuggestionButton: React.FC<SuggestionButtonProps> = ({ onClick, className }) => {
  const isMobile = useIsMobile(); // Use the hook

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition-transform hover:scale-110 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2',
        isMobile ? 'bottom-5' : 'bottom-[80px]', // Conditional bottom
        className
      )}
      aria-label="Share Feedback"
    >
      <Lightbulb className="h-6 w-6" />
    </button>
  );
};
