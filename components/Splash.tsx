import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView, MotiText } from 'moti';

export default function Splash() {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ type: 'timing', duration: 500 }}
      style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <View style={styles.textContainer}>
        <MotiText
          from={{ translateX: 0, translateY: 0 }}
          animate={{ translateX: [-2, 2, -2, 0], translateY: [2, -2, 2, 0] }}
          transition={{
            type: 'timing',
            duration: 200,
            loop: true,
            repeatReverse: true,
          }}
          style={styles.glitchText}
        >
          VOID
        </MotiText>
        <View style={styles.pinkLine} />
      </View>
      <Text style={styles.subText}>
        System Error // Loading
      </Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505', // void-black
    zIndex: 50,
  },
  textContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glitchText: {
    fontSize: 72,
    fontFamily: 'Anton',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: -2,
    // Note: Text shadow glitch effect simplified for RN
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: -2, height: 0 },
    textShadowRadius: 1,
  },
  pinkLine: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: 4,
    backgroundColor: '#FF00FF', // neon-pink
    opacity: 0.5,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    // mix-blend-screen not easily supported in plain RN without extras, simulating with opacity
  },
  subText: {
    marginTop: 16,
    fontFamily: 'JetBrainsMono',
    color: '#00FF41', // neon-green
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
});
