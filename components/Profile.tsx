import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { LogOut, BrainCircuit, Edit2, Settings } from 'lucide-react-native';
import { Image } from 'expo-image';
import AIPersonality from './AIPersonality';

export default function Profile({ chaosMode, setChaosMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAIScan, setShowAIScan] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PROFILE</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editBtn}>
            <Edit2 size={20} color={isEditing ? '#00FF41' : '#fff'} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: 'https://picsum.photos/seed/user/400/400' }} style={styles.profileImage} contentFit="cover" />
          <View style={styles.gradient} />
          <View style={styles.profileInfo}>
            <Text style={styles.nameText}>xX_ANGEL_Xx, 21</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>404</Text>
                <Text style={styles.statLabel}>LIKES</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>666</Text>
                <Text style={styles.statLabel}>MATCHES</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Scanner Button */}
        <TouchableOpacity onPress={() => setShowAIScan(true)} style={styles.aiBtn}>
          <BrainCircuit size={24} color="#FF00FF" />
          <Text style={styles.aiBtnText}>Run AI Vibe Scan</Text>
        </TouchableOpacity>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BIO</Text>
          <View style={styles.bioBox}>
            {isEditing ? (
              <TextInput
                style={styles.bioInput}
                multiline
                defaultValue="I don't do small talk. Show me your weirdest playlist."
              />
            ) : (
              <Text style={styles.bioText}>
                I don't do small talk. Show me your weirdest playlist.
              </Text>
            )}
          </View>
        </View>

        {/* Tags Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VIBES</Text>
          <View style={styles.tagsContainer}>
            {['Cyberpunk', 'Late Nights', 'Noise Music', 'Coffee'].map((tag, i) => (
              <View
                key={tag}
                style={[
                  styles.tag,
                  i % 2 === 0 ? styles.tagCyan : styles.tagPink,
                ]}
              >
                <Text style={[styles.tagText, i % 2 === 0 ? { color: '#00FFFF' } : { color: '#FF00FF' }]}>
                  {tag}
                </Text>
                {isEditing && <Text style={styles.tagRemove}> x</Text>}
              </View>
            ))}
            {isEditing && (
              <TouchableOpacity style={styles.addTagBtn}>
                <Text style={styles.addTagText}>+ ADD VIBE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {/* Chaos Mode Toggle */}
          <View style={styles.chaosRow}>
            <View>
              <Text style={styles.chaosTitle}>CHAOS MODE</Text>
              <Text style={styles.chaosSub}>WARNING: UNSTABLE UI</Text>
            </View>
            <TouchableOpacity
              onPress={() => setChaosMode(!chaosMode)}
              style={[styles.toggleBtn, chaosMode ? styles.toggleOn : styles.toggleOff]}
            >
              <View style={[styles.toggleThumb, chaosMode ? styles.thumbOn : styles.thumbOff]} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.premiumBtn}>
            <Text style={styles.premiumText}>GET PREMIUM</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>VOID+</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.disconnectBtn}>
            <LogOut size={20} color="rgba(255,255,255,0.5)" />
            <Text style={styles.disconnectText}>DISCONNECT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AnimatePresence>
        {showAIScan && <AIPersonality onClose={() => setShowAIScan(false)} />}
      </AnimatePresence>
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
  scrollContent: {
    paddingBottom: 24,
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
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 2, height: 0 },
    textShadowRadius: 1,
  },
  editBtn: {
    padding: 8,
  },
  profileCard: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#1a1a1a',
    marginBottom: 24,
    shadowColor: '#00FF41',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    overflow: 'hidden',
  },
  profileImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  nameText: {
    fontFamily: 'Anton',
    fontSize: 32,
    color: '#fff',
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statBox: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statValue: {
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    color: '#00FFFF',
    fontWeight: 'bold',
  },
  statLabel: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  aiBtn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#FF00FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
    shadowColor: '#FF00FF',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  aiBtnText: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: '#FF00FF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 8,
  },
  bioBox: {
    backgroundColor: '#fff',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    transform: [{ rotate: '1deg' }],
  },
  bioText: {
    fontFamily: 'PermanentMarker',
    fontSize: 20,
    color: '#000',
    lineHeight: 28,
  },
  bioInput: {
    fontFamily: 'PermanentMarker',
    fontSize: 20,
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    borderStyle: 'dashed',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagCyan: {
    borderColor: '#00FFFF',
    transform: [{ rotate: '-2deg' }],
  },
  tagPink: {
    borderColor: '#FF00FF',
    transform: [{ rotate: '2deg' }],
  },
  tagText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  tagRemove: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    marginLeft: 8,
  },
  addTagBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  addTagText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 14,
    color: '#fff',
    textTransform: 'uppercase',
  },
  actionsContainer: {
    gap: 16,
  },
  chaosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  chaosTitle: {
    fontFamily: 'Anton',
    fontSize: 18,
    color: '#fff',
  },
  chaosSub: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  toggleBtn: {
    width: 56,
    height: 32,
    borderWidth: 2,
    padding: 4,
    justifyContent: 'center',
  },
  toggleOff: {
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: '#000',
    alignItems: 'flex-start',
  },
  toggleOn: {
    borderColor: '#00FF41',
    backgroundColor: 'rgba(0,255,65,0.2)',
    alignItems: 'flex-end',
  },
  toggleThumb: {
    width: 20,
    height: 20,
  },
  thumbOff: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  thumbOn: {
    backgroundColor: '#00FF41',
  },
  premiumBtn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#FFFF00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  premiumText: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: '#FFFF00',
    letterSpacing: 1,
  },
  premiumBadge: {
    backgroundColor: '#FFFF00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  premiumBadgeText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  disconnectBtn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disconnectText: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
  },
});
