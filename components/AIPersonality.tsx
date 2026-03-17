import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ScanLine, BrainCircuit } from 'lucide-react';

export default function AIPersonality({ onClose }: { onClose: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setScanning(false);
            return 100;
          }
          return p + Math.floor(Math.random() * 15);
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 bg-void-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-neon-pink transition-colors"
      >
        <X size={32} />
      </button>

      <AnimatePresence mode="wait">
        {scanning ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center w-full max-w-sm"
          >
            <div className="relative w-48 h-48 mb-12">
              <div className="absolute inset-0 border-4 border-neon-cyan rounded-full animate-ping opacity-20" />
              <div className="absolute inset-4 border-4 border-neon-pink rounded-full animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <ScanLine size={64} className="text-white flicker" />
              </div>
              {/* Scanning Line */}
              <motion.div 
                animate={{ y: [0, 192, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 right-0 h-1 bg-neon-green shadow-[0_0_15px_var(--color-neon-green)] z-10"
              />
            </div>

            <h2 className="font-anton text-3xl text-white uppercase tracking-widest mb-4 glitch-text" data-text="ANALYZING CHAOS">
              ANALYZING CHAOS
            </h2>
            
            <div className="w-full h-2 bg-void-gray border border-white/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-neon-cyan"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-mono text-xs text-neon-cyan mt-2 uppercase tracking-widest self-end">
              {progress}% // Extracting Vibe
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full max-w-sm text-center"
          >
            <div className="sticker absolute top-20 -left-4 z-10 text-lg rotate-[-12deg] text-black border-black bg-neon-yellow">
              SYSTEM DIAGNOSIS
            </div>

            <BrainCircuit size={48} className="text-neon-pink mb-6 animate-pulse" />
            
            <h3 className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2">
              You Are A:
            </h3>
            
            <div className="torn-paper bg-white text-black p-6 mb-8 w-full rotate-1 brutalist-border-pink">
              <h2 className="font-anton text-4xl uppercase leading-none mb-4">
                Softcore<br/>Nihilist
              </h2>
              <p className="font-marker text-lg leading-tight">
                &quot;You pretend nothing matters, but you still curate your Spotify playlists like they&apos;re going in a museum.&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="border-2 border-neon-cyan p-3 bg-void-gray">
                <p className="font-mono text-[10px] text-neon-cyan uppercase mb-1">Red Flag</p>
                <p className="font-marker text-sm text-white">Ghosts when overwhelmed</p>
              </div>
              <div className="border-2 border-neon-green p-3 bg-void-gray">
                <p className="font-mono text-[10px] text-neon-green uppercase mb-1">Green Flag</p>
                <p className="font-marker text-sm text-white">Sends unhinged memes</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-neon-pink text-black font-anton text-xl uppercase tracking-wider brutalist-border hover:bg-white transition-colors"
            >
              Accept Fate
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
