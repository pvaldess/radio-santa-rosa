import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Linking, Image } from 'react-native';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const STREAM_URL = 'https://rudo.video/live/rcruz/manifest.m3u8';
const STATION_NAME = 'RADIO SANTA CRUZ';
const STATION_FREQUENCY = '94.3 FM';
const STATION_CITY = 'Santa Cruz - O\'Higgins';
const WHATSAPP = '+56982449093';
const WEBSITE = 'https://santacruzfm.cl';
const LOGO_URL = 'https://santacruzfm.cl/wp-content/uploads/2021/10/Logo-final_Mesa-de-trabajo-30-300x300.png';
const LOCK_SCREEN_METADATA = {
  title: 'Radio Santa Cruz 94.3 FM',
  artist: "Santa Cruz - O'Higgins",
  albumTitle: 'En vivo',
  artworkUrl: LOGO_URL,
};
const LOCK_SCREEN_OPTIONS = {
  showSeekBackward: false,
  showSeekForward: false,
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const player = useAudioPlayer(STREAM_URL);
  const status = useAudioPlayerStatus(player);
  const playing = status.playing;

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    }).catch(error => console.log('Error audio mode:', error));
  }, []);

  useEffect(() => {
    return () => {
      player.clearLockScreenControls();
    };
  }, [player]);

  useEffect(() => {
    if (status.playing || (loading && status.isLoaded && !status.isBuffering)) {
      setLoading(false);
    }
  }, [loading, status.isBuffering, status.isLoaded, status.playing]);

  function togglePlay() {
    try {
      if (playing) {
        player.pause();
        setLoading(false);
      } else {
        setLoading(true);
        player.setActiveForLockScreen(true, LOCK_SCREEN_METADATA, LOCK_SCREEN_OPTIONS);
        player.play();
      }
    } catch (error) {
      console.log('Error:', error);
      alert('No se pudo conectar al stream.');
      setLoading(false);
    }
  }

  function openLink(url) {
    Linking.openURL(url).catch(err => console.error('Error:', err));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => openLink(WEBSITE)}>
            <Text style={styles.headerIcon}>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => openLink(`https://wa.me/${WHATSAPP}`)}>
            <Text style={styles.headerIcon}>💬</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <View style={styles.logoBorder}>
            <Image source={{ uri: LOGO_URL }} style={styles.logoImage} resizeMode="contain" />
            <Text style={styles.frequency}>{STATION_FREQUENCY}</Text>
            <Text style={styles.stationName}>{STATION_NAME}</Text>
            <Text style={styles.tagline}>Lo Radio de Nuestra Gente</Text>
          </View>
        </View>

        <View style={styles.nowPlayingContainer}>
          <Text style={styles.nowPlayingLabel}>Estás Escuchando:</Text>
          <Text style={styles.nowPlayingText}>{STATION_NAME}</Text>
          <Text style={styles.cityText}>{STATION_CITY}</Text>
          <Text style={styles.statusIndicator}>
            {loading ? '⏳ Conectando...' : playing ? '🔴 EN VIVO' : '⏸ Pausado'}
          </Text>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlButtonText}>⏮</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.playButton, loading && styles.playButtonDisabled]} onPress={togglePlay} disabled={loading}>
            <Text style={styles.playButtonText}>{playing ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlButtonText}>⏭</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://www.facebook.com/santacruzfm94.3')}>
            <Text style={styles.socialIcon}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://www.instagram.com/santacruzfm94.3')}>
            <Text style={styles.socialIcon}>📷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => openLink(`https://wa.me/${WHATSAPP}`)}>
            <Text style={styles.socialIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => openLink(WEBSITE)}>
            <Text style={styles.socialIcon}>🌐</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d4a5a5' },
  scrollContent: { flexGrow: 1, paddingVertical: 20, paddingHorizontal: 20, justifyContent: 'flex-start' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, paddingHorizontal: 10 },
  headerButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(125, 107, 107, 0.15)', borderWidth: 2, borderColor: 'rgba(125, 107, 107, 0.25)', justifyContent: 'center', alignItems: 'center' },
  headerIcon: { fontSize: 24, color: '#7d6b6b' },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  logoBorder: { width: 280, height: 320, borderRadius: 30, backgroundColor: 'rgba(255, 255, 255, 0.85)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10, borderWidth: 2, borderColor: 'rgba(212, 165, 165, 0.3)' },
  logoImage: { width: 110, height: 110, marginBottom: 15 },
  frequency: { fontSize: 14, fontWeight: '700', color: '#a38b8b', marginBottom: 8, letterSpacing: 1.5 },
  stationName: { fontSize: 32, fontWeight: '800', color: '#7d6b6b', textAlign: 'center', marginBottom: 8 },
  tagline: { fontSize: 11, color: '#a38b8b', marginTop: 8, textAlign: 'center', letterSpacing: 0.5, fontStyle: 'italic' },
  nowPlayingContainer: { backgroundColor: 'rgba(212, 165, 165, 0.3)', borderRadius: 20, paddingVertical: 25, paddingHorizontal: 20, marginBottom: 40, alignItems: 'center', borderWidth: 2, borderColor: 'rgba(212, 165, 165, 0.5)' },
  nowPlayingLabel: { fontSize: 13, color: '#6b5b5b', marginBottom: 8, fontWeight: '600' },
  nowPlayingText: { fontSize: 18, fontWeight: 'bold', color: '#7d6b6b', textAlign: 'center', marginBottom: 8 },
  cityText: { fontSize: 12, color: '#9d8b8b', marginBottom: 12 },
  statusIndicator: { fontSize: 16, fontWeight: 'bold', color: '#d19a7a' },
  controlsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 30, marginBottom: 50 },
  controlButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(212, 165, 165, 0.35)', borderWidth: 2, borderColor: 'rgba(212, 165, 165, 0.5)', justifyContent: 'center', alignItems: 'center' },
  controlButtonText: { fontSize: 28, color: '#7d6b6b' },
  playButton: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#d9a8a8', justifyContent: 'center', alignItems: 'center', shadowColor: 'rgba(212, 165, 165, 0.4)', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 15, elevation: 20 },
  playButtonDisabled: { opacity: 0.6 },
  playButtonText: { fontSize: 50, color: '#fff', fontWeight: 'bold' },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 15, paddingBottom: 20 },
  socialButton: { width: 55, height: 55, borderRadius: 27.5, backgroundColor: 'rgba(212, 165, 165, 0.3)', borderWidth: 2, borderColor: 'rgba(212, 165, 165, 0.5)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  socialIcon: { fontSize: 24, color: '#7d6b6b', fontWeight: 'bold' },
});
