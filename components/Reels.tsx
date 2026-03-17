import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Music, MoreVertical } from 'lucide-react';
import Image from 'next/image';

const REELS = [
  {
    id: 1,
    user: 'Cyber_Punk',
    desc: 'Late night drives through the neon city.',
    song: 'Synthwave - Nightcall',
    likes: '12K',
    comments: '404',
    image: 'https://picsum.photos/seed/reel1/400/800',
  },
  {
    id: 2,
    user: 'Goth_Girl',
    desc: 'Cemetery walks at midnight.',
    song: 'Post Punk - Bela Lugosi',
    likes: '8.5K',
    comments: '666',
    image: 'https://picsum.photos/seed/reel2/400/800',
  },
];

export default function Reels() {
  const [currentReel, setCurrentReel] = useState(0);

  const handleScroll = (e: any) => {
    // Simple scroll simulation for prototype
    if (e.deltaY > 0 && currentReel < REELS.length - 1) {
      setCurrentReel(currentReel + 1);
    } else if (e.deltaY < 0 && currentReel > 0) {
      setCurrentReel(currentReel - 1);
    }
  };

  return (
    <div className="absolute inset-0 bg-black z-30 overflow-hidden" onWheel={handleScroll}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentReel}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          {/* Video Background Simulation */}
          <div className="absolute inset-0">
            <Image
              src={REELS[currentReel].image}
              alt="Reel"
              fill
              className="object-cover opacity-80 mix-blend-screen"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            <div className="scanlines opacity-70" />
            <div className="absolute inset-0 bg-neon-pink/5 mix-blend-overlay animate-pulse" />
          </div>

          {/* Top Bar */}
          <div className="absolute top-12 left-4 right-4 flex justify-between items-center z-10">
            <h2 className="text-2xl font-anton text-white uppercase tracking-widest drop-shadow-[2px_2px_0_var(--color-neon-cyan)]">
              REELS
            </h2>
            <button className="w-10 h-10 flex items-center justify-center text-white">
              <MoreVertical size={24} />
            </button>
          </div>

          {/* Right Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-black/50 border-2 border-neon-pink flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-black transition-colors">
                <Heart size={24} />
              </div>
              <span className="font-mono text-xs text-white drop-shadow-md">{REELS[currentReel].likes}</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-black/50 border-2 border-neon-cyan flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                <MessageCircle size={24} />
              </div>
              <span className="font-mono text-xs text-white drop-shadow-md">{REELS[currentReel].comments}</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-black/50 border-2 border-neon-yellow flex items-center justify-center text-neon-yellow group-hover:bg-neon-yellow group-hover:text-black transition-colors">
                <Share2 size={24} />
              </div>
              <span className="font-mono text-xs text-white drop-shadow-md">SHARE</span>
            </button>
            
            {/* Audio Track */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neon-pink to-neon-cyan p-1 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Music size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-24 left-4 right-20 z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full border-2 border-neon-green overflow-hidden relative">
                <Image src={`https://picsum.photos/seed/${REELS[currentReel].user}/100/100`} alt="avatar" fill referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-anton text-xl text-white tracking-wide drop-shadow-[1px_1px_0_var(--color-neon-green)]">
                @{REELS[currentReel].user}
              </h3>
              <button className="px-3 py-1 bg-transparent border border-white font-mono text-[10px] text-white uppercase hover:bg-white hover:text-black transition-colors">
                Follow
              </button>
            </div>
            <p className="font-marker text-lg text-white/90 leading-tight mb-3">
              {REELS[currentReel].desc}
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-neon-yellow bg-black/40 w-fit px-2 py-1 rounded">
              <Music size={12} className="animate-pulse" />
              <span className="truncate max-w-[200px]">{REELS[currentReel].song}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
