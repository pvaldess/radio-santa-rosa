import type { ProgramItem, WordpressPost } from '@/types/content';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LOGO = require('../../assets/images/scfm.jpg');
const BACKGROUND = require('../../assets/images/microphones-with-sound-mixer-in-studio.jpg');

// Limpia el título de códigos HTML
function limpiarTexto(texto: string) {
  return texto
    .replace(/&#8211;/g, '–').replace(/&#8230;/g, '…')
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&').replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '').trim();
}

export default function Programacion() {
  const [programas, setProgramas] = useState<ProgramItem[]>([]);
  const [noticias, setNoticias] = useState<WordpressPost[]>([]);

  // Carga los programas desde el JSON en el sitio de la radio
  useFocusEffect(
    useCallback(() => {
      fetch('https://santacruzfm.cl/programacion.json')
        .then(res => res.json())
        .then(data => setProgramas(data))
        .catch(err => console.log('Error programas:', err));
    }, [])
  );

  // Carga las últimas noticias
  useFocusEffect(
    useCallback(() => {
      fetch('https://santacruzfm.cl/wp-json/wp/v2/posts?per_page=6')
        .then(res => res.json())
        .then(data => setNoticias(data))
        .catch(err => console.log('Error noticias:', err));
    }, [])
  );

  function abrir(link: string) {
    Linking.openURL(link).catch(err => console.error('Error:', err));
  }

  function renderPrograma({ item }: { item: ProgramItem }) {
    return (
      <TouchableOpacity style={styles.card} onPress={() => abrir(item.link)} activeOpacity={0.8}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.textoContainer}>
          <Text style={styles.nombre} numberOfLines={2}>{item.nombre}</Text>
          <Text style={styles.locutor} numberOfLines={1}>{item.locutor}</Text>
          <Text style={styles.horario} numberOfLines={2}>{item.horario}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ImageBackground source={BACKGROUND} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>

        {/* Header fijo arriba */}
        <View style={styles.header}>
          <Image source={LOGO} style={styles.headerLogo} resizeMode="contain" />
          <Text style={styles.headerTitulo}>Programación</Text>
        </View>

        {/* Contenido con scroll */}
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Carrusel de programas */}
          {/*<Text style={styles.seccionTitulo}>Nuestros Programas</Text>*/}
          <FlatList
            data={programas}
            renderItem={renderPrograma}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaHorizontal}
            snapToInterval={236}
            decelerationRate="fast"
          />

          {/* Noticias */}
          <View style={styles.noticiasSection}>
            <Text style={styles.seccionTitulo}>Últimas Noticias</Text>
            {noticias.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.noticiaItem}
                onPress={() => abrir(item.link)}
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
  scrollContent: { paddingTop: 24, paddingBottom: 30 },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  listaHorizontal: { paddingHorizontal: 20 },
  card: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  imagen: { width: '100%', height: 160, backgroundColor: '#eee' },
  textoContainer: { padding: 14 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#3a3a3a' },
  locutor: { fontSize: 13, color: '#e08a5a', fontWeight: '600', marginTop: 6 },
  horario: { fontSize: 12, color: '#a38b8b', marginTop: 6, lineHeight: 16 },
  noticiasSection: { marginTop: 30, paddingHorizontal: 20 },
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