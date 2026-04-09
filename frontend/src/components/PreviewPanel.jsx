import { Monitor, Phone, RotateCcw, Download, Maximize2 } from 'lucide-react';
import { useState } from 'react';

export default function PreviewPanel() {
  const [viewMode, setViewMode] = useState('desktop');

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl">
      {/* Browser Header */}
      <div className="h-14 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md px-4 flex items-center justify-between">
        
        {/* Mac OS window buttons */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>

        {/* View toggles */}
        <div className="flex items-center bg-gray-200/50 dark:bg-black/50 rounded-lg p-1">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-white dark:bg-white/20 shadow-sm text-indigo-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <Monitor size={18} />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-white dark:bg-white/20 shadow-sm text-indigo-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <Phone size={18} />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <button className="hover:text-indigo-500 transition-colors">
            <RotateCcw size={18} />
          </button>
          <button className="hover:text-indigo-500 transition-colors">
            <Download size={18} />
          </button>
          <button className="hover:text-indigo-500 transition-colors">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Preview Content Area */}
      <div className="flex-1 bg-gray-100 dark:bg-neutral-900 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
        <div 
          className={`bg-white dark:bg-neutral-800 rounded-lg shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-white/5 w-full h-full flex flex-col ${viewMode === 'mobile' ? 'max-w-[375px] max-h-[812px]' : 'max-w-6xl'}`}
        >
          {/* Dummy Generated Website Content */}
          <div className="w-full h-full animate-pulse-slow relative overflow-y-auto">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-white/5">
              <div className="h-6 w-24 bg-gray-200 dark:bg-white/10 rounded-md"></div>
              <div className="flex gap-4">
                <div className="h-4 w-12 bg-gray-200 dark:bg-white/10 rounded-md"></div>
                <div className="h-4 w-12 bg-gray-200 dark:bg-white/10 rounded-md"></div>
                <div className="h-4 w-12 bg-gray-200 dark:bg-white/10 rounded-md"></div>
              </div>
            </div>
            
            {/* Hero Section */}
            <div className="p-12 flex flex-col items-center justify-center text-center mt-10">
              <div className="h-12 w-3/4 max-w-lg bg-gray-200 dark:bg-white/10 rounded-lg mb-6"></div>
              <div className="h-6 w-2/4 max-w-md bg-gray-200 dark:bg-white/10 rounded-md mb-8 pb-4"></div>
              <div className="flex gap-4 mb-20">
                <div className="h-10 w-32 bg-indigo-500/20 rounded-full"></div>
                <div className="h-10 w-32 bg-gray-200 dark:bg-white/10 rounded-full"></div>
              </div>
              
              {/* Feature grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-40 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
