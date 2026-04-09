import { Code2, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark mode on initial load
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 w-full flex items-center justify-between px-6 py-4 z-50 bg-white/5 dark:bg-black/20 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <Code2 size={28} strokeWidth={2.5} />
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          WebForge<span className="text-indigo-600 dark:text-indigo-400">.ai</span>
        </span>
      </div>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all duration-200"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}
