import { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import GeneratorButton from './GeneratorButton';
import SuggestionChips from './SuggestionChips';
import { motion } from 'framer-motion';

export default function PromptBox({ initialPrompt = '', onGenerate }) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [prompt]);

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto flex flex-col items-center mt-32"
    >
      <div className="mb-8 text-center space-y-4">
        <div className="inline-block px-4 py-1.5 mb-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide uppercase">
          Welcome to WebForge AI
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          What are we <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">building</span> today?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Describe your dream website in plain English. Our AI will forge it into existence in seconds.
        </p>
      </div>

      <div className="w-full relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2rem] p-2 shadow-2xl flex flex-col transition-all duration-300">
          
          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Create a modern portfolio website for a photographer..."
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg sm:text-xl p-4 md:p-6 outline-none resize-none min-h-[80px]"
          />
          
          <div className="flex justify-between items-center p-2 mt-auto">
            <div className="text-sm text-gray-400 pl-4 hidden sm:block">
              Shift + Return for new line
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-white/5 text-white disabled:text-gray-500 rounded-full p-4 transition-all duration-300 flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm text-center text-gray-500 mb-2">Try an example</p>
        <SuggestionChips onSelect={(text) => setPrompt(text)} />
      </div>
    </motion.div>
  );
}
