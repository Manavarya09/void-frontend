import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Edit3, LogOut, Camera, BrainCircuit, Flame, Trophy, Zap } from 'lucide-react';
import Image from 'next/image';
import AIPersonality from './AIPersonality';

export default function Profile({ chaosMode, setChaosMode }: { chaosMode: boolean, setChaosMode: (v: boolean) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAIScan, setShowAIScan] = useState(false);

  return (
    <div className="absolute inset-0 bg-void-black z-30 overflow-y-auto pb-24 pt-12 px-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-anton text-white uppercase tracking-widest glitch-text" data-text="ME">
          ME
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="w-10 h-10 border-2 border-neon-yellow flex items-center justify-center text-neon-yellow hover:bg-neon-yellow hover:text-black transition-colors"
          >
            <Edit3 size={20} />
          </button>
          <button className="w-10 h-10 border-2 border-white/50 flex items-center justify-center text-white/50 hover:bg-white hover:text-black transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Profile Header */}
      <div className="relative mb-12">
        <div className="w-32 h-32 mx-auto relative z-10">
          <div className="absolute inset-0 border-4 border-neon-pink rotate-3 z-20 pointer-events-none" />
          <div className="absolute inset-0 border-4 border-neon-cyan -rotate-3 z-0 pointer-events-none" />
          <div className="w-full h-full overflow-hidden bg-void-gray relative z-10">
            <Image src="https://picsum.photos/seed/me/200/200" alt="My Profile" fill className="object-cover grayscale contrast-125" referrerPolicy="no-referrer" />
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-neon-green text-black flex items-center justify-center z-30 brutalist-border hover:bg-white transition-colors">
              <Camera size={20} />
            </button>
          )}
        </div>
        
        <div className="text-center mt-6 relative z-10">
          <h2 className="text-4xl font-anton uppercase text-white drop-shadow-[2px_2px_0_var(--color-neon-pink)]">
            User_Name, <span className="text-2xl text-neon-yellow">23</span>
          </h2>
          <p className="font-mono text-xs text-neon-cyan uppercase tracking-widest mt-1">
            Status: Online // Glitching
          </p>
        </div>

        {/* Decorative Stickers */}
        <div className="sticker absolute top-0 left-4 rotate-[-15deg] z-20 text-sm text-neon-pink border-neon-pink">
          100% RAW
        </div>
        <div className="sticker absolute bottom-4 right-4 rotate-[10deg] z-20 text-sm text-neon-green border-neon-green">
          CHAOS
        </div>
      </div>

      {/* Gamification / Stats */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        <div className="bg-void-gray border-2 border-neon-red p-3 flex flex-col items-center justify-center relative overflow-hidden group">
          <Flame size={24} className="text-neon-red mb-1 group-hover:animate-ping" />
          <span className="font-anton text-2xl text-white">14</span>
          <span className="font-mono text-[9px] text-neon-red uppercase">Day Streak</span>
          <div className="absolute inset-0 bg-neon-red/10 animate-pulse pointer-events-none" />
        </div>
        <div className="bg-void-gray border-2 border-neon-yellow p-3 flex flex-col items-center justify-center">
          <Trophy size={24} className="text-neon-yellow mb-1" />
          <span className="font-anton text-2xl text-white">LVL 7</span>
          <span className="font-mono text-[9px] text-neon-yellow uppercase">Heartbreaker</span>
        </div>
        <div className="bg-void-gray border-2 border-neon-cyan p-3 flex flex-col items-center justify-center">
          <Zap size={24} className="text-neon-cyan mb-1" />
          <span className="font-anton text-2xl text-white">850</span>
          <span className="font-mono text-[9px] text-neon-cyan uppercase">XP Points</span>
        </div>
      </div>

      {/* AI Scanner Button */}
      <button 
        onClick={() => setShowAIScan(true)}
        className="w-full py-4 mb-8 bg-black border-2 border-neon-pink text-neon-pink font-anton text-xl uppercase tracking-wider hover:bg-neon-pink hover:text-black transition-colors flex items-center justify-center gap-3 brutalist-border-pink relative overflow-hidden group"
      >
        <BrainCircuit size={24} className="group-hover:animate-spin" />
        <span>Run AI Vibe Scan</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-pink/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      </button>

      {/* Bio Section */}
      <div className="mb-8 relative">
        <h3 className="font-anton text-xl text-white/50 uppercase mb-2">Bio</h3>
        <div className="torn-paper bg-white text-black p-6 rotate-1">
          {isEditing ? (
            <textarea 
              className="w-full h-24 bg-transparent border-b-2 border-black border-dashed font-marker text-xl focus:outline-none resize-none"
              defaultValue="I don't do small talk. Show me your weirdest playlist."
            />
          ) : (
            <p className="font-marker text-xl leading-relaxed">
              I don&apos;t do small talk. Show me your weirdest playlist.
            </p>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-12">
        <h3 className="font-anton text-xl text-white/50 uppercase mb-4">Vibes</h3>
        <div className="flex flex-wrap gap-3">
          {['Cyberpunk', 'Late Nights', 'Noise Music', 'Coffee'].map((tag, i) => (
            <div 
              key={tag} 
              className={`px-4 py-2 border-2 font-mono text-sm uppercase ${
                i % 2 === 0 ? 'border-neon-cyan text-neon-cyan -rotate-2' : 'border-neon-pink text-neon-pink rotate-2'
              } ${isEditing ? 'cursor-pointer hover:bg-white hover:text-black transition-colors' : ''}`}
            >
              {tag}
              {isEditing && <span className="ml-2 text-xs">x</span>}
            </div>
          ))}
          {isEditing && (
            <button className="px-4 py-2 border-2 border-white border-dashed font-mono text-sm text-white uppercase hover:bg-white hover:text-black transition-colors">
              + Add Vibe
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {/* Chaos Mode Toggle */}
        <div className="flex items-center justify-between p-4 border-2 border-white/20 bg-void-gray">
          <div>
            <h4 className="font-anton text-lg text-white uppercase">Chaos Mode</h4>
            <p className="font-mono text-[10px] text-white/50 uppercase">Warning: Unstable UI</p>
          </div>
          <button 
            onClick={() => setChaosMode(!chaosMode)}
            className={`w-14 h-8 border-2 flex items-center p-1 transition-colors ${
              chaosMode ? 'border-neon-green bg-neon-green/20 justify-end' : 'border-white/50 bg-black justify-start'
            }`}
          >
            <div className={`w-5 h-5 ${chaosMode ? 'bg-neon-green' : 'bg-white/50'}`} />
          </button>
        </div>

        <button className="w-full py-4 bg-void-gray border-2 border-neon-yellow text-neon-yellow font-anton text-xl uppercase tracking-wider hover:bg-neon-yellow hover:text-black transition-colors flex items-center justify-center gap-2">
          <span>Get Premium</span>
          <span className="font-mono text-xs bg-neon-yellow text-black px-2 py-1 ml-2">VOID+</span>
        </button>
        
        <button className="w-full py-4 bg-transparent border-2 border-white/20 text-white/50 font-anton text-xl uppercase tracking-wider hover:bg-neon-pink hover:text-black hover:border-neon-pink transition-colors flex items-center justify-center gap-2">
          <LogOut size={20} />
          <span>Disconnect</span>
        </button>
      </div>

      <AnimatePresence>
        {showAIScan && <AIPersonality onClose={() => setShowAIScan(false)} />}
      </AnimatePresence>
    </div>
  );
}
