import { motion } from 'motion/react';
import { Layers, Flame, MessageSquare, User, Radio } from 'lucide-react';

export default function Navigation({ currentScreen, setScreen }: { currentScreen: string, setScreen: (s: any) => void }) {
  const navItems = [
    { id: 'swipe', icon: Flame, label: 'SWIPE' },
    { id: 'reels', icon: Layers, label: 'REELS' },
    { id: 'vibes', icon: Radio, label: 'VIBES' },
    { id: 'chat', icon: MessageSquare, label: 'CHAT' },
    { id: 'profile', icon: User, label: 'PROFILE' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="absolute bottom-0 left-0 right-0 h-16 y2k-panel z-40 flex items-center justify-around px-2"
    >
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`relative flex flex-col items-center justify-center w-14 h-12 transition-all duration-200 ${
              isActive ? 'y2k-panel-inset text-y2k-pink' : 'text-black hover:bg-white/20'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} className={isActive ? 'animate-pulse' : ''} />
            <span className="text-[9px] font-sans font-bold mt-1 uppercase">
              {item.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}
