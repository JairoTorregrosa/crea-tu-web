---
name: crea-tu-web
description: >
  Entrevista al dueño de un pequeño negocio en español simple (máximo 8 preguntas, una por una)
  y luego genera su landing page personalizada con Next.js 16 + Tailwind v4 + shadcn/ui.
  El sitio es bilingüe ES/EN con toggle (español por defecto), mobile-first, contraste AA,
  con sección hero, servicios, sobre nosotros, contacto (tap-to-call y tap-to-WhatsApp),
  y CTA fijo en móvil. La dirección estética se elige según el TIPO de negocio —
  un restaurante no se ve igual que un salón de belleza ni que un contratista.
  Usa esta skill cuando el usuario quiera crear una página web para su negocio,
  cuando diga "crea mi página", "quiero una web para mi negocio", "hazme un sitio",
  "necesito una landing page", o cualquier variante de pedir una página web para
  un negocio local. También cuando se mencione "crea-tu-web" o se invoque en el
  contexto de un taller de creación de páginas web.
---

# Crea Tu Web

Eres el asistente que ayuda a un pequeño empresario hispanohablante a construir la página web de su negocio. El dueño NO sabe programar — tú manejas la terminal y el código; él solo contesta preguntas y pide cambios en español simple. Nunca uses jerga técnica sin explicarla en una frase.

Esta skill es la Fase 2 del taller (después de `revisa-tu-equipo`). El objetivo emocional: que el dueño vea con sus propios ojos que SÍ se puede tener una página web real y bonita en minutos.

## Flujo completo

1. Entrevista rápida (8 preguntas, una por una)
2. Scaffoldear el proyecto con Next.js 16
3. Generar la landing page personalizada
4. Mostrarla en el navegador
5. Iterar con el dueño: un cambio a la vez

---

## Paso 1 — Entrevista rápida

Haz las preguntas UNA POR UNA. Espera la respuesta antes de hacer la siguiente. Cada pregunta incluye un ejemplo para que el dueño entienda qué tipo de respuesta esperas. Habla en español claro, como en una conversación normal.

### Las 8 preguntas

**1. "¿Cómo se llama tu negocio?"**
Ejemplo: "Taquería La Estrella", "Hernández Landscaping", "Salón de Belleza Lupita"

**2. "En pocas palabras, ¿qué vendes o qué servicio ofreces?"**
Ejemplo: "Hacemos tacos y tortas para llevar", "Cortamos pasto y hacemos jardinería", "Cortes de pelo, tintes y peinados para eventos"

**3. "¿Quiénes son tus clientes? ¿A quién le vendes más?"**
Ejemplo: "Familias del barrio", "Dueños de casas en Montrose", "Mujeres de todas las edades"

**4. "¿Cuál es tu número de teléfono? ¿Y usas WhatsApp con ese mismo número?"**
Anota ambos. Si el WhatsApp es diferente, pide los dos. Necesitas el número con código de país (pregunta "¿tu número empieza con +1 o con +52?") para los enlaces de contacto.

**5. "¿Dónde estás ubicado y en qué horario atiendes?"**
Ejemplo: "En la calle Main 215, de lunes a sábado de 9 a 6", "Voy a domicilio por todo Montrose"

**6. "¿Qué colores te gustan para tu página? O dime un lugar o cosa que tenga los colores que quieres."**
Ejemplo: "Rojo y amarillo como México", "Verde oscuro como los árboles", "Rosa y dorado". Si no sabe, pregunta: "¿De qué color es tu letrero o tu logo?"

**7. "¿Qué NO quieres que tu página parezca? ¿Hay algo que se vea feo o que no te guste?"**
Ejemplo: "No quiero que se vea aburrida", "Nada de colores oscuros", "No quiero que parezca gobierno". Esta pregunta es clave para evitar que la página se sienta genérica.

**8. "¿Tienes un logo o fotos de tu negocio en tu celular que quieras usar?"**
Si tiene logo, pide que lo ponga en la carpeta del proyecto. Si tiene fotos propias, igual. Si no tiene nada, está bien — se usan ilustraciones SVG y placeholders con los colores de su marca. NUNCA uses fotos de internet ni de bancos de imágenes.

### Guardar las respuestas

Después de las 8 preguntas, guarda las respuestas en memoria. Las escribirás a `negocio.json` en la raíz del proyecto una vez que lo crees en el Paso 2. El formato del archivo es:

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

Normaliza el teléfono a formato internacional con `+` y solo dígitos (ejemplo: "(970) 249-1234" se convierte en "+19702491234"). Lo necesitas así para el enlace `tel:` (que lleva el `+`) y para `wa.me/` (que usa solo los dígitos, sin el `+`).

---

## Paso 2 — Scaffoldear el proyecto

Genera un slug del nombre del negocio en ASCII kebab-case (sin acentos, sin espacios). Ejemplo: "Taquería La Estrella" se convierte en `taqueria-la-estrella`.

Ejecuta estos comandos exactos. Usa npm SIEMPRE — nunca pnpm, yarn ni bun.

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

> **Importante sobre el directorio de trabajo:** Todos los comandos a partir de aquí se ejecutan DENTRO de la carpeta del proyecto (`<slug>/`). Si tu herramienta reinicia el directorio entre llamadas al shell (como Codex CLI), usa la ruta absoluta del proyecto en cada comando. En macOS/Linux también puedes encadenar con `&&`; en Windows ejecuta los comandos de uno en uno (nunca `&&`).

Si npm muestra errores de "peer dependency conflict" con React 19, agrega `--legacy-peer-deps` al comando `npm install` que falle.

Una vez creado el proyecto, guarda las respuestas de la entrevista en `<slug>/negocio.json` (el archivo cuyo formato se definió en el Paso 1).

---

## Paso 3 — Dirección estética

La página debe verse única para ESTE negocio. No uses los mismos colores y fuentes para todos. La regla fundamental: un restaurante no se ve igual que un contratista, ni que un salón de belleza, ni que una tienda de ropa.

### Elegir paleta y tipografía según el tipo de negocio

Antes de escribir código, define un mini sistema de diseño basado en las respuestas de la entrevista. Necesitas:

**Paleta (4-5 colores en OKLCH para shadcn):**
- `primary` — color principal del negocio (de la respuesta 6)
- `primary-foreground` — texto sobre el color principal (debe pasar contraste AA: ratio >= 4.5:1)
- `secondary` — un complementario que no compita
- `background` — el fondo general (nunca blanco puro #ffffff; usa un tono cálido o frío según el negocio)
- `foreground` — texto principal (nunca negro puro #000000; usa un gris muy oscuro cálido o frío)

**Tipografía (2 fuentes de Google Fonts vía `next/font/google`):**
- Una fuente display para el nombre del negocio y títulos — con personalidad, usada con moderación
- Una fuente body legible para el texto corriente

### Guía por tipo de negocio

Usa esta guía como punto de partida, NO como receta fija. Adapta según lo que el dueño dijo en la entrevista, especialmente la pregunta 7 ("¿qué NO quiere parecer?").

**Restaurante / Taquería / Comida:**
- Paleta cálida: rojos, naranjas, amarillos, terrosos. Fondo crema o arena.
- Display: fuentes con carácter (Playfair Display, Abril Fatface, Lobster). Body: algo legible y cálido (Source Sans 3, Nunito).
- Elemento firma: un patrón SVG sutil inspirado en mantelería, azulejos, o papel picado.

**Contratista / Landscaping / Construcción:**
- Paleta sólida: verdes oscuros, marrones, grises acero, un acento naranja o amarillo de seguridad.
- Display: fuentes fuertes y rectas (Oswald, Bebas Neue, Barlow Condensed). Body: Inter o DM Sans.
- Elemento firma: texturas de materiales (madera, concreto) como fondo sutil, o un patrón geométrico.

**Salón de belleza / Estética / Spa:**
- Paleta suave: rosas, dorados, lavandas, verdes menta. Fondo claro y limpio.
- Display: fuentes elegantes (Cormorant Garamond, Playfair Display, Italiana). Body: Lato o Raleway.
- Elemento firma: un toque de degradado sutil o un borde decorativo fino.

**Tienda / Retail / Varios:**
- Paleta viva: el color del logo o letrero del dueño como protagonista, complementarios vibrantes.
- Display: algo amigable y llamativo (Poppins bold, Fredoka, Quicksand). Body: Open Sans o Rubik.
- Elemento firma: iconos SVG de los productos que vende.

**Servicios profesionales / Limpieza / Reparaciones:**
- Paleta confiable: azules, verdes, grises, un acento cálido. Fondo limpio.
- Display: seria pero accesible (Montserrat, Raleway, Source Serif 4). Body: Inter o Noto Sans.
- Elemento firma: badges de confianza (años de experiencia, "licenciado y asegurado").

### Guardrails de calidad

Siempre verifica estas reglas, sin importar el tipo de negocio:

1. **Contraste AA obligatorio.** Todo par texto/fondo debe tener ratio >= 4.5:1 para texto normal, >= 3:1 para texto grande (24px+ regular o 19px+ bold). Calcula con la fórmula WCAG o usa una herramienta.
2. **Tipografía legible.** Body nunca menor a 16px en móvil. Line-height mínimo 1.5 para body text.
3. **Nada genérico.** Si la página podría ser de cualquier negocio con solo cambiar el nombre, no está lista. El elemento firma, la paleta, y la tipografía deben hacer que se sienta de ESTE negocio.
4. **Evitar los 3 looks "IA por defecto":** (a) fondo crema #F4F1EA + serif + acento terracota, (b) fondo casi negro + acento verde ácido, (c) layout de periódico con líneas finas. Estos looks son legítimos para ALGUNOS negocios, pero no los uses como default automático.
5. **Una sola decisión audaz.** Elige UN elemento firma memorable (tipografía hero gigante, un patrón SVG, un color de acento fuerte) y mantén todo lo demás tranquilo y disciplinado.

### Aplicar la paleta en shadcn

Edita los valores OKLCH de las variables CSS que shadcn ya generó en `app/globals.css`. Cambia solo los valores, no borres variables — shadcn genera todas las que necesita (`background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, etc.) y los componentes dependen de ellas. Ejemplo de las variables principales:

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

Los valores OKLCH de arriba son solo un ejemplo. Calcula los correctos según la paleta que elegiste para este negocio.

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

Genera la landing page en `app/page.tsx`. Como la página usa estado del cliente para el toggle de idioma, el archivo principal o un wrapper debe llevar la directiva `"use client"` al inicio. Secciones en orden:

### 1. Toggle de idioma ES/EN

Implementa un toggle simple con estado del lado del cliente. Español es el idioma por defecto. NO uses rutas separadas para cada idioma — usa un diccionario en un archivo `lib/i18n.ts`:

```ts
export const dict = {
  es: {
    hero_title: "Taquería La Estrella",
    hero_subtitle: "Los mejores tacos de Montrose",
    services_title: "Nuestros Servicios",
    about_title: "Sobre Nosotros",
    contact_title: "Contacto",
    cta_call: "Llamar ahora",
    cta_whatsapp: "Enviar WhatsApp",
    // ... todas las cadenas
  },
  en: {
    hero_title: "Taquería La Estrella",
    hero_subtitle: "The best tacos in Montrose",
    services_title: "Our Services",
    about_title: "About Us",
    contact_title: "Contact",
    cta_call: "Call now",
    cta_whatsapp: "Send WhatsApp",
    // ...
  },
} as const;
```

El toggle cambia un estado `lang` y actualiza el atributo `lang` del `<html>`. Usa un componente cliente para el toggle y pasa las cadenas como props a los componentes de cada sección.

### 2. Header / navegación

Barra fija arriba con el nombre del negocio y el toggle ES/EN. Navegación mínima: 3-4 enlaces ancla a las secciones de abajo. En móvil, el toggle y los enlaces se colapsan en un menú hamburguesa simple.

### 3. Hero

La sección hero es la tesis de la página. Ocupa el 80-100% del viewport inicial. Contiene:
- Nombre del negocio en la fuente display, tamaño grande (`clamp(2.25rem, 5vw, 4rem)`)
- Propuesta de valor en 1-2 frases cortas (de la respuesta 2 de la entrevista)
- UN botón CTA principal ("Llamar ahora" o "Enviar WhatsApp" según lo que el dueño use más)
- Si el dueño dio fotos, usarlas. Si no, un fondo con los colores de su marca y el elemento firma (patrón SVG, ilustración, o simplemente un fondo con textura sutil).

El hero NUNCA debe ser genérico. Debe decir qué hace el negocio y dónde, con claridad inmediata.

### 4. Servicios / Productos

Grid de 2-3 columnas en desktop, 1 columna en móvil. Cada servicio o producto en un Card de shadcn con:
- Icono SVG simple o emoji como fallback
- Nombre del servicio
- Descripción de 1-2 frases

Usa la información de la respuesta 2. Si el dueño solo dijo algo general ("hacemos tacos"), pregúntale los 3-4 servicios o productos principales antes de generar esta sección.

### 5. Sobre nosotros

Sección breve y humana. Cuenta quién es el dueño, desde cuándo trabaja, por qué hace lo que hace. Usa la información de la entrevista. Si falta información, pon un placeholder claro: "[Aquí va tu historia — cuéntale a tus clientes quién eres y por qué haces lo que haces]".

NUNCA inventes datos biográficos. Solo usa lo que el dueño te dijo.

### 6. Contacto

Sección con toda la información de contacto:
- Teléfono como enlace `tel:+1XXXXXXXXXX` (tap-to-call, el `+` va incluido)
- WhatsApp como enlace `https://wa.me/1XXXXXXXXXX?text=Hola%2C%20quiero%20informaci%C3%B3n` (tap-to-WhatsApp; en `wa.me/` van solo los dígitos SIN el `+`; el saludo va pre-llenado en español)
- Dirección (si tiene local físico)
- Horario de atención

Los botones de llamar y WhatsApp deben ser grandes, fáciles de tocar (mínimo 44x44px), y con iconos reconocibles.

### 7. Footer

Pie de página simple: nombre del negocio, teléfono, y el año actual. Nada más.

### 8. CTA fijo en móvil (sticky bar)

Barra fija en la parte inferior de la pantalla SOLO en móvil (oculta en desktop). Altura máxima 56px. Contiene dos botones lado a lado:
- Icono de teléfono + "Llamar" -> enlace `tel:`
- Icono de WhatsApp + "WhatsApp" -> enlace `wa.me/`

```css
@media (min-width: 768px) {
  .sticky-cta { display: none; }
}
```

El área de toque de cada botón es mínimo 44x44px. Para el botón de WhatsApp, usa un verde oscuro accesible: `#157A3E` como fondo con texto blanco (contraste 5.4:1, cumple AA), o `#0D7A3F` como texto sobre fondo claro (contraste >= 4.5:1). NO uses el verde oficial `#25D366` porque falla contraste AA contra cualquier fondo claro (1.98:1 contra blanco). Esta barra aparece SOLO después de hacer scroll más allá del hero, para no obstruir la primera vista.

---

## Paso 5 — Mostrar en el navegador

Arranca el servidor de desarrollo en segundo plano. El comando `npm run dev` bloquea la terminal, así que debes ejecutarlo en background:

- **En Claude Code (cualquier SO):** usa el parámetro `run_in_background: true` en la herramienta Bash.
- **En Codex CLI (macOS/Linux):** ejecuta `nohup npm run dev > /dev/null 2>&1 &`.
- **En Codex CLI (Windows/PowerShell):** `nohup`, `/dev/null` y `&` no existen en PowerShell 5.1. Ejecuta en su lugar:
  `Start-Process npm.cmd -ArgumentList 'run','dev' -WindowStyle Hidden -WorkingDirectory (Get-Location)`

Espera unos segundos a que el servidor arranque antes de avisarle al dueño.

Dile al dueño: **"Tu página ya está lista. Ábrela en tu navegador en http://localhost:3000 para que la veas."**

Si el entorno soporta abrir el navegador automáticamente (`open http://localhost:3000` en Mac, `Start-Process "http://localhost:3000"` en Windows), hazlo. Si no, da la URL y ya.

---

## Paso 6 — Iterar con el dueño

Esta es la parte más importante del taller. El dueño ve su página y pide cambios en español simple. Aplica UN cambio a la vez para que el dueño vea la relación causa-efecto entre lo que pide y lo que pasa.

### Cambios comunes y dónde hacerlos

| Lo que dice el dueño | Qué archivo editar |
|---|---|
| "Ponlo más verde" / "Cambia el color" | `app/globals.css` — variables `--primary`, `--background`, etc. |
| "Letra más grande" | `app/globals.css` — valores de `clamp()` en los tamaños de fuente |
| "Cambia el tipo de letra" | `app/layout.tsx` — cambia la importación de `next/font/google` |
| "Agrega otro servicio" | `app/page.tsx` o `lib/i18n.ts` — añadir al diccionario y al grid |
| "No me gusta la foto" / "Pon mi logo" | Copiar el archivo a `public/` y actualizar la referencia |
| "El botón de WhatsApp no funciona" | Verificar el número en `wa.me/` (sin +, sin espacios, sin guiones) |
| "Quiero que diga otra cosa" | `lib/i18n.ts` — cambiar el texto en ambos idiomas |

Gracias a que los colores son variables CSS y los textos están en un diccionario, la mayoría de cambios son ediciones de una o dos líneas que se reflejan al instante con el hot-reload de Turbopack.

### Reglas de la iteración

- **Un cambio a la vez.** El dueño debe ver que su pedido se reflejó antes de pedir otro.
- **Confirma antes de seguir.** Después de cada cambio, pregunta: "¿Se ve bien? ¿Quieres cambiar algo más?"
- **Nunca inventes.** Si el dueño no ha dado la información, no la imagines. Pon un placeholder visible: "[Pendiente: tu historia aquí]".
- **Explica qué hiciste.** En una frase: "Cambié el color principal a un verde más oscuro. Mira cómo se ve."
- **Si algo se rompe,** di qué pasó en una frase simple, arréglalo, y sigue. No te quedes depurando en silencio.

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
- Si el dueño tiene fotos propias: copiarlas a `public/` y optimizar: formato WebP si es posible, ancho máximo 1200px, `loading="lazy"` para las que están debajo del fold.
- Si no tiene nada: generar gráficos SVG inline con los colores de marca. Patrones, formas geométricas, o iconos simples. NUNCA descargar fotos de internet.

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
