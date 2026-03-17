import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MotiView, useAnimationState } from 'moti';
import { Layers, Flame, MessageSquare, User, Radio } from 'lucide-react-native';

export default function Navigation({ currentScreen, setScreen }) {
  const navItems = [
    { id: 'swipe', icon: Flame, label: 'SWIPE' },
    { id: 'reels', icon: Layers, label: 'REELS' },
    { id: 'vibes', icon: Radio, label: 'VIBES' },
    { id: 'chat', icon: MessageSquare, label: 'CHAT' },
    { id: 'profile', icon: User, label: 'PROFILE' },
  ];

  return (
    <MotiView
      from={{ translateY: 100 }}
      animate={{ translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.navContainer}
    >
      <View style={styles.navBar}>
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setScreen(item.id)}
              style={[styles.navItem, isActive ? styles.navItemActive : styles.navItemInactive]}
              activeOpacity={0.7}
            >
              <MotiView
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                  loop: isActive,
                }}
              >
                <Icon
                  size={20}
                  color={isActive ? '#FF007F' : '#000'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              </MotiView>
              <Text style={[styles.navText, { color: isActive ? '#FF007F' : '#000' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    zIndex: 40,
    paddingHorizontal: 8,
    // y2k-panel styles
    backgroundColor: '#c0c0c0',
    borderTopWidth: 2,
    borderTopColor: '#ffffff',
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 48,
  },
  navItemActive: {
    // y2k-panel-inset styles
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderRightColor: '#ffffff',
    borderBottomColor: '#ffffff',
  },
  navItemInactive: {
    backgroundColor: 'transparent',
  },
  navText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 9,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});
