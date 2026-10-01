// app/(tabs)/noticias.tsx — Noticias desde el WordPress de santuariosantarosa.cl
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Linking,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

// ─────────────── CONSTANTES ───────────────
const NEWS_URL =
  'https://santuariosantarosa.cl/wp-json/wp/v2/posts?per_page=20&_fields=id,title,link,date,jetpack_featured_media_url';
const ACCENT = '#1bb0ce';

type Post = {
  id: number;
  title: { rendered: string };
  link: string;
  date: string;
  jetpack_featured_media_url?: string;
};

// Convierte entidades HTML (&#8220; &amp; etc.) a texto normal
function decodeHtml(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '');
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
    'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

// ─────────────── PANTALLA ───────────────
export default function NoticiasScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(false);
      const res = await fetch(NEWS_URL);
      if (!res.ok) throw new Error(String(res.status));
      setPosts(await res.json());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Recarga al entrar a la pestaña (igual que en la app base)
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => Linking.openURL(item.link).catch(() => {})}
    >
      {item.jetpack_featured_media_url ? (
        <Image source={{ uri: item.jetpack_featured_media_url }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]} />
      )}
      <View style={styles.cardBody}>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
        <Text style={styles.title} numberOfLines={3}>
          {decodeHtml(item.title.rendered)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('@/assets/images/microphones-with-sound-mixer-in-studio.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container} edges={['top']}>
        <Text style={styles.header}>Noticias</Text>

        {loading ? (
          <ActivityIndicator size="large" color={ACCENT} style={{ marginTop: 40 }} />
        ) : error && posts.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>No se pudieron cargar las noticias.</Text>
            <TouchableOpacity style={styles.retry} onPress={() => { setLoading(true); load(); }}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(p) => String(p.id)}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => { setRefreshing(true); load(); }}
                tintColor="#fff"
                colors={[ACCENT]}
              />
            }
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

// ─────────────── ESTILOS ───────────────
const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.65)' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginVertical: 16 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: { width: '100%', aspectRatio: 16 / 9 },
  imagePlaceholder: { backgroundColor: 'rgba(255,255,255,0.1)' },
  cardBody: { padding: 12 },
  date: { color: ACCENT, fontSize: 13, marginBottom: 4 },
  title: { color: '#fff', fontSize: 16, fontWeight: '600', lineHeight: 22 },
  center: { alignItems: 'center', marginTop: 40 },
  errorText: { color: '#fff', fontSize: 16 },
  retry: { marginTop: 12, backgroundColor: ACCENT, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  retryText: { color: '#fff', fontWeight: '600' },
});