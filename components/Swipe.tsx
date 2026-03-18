import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { X, Heart, Zap } from 'lucide-react-native';
import { Image } from 'expo-image';
import { AnimatePresence, MotiView } from 'moti';

const { width } = Dimensions.get('window');

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
  const [action, setAction] = useState(null);

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > 120) {
          handleSwipe('like');
        } else if (gesture.dx < -120) {
          handleSwipe('nope');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const handleSwipe = (type) => {
    setAction(type);
    Animated.timing(position, {
      toValue: { x: type === 'like' ? width * 1.5 : -width * 1.5, y: type === 'super' ? -width * 1.5 : 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setProfiles((prev) => prev.slice(1));
      setAction(null);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const forceAction = (type) => {
    handleSwipe(type);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const getLikeOpacity = () => {
    return position.x.interpolate({
      inputRange: [0, width / 4],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
  };

  const getNopeOpacity = () => {
    return position.x.interpolate({
      inputRange: [-width / 4, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  };

  const renderCard = () => {
    if (profiles.length === 0) {
      return (
        <View style={styles.noMoreContainer}>
          <Text style={styles.noMoreText}>NO MORE HUMANS</Text>
          <Text style={styles.noMoreSub}>Searching the void...</Text>
        </View>
      );
    }

    const profile = profiles[0];

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, getCardStyle()]}
      >
        <Image source={{ uri: profile.image }} style={styles.image} contentFit="cover" />
        <View style={styles.gradient} />

        {/* Labels */}
        <Animated.View style={[styles.likeLabelContainer, { opacity: getLikeOpacity() }]}>
          <Text style={styles.likeLabel}>LIKE</Text>
        </Animated.View>
        <Animated.View style={[styles.nopeLabelContainer, { opacity: getNopeOpacity() }]}>
          <Text style={styles.nopeLabel}>NOPE</Text>
        </Animated.View>

        {/* Action Animation Overlay */}
        {action === 'like' && (
          <View style={[styles.actionOverlay, { backgroundColor: 'rgba(0, 255, 65, 0.2)' }]}>
            <Heart size={100} color="#00FF41" fill="#00FF41" />
          </View>
        )}
        {action === 'nope' && (
          <View style={[styles.actionOverlay, { backgroundColor: 'rgba(255, 0, 255, 0.2)' }]}>
            <X size={100} color="#FF00FF" />
          </View>
        )}
        {action === 'super' && (
          <View style={[styles.actionOverlay, { backgroundColor: 'rgba(0, 255, 255, 0.2)' }]}>
            <Zap size={100} color="#00FFFF" fill="#00FFFF" />
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{profile.name}, <Text style={styles.ageText}>{profile.age}</Text></Text>
          <Text style={styles.bioText}>"{profile.bio}"</Text>
          <View style={styles.tagsContainer}>
            {profile.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VOID</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Zap size={20} color="#00FFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {renderCard()}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => forceAction('nope')} style={[styles.controlBtn, { borderColor: '#FF00FF' }]}>
          <X size={32} color="#FF00FF" strokeWidth={3} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => forceAction('super')} style={[styles.controlBtnSmall, { borderColor: '#00FFFF' }]}>
          <Zap size={24} color="#00FFFF" strokeWidth={3} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => forceAction('like')} style={[styles.controlBtn, { borderColor: '#00FF41' }]}>
          <Heart size={32} color="#00FF41" strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    paddingBottom: 80, // for nav
    paddingTop: 48,
    paddingHorizontal: 16,
    zIndex: 30,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Anton',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: '100%',
    maxWidth: 340,
    aspectRatio: 3 / 4,
    backgroundColor: '#1a1a1a', // void-gray
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#00FF41', // neon-green
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    // grayscale, contrast etc. require expo-image or specific processing, simple cover for now
    opacity: 0.8,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Simple gradient substitute
  },
  likeLabelContainer: {
    position: 'absolute',
    top: 32,
    left: 32,
    zIndex: 20,
    borderWidth: 4,
    borderColor: '#00FF41',
    padding: 8,
    transform: [{ rotate: '-15deg' }],
  },
  likeLabel: {
    color: '#00FF41',
    fontFamily: 'Anton',
    fontSize: 32,
    textTransform: 'uppercase',
  },
  nopeLabelContainer: {
    position: 'absolute',
    top: 32,
    right: 32,
    zIndex: 20,
    borderWidth: 4,
    borderColor: '#FF00FF',
    padding: 8,
    transform: [{ rotate: '15deg' }],
  },
  nopeLabel: {
    color: '#FF00FF',
    fontFamily: 'Anton',
    fontSize: 32,
    textTransform: 'uppercase',
  },
  actionOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    zIndex: 10,
  },
  nameText: {
    fontSize: 36,
    fontFamily: 'Anton',
    color: '#ffffff',
    textTransform: 'uppercase',
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginBottom: 8,
  },
  ageText: {
    fontSize: 24,
    color: '#FFFF00', // neon-yellow
  },
  bioText: {
    fontFamily: 'PermanentMarker',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tagText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: '#00FFFF', // neon-cyan
    textTransform: 'uppercase',
  },
  noMoreContainer: {
    alignItems: 'center',
  },
  noMoreText: {
    fontSize: 24,
    fontFamily: 'Anton',
    color: '#FF00FF',
    marginBottom: 8,
  },
  noMoreSub: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono',
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginTop: 24,
  },
  controlBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  controlBtnSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
