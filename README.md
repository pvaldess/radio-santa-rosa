# 📻 Radio Santa Cruz FM — App Móvil

Aplicación móvil oficial de **Radio Santa Cruz FM 94.3** (Santa Cruz, Región de O'Higgins, Chile), construida con React Native y Expo. Permite escuchar la radio en vivo, ver la transmisión de video, leer las últimas noticias y consultar la programación, todo desde el teléfono.

---

## 📱 Características

- **Radio en vivo**: reproductor de audio en streaming de la señal 94.3 FM.
- **Video en vivo**: transmisión de video incrustada desde el reproductor de la radio.
- **Noticias**: se cargan automáticamente desde el sitio web de la radio y se actualizan solas. Cada noticia abre el artículo completo en el navegador.
- **Programación**: carrusel horizontal con los programas de la radio, sus locutores y horarios.
- **Redes sociales**: acceso directo a Facebook, Instagram, WhatsApp y sitio web.
- **Diseño unificado**: todas las pantallas comparten la identidad visual de la radio (logo, fondo de estudio y colores).

---

## 🗂️ Estructura del proyecto

La app usa **Expo Router**, donde cada archivo dentro de `app/(tabs)/` es una pestaña del menú inferior.

```
RadioSantaCruz/
├── app/
│   └── (tabs)/
│       ├── _layout.tsx        # Configuración del menú de pestañas
│       ├── index.tsx          # Pestaña RADIO (pantalla principal)
│       ├── video.tsx          # Pestaña EN VIVO (video)
│       ├── noticias.tsx       # Pestaña NOTICIAS
│       └── programacion.tsx   # Pestaña PROGRAMACIÓN
├── assets/
│   └── images/
│       ├── scfm.jpg           # Logo de la radio
│       └── microphones-...jpg # Imagen de fondo (estudio)
└── package.json
```

---

## 🔌 Fuentes de datos

- **Audio en vivo**: `https://archi-us.digitalproserver.com/santa-cruz-fm.aac`
- **Video en vivo**: `https://rudo.video/live/rcruz`
- **Noticias**: API REST de WordPress del sitio de la radio
  `https://santacruzfm.cl/wp-json/wp/v2/posts`
  Los campos usados son: `title.rendered` (título), `link` (enlace), `jetpack_featured_media_url` (imagen) y `date` (fecha).
- **Programación**: actualmente escrita dentro del archivo `programacion.tsx`. Pendiente migrar a una fuente externa editable (ver "Pendientes").

---

## 🛠️ Tecnologías

- **React Native** con **Expo**
- **Expo Router** (navegación por pestañas)
- **expo-audio** (reproductor de audio)
- **react-native-webview** (reproductor de video)
- **@expo/vector-icons** (iconos)

---

## ▶️ Cómo trabajar en el proyecto (desarrollo)

Requisitos: tener instalados **Node.js** y **Git**.

1. Clonar el repositorio (solo la primera vez):
   ```
   git clone https://github.com/pvaldess/RadioSantaCruz.git
   cd RadioSantaCruz
   ```

2. Instalar las dependencias (solo la primera vez, o cuando se agregue una librería):
   ```
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```
   npx expo start
   ```

4. Escanear el código QR con la app **Expo Go** (iPhone: con la cámara; Android: desde Expo Go).

> Nota: mientras el servidor está corriendo, presiona `r` para recargar la app tras un cambio, o `Ctrl + C` para detenerlo.

---


## 📋 Pendientes / Próximos pasos

- [ ] **Programación editable**: migrar los programas a una fuente externa (JSON en el hosting o categoría de WordPress) para poder actualizarlos sin recompilar la app.
- [ ] **Audio en segundo plano**: terminar la configuración de reproducción persistente y controles del sistema para builds nativos.
- [ ] **Publicación en tiendas**: preparar y publicar en App Store (requiere cuenta Apple Developer) y Google Play.
- [ ] **Integración CarPlay / Android Auto** (a futuro).

---

## 📞 Contacto de la radio

- **Frecuencia**: 94.3 FM
- **Ciudad**: Santa Cruz, Región de O'Higgins, Chile
- **Sitio web**: https://santacruzfm.cl
- **WhatsApp**: +56 9 8244 9093
- **Facebook**: https://www.facebook.com/santacruzfm94.3
- **Instagram**: https://www.instagram.com/santacruzfm94.3

---
