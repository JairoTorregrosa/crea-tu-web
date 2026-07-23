---
name: crea-tu-web
description: >
  Entrevista al dueño de un pequeño negocio en español simple (máximo 8 preguntas, una por una)
  y luego genera su landing page personalizada con Next.js 16 + Tailwind v4 + shadcn/ui.
  El sitio es bilingüe ES/EN con toggle (español por defecto), mobile-first, contraste AA,
  con sección hero, servicios, sobre nosotros, contacto (tap-to-call y tap-to-WhatsApp),
  y CTA fijo en móvil. La dirección estética se elige según el tipo de negocio.
  Usa esta skill cuando el usuario quiera crear una página web para su negocio,
  cuando diga "crea mi página", "quiero mi sitio web", "empecemos con mi página",
  "hazme un sitio", "necesito una landing page", "quiero una web para mi negocio",
  "vamos a hacer mi página", "crea-tu-web", o cualquier variante de pedir una
  página web para un negocio local. También cuando se invoque en el contexto de
  un taller de creación de páginas web.
---

# Crea Tu Web

## Contexto

Tu usuario es un pequeño empresario hispanohablante en un taller presencial. No sabe programar: tú manejas la terminal y el código; él solo contesta preguntas y pide cambios en español simple. Nunca uses jerga técnica sin explicarla en una frase.

Esta skill es el paso 1 de construcción del taller (después de `revisa-tu-equipo`; antes de `disena-tu-marca` → `planea-tu-web` → `publica-tu-web`). El objetivo emocional: que el dueño vea con sus propios ojos que su negocio puede tener una página web real y bonita en minutos. Este es su primer momento "wow" — lo que construyas aquí es lo que convierte escepticismo en entusiasmo.

**Éxito se ve así:** el servidor de desarrollo corriendo, el dueño mirando en su navegador una página con el nombre de SU negocio, SUS colores, y SUS datos de contacto.

---

## Paso 1 — Entrevista rápida

Haz las preguntas una por una. Espera la respuesta antes de hacer la siguiente (porque una persona no técnica se abruma si recibe varias preguntas a la vez — necesita procesar y responder cada una sin prisa). Cada pregunta incluye un ejemplo para que el dueño entienda qué tipo de respuesta esperas. Habla en español claro, como en una conversación normal.

### Las 8 preguntas

**1. "¿Cómo se llama tu negocio?"**
Ejemplo: "Taquería La Estrella", "Hernández Landscaping", "Salón de Belleza Lupita"

**2. "En pocas palabras, ¿qué vendes o qué servicio ofreces?"**
Ejemplo: "Hacemos tacos y tortas para llevar", "Cortamos pasto y hacemos jardinería"

**3. "¿Quiénes son tus clientes? ¿A quién le vendes más?"**
Ejemplo: "Familias del barrio", "Dueños de casas en Montrose"

**4. "¿Cuál es tu número de teléfono? ¿Y usas WhatsApp con ese mismo número?"**
Anota ambos. Si el WhatsApp es diferente, pide los dos. Necesitas el número con código de país (pregunta "¿tu número empieza con +1 o con +52?") para los enlaces de contacto.

**5. "¿Dónde estás ubicado y en qué horario atiendes?"**
Ejemplo: "En la calle Main 215, de lunes a sábado de 9 a 6"

**6. "¿Qué colores te gustan para tu página? O dime un lugar o cosa que tenga los colores que quieres."**
Ejemplo: "Rojo y amarillo como México", "Verde oscuro como los árboles". Si no sabe, pregunta: "¿De qué color es tu letrero o tu logo?"

**7. "¿Qué NO quieres que tu página parezca? ¿Hay algo que se vea feo o que no te guste?"**
Ejemplo: "No quiero que se vea aburrida", "Nada de colores oscuros". Esta pregunta evita que la página se sienta genérica.

**8. "¿Tienes un logo o fotos de tu negocio en tu celular que quieras usar?"**
Si tiene logo, pide que lo ponga en la carpeta del proyecto. Si tiene fotos propias, igual. Si no tiene nada, se usan ilustraciones SVG y placeholders con los colores de su marca (porque las fotos de internet o bancos de imágenes llevan derechos de imagen de personas reales — no es legal usarlas sin licencia, y nunca vale la pena el riesgo para un negocio pequeño).

### Guardar las respuestas

Después de las 8 preguntas, guarda las respuestas en memoria. Las escribirás a `negocio.json` en la raíz del proyecto una vez que lo crees en el Paso 2 (no antes, porque la carpeta aún no existe). El formato:

```json
{
  "nombre": "Taquería La Estrella",
  "descripcion": "Tacos y tortas para llevar",
  "clientes": "Familias del barrio",
  "telefono": "+19702491234",
  "whatsapp": "+19702491234",
  "ubicacion": "215 Main St, Montrose, CO",
  "horario": "Lunes a Sábado, 9am - 6pm",
  "colores": "Rojo y amarillo",
  "no_quiere": "Que se vea aburrida o genérica",
  "tiene_logo": false,
  "tiene_fotos": false
}
```

Normaliza el teléfono a formato internacional con `+` y solo dígitos (ejemplo: "(970) 249-1234" → "+19702491234"). Lo necesitas así para el enlace `tel:` (que lleva el `+`) y para `wa.me/` (que usa solo los dígitos, sin el `+`).

---

## Paso 2 — Scaffoldear el proyecto

Genera un slug del nombre del negocio en ASCII kebab-case (sin acentos, sin espacios).

**Ejemplo:** "Taquería La Estrella" → `taqueria-la-estrella`

Ejecuta estos comandos exactos. Usa npm siempre — es el único gestor de paquetes garantizado en los laptops de los asistentes al taller; ni pnpm, ni yarn, ni bun están instalados.

**macOS / Linux (bash):**

```bash
npx create-next-app@latest <slug> --yes --use-npm && cd <slug> && npx shadcn@latest init --defaults && npx shadcn@latest add -y button card separator
```

**Windows (PowerShell):** el operador `&&` NO existe en PowerShell 5.1 (el
preinstalado) — da error de sintaxis. Ejecuta cada comando como una llamada
separada, verificando que la anterior terminó bien antes de seguir:

```powershell
npx create-next-app@latest <slug> --yes --use-npm
cd <slug>
npx shadcn@latest init --defaults
npx shadcn@latest add -y button card separator
```

El flag `--yes` acepta todos los defaults: TypeScript, Tailwind v4, ESLint, App Router, Turbopack, alias `@/*`. El flag `-y` en `shadcn add` evita que pregunte confirmación.

> **Directorio de trabajo:** todos los comandos a partir de aquí se ejecutan dentro de la carpeta del proyecto (`<slug>/`). Si tu herramienta reinicia el directorio entre llamadas al shell (como Codex CLI), usa la ruta absoluta del proyecto en cada comando. En macOS/Linux también puedes encadenar con `&&`; en Windows ejecuta los comandos de uno en uno (nunca `&&`).

Si npm muestra errores de "peer dependency conflict" con React 19, agrega `--legacy-peer-deps` al comando `npm install` que falle.

Una vez creado el proyecto, guarda las respuestas de la entrevista en `<slug>/negocio.json` (el archivo cuyo formato se definió en el Paso 1).

---

## Paso 3 — Dirección estética

La página debe verse única para este negocio. Antes de escribir código, define un mini sistema de diseño basado en las respuestas de la entrevista.

### Paleta (4-5 colores en OKLCH para shadcn)

- `primary` — color principal del negocio (de la respuesta 6)
- `primary-foreground` — texto sobre el color principal (ratio >= 4.5:1 para AA)
- `secondary` — un complementario que no compita
- `background` — fondo general (nunca blanco puro #ffffff; usa un tono cálido o frío según el negocio)
- `foreground` — texto principal (nunca negro puro #000000; usa un gris muy oscuro)

### Tipografía (2 fuentes de Google Fonts vía `next/font/google`)

- Una fuente display para el nombre del negocio y títulos — con personalidad, usada con moderación
- Una fuente body legible para el texto corriente

### Guía por tipo de negocio

Usa esta guía como punto de partida, no como receta fija. Adapta según lo que el dueño dijo, especialmente la pregunta 7 ("¿qué no quiere parecer?"). Los ejemplos de fuentes y colores son sugerencias — elige lo que mejor encaje con las respuestas reales.

**Ejemplo — Restaurante / Taquería / Comida:**
Paleta cálida (rojos, naranjas, amarillos, terrosos, fondo crema). Display: Playfair Display, Abril Fatface, Lobster. Body: Source Sans 3, Nunito. Elemento firma: patrón SVG sutil (azulejos, papel picado).

**Ejemplo — Contratista / Landscaping / Construcción:**
Paleta sólida (verdes oscuros, marrones, grises acero, acento naranja/amarillo). Display: Oswald, Bebas Neue, Barlow Condensed. Body: Inter, DM Sans. Elemento firma: textura sutil de materiales o patrón geométrico.

**Ejemplo — Salón de belleza / Estética / Spa:**
Paleta suave (rosas, dorados, lavandas, verdes menta, fondo claro). Display: Cormorant Garamond, Playfair Display, Italiana. Body: Lato, Raleway. Elemento firma: degradado sutil o borde decorativo.

**Ejemplo — Tienda / Retail:**
Paleta viva (color del logo como protagonista). Display: Poppins bold, Fredoka, Quicksand. Body: Open Sans, Rubik. Elemento firma: iconos SVG de los productos.

**Ejemplo — Servicios profesionales / Limpieza / Reparaciones:**
Paleta confiable (azules, verdes, grises, acento cálido). Display: Montserrat, Raleway, Source Serif 4. Body: Inter, Noto Sans. Elemento firma: badges de confianza.

### Guardrails de calidad

1. **Contraste AA obligatorio.** Todo par texto/fondo: ratio >= 4.5:1 para texto normal, >= 3:1 para texto grande (24px+ regular o 19px+ bold).
2. **Tipografía legible.** Body nunca menor a 16px en móvil. Line-height mínimo 1.5 para body text.
3. **Nada genérico.** Si la página podría ser de cualquier negocio con solo cambiar el nombre, no está lista.
4. **Evitar los 3 looks "IA por defecto":** (a) fondo crema #F4F1EA + serif + acento terracota, (b) fondo casi negro + acento verde ácido, (c) layout de periódico con líneas finas. Son legítimos para algunos negocios, pero no los uses como default.
5. **Una sola decisión audaz.** Un elemento firma memorable (tipografía hero gigante, patrón SVG, color de acento fuerte) y todo lo demás tranquilo.

### Aplicar la paleta en shadcn

Edita los valores OKLCH de las variables CSS que shadcn ya generó en `app/globals.css`. Cambia solo los valores, no borres variables — shadcn genera todas las que necesita (`background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, etc.) y los componentes dependen de ellas. Ejemplo:

```css
:root {
  --background: oklch(0.97 0.01 85);
  --foreground: oklch(0.15 0.02 60);
  --primary: oklch(0.55 0.2 30);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.90 0.03 85);
  --secondary-foreground: oklch(0.20 0.02 60);
  /* ... mantén TODAS las demás variables que shadcn generó */
}
```

Los valores OKLCH de arriba son solo un ejemplo. Calcula los correctos según la paleta que elegiste.

### Aplicar tipografía con next/font

En `app/layout.tsx`, importa las fuentes elegidas:

```tsx
import { Playfair_Display, Source_Sans_3 } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
```

Registra las variables CSS en el `<html>` y usa clamp() para tamaños fluidos:

```css
.font-display { font-family: var(--font-display); }
.font-body { font-family: var(--font-body); }

h1 { font-size: clamp(2.25rem, 5vw, 4rem); letter-spacing: -0.02em; }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); }
body { font-size: clamp(1rem, 1.1vw, 1.125rem); line-height: 1.6; }
```

---

## Paso 4 — Estructura de la página

Genera la landing page en `app/page.tsx`. Como la página usa estado del cliente para el toggle de idioma, el archivo principal o un wrapper debe llevar la directiva `"use client"` al inicio.

### 1. Toggle de idioma ES/EN

Implementa un toggle simple con estado del lado del cliente. Español es el idioma por defecto. No uses rutas separadas — usa un diccionario en `lib/i18n.ts`:

```ts
export const dict = {
  es: {
    hero_title: "Taquería La Estrella",
    hero_subtitle: "Los mejores tacos de Montrose",
    cta_call: "Llamar ahora",
    cta_whatsapp: "Enviar WhatsApp",
    // ... todas las cadenas
  },
  en: {
    hero_title: "Taquería La Estrella",
    hero_subtitle: "The best tacos in Montrose",
    cta_call: "Call now",
    cta_whatsapp: "Send WhatsApp",
    // ...
  },
} as const;
```

**Ejemplo de cómo convertir una respuesta de entrevista en copy bilingüe:**
El dueño dice "Hacemos tacos y tortas para llevar" → hero_subtitle ES: "Tacos y tortas para llevar, hechos con recetas de familia" / EN: "Tacos and tortas to go, made with family recipes". Transforma la respuesta directa en una frase con gancho, sin inventar datos.

El toggle cambia un estado `lang` y actualiza el atributo `lang` del `<html>`. Usa un componente cliente para el toggle y pasa las cadenas como props a los componentes de cada sección.

### 2. Header / navegación

Barra fija arriba con el nombre del negocio y el toggle ES/EN. Navegación mínima: 3-4 enlaces ancla a las secciones. En móvil, el toggle y los enlaces se colapsan en un menú hamburguesa simple.

### 3. Hero

La sección hero es la tesis de la página. Ocupa el 80-100% del viewport inicial. Contiene:
- Nombre del negocio en la fuente display, tamaño grande (`clamp(2.25rem, 5vw, 4rem)`)
- Propuesta de valor en 1-2 frases cortas (de la respuesta 2 de la entrevista)
- Un botón CTA principal ("Llamar ahora" o "Enviar WhatsApp" según lo que el dueño use más)
- Si el dueño dio fotos, usarlas. Si no, un fondo con los colores de su marca y el elemento firma (patrón SVG, ilustración, o textura sutil)

El hero debe decir qué hace el negocio y dónde, con claridad inmediata.

### 4. Servicios / Productos

Grid de 2-3 columnas en desktop, 1 columna en móvil. Cada servicio en un Card de shadcn con:
- Icono SVG simple o emoji como fallback
- Nombre del servicio
- Descripción de 1-2 frases

Usa la información de la respuesta 2. Si el dueño solo dijo algo general ("hacemos tacos"), pregúntale los 3-4 servicios o productos principales antes de generar esta sección.

### 5. Sobre nosotros

Sección breve y humana. Cuenta quién es el dueño, desde cuándo trabaja, por qué hace lo que hace. Si falta información, pon un placeholder visible: "[Aquí va tu historia — cuéntale a tus clientes quién eres y por qué haces lo que haces]". Nunca inventes datos biográficos.

### 6. Contacto

Sección con toda la información de contacto:
- Teléfono como enlace `tel:+1XXXXXXXXXX` (tap-to-call, el `+` va incluido)
- WhatsApp como enlace `https://wa.me/1XXXXXXXXXX?text=Hola%2C%20quiero%20informaci%C3%B3n` (tap-to-WhatsApp; en `wa.me/` van solo los dígitos sin el `+`; el saludo va pre-llenado en español)
- Dirección (si tiene local físico)
- Horario de atención

Los botones de llamar y WhatsApp deben ser grandes, fáciles de tocar (mínimo 44x44px), y con iconos reconocibles.

### 7. Footer

Pie de página simple: nombre del negocio, teléfono, y el año actual.

### 8. CTA fijo en móvil (sticky bar)

Barra fija en la parte inferior de la pantalla solo en móvil (oculta en desktop). Altura máxima 56px. Dos botones lado a lado:
- Icono de teléfono + "Llamar" → enlace `tel:`
- Icono de WhatsApp + "WhatsApp" → enlace `wa.me/`

```css
@media (min-width: 768px) {
  .sticky-cta { display: none; }
}
```

Área de toque de cada botón: mínimo 44x44px. Para el botón de WhatsApp, usa un verde oscuro accesible: `#157A3E` como fondo con texto blanco (contraste 5.4:1, cumple AA), o `#0D7A3F` como texto sobre fondo claro (contraste >= 4.5:1). No uses el verde oficial `#25D366` porque falla contraste AA contra cualquier fondo claro (1.98:1 contra blanco). Esta barra aparece solo después de hacer scroll más allá del hero, para no obstruir la primera vista.

---

## Paso 5 — Mostrar en el navegador

Arranca el servidor de desarrollo en segundo plano. El comando `npm run dev` bloquea la terminal, así que ejecútalo en background:

- **En Claude Code (cualquier SO):** usa el parámetro `run_in_background: true` en la herramienta Bash.
- **En Codex CLI (macOS/Linux):** ejecuta `nohup npm run dev > /dev/null 2>&1 &`.
- **En Codex CLI (Windows/PowerShell):** `nohup`, `/dev/null` y `&` no existen en PowerShell 5.1. Ejecuta en su lugar:
  `Start-Process npm.cmd -ArgumentList 'run','dev' -WindowStyle Hidden -WorkingDirectory (Get-Location)`

Espera unos segundos a que el servidor arranque.

Dile al dueño: **"Tu página ya está lista. Ábrela en tu navegador en http://localhost:3000 para que la veas."**

Si el entorno soporta abrir el navegador automáticamente (`open http://localhost:3000` en Mac, `Start-Process "http://localhost:3000"` en Windows), hazlo. Si no, da la URL.

---

## Paso 6 — Iterar con el dueño

Esta es la parte más importante del taller. El dueño ve su página y pide cambios en español simple. Aplica un cambio a la vez para que vea la relación causa-efecto entre lo que pide y lo que pasa.

### Cambios comunes

| Lo que dice el dueño | Qué editar |
|---|---|
| "Ponlo más verde" / "Cambia el color" | `app/globals.css` — variables `--primary`, `--background`, etc. |
| "Letra más grande" | `app/globals.css` — valores de `clamp()` |
| "Cambia el tipo de letra" | `app/layout.tsx` — importación de `next/font/google` |
| "Agrega otro servicio" | `lib/i18n.ts` + `app/page.tsx` |
| "No me gusta la foto" / "Pon mi logo" | Copiar archivo a `public/` y actualizar referencia |
| "El botón de WhatsApp no funciona" | Verificar número en `wa.me/` (sin +, sin espacios, sin guiones) |
| "Quiero que diga otra cosa" | `lib/i18n.ts` — cambiar texto en ambos idiomas |

Los colores son variables CSS y los textos están en un diccionario, así que la mayoría de cambios son ediciones de una o dos líneas que se reflejan al instante con el hot-reload de Turbopack.

### Reglas de la iteración

- **Un cambio a la vez.** El dueño debe ver que su pedido se reflejó antes de pedir otro.
- **Confirma antes de seguir.** Después de cada cambio: "¿Se ve bien? ¿Quieres cambiar algo más?"
- **Nunca inventes.** Si no tienes la información, pon un placeholder visible: "[Pendiente: tu historia aquí]".
- **Explica qué hiciste.** En una frase: "Cambié el color principal a un verde más oscuro. Mira cómo se ve."
- **Si algo se rompe,** di qué pasó, arréglalo, y sigue. No depures en silencio.

---

## Notas técnicas (para la IA, no para el dueño)

### Estructura de archivos generada

```
<slug>/
  app/
    layout.tsx        # Fuentes, metadata, estructura HTML
    page.tsx          # Landing page completa ("use client" para el toggle)
    globals.css       # Paleta OKLCH + tipografía + estilos globales
  lib/
    i18n.ts           # Diccionario bilingüe ES/EN
  components/
    ui/               # Componentes de shadcn (button, card, etc.)
    language-toggle.tsx
    sticky-cta.tsx
    hero.tsx
    services.tsx
    about.tsx
    contact.tsx
    footer.tsx
  public/             # Logo y fotos del dueño (si las tiene)
  negocio.json        # Respuestas de la entrevista
```

### Imágenes

- Si el dueño tiene logo: copiarlo a `public/logo.{png,svg,jpg}` y usar `next/image` con `width` y `height` explícitos.
- Si tiene fotos propias: copiarlas a `public/`, formato WebP si es posible, ancho máximo 1200px, `loading="lazy"` para las que están debajo del fold.
- Si no tiene nada: generar gráficos SVG inline con los colores de marca. Patrones, formas geométricas, o iconos simples. Nunca descargar fotos de internet: las fotos de personas reales llevan derechos de imagen y usarlas expone al dueño a reclamos legales.

### Accesibilidad (quality floor)

- `<html lang="es">` por defecto, actualizar a `"en"` cuando se cambie el idioma.
- HTML semántico: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`.
- Focus visible en todos los elementos interactivos.
- `prefers-reduced-motion`: respetar. Si hay animaciones, envolver en `@media (prefers-reduced-motion: no-preference)`.
- Textos alternativos en todas las imágenes (`alt` descriptivo en el idioma activo).

### Rendimiento

- next/font auto-hospeda las fuentes (cero peticiones externas en runtime).
- `display: "swap"` en todas las fuentes para evitar FOIT.
- Imágenes del dueño con `loading="lazy"` excepto la del hero (esa lleva `preload`).
- Solo los componentes de shadcn que realmente se usen (button, card, separator). No instalar de más.

### shadcn Button y enlaces (Next.js 16)

En Next.js 16, shadcn usa `@base-ui/react` en lugar de Radix. El Button de base-ui NO soporta la prop `asChild`. Para renderizar un enlace `<a>` con estilos de botón (por ejemplo, CTAs que van a `tel:` o `wa.me/`), NO uses `<Button asChild><a>`. En su lugar, importa `buttonVariants` de `@/components/ui/button` y aplica los estilos directamente al `<a>`:

```tsx
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

<a href="tel:+19705550123" className={cn(buttonVariants({ size: "lg" }), "mi-clase-extra")}>
  Llamar ahora
</a>
```
