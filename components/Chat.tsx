import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MoreVertical, Send, Phone, Video, Bot, ShieldAlert } from 'lucide-react';
import Image from 'next/image';

const MATCHES = [
  { id: 1, name: 'Jinx', lastMsg: 'let\'s burn it down', time: '1m', unread: 3, avatar: 'https://picsum.photos/seed/jinx/100/100' },
  { id: 2, name: 'Zero', lastMsg: 'system failure...', time: '1h', unread: 0, avatar: 'https://picsum.photos/seed/zero/100/100' },
  { id: 3, name: 'Raven', lastMsg: 'seen//glitched', time: '2h', unread: 0, avatar: 'https://picsum.photos/seed/raven/100/100' },
  { id: 4, name: '???', lastMsg: 'Blind Date Active', time: '5h', unread: 1, avatar: 'https://picsum.photos/seed/blind/100/100', isBlind: true },
];

export default function Chat() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [showAI, setShowAI] = useState(false);

  const activeMatch = MATCHES.find(m => m.id === activeChat);

  return (
    <div className="absolute inset-0 bg-void-black z-30 flex flex-col pt-12 pb-20 px-4">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col"
          >
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-anton text-white uppercase tracking-widest glitch-text" data-text="INBOX">
                INBOX
              </h1>
              <button className="w-10 h-10 border-2 border-neon-pink flex items-center justify-center text-neon-pink hover:bg-neon-pink hover:text-black transition-colors">
                <Search size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {MATCHES.map((match, i) => (
                <motion.div
                  key={match.id}
                  whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveChat(match.id)}
                  className={`relative p-4 bg-void-gray brutalist-border cursor-pointer ${
                    i % 2 === 0 ? 'border-neon-cyan' : 'border-neon-yellow'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`relative w-14 h-14 border-2 border-white rounded-full overflow-hidden ${match.isBlind ? 'blur-md' : ''}`}>
                      <Image src={match.avatar} alt={match.name} fill className="object-cover grayscale contrast-125" referrerPolicy="no-referrer" />
                      {match.unread > 0 && (
                        <div className="absolute top-0 right-0 w-4 h-4 bg-neon-green rounded-full border-2 border-black animate-pulse" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-anton text-xl text-white tracking-wide">{match.name}</h3>
                        <span className="font-mono text-[10px] text-white/50">{match.time}</span>
                      </div>
                      <p className={`font-marker text-sm truncate ${match.unread > 0 ? 'text-neon-green' : 'text-white/70'}`}>
                        {match.lastMsg}
                      </p>
                    </div>
                  </div>
                  {/* Sticky Note Effect */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-neon-pink/20 rotate-12 -z-10" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex-1 flex flex-col h-full bg-black -mx-4 -my-12 pt-12 pb-20 px-4 relative"
          >
            {/* Chat Header */}
            <header className="flex items-center justify-between pb-4 border-b-2 border-white/20 mb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveChat(null)}
                  className="font-mono text-xs text-neon-cyan uppercase hover:text-white transition-colors"
                >
                  &lt; Back
                </button>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full overflow-hidden relative border border-white ${activeMatch?.isBlind ? 'blur-sm' : ''}`}>
                    <Image src={activeMatch?.avatar || ''} alt="avatar" fill referrerPolicy="no-referrer" />
                  </div>
                  <h2 className="font-anton text-xl text-white">{activeMatch?.name}</h2>
                </div>
              </div>
              <div className="flex gap-3 text-white/70">
                <button onClick={() => setShowAI(!showAI)} className={`transition-colors ${showAI ? 'text-neon-pink' : 'hover:text-neon-pink'}`}>
                  <Bot size={20} />
                </button>
                <Phone size={20} className="hover:text-neon-green cursor-pointer transition-colors" />
                <MoreVertical size={20} className="hover:text-white cursor-pointer transition-colors" />
              </div>
            </header>

            {/* AI Assistant Overlay */}
            <AnimatePresence>
              {showAI && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-24 left-4 right-4 bg-void-gray border-2 border-neon-pink p-4 z-20 shadow-[0_0_15px_var(--color-neon-pink)]"
                >
                  <div className="flex items-start gap-3">
                    <Bot size={24} className="text-neon-pink animate-pulse" />
                    <div>
                      <h4 className="font-mono text-xs text-neon-pink uppercase mb-2">AI Suggestion</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1 bg-black border border-neon-pink text-white font-marker text-sm hover:bg-neon-pink hover:text-black transition-colors">
                          &quot;That&apos;s a red flag tbh&quot;
                        </button>
                        <button className="px-3 py-1 bg-black border border-neon-pink text-white font-marker text-sm hover:bg-neon-pink hover:text-black transition-colors">
                          &quot;Send playlist link&quot;
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-6 pb-4">
              <div className="text-center font-mono text-[10px] text-white/30 uppercase my-4">
                Connection Established // {new Date().toLocaleDateString()}
              </div>

              {activeMatch?.isBlind && (
                <div className="bg-neon-red/20 border border-neon-red p-3 flex items-center gap-3 mb-4">
                  <ShieldAlert size={20} className="text-neon-red" />
                  <p className="font-mono text-xs text-neon-red uppercase">Blind Date Mode: Profiles reveal after 10 messages.</p>
                </div>
              )}

              {/* Received Message */}
              <div className="flex justify-start">
                <div className="max-w-[80%] torn-paper bg-void-gray text-white p-4 border-l-4 border-neon-cyan">
                  <p className="font-marker text-lg leading-tight">
                    {activeMatch?.isBlind ? "So... what's your damage?" : "You actually swiped right? Brave."}
                  </p>
                  <span className="block text-right font-mono text-[10px] text-neon-cyan mt-2">10:42 PM</span>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] torn-paper bg-white text-black p-4 border-r-4 border-neon-pink">
                  <p className="font-marker text-lg leading-tight">
                    I like living dangerously.
                  </p>
                  <span className="block text-right font-mono text-[10px] text-neon-pink mt-2">10:45 PM</span>
                </div>
              </div>

              {/* Typing Indicator */}
              <div className="flex justify-start items-center gap-2 text-white/50 font-mono text-xs">
                <div className={`w-6 h-6 rounded-full overflow-hidden relative border border-white/30 ${activeMatch?.isBlind ? 'blur-sm' : ''}`}>
                  <Image src={activeMatch?.avatar || ''} alt="avatar" fill referrerPolicy="no-referrer" />
                </div>
                <span className="animate-pulse">is typing...</span>
              </div>
            </div>

            {/* Input Area */}
            <div className="pt-4 border-t-2 border-white/20 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-2 border-white/30 p-3 font-mono text-white focus:border-neon-green focus:outline-none transition-colors"
              />
              <button className="w-14 bg-neon-green text-black flex items-center justify-center hover:bg-white transition-colors brutalist-border">
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
