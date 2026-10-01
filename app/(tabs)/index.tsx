// app/(tabs)/index.tsx — Radio Santa Rosa 107.1 FM (pantalla única: reproductor)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  setAudioModeAsync,
} from 'expo-audio';

// ─────────────── CONSTANTES DE LA RADIO ───────────────
// ⚠️ PENDIENTE: reemplazar por la URL real del stream (ver instrucciones)
const STREAM_URL = 'https://sonic.nnw.cl/8046/stream';

const WEBSITE = 'https://santuariosantarosa.cl';
const WHATSAPP = 'https://wa.me/56981377705';
const FACEBOOK = 'https://www.facebook.com/santuariosantarosa.cl';
const INSTAGRAM = 'https://www.instagram.com/santuariosantarosa.cl/';
const YOUTUBE = 'https://www.youtube.com/channel/UCsNz4zS3Pqft6G2ruHgC7Mw';

const LOCK_SCREEN_METADATA = {
  title: 'Radio Santa Rosa 107.1 FM',
  artist: 'Santuario Santa Rosa de Pelequén',
  artworkUrl: 'https://santuariosantarosa.cl/wp-content/uploads/2021/08/virgen.png',
};

const ACCENT = '#1bb0ce'; // color de marca del sitio

// ─────────────── PANTALLA ───────────────
export default function RadioScreen() {
  const player = useAudioPlayer(STREAM_URL);
  const status = useAudioPlayerStatus(player);
  const [wantsToPlay, setWantsToPlay] = useState(false);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    });
    player.setActiveForLockScreen(true, LOCK_SCREEN_METADATA);
  }, [player]);

  const isPlaying = status.playing;
  const isLoading = wantsToPlay && !isPlaying && (status.isBuffering || !status.isLoaded);

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
      setWantsToPlay(false);
    } else {
      // En vivo: volver a cargar la fuente para no reanudar audio "atrasado"
      player.replace(STREAM_URL);
      player.play();
      setWantsToPlay(true);
    }
  };

  const open = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <ImageBackground
      source={require('@/assets/images/fondo.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <Image
          source={require('@/assets/images/logo-santarosa.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Radio Santa Rosa</Text>
        <Text style={styles.subtitle}>107.1 FM · Pelequén</Text>

        <TouchableOpacity
          style={styles.playButton}
          onPress={togglePlay}
          activeOpacity={0.8}
          accessibilityLabel={isPlaying ? 'Pausar radio' : 'Reproducir radio'}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FontAwesome
              name={isPlaying ? 'pause' : 'play'}
              size={42}
              color="#fff"
              style={!isPlaying && { marginLeft: 6 }}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.status}>
          {isLoading ? 'Conectando…' : isPlaying ? '● EN VIVO' : 'Toca para escuchar'}
        </Text>

        <View style={styles.socialRow}>
          <SocialButton icon="whatsapp" onPress={() => open(WHATSAPP)} />
          <SocialButton icon="facebook" onPress={() => open(FACEBOOK)} />
          <SocialButton icon="instagram" onPress={() => open(INSTAGRAM)} />
          <SocialButton icon="youtube-play" onPress={() => open(YOUTUBE)} />
          <SocialButton icon="globe" onPress={() => open(WEBSITE)} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function SocialButton({
  icon,
  onPress,
}: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress} activeOpacity={0.7}>
      <FontAwesome name={icon} size={24} color="#fff" />
    </TouchableOpacity>
  );
}

// ─────────────── ESTILOS ───────────────
const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logo: { width: 200, height: 200, marginBottom: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: ACCENT, fontSize: 18, marginTop: 4, marginBottom: 40 },
  playButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  status: { color: '#fff', fontSize: 16, marginTop: 16, letterSpacing: 1 },
  socialRow: { flexDirection: 'row', gap: 14, marginTop: 50 },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});