import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { X, Heart, Zap } from 'lucide-react';
import Image from 'next/image';

const PROFILES = [
  {
    id: 1,
    name: 'Jinx',
    age: 22,
    bio: 'Looking for someone to watch the world burn with.',
    image: 'https://picsum.photos/seed/jinx/400/600',
    tags: ['Chaos', 'Neon Punk'],
  },
  {
    id: 2,
    name: 'Zero',
    age: 24,
    bio: 'Error 404: Bio not found.',
    image: 'https://picsum.photos/seed/zero/400/600',
    tags: ['Cyber', 'Goth'],
  },
  {
    id: 3,
    name: 'Raven',
    age: 21,
    bio: 'I only listen to bands you\'ve never heard of.',
    image: 'https://picsum.photos/seed/raven/400/600',
    tags: ['Softcore', 'Skater'],
  },
];

export default function Swipe() {
  const [profiles, setProfiles] = useState(PROFILES);
  const [action, setAction] = useState<'like' | 'nope' | 'super' | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      handleAction('like');
    } else if (info.offset.x < -100) {
      handleAction('nope');
    }
  };

  const handleAction = (type: 'like' | 'nope' | 'super') => {
    setAction(type);
    setTimeout(() => {
      setProfiles((prev) => prev.slice(1));
      setAction(null);
      x.set(0);
    }, 400);
  };

  return (
    <div className="absolute inset-0 pb-20 pt-12 px-4 flex flex-col z-30">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-anton text-white uppercase tracking-widest glitch-text" data-text="VOID">
          VOID
        </h1>
        <button className="w-10 h-10 border-2 border-neon-cyan flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors">
          <Zap size={20} />
        </button>
      </header>

      <div className="relative flex-1 flex items-center justify-center">
        <AnimatePresence>
          {profiles.length > 0 ? (
            <motion.div
              key={profiles[0].id}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ 
                x: action === 'like' ? 300 : action === 'nope' ? -300 : 0,
                y: action === 'super' ? -300 : 0,
                opacity: 0,
                scale: 0.9,
                rotate: action === 'like' ? 15 : action === 'nope' ? -15 : 0
              }}
              transition={{ duration: 0.3 }}
              className="absolute w-full max-w-[340px] aspect-[3/4] bg-void-gray brutalist-border overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={profiles[0].image}
                  alt={profiles[0].name}
                  fill
                  className="object-cover grayscale contrast-125 brightness-75 mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="scanlines opacity-50" />
              </div>

              {/* Overlays */}
              <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-20 border-4 border-neon-green text-neon-green font-anton text-4xl p-2 rotate-[-15deg] uppercase">
                LIKE
              </motion.div>
              <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 z-20 border-4 border-neon-pink text-neon-pink font-anton text-4xl p-2 rotate-[15deg] uppercase">
                NOPE
              </motion.div>

              {/* Action Animations */}
              {action === 'like' && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-neon-green/20 backdrop-blur-sm">
                  <Heart size={100} className="text-neon-green fill-neon-green animate-ping" />
                </div>
              )}
              {action === 'nope' && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-neon-pink/20 backdrop-blur-sm">
                  <X size={100} className="text-neon-pink animate-pulse" />
                </div>
              )}
              {action === 'super' && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-neon-cyan/20 backdrop-blur-sm">
                  <Zap size={100} className="text-neon-cyan fill-neon-cyan animate-bounce" />
                </div>
              )}

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="flex items-end justify-between mb-2">
                  <h2 className="text-4xl font-anton uppercase text-white drop-shadow-[2px_2px_0_var(--color-neon-pink)]">
                    {profiles[0].name}, <span className="text-2xl text-neon-yellow">{profiles[0].age}</span>
                  </h2>
                </div>
                <p className="font-marker text-lg text-white/90 leading-tight mb-4">
                  &quot;{profiles[0].bio}&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                  {profiles[0].tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-black border border-white/30 font-mono text-xs text-neon-cyan uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center font-mono text-white/50">
              <p className="text-2xl font-anton text-neon-pink mb-2">NO MORE HUMANS</p>
              <p className="text-xs uppercase tracking-widest">Searching the void...</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-6">
        <button 
          onClick={() => handleAction('nope')}
          className="w-16 h-16 rounded-full border-2 border-neon-pink flex items-center justify-center text-neon-pink hover:bg-neon-pink hover:text-black transition-colors"
        >
          <X size={32} strokeWidth={3} />
        </button>
        <button 
          onClick={() => handleAction('super')}
          className="w-12 h-12 rounded-full border-2 border-neon-cyan flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors"
        >
          <Zap size={24} strokeWidth={3} />
        </button>
        <button 
          onClick={() => handleAction('like')}
          className="w-16 h-16 rounded-full border-2 border-neon-green flex items-center justify-center text-neon-green hover:bg-neon-green hover:text-black transition-colors"
        >
          <Heart size={32} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
