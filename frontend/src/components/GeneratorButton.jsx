import { Sparkles } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function GeneratorButton({ onClick, isLoading, disabled, className, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "relative group overflow-hidden rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2",
        "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "px-6 py-3",
        className
      )}
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5" />
          {children || "Generate Website"}
        </>
      )}
    </button>
  );
}
