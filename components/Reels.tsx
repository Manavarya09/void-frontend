import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ViewToken } from 'react-native';
import { Heart, MessageCircle, Share2, Music, MoreVertical } from 'lucide-react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const REELS = [
  {
    id: '1',
    user: 'Cyber_Punk',
    desc: 'Late night drives through the neon city.',
    song: 'Synthwave - Nightcall',
    likes: '12K',
    comments: '404',
    image: 'https://picsum.photos/seed/reel1/400/800',
  },
  {
    id: '2',
    user: 'Goth_Girl',
    desc: 'Cemetery walks at midnight.',
    song: 'Post Punk - Bela Lugosi',
    likes: '8.5K',
    comments: '666',
    image: 'https://picsum.photos/seed/reel2/400/800',
  },
];

export default function Reels() {
  const [currentReel, setCurrentReel] = useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.reelContainer}>
        <Image source={{ uri: item.image }} style={styles.backgroundVideo} contentFit="cover" />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradient} />

        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>REELS</Text>
          <TouchableOpacity style={styles.topBarBtn}>
            <MoreVertical size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Right Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionIcon, { borderColor: '#FF00FF' }]}>
              <Heart size={24} color="#FF00FF" />
            </View>
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionIcon, { borderColor: '#00FFFF' }]}>
              <MessageCircle size={24} color="#00FFFF" />
            </View>
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionIcon, { borderColor: '#FFFF00' }]}>
              <Share2 size={24} color="#FFFF00" />
            </View>
            <Text style={styles.actionText}>SHARE</Text>
          </TouchableOpacity>

          <View style={styles.audioTrack}>
            <View style={styles.audioTrackInner}>
              <Music size={16} color="#fff" />
            </View>
          </View>
        </View>

        {/* Bottom Info */}
        <View style={styles.infoContainer}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: `https://picsum.photos/seed/${item.user}/100/100` }} style={styles.avatar} contentFit="cover" />
            </View>
            <Text style={styles.username}>@{item.user}</Text>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followBtnText}>FOLLOW</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.descText}>{item.desc}</Text>
          <View style={styles.songInfo}>
            <Music size={12} color="#FFFF00" />
            <Text style={styles.songText} numberOfLines={1}>{item.song}</Text>
          </View>
        </View>
      </View>
    );
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      setCurrentReel(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={REELS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    zIndex: 30,
  },
  reelContainer: {
    width: width,
    height: height,
    position: 'relative',
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    top: '50%', // Fade up from bottom half
  },
  topBar: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  topBarTitle: {
    fontSize: 24,
    fontFamily: 'Anton',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#00FFFF', // neon-cyan
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  topBarBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    position: 'absolute',
    right: 16,
    bottom: 128,
    alignItems: 'center',
    gap: 24,
    zIndex: 10,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  audioTrack: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF00FF', // Gradient proxy
    padding: 4,
    marginTop: 8,
  },
  audioTrackInner: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 96,
    left: 16,
    right: 80, // leave room for actions
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00FF41',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
    textShadowColor: '#00FF41',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  followBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  followBtnText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: '#fff',
    textTransform: 'uppercase',
  },
  descText: {
    fontFamily: 'PermanentMarker',
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: 12,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  songText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: '#FFFF00',
    maxWidth: 200,
  },
});
