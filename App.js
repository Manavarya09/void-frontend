import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { AnimatePresence } from 'moti';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Splash from './components/Splash';
import Onboarding from './components/Onboarding';
import Swipe from './components/Swipe';
import Reels from './components/Reels';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import VibeRooms from './components/VibeRooms';

export default function App() {
  const [fontsLoaded] = useFonts({
    Anton: require('./assets/fonts/Anton-Regular.ttf'),
    PermanentMarker: require('./assets/fonts/PermanentMarker-Regular.ttf'),
    JetBrainsMono: require('./assets/fonts/JetBrainsMono-Regular.ttf'),
    Inter: require('./assets/fonts/Inter-Regular.ttf'),
  });

  const [currentScreen, setCurrentScreen] = useState('splash');
  const [chaosMode, setChaosMode] = useState(false);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const loadingOverlay = !fontsLoaded && (
    <View style={styles.loadingContainer} pointerEvents="none">
      <ActivityIndicator size="large" color="#00FF41" />
      <Text style={styles.loadingText}>Initializing experience...</Text>
    </View>
  );

  const showNavigation = ['swipe', 'reels', 'chat', 'profile', 'vibes'].includes(currentScreen);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={[styles.main, chaosMode && styles.chaosMode]}>
          {loadingOverlay}

          {/* Background Effects */}
          <View style={styles.gridContainer}>
            {/* Grid simulation if possible, else skip or use simple view */}
          </View>

          <AnimatePresence exitBeforeEnter>
            {currentScreen === 'splash' && <Splash key="splash" />}
            {currentScreen === 'onboarding' && <Onboarding key="onboarding" onComplete={() => setCurrentScreen('swipe')} />}
            {currentScreen === 'swipe' && <Swipe key="swipe" />}
            {currentScreen === 'reels' && <Reels key="reels" />}
            {currentScreen === 'chat' && <Chat key="chat" />}
            {currentScreen === 'profile' && <Profile key="profile" chaosMode={chaosMode} setChaosMode={setChaosMode} />}
            {currentScreen === 'vibes' && <VibeRooms key="vibes" />}
          </AnimatePresence>

          {showNavigation && (
            <Navigation currentScreen={currentScreen} setScreen={setCurrentScreen} />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  main: {
    flex: 1,
    backgroundColor: '#050505',
    overflow: 'hidden',
    position: 'relative',
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
    height: '100%',
  },
  chaosMode: {
    // Basic implementation for chaos mode
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 5, 5, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    gap: 12,
  },
  loadingText: {
    marginTop: 16,
    color: '#00FF41',
    fontFamily: 'JetBrainsMono',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  }
});
