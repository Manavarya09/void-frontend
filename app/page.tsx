'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Splash from '@/components/Splash';
import Onboarding from '@/components/Onboarding';
import Swipe from '@/components/Swipe';
import Reels from '@/components/Reels';
import Chat from '@/components/Chat';
import Profile from '@/components/Profile';
import Navigation from '@/components/Navigation';
import VibeRooms from '@/components/VibeRooms';

export type Screen = 'splash' | 'onboarding' | 'swipe' | 'reels' | 'chat' | 'profile' | 'vibes';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [chaosMode, setChaosMode] = useState(false);

  useEffect(() => {
    // Auto-transition from splash to onboarding after 3 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <main className={`relative w-full h-full flex flex-col bg-black overflow-hidden ${chaosMode ? 'chaos-mode-active' : ''}`}>
      <div className="y2k-grid"></div>
      <div className="scanlines opacity-50"></div>
      
      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && <Splash key="splash" />}
        {currentScreen === 'onboarding' && <Onboarding key="onboarding" onComplete={() => setCurrentScreen('swipe')} />}
        {currentScreen === 'swipe' && <Swipe key="swipe" />}
        {currentScreen === 'reels' && <Reels key="reels" />}
        {currentScreen === 'chat' && <Chat key="chat" />}
        {currentScreen === 'profile' && <Profile key="profile" chaosMode={chaosMode} setChaosMode={setChaosMode} />}
        {currentScreen === 'vibes' && <VibeRooms key="vibes" />}
      </AnimatePresence>

      {/* Show Navigation only on main app screens */}
      {['swipe', 'reels', 'chat', 'profile', 'vibes'].includes(currentScreen) && (
        <Navigation currentScreen={currentScreen} setScreen={setCurrentScreen} />
      )}
    </main>
  );
}
