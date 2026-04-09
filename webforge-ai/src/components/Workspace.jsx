import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare } from 'lucide-react';
import PreviewPanel from './PreviewPanel';
import GeneratorButton from './GeneratorButton';
import { motion } from 'framer-motion';

export default function Workspace({ initialPrompt }) {
  const [currentPrompt, setCurrentPrompt] = useState(initialPrompt);
  const [messages, setMessages] = useState([
    { role: 'user', content: initialPrompt },
    { role: 'assistant', content: 'I engineered this website based on your requirements. What else would you like to tweak?' }
  ]);
  const [draftPrompt, setDraftPrompt] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUpdate = () => {
    if (!draftPrompt.trim()) return;
    
    setMessages([...messages, { role: 'user', content: draftPrompt }]);
    setDraftPrompt("");
    setCurrentPrompt(draftPrompt);
    setIsUpdating(true);
    
    // Simulate updating
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I have updated the design. How does it look now?' }]);
      setIsUpdating(false);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpdate();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row h-full gap-6 w-full max-w-[1600px] mx-auto mt-16 pb-6"
    >
      
      {/* Left Panel: Prompt Editor & Chat */}
      <div className="w-full lg:w-[400px] xl:w-[480px] flex flex-col h-[calc(100vh-120px)] bg-white/40 dark:bg-black/20 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg shrink-0">
        
        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
              )}
              
              <div className={`p-4 rounded-2xl text-sm md:text-base max-w-[85%] ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm'
              }`}>
                {msg.content}
              </div>
              
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-gray-500 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-b-2xl">
          <div className="relative">
            <textarea
              value={draftPrompt}
              onChange={(e) => setDraftPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Refine something (e.g. 'Make it darker')"
              className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-indigo-500/50 focus:bg-white dark:focus:bg-black/50 text-gray-900 dark:text-white rounded-xl placeholder-gray-500 dark:placeholder-gray-400 py-3 pl-4 pr-12 outline-none resize-none min-h-[60px] max-h-[150px] transition-all"
              rows={2}
            />
            <button
              onClick={handleUpdate}
              disabled={!draftPrompt.trim() || isUpdating}
              className="absolute right-3 bottom-4 p-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 dark:disabled:bg-white/20 text-white rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="mt-4 flex gap-2 w-full">
            <GeneratorButton 
              onClick={handleUpdate} 
              isLoading={isUpdating} 
              disabled={!draftPrompt.trim() && !isUpdating}
              className="w-full py-2.5 text-sm"
            >
              Update Website
            </GeneratorButton>
          </div>
        </div>
      </div>

      {/* Right Panel: Preview Area */}
      <div className="flex-1 h-[600px] lg:h-[calc(100vh-120px)] lg:min-w-0">
        <PreviewPanel />
      </div>

    </motion.div>
  );
}
