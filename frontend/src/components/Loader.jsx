import { motion } from 'framer-motion';

export default function Loader({ text = "Forging your website..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <div className="relative w-24 h-24">
        {/* Floating shapes animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-indigo-500/30 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -180, -360],
            borderRadius: ["50%", "20%", "50%"],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="absolute inset-2 bg-purple-500/40 blur-lg"
        />
        <motion.div
          animate={{ scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md flex items-center justify-center"
        >
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse"
      >
        {text}
      </motion.p>
    </div>
  );
}
