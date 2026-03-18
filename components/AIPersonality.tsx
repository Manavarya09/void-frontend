import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { X, ScanLine, BrainCircuit } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AIPersonality({ onClose }) {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setScanning(false);
            return 100;
          }
          return p + Math.floor(Math.random() * 15);
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}
    >
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <X size={32} color="rgba(255,255,255,0.5)" />
      </TouchableOpacity>

      <AnimatePresence exitBeforeEnter>
        {scanning ? (
          <MotiView
            key="scanning"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, translateY: -50 }}
            style={styles.contentContainer}
          >
            <View style={styles.scannerCircleContainer}>
              <View style={[styles.circleOuter, styles.pingAnimation]} />
              <View style={styles.circleInner} />
              <ScanLine size={64} color="#fff" />

              <MotiView
                from={{ translateY: -96 }}
                animate={{ translateY: 96 }}
                transition={{
                  type: 'timing',
                  duration: 2000,
                  loop: true,
                }}
                style={styles.scanLineBar}
              />
            </View>

            <Text style={styles.analyzingText}>ANALYZING CHAOS</Text>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}% // Extracting Vibe</Text>
          </MotiView>
        ) : (
          <MotiView
            key="result"
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.contentContainer}
          >
            <View style={styles.sticker}>
              <Text style={styles.stickerText}>SYSTEM DIAGNOSIS</Text>
            </View>

            <BrainCircuit size={48} color="#FF00FF" style={styles.brainIcon} />

            <Text style={styles.subText}>You Are A:</Text>

            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Softcore{'\n'}Nihilist</Text>
              <Text style={styles.resultDesc}>
                "You pretend nothing matters, but you still curate your Spotify playlists like they're going in a museum."
              </Text>
            </View>

            <View style={styles.flagsContainer}>
              <View style={[styles.flagBox, { borderColor: '#00FFFF' }]}>
                <Text style={[styles.flagLabel, { color: '#00FFFF' }]}>Red Flag</Text>
                <Text style={styles.flagText}>Ghosts when overwhelmed</Text>
              </View>
              <View style={[styles.flagBox, { borderColor: '#00FF41' }]}>
                <Text style={[styles.flagLabel, { color: '#00FF41' }]}>Green Flag</Text>
                <Text style={styles.flagText}>Sends unhinged memes</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.acceptBtn}>
              <Text style={styles.acceptBtnText}>Accept Fate</Text>
            </TouchableOpacity>
          </MotiView>
        )}
      </AnimatePresence>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,5,5,0.9)',
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 48,
    right: 24,
    zIndex: 60,
  },
  contentContainer: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  scannerCircleContainer: {
    width: 192,
    height: 192,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    overflow: 'hidden',
  },
  circleOuter: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 4,
    borderColor: '#00FFFF',
    borderRadius: 96,
    opacity: 0.2,
  },
  pingAnimation: {
    // simplified ping
  },
  circleInner: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    borderWidth: 4,
    borderColor: '#FF00FF',
    borderRadius: 80,
  },
  scanLineBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#00FF41',
    shadowColor: '#00FF41',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    zIndex: 10,
  },
  analyzingText: {
    fontFamily: 'Anton',
    fontSize: 32,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 2, height: 0 },
    textShadowRadius: 1,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00FFFF',
  },
  progressText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: '#00FFFF',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  sticker: {
    position: 'absolute',
    top: 0,
    left: -16,
    zIndex: 10,
    backgroundColor: '#FFFF00',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#000',
    transform: [{ rotate: '-12deg' }],
  },
  stickerText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  brainIcon: {
    marginBottom: 24,
    marginTop: 24,
  },
  subText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 24,
    width: '100%',
    marginBottom: 32,
    transform: [{ rotate: '1deg' }],
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#FF00FF',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  resultTitle: {
    fontFamily: 'Anton',
    fontSize: 48,
    color: '#000',
    textTransform: 'uppercase',
    lineHeight: 48,
    marginBottom: 16,
  },
  resultDesc: {
    fontFamily: 'PermanentMarker',
    fontSize: 18,
    color: '#000',
    lineHeight: 24,
  },
  flagsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  flagBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    padding: 12,
  },
  flagLabel: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  flagText: {
    fontFamily: 'PermanentMarker',
    fontSize: 14,
    color: '#fff',
  },
  acceptBtn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#FF00FF',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FF41',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  acceptBtnText: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
