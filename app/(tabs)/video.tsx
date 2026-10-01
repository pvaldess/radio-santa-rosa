import type { WordpressPost } from '@/types/content';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

const WHATSAPP = '+56982449093';
const WEBSITE = 'https://santacruzfm.cl';
const VIDEO_URL = 'https://rudo.video/live/rcruz';

const BACKGROUND = require('../../assets/images/microphones-with-sound-mixer-in-studio.jpg');
const LOGO = require('../../assets/images/scfm.jpg');

// Limpia el título de códigos HTML
function limpiarTexto(texto: string) {
  return texto
    .replace(/&#8211;/g, '–').replace(/&#8230;/g, '…')
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&').replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '').trim();
}

export default function Video() {
  const [noticias, setNoticias] = useState<WordpressPost[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetch('https://santacruzfm.cl/wp-json/wp/v2/posts?per_page=6')
        .then(res => res.json())
        .then(data => setNoticias(data))
        .catch(err => console.log('Error noticias:', err));
    }, [])
  );
  function openLink(url: string) {
    Linking.openURL(url).catch(err => console.error('Error:', err));
  }

  return (
    <ImageBackground source={BACKGROUND} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>

        {/* Header fijo arriba (fuera del scroll) */}
        <View style={styles.header}>
          <Image source={LOGO} style={styles.headerLogo} resizeMode="contain" />
          <Text style={styles.headerTitulo}>En Vivo</Text>
        </View>

        {/* Contenido con scroll */}
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Reproductor de video */}
          <View style={styles.videoWrapper}>
            <WebView
              source={{ uri: VIDEO_URL }}
              style={styles.webview}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />
          </View>

          {/* Social */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877F2' }]} onPress={() => openLink('https://www.facebook.com/profile.php?id=61592256286205')}>
              <FontAwesome name="facebook" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#E1306C' }]} onPress={() => openLink('https://www.instagram.com/santacruzfm94.3')}>
              <FontAwesome name="instagram" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#25D366' }]} onPress={() => openLink(`https://wa.me/${WHATSAPP}`)}>
              <FontAwesome name="whatsapp" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#e08a5a' }]} onPress={() => openLink(WEBSITE)}>
              <FontAwesome name="globe" size={26} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Últimas noticias */}
          <View style={styles.noticiasHome}>
            <Text style={styles.noticiasTitulo}>Últimas Noticias</Text>
            {noticias.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.noticiaItem}
                onPress={() => openLink(item.link)}
                activeOpacity={0.7}
              >
                {item.jetpack_featured_media_url ? (
                  <Image source={{ uri: item.jetpack_featured_media_url }} style={styles.noticiaImagen} />
                ) : (
                  <View style={[styles.noticiaImagen, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ fontSize: 24 }}>📰</Text>
                  </View>
                )}
                <Text style={styles.noticiaTitulo} numberOfLines={3}>
                  {limpiarTexto(item.title.rendered)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(60, 40, 40, 0.75)' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLogo: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  headerTitulo: { fontSize: 26, fontWeight: 'bold', color: '#7d6b6b' },
  scrollContent: { padding: 20 },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 30,
  },
  webview: { flex: 1, backgroundColor: '#000' },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginBottom: 30 },
  socialButton: { width: 55, height: 55, borderRadius: 27.5, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  noticiasHome: { paddingBottom: 20 },
  noticiasTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  noticiaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
  },
  noticiaImagen: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#eee' },
  noticiaTitulo: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#3a3a3a',
    lineHeight: 18,
  },
});
