import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { Users, EyeOff, Flame, MessageSquare } from 'lucide-react-native';

const VIBE_ROOMS = [
  { id: 1, name: 'Midnight Rants', users: 42, themeColor: '#FF00FF', tag: 'Chaos' },
  { id: 2, name: 'Goth GF/BF Search', users: 13, themeColor: '#00FFFF', tag: 'Dating' },
  { id: 3, name: 'Noise Music Only', users: 7, themeColor: '#FFFF00', tag: 'Music' },
];

const CONFESSIONS = [
  { id: 1, text: "I swiped right just because of your dog, but now I'm obsessed with your playlist.", time: '2m ago' },
  { id: 2, text: "I pretend to like techno so I fit in here.", time: '15m ago' },
];

export default function VibeRooms() {
  const [activeTab, setActiveTab] = useState('rooms');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VIBES</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('rooms')}
          style={[styles.tabBtn, activeTab === 'rooms' ? styles.tabActiveRooms : styles.tabInactive]}
        >
          <Text style={[styles.tabText, activeTab === 'rooms' ? { color: '#000' } : { color: 'rgba(255,255,255,0.5)' }]}>
            ROOMS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('confessions')}
          style={[styles.tabBtn, activeTab === 'confessions' ? styles.tabActiveConfessions : styles.tabInactive]}
        >
          <Text style={[styles.tabText, activeTab === 'confessions' ? { color: '#000' } : { color: 'rgba(255,255,255,0.5)' }]}>
            SECRETS
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <AnimatePresence exitBeforeEnter>
          {activeTab === 'rooms' && (
            <MotiView
              key="rooms"
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -20 }}
              transition={{ type: 'timing', duration: 300 }}
              style={styles.listContainer}
            >
              <View style={styles.sticker}>
                <Text style={styles.stickerText}>Live Now</Text>
              </View>
              {VIBE_ROOMS.map((room) => (
                <TouchableOpacity
                  key={room.id}
                  style={[styles.roomCard, { borderColor: room.themeColor }]}
                >
                  <View style={styles.roomHeader}>
                    <Text style={[styles.roomName, { color: room.themeColor }]}>{room.name}</Text>
                    <View style={styles.usersCount}>
                      <Users size={12} color="rgba(255,255,255,0.5)" />
                      <Text style={styles.usersText}>{room.users}</Text>
                    </View>
                  </View>
                  <View style={styles.roomFooter}>
                    <View style={styles.tagBox}>
                      <Text style={styles.tagText}>#{room.tag}</Text>
                    </View>
                    <Text style={[styles.joinText, { color: room.themeColor }]}>Join &gt;</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </MotiView>
          )}

          {activeTab === 'confessions' && (
            <MotiView
              key="confessions"
              from={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: 20 }}
              transition={{ type: 'timing', duration: 300 }}
              style={styles.listContainer}
            >
              <TouchableOpacity style={styles.confessBtn}>
                <EyeOff size={20} color="rgba(255,255,255,0.7)" />
                <Text style={styles.confessText}>Confess Something...</Text>
              </TouchableOpacity>

              <View style={styles.confessionsList}>
                {CONFESSIONS.map((confession) => (
                  <View key={confession.id} style={styles.confessionCard}>
                    <Text style={styles.confessionText}>"{confession.text}"</Text>
                    <View style={styles.confessionFooter}>
                      <Text style={styles.confessionTime}>Anonymous // {confession.time}</Text>
                      <View style={styles.confessionActions}>
                        <TouchableOpacity>
                          <Flame size={14} color="rgba(255,255,255,0.5)" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <MessageSquare size={14} color="rgba(255,255,255,0.5)" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </MotiView>
          )}
        </AnimatePresence>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 80, // for nav
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Anton',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#FFFF00', // neon-yellow
    textShadowOffset: { width: 2, height: 0 },
    textShadowRadius: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActiveRooms: {
    backgroundColor: '#00FF41',
    borderColor: '#00FF41',
  },
  tabActiveConfessions: {
    backgroundColor: '#FF00FF',
    borderColor: '#FF00FF',
  },
  tabInactive: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tabText: {
    fontFamily: 'Anton',
    fontSize: 20,
    letterSpacing: 1,
  },
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 24,
  },
  sticker: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#00FFFF',
    transform: [{ rotate: '12deg' }],
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  stickerText: {
    fontFamily: 'PermanentMarker',
    fontSize: 12,
    color: '#00FFFF',
  },
  roomCard: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    padding: 16,
    marginBottom: 16,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  roomName: {
    fontFamily: 'Anton',
    fontSize: 24,
    textTransform: 'uppercase',
    flex: 1,
    paddingRight: 16,
  },
  usersCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  usersText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tagBox: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: '#fff',
    textTransform: 'uppercase',
  },
  joinText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  confessBtn: {
    width: '100%',
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  confessText: {
    fontFamily: 'PermanentMarker',
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
  confessionsList: {
    gap: 16,
  },
  confessionCard: {
    backgroundColor: '#000',
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF00FF',
    // torn-paper proxy
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  confessionText: {
    fontFamily: 'PermanentMarker',
    fontSize: 18,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 12,
  },
  confessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confessionTime: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  confessionActions: {
    flexDirection: 'row',
    gap: 12,
  },
});
