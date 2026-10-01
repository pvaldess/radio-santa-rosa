// app/(tabs)/donar.tsx — Donaciones al Santuario Santa Rosa de Pelequén
import { FontAwesome } from '@expo/vector-icons';
import {
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─────────────── CONSTANTES (datos tomados de santuariosantarosa.cl) ───────────────
const ACCENT = '#1bb0ce';
const IMAGEN_VIRGEN = 'https://santuariosantarosa.cl/wp-content/uploads/2021/08/virgen.png';

// Links de Mercado Pago por monto
const MONTOS = [
  { monto: '$5.000', url: 'https://mpago.li/2T7f6gs' },
  { monto: '$10.000', url: 'https://mpago.la/2NKeHmX' },
  { monto: '$20.000', url: 'https://mpago.li/1jZYMaj' },
  { monto: '$30.000', url: 'https://mpago.li/33opQYY' },
  { monto: '$50.000', url: 'https://mpago.li/2N2PzQi' },
];

// Datos para transferencia
const CUENTA = [
  { label: 'Banco', valor: 'Banco de Chile' },
  { label: 'Tipo de cuenta', valor: 'Cuenta Corriente' },
  { label: 'N° de cuenta', valor: '020-4479-9008' },
  { label: 'Titular', valor: 'Parroquia Santa Rosa de Pelequén' },
  { label: 'RUT', valor: '70.339.700-K' },
  { label: 'Email', valor: 'parroquia.santuariosantarosa@gmail.com' },
];

const TELEFONO_FIJO = 'tel:+56722284065';
const WHATSAPP = 'https://wa.me/56981377705';

// ─────────────── PANTALLA ───────────────
export default function DonarScreen() {
  // Los pagos se abren en el navegador (no dentro de la app), como exige Apple para donaciones
  const abrir = (url: string) => Linking.openURL(url).catch(() => {});

  const compartirDatos = () => {
    const texto =
      'Datos para transferencia — Santuario Santa Rosa de Pelequén\n\n' +
      CUENTA.map((c) => `${c.label}: ${c.valor}`).join('\n');
    Share.share({ message: texto });
  };

  return (
    <ImageBackground
      source={require('@/assets/images/fondo.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: IMAGEN_VIRGEN }} style={styles.virgen} resizeMode="contain" />

          <Text style={styles.header}>Colabora con el Santuario</Text>
          <Text style={styles.intro}>
            Ayúdanos a mantener vivo el legado de Santa Rosa de Lima. Tu aporte es muy
            importante para seguir con la obra de nuestro Santuario.
          </Text>

          {/* ── Donación con tarjeta ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <FontAwesome name="credit-card" size={18} color={ACCENT} />  Dona con tarjeta
            </Text>
            <Text style={styles.sectionText}>
              Elige el monto. Se abrirá Mercado Pago para pagar con débito o crédito.
            </Text>
            <View style={styles.montos}>
              {MONTOS.map((m) => (
                <TouchableOpacity
                  key={m.monto}
                  style={styles.montoBtn}
                  activeOpacity={0.8}
                  onPress={() => abrir(m.url)}
                >
                  <Text style={styles.montoText}>{m.monto}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ── Transferencia ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <FontAwesome name="bank" size={18} color={ACCENT} />  Transferencia bancaria
            </Text>
            {CUENTA.map((c) => (
              <View key={c.label} style={styles.row}>
                <Text style={styles.rowLabel}>{c.label}</Text>
                <Text style={styles.rowValue} selectable>{c.valor}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.shareBtn} onPress={compartirDatos} activeOpacity={0.8}>
              <FontAwesome name="share-alt" size={16} color="#fff" />
              <Text style={styles.shareText}>Copiar / compartir datos</Text>
            </TouchableOpacity>
          </View>

          {/* ── Cambia tu manda ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <FontAwesome name="heart" size={18} color={ACCENT} />  Cambia tu manda
            </Text>
            <Text style={styles.sectionText}>
              En vez de ofrendas de velas y flores, trae alimentos no perecibles: evitas
              incendios, no contaminas y los alimentos llegan a los más pobres. Santa Rosa
              compartía sus alimentos con los más necesitados. ¡Ella te lo agradecerá!
            </Text>
          </View>

          {/* ── Contacto ── */}
          <View style={styles.contactRow}>
            <TouchableOpacity style={styles.contactBtn} onPress={() => abrir(TELEFONO_FIJO)}>
              <FontAwesome name="phone" size={18} color="#fff" />
              <Text style={styles.contactText}>Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactBtn} onPress={() => abrir(WHATSAPP)}>
              <FontAwesome name="whatsapp" size={18} color="#fff" />
              <Text style={styles.contactText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// ─────────────── ESTILOS ───────────────
const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' },
  container: { padding: 16, paddingBottom: 40, alignItems: 'stretch' },
  virgen: { width: 140, height: 140, alignSelf: 'center', marginTop: 8 },
  header: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 12 },
  intro: { color: '#ddd', fontSize: 15, textAlign: 'center', lineHeight: 22, marginTop: 8, marginBottom: 8 },
  section: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  sectionText: { color: '#ddd', fontSize: 15, lineHeight: 22 },
  montos: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  montoBtn: {
    backgroundColor: ACCENT,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexGrow: 1,
    alignItems: 'center',
  },
  montoText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    gap: 12,
  },
  rowLabel: { color: '#aaa', fontSize: 14 },
  rowValue: { color: '#fff', fontSize: 14, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: ACCENT,
  },
  shareText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  contactRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  contactText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});