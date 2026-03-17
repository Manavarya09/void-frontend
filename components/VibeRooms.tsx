import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, EyeOff, Flame, MessageSquare } from 'lucide-react';

const VIBE_ROOMS = [
  { id: 1, name: 'Midnight Rants', users: 42, theme: 'neon-pink', tag: 'Chaos' },
  { id: 2, name: 'Goth GF/BF Search', users: 13, theme: 'neon-cyan', tag: 'Dating' },
  { id: 3, name: 'Noise Music Only', users: 7, theme: 'neon-yellow', tag: 'Music' },
];

const CONFESSIONS = [
  { id: 1, text: "I swiped right just because of your dog, but now I'm obsessed with your playlist.", time: '2m ago' },
  { id: 2, text: "I pretend to like techno so I fit in here.", time: '15m ago' },
];

export default function VibeRooms() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'confessions'>('rooms');

  return (
    <div className="absolute inset-0 bg-void-black z-30 flex flex-col pt-12 pb-20 px-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-anton text-white uppercase tracking-widest glitch-text" data-text="VIBES">
          VIBES
        </h1>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('rooms')}
          className={`flex-1 py-3 font-anton text-xl uppercase tracking-wider border-2 transition-colors ${
            activeTab === 'rooms' ? 'bg-neon-green text-black border-neon-green' : 'bg-transparent text-white/50 border-white/20'
          }`}
        >
          Rooms
        </button>
        <button 
          onClick={() => setActiveTab('confessions')}
          className={`flex-1 py-3 font-anton text-xl uppercase tracking-wider border-2 transition-colors ${
            activeTab === 'confessions' ? 'bg-neon-pink text-black border-neon-pink' : 'bg-transparent text-white/50 border-white/20'
          }`}
        >
          Secrets
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'rooms' && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="sticker absolute top-32 right-4 z-10 text-xs rotate-12 text-neon-cyan border-neon-cyan">
                Live Now
              </div>
              {VIBE_ROOMS.map((room, i) => (
                <div key={room.id} className={`p-4 border-2 border-${room.theme} bg-void-gray relative group cursor-pointer hover:bg-${room.theme}/10 transition-colors`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-anton text-2xl text-${room.theme} uppercase`}>{room.name}</h3>
                    <div className="flex items-center gap-1 text-white/50 font-mono text-xs">
                      <Users size={12} />
                      <span>{room.users}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="px-2 py-1 bg-black border border-white/20 font-mono text-[10px] text-white uppercase">
                      #{room.tag}
                    </span>
                    <button className={`font-mono text-xs text-${room.theme} uppercase hover:text-white transition-colors`}>
                      Join &gt;
                    </button>
                  </div>
                  {/* Glitch hover effect */}
                  <div className={`absolute inset-0 border-2 border-${room.theme} opacity-0 group-hover:opacity-50 group-hover:animate-ping pointer-events-none`} />
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'confessions' && (
            <motion.div
              key="confessions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <button className="w-full py-4 border-2 border-white border-dashed text-white/70 font-marker text-lg hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                <EyeOff size={20} />
                Confess Something...
              </button>

              <div className="space-y-4">
                {CONFESSIONS.map((confession, i) => (
                  <div key={confession.id} className="torn-paper bg-black text-white p-4 border-l-4 border-neon-pink">
                    <p className="font-marker text-lg leading-tight mb-3">
                      &quot;{confession.text}&quot;
                    </p>
                    <div className="flex justify-between items-center font-mono text-[10px] text-white/50">
                      <span>Anonymous // {confession.time}</span>
                      <div className="flex gap-3">
                        <button className="hover:text-neon-pink transition-colors"><Flame size={14} /></button>
                        <button className="hover:text-neon-cyan transition-colors"><MessageSquare size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
