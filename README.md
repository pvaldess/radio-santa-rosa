# 📻 Radio Santa Rosa 107.1 FM — App Móvil

Aplicación móvil oficial de **Radio Santa Rosa 107.1 FM**, la radio del **Santuario Santa Rosa de Lima de Pelequén** (Malloa, Región de O'Higgins, Chile). Está construida con **React Native** y **Expo**. Desde el teléfono permite escuchar la radio en vivo, leer las últimas noticias del Santuario y hacer donaciones.

> Proyecto adaptado a partir de la app de Radio Santa Cruz FM 94.3.

## 📱 Características

- **Radio en vivo**: reproductor de audio en streaming de la señal 107.1 FM, con controles en la pantalla de bloqueo y reproducción en segundo plano.
- **Noticias**: se cargan automáticamente desde el sitio web del Santuario. Se actualizan al entrar a la pestaña o al deslizar hacia abajo, y cada noticia abre el artículo completo en el navegador.
- **Donar**: botones de Mercado Pago por monto ($5.000 a $50.000), datos para transferencia bancaria con opción de copiarlos o compartirlos, y la campaña "Cambia tu manda".
- **Redes sociales**: acceso directo a WhatsApp, Facebook, Instagram, YouTube y el sitio web.
- **Diseño unificado**: todas las pantallas comparten la identidad visual (logo, fondo y el color de acento `#1bb0ce`).

## 🗂️ Estructura del proyecto

La app usa **Expo Router**. Cada archivo dentro de `app/(tabs)/` es una pestaña del menú inferior.

```
RadioSantaRosa/
├── app/
│   └── (tabs)/
│       ├── _layout.tsx        # Configuración del menú de pestañas
│       ├── index.tsx          # Pestaña RADIO (pantalla principal)
│       ├── noticias.tsx       # Pestaña NOTICIAS
│       └── donar.tsx          # Pestaña DONAR
├── assets/
│   └── images/
│       ├── logo-santarosa.png # Logo de la radio
│       └── microphones-...jpg # Imagen de fondo (estudio)
├── app.json                   # Nombre, versión, identificadores e íconos
└── package.json
```

## 🔌 Fuentes de datos

- **Audio en vivo**: constante `STREAM_URL` en `index.tsx` (⚠️ pendiente: definir la URL real del stream).
- **Noticias**: API REST de WordPress del sitio del Santuario
  `https://santuariosantarosa.cl/wp-json/wp/v2/posts`
  Los campos usados son `title.rendered` (título), `link` (enlace), `jetpack_featured_media_url` (imagen) y `date` (fecha).
- **Donaciones**: links de Mercado Pago y datos bancarios tomados de santuariosantarosa.cl, definidos como constantes en `donar.tsx`. Los pagos se abren en el navegador externo (no dentro de la app), como exige Apple para donaciones.

## 🛠️ Tecnologías

- React Native con Expo
- Expo Router (navegación por pestañas)
- expo-audio (reproductor de audio + pantalla de bloqueo)
- @expo/vector-icons (iconos)

## ▶️ Cómo trabajar en el proyecto (desarrollo)

**Requisitos:** tener instalados Node.js y Git.

1. Clonar el repositorio (solo la primera vez):
   ```
   git clone https://github.com/pvaldess/radio-santa-rosa.git
   cd radio-santa-rosa
   ```

2. Instalar las dependencias (solo la primera vez, o cuando se agregue una librería):
   ```
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```
   npx expo start
   ```

4. Abrir la app en el teléfono:
   - **Expo Go** (prueba rápida de pantallas): si el QR dice "development build", presiona `s` y escanéalo con Expo Go.
   - **Development build** (prueba completa con audio en segundo plano y pantalla de bloqueo): se genera una vez con
     ```
     eas build --profile development --platform android
     ```
     Después se instala en el teléfono y se abre con el servidor corriendo.

> Nota: mientras el servidor está corriendo, presiona `r` para recargar la app tras un cambio, o `Ctrl + C` para detenerlo.

## 💾 Guardar cambios en GitHub

```
git pull
git add .
git commit -m "descripción del cambio"
git push
```

## 📋 Pendientes / Próximos pasos

- **URL del stream**: obtener la dirección real del audio en vivo y ponerla en `STREAM_URL` (`index.tsx`).
- **Proyecto EAS**: correr `eas init` para crear el proyecto propio en Expo antes del primer build.
- **Íconos**: preparar el ícono de la app y el ícono adaptativo de Android con margen alrededor del logo.
- **Publicación en tiendas**: preparar y publicar en App Store (requiere cuenta Apple Developer) y Google Play.
- **Video en vivo / Santa Rosa TV**: posible pestaña futura con las transmisiones de YouTube del Santuario.
- **Metadatos de canción**: verificar si el stream entrega información de lo que suena.

## 📞 Contacto

- **Radio**: Santa Rosa 107.1 FM
- **Dirección**: Avenida Santa Rosa 565, Pelequén, Malloa, Región de O'Higgins, Chile
- **Sitio web**: https://santuariosantarosa.cl
- **Teléfono**: 72 228 4065
- **WhatsApp**: +56 9 8137 7705
- **Email**: contacto@santuariosantarosa.cl
- **Facebook**: https://www.facebook.com/santuariosantarosa.cl
- **Instagram**: https://www.instagram.com/santuariosantarosa.cl/
- **YouTube**: https://www.youtube.com/channel/UCsNz4zS3Pqft6G2ruHgC7Mw