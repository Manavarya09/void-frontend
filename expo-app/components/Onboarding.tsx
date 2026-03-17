import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, translateY: -50 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}
    >
      <AnimatePresence exitBeforeEnter>
        {step === 0 && (
          <MotiView
            key="step0"
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.panel}
          >
            <LinearGradient colors={['#000080', '#1084d0']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.titlebar}>
              <Text style={styles.titleText}>CYBER_LUV.exe</Text>
              <TouchableOpacity style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>X</Text>
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.content}>
              <Text style={styles.headerText}>
                Welcome{'\n'}To{'\n'}2000
              </Text>
              <Text style={styles.warningText}>
                Warning: High levels of aesthetic detected. Proceed?
              </Text>
              <TouchableOpacity onPress={nextStep} style={styles.button}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        )}

        {step === 1 && (
          <MotiView
            key="step1"
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.panel}
          >
            <LinearGradient colors={['#000080', '#1084d0']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.titlebar}>
              <Text style={styles.titleText}>Identify_Yourself.dll</Text>
              <TouchableOpacity style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>X</Text>
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.content}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Screen Name:</Text>
                <TextInput style={styles.input} placeholderTextColor="#666" placeholder="xX_angel_Xx" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password:</Text>
                <TextInput style={styles.input} placeholderTextColor="#666" placeholder="••••••••" secureTextEntry />
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.btnSmall]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextStep} style={[styles.button, styles.btnSmall]}>
                  <Text style={styles.buttonText}>Connect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>
        )}

        {step === 2 && (
          <MotiView
            key="step2"
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.panel}
          >
            <LinearGradient colors={['#800040', '#ff007f']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.titlebar}>
              <Text style={styles.titleText}>A/S/L Check</Text>
              <TouchableOpacity style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>X</Text>
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.content}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} placeholderTextColor="#666" placeholder="Real Name" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Age:</Text>
                <TextInput style={[styles.input, { width: 100 }]} placeholderTextColor="#666" placeholder="21" keyboardType="numeric" />
              </View>
              <TouchableOpacity onPress={nextStep} style={[styles.button, { marginTop: 32 }]}>
                <Text style={styles.buttonText}>Next &gt;</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        )}

        {step === 3 && (
          <MotiView
            key="step3"
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.panel}
          >
            <LinearGradient colors={['#000080', '#1084d0']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.titlebar}>
              <Text style={styles.titleText}>Select_Aesthetic.exe</Text>
              <TouchableOpacity style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>X</Text>
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.content}>
              <View style={styles.grid}>
                {['Cyber', 'Bling', 'Pop Punk', 'Frutiger Aero', 'Scene', 'Goth'].map((vibe) => (
                  <TouchableOpacity key={vibe} style={styles.gridItem}>
                    <Text style={styles.gridItemText}>{vibe}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity onPress={nextStep} style={[styles.button, { marginTop: 32 }]}>
                <Text style={styles.buttonText}>Finish Setup</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 40,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    width: '100%',
    maxWidth: 384,
    backgroundColor: '#c0c0c0', // y2k-silver
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#808080',
    borderBottomColor: '#808080',
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
  },
  titlebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  titleText: {
    color: '#ffffff',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  closeBtn: {
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderRightColor: '#ffffff',
    borderBottomColor: '#ffffff',
    paddingHorizontal: 4,
  },
  closeBtnText: {
    color: '#000',
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  headerText: {
    fontSize: 36,
    fontFamily: 'Anton',
    textTransform: 'uppercase',
    color: '#FF007F', // y2k-pink
    textAlign: 'center',
    marginBottom: 16,
    // Note: Chrome text effect difficult in plain RN, using solid pink
  },
  warningText: {
    fontFamily: 'JetBrainsMono',
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#c0c0c0',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#808080',
    borderBottomColor: '#808080',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderRightColor: '#ffffff',
    borderBottomColor: '#ffffff',
    padding: 8,
    fontFamily: 'JetBrainsMono',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 32,
    gap: 8,
  },
  btnSmall: {
    width: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  gridItem: {
    width: '45%',
    margin: '2.5%',
    padding: 8,
    backgroundColor: '#c0c0c0',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#808080',
    borderBottomColor: '#808080',
    alignItems: 'center',
  },
  gridItemText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
});
