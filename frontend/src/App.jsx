import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import PromptBox from './components/PromptBox';
import Loader from './components/Loader';
import Workspace from './components/Workspace';

function App() {
  const [appState, setAppState] = useState('idle'); // idle -> generating -> generated
  const [initialPrompt, setInitialPrompt] = useState('');
  const [projectId, setProjectId] = useState(null);
  const [projectFiles, setProjectFiles] = useState(null);

  const handleGenerate = async (prompt) => {
    setInitialPrompt(prompt);
    setAppState('generating');
    
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setProjectId(data.id);
        setProjectFiles(JSON.parse(data.files));
        setAppState('generated');
      } else {
        console.error('Generation failed:', data.error);
        setAppState('idle');
      }
    } catch (error) {
      console.error('Request failed:', error);
      setAppState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background Decorations */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full h-screen px-4 md:px-8 pt-24 pb-8">
        <AnimatePresence mode="wait">
          
          {/* Idle State: Big prompt box */}
          {appState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col justify-center"
            >
              <PromptBox onGenerate={handleGenerate} />
            </motion.div>
          )}

          {/* Generating State: Loading spinner & shapes */}
          {appState === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="h-full flex items-center justify-center"
            >
              <Loader text="Analyzing constraints and forging components..." />
            </motion.div>
          )}

          {/* Generated State: Split view workspace */}
          {appState === 'generated' && (
            <motion.div
              key="generated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <Workspace initialPrompt={initialPrompt} projectId={projectId} initialFiles={projectFiles} />
            </motion.div>
          )}
          
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
