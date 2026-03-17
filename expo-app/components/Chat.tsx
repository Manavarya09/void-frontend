import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { Search, MoreVertical, Send, Phone, Bot, ShieldAlert } from 'lucide-react-native';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

const MATCHES = [
  { id: 1, name: 'Jinx', lastMsg: "let's burn it down", time: '1m', unread: 3, avatar: 'https://picsum.photos/seed/jinx/100/100' },
  { id: 2, name: 'Zero', lastMsg: 'system failure...', time: '1h', unread: 0, avatar: 'https://picsum.photos/seed/zero/100/100' },
  { id: 3, name: 'Raven', lastMsg: 'seen//glitched', time: '2h', unread: 0, avatar: 'https://picsum.photos/seed/raven/100/100' },
  { id: 4, name: '???', lastMsg: 'Blind Date Active', time: '5h', unread: 1, avatar: 'https://picsum.photos/seed/blind/100/100', isBlind: true },
];

export default function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const [inputText, setInputText] = useState('');

  const activeMatch = MATCHES.find(m => m.id === activeChat);

  const renderInbox = () => (
    <MotiView
      key="list"
      from={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -50 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>INBOX</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Search size={20} color="#FF00FF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {MATCHES.map((match, i) => (
          <TouchableOpacity
            key={match.id}
            onPress={() => setActiveChat(match.id)}
            style={[styles.matchItem, { borderColor: i % 2 === 0 ? '#00FFFF' : '#FFFF00' }]}
          >
            <View style={styles.matchItemContent}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: match.avatar }} style={[styles.avatar, match.isBlind && { opacity: 0.5 }]} blurRadius={match.isBlind ? 5 : 0} />
                {match.unread > 0 && <View style={styles.unreadBadge} />}
              </View>
              <View style={styles.matchInfo}>
                <View style={styles.matchHeader}>
                  <Text style={styles.matchName}>{match.name}</Text>
                  <Text style={styles.matchTime}>{match.time}</Text>
                </View>
                <Text style={[styles.matchMsg, match.unread > 0 && { color: '#00FF41' }]} numberOfLines={1}>
                  {match.lastMsg}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </MotiView>
  );

  const renderChat = () => (
    <MotiView
      key="chat"
      from={{ opacity: 0, translateX: 50 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 50 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.chatContainer}
    >
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <View style={styles.chatHeaderLeft}>
          <TouchableOpacity onPress={() => setActiveChat(null)}>
            <Text style={styles.backBtnText}>&lt; BACK</Text>
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <View style={styles.chatHeaderAvatarContainer}>
              <Image source={{ uri: activeMatch.avatar }} style={styles.avatar} blurRadius={activeMatch.isBlind ? 5 : 0} />
            </View>
            <Text style={styles.chatHeaderName}>{activeMatch.name}</Text>
          </View>
        </View>
        <View style={styles.chatHeaderActions}>
          <TouchableOpacity onPress={() => setShowAI(!showAI)}>
            <Bot size={20} color={showAI ? '#FF00FF' : 'rgba(255,255,255,0.7)'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Phone size={20} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MoreVertical size={20} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Assistant Overlay */}
      <AnimatePresence>
        {showAI && (
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            style={styles.aiOverlay}
          >
            <View style={styles.aiContent}>
              <Bot size={24} color="#FF00FF" />
              <View style={styles.aiTexts}>
                <Text style={styles.aiTitle}>AI SUGGESTION</Text>
                <View style={styles.aiButtons}>
                  <TouchableOpacity style={styles.aiBtn}>
                    <Text style={styles.aiBtnText}>"That's a red flag tbh"</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.aiBtn}>
                    <Text style={styles.aiBtnText}>"Send playlist link"</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </MotiView>
        )}
      </AnimatePresence>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.connectionText}>CONNECTION ESTABLISHED // {new Date().toLocaleDateString()}</Text>

        {activeMatch.isBlind && (
          <View style={styles.blindAlert}>
            <ShieldAlert size={20} color="#FF003C" />
            <Text style={styles.blindAlertText}>Blind Date Mode: Profiles reveal after 10 messages.</Text>
          </View>
        )}

        {/* Received Message */}
        <View style={styles.msgRowLeft}>
          <View style={[styles.msgBubble, styles.msgBubbleLeft]}>
            <Text style={styles.msgText}>{activeMatch.isBlind ? "So... what's your damage?" : "You actually swiped right? Brave."}</Text>
            <Text style={styles.msgTimeLeft}>10:42 PM</Text>
          </View>
        </View>

        {/* Sent Message */}
        <View style={styles.msgRowRight}>
          <View style={[styles.msgBubble, styles.msgBubbleRight]}>
            <Text style={styles.msgTextRight}>I like living dangerously.</Text>
            <Text style={styles.msgTimeRight}>10:45 PM</Text>
          </View>
        </View>

        {/* Typing Indicator */}
        <View style={styles.typingIndicator}>
          <View style={[styles.avatarContainer, { width: 24, height: 24 }]}>
            <Image source={{ uri: activeMatch.avatar }} style={styles.avatar} blurRadius={activeMatch.isBlind ? 5 : 0} />
          </View>
          <Text style={styles.typingText}>is typing...</Text>
        </View>
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendBtn}>
          <Send size={20} color="#000" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </MotiView>
  );

  return (
    <View style={styles.wrapper}>
      <AnimatePresence exitBeforeEnter>
        {!activeChat ? renderInbox() : renderChat()}
      </AnimatePresence>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#050505', // void-black
  },
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 80, // for nav
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
  searchBtn: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#FF00FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
  matchItem: {
    backgroundColor: '#1a1a1a', // void-gray
    borderWidth: 2,
    padding: 16,
    marginBottom: 16,
    // brutalist-border equivalent shadow handled by container/border
    shadowColor: '#fff',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  matchItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00FF41',
    borderWidth: 2,
    borderColor: '#000',
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  matchName: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
  },
  matchTime: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  matchMsg: {
    fontFamily: 'PermanentMarker',
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },

  // Chat styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtnText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: '#00FFFF',
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chatHeaderAvatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  chatHeaderName: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: '#fff',
  },
  chatHeaderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  aiOverlay: {
    position: 'absolute',
    top: 96,
    left: 16,
    right: 16,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#FF00FF',
    padding: 16,
    zIndex: 20,
    shadowColor: '#FF00FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  aiContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  aiTexts: {
    flex: 1,
  },
  aiTitle: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: '#FF00FF',
    marginBottom: 8,
  },
  aiButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  aiBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FF00FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  aiBtnText: {
    fontFamily: 'PermanentMarker',
    fontSize: 14,
    color: '#fff',
  },
  messagesContainer: {
    flex: 1,
  },
  connectionText: {
    textAlign: 'center',
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    marginVertical: 16,
  },
  blindAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,0,60,0.2)',
    borderWidth: 1,
    borderColor: '#FF003C',
    padding: 12,
    marginBottom: 16,
  },
  blindAlertText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: '#FF003C',
    flex: 1,
  },
  msgRowLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  msgBubbleLeft: {
    backgroundColor: '#1a1a1a',
    borderLeftWidth: 4,
    borderLeftColor: '#00FFFF',
  },
  msgRowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  msgBubbleRight: {
    backgroundColor: '#fff',
    borderRightWidth: 4,
    borderRightColor: '#FF00FF',
  },
  msgBubble: {
    maxWidth: '80%',
    padding: 16,
    // simulated torn paper
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  msgText: {
    fontFamily: 'PermanentMarker',
    fontSize: 18,
    color: '#fff',
  },
  msgTextRight: {
    fontFamily: 'PermanentMarker',
    fontSize: 18,
    color: '#000',
  },
  msgTimeLeft: {
    textAlign: 'right',
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: '#00FFFF',
    marginTop: 8,
  },
  msgTimeRight: {
    textAlign: 'right',
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    color: '#FF00FF',
    marginTop: 8,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  typingText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  inputArea: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    padding: 12,
    fontFamily: 'JetBrainsMono',
    color: '#fff',
  },
  sendBtn: {
    width: 56,
    backgroundColor: '#00FF41',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    // brutalist-border
    shadowColor: '#00FF41',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
});
