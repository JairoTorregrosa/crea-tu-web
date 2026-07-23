---
name: disena-tu-marca
description: "Entrevista de marca en español para pequeños negocios: pregunta colores, sensación, qué NO parecer, logo; genera DESIGN.md con identidad, paleta verificada AA, tipografía, componentes; y aplica los tokens al sitio Next.js/Tailwind v4/shadcn ya scaffoldeado. Úsala siempre que el usuario pida definir marca, elegir colores, crear identidad visual, generar DESIGN.md, personalizar el diseño de su sitio, o diga \"diseña tu marca\", \"colores de mi negocio\", \"identidad visual\", \"paleta\", \"look and feel\", \"quiero que se vea profesional/festivo/cercano\". Ejecútala DESPUÉS de crea-tu-web. Funciona incluso si el sitio aún no existe (solo genera DESIGN.md y avisa)."
---

# Diseña tu marca

Esta skill guía al dueño de un pequeño negocio para definir la identidad visual de su
sitio web. El proceso tiene tres pasos: entrevistar, documentar y aplicar.

Principio central: el dueño decide la DIRECCIÓN de su marca (colores, sensación, lo que
quiere evitar, logo). Tu trabajo es aportar OFICIO: proponer valores concretos (hexadecimales,
familias tipográficas, escalas) que cumplan con la dirección elegida, verificar contraste
y calidad, y presentar cada propuesta para confirmación. Nunca sustituyas una decisión de
marca que le corresponde al dueño; si no la ha tomado, deja `[PENDIENTE]` con la pregunta
literal.

Todo lo que se muestre al dueño o se escriba en DESIGN.md va en español claro, sin jerga.
Si un término técnico es inevitable, explícalo en una frase.

---

## Paso 1 — Entrevista de marca

Antes de escribir nada, lee `negocio.json` en la raíz del proyecto (si existe). Este
archivo lo genera la skill crea-tu-web y contiene campos que ya responden algunas de
las preguntas de abajo: `colores`, `no_quiere` y `tiene_logo`. Si un campo ya tiene
valor en negocio.json, NO repitas esa pregunta — usa la respuesta que ya existe y
confírmala brevemente ("Veo que te gustan los colores rojo y amarillo, ¿sigue siendo
así o quieres cambiar?"). Solo pregunta de cero si el campo está vacío o no existe.

Adáptate a lo que ya sepas del negocio (si crea-tu-web ya corrió, lee el sitio
scaffoldeado y cualquier información previa para no repetir preguntas sobre el tipo
de negocio).

### Preguntas obligatorias

1. **Colores:** "¿Qué colores te representan o te gustan para tu negocio? Puede ser un
   color exacto, el color de tu local, o una idea general como 'azul marino'."
   *(Omitir si negocio.json ya tiene `colores` con valor — solo confirmar.)*

2. **Sensación:** "¿Qué sensación debe dar tu página a quien la visite? Por ejemplo:
   cercana y familiar, profesional y seria, festiva y alegre, moderna y limpia, otra."

3. **Qué NO parecer:** "¿Hay algo que tu página NO debería parecer? Por ejemplo:
   aburrida, infantil, demasiado formal, barata."
   *(Omitir si negocio.json ya tiene `no_quiere` con valor — solo confirmar.)*

4. **Logo:** "¿Ya tienes un logo? Si lo tienes, pásame el archivo. Si no tienes, ¿quieres
   que te proponga una idea sencilla?"
   *(Omitir si negocio.json ya tiene `tiene_logo` con valor — solo confirmar.)*

### Preguntas opcionales (solo si hay tiempo)

5. "¿Hay algún negocio cuya página te guste cómo se ve? No tiene que ser del mismo rubro."
6. "¿Tienes fotos propias de tu negocio, productos o equipo que quieras usar en la página?"

### Reglas de la entrevista

- Haz UNA pregunta a la vez. Espera la respuesta antes de pasar a la siguiente.
- Si el dueño no tiene preferencia en algo, escribe `[PENDIENTE]` y la pregunta literal en
  DESIGN.md. Nunca inventes la respuesta.
- Si el dueño da una idea vaga ("algo bonito"), profundiza con opciones concretas:
  "Bonito puede significar muchas cosas. ¿Te inclinas más a elegante y limpio, o a
  colorido y llamativo?"
- Si el dueño nombra un color genérico ("rojo"), propón 2-3 tonos concretos con sus
  nombres y códigos HEX para que elija. Por ejemplo: "Rojo cereza (#DC143C), rojo
  ladrillo (#8B2500), rojo vibrante (#FF2D2D) — ¿cuál te gusta más?"

---

## Paso 2 — Generar DESIGN.md

Con las respuestas de la entrevista, genera el archivo `DESIGN.md` en la raíz del proyecto
(junto a package.json, para que las demás skills lo encuentren).

### Plantilla obligatoria

```markdown
# DESIGN.md — [Nombre del negocio]

## Identidad
- Qué hace el negocio en una frase
- Valores de marca (las palabras que el dueño eligió)
- Tono de voz en español
- Tono de voz en inglés

## Logo
- Estado actual: tiene logo / no tiene / [PENDIENTE: pásame el archivo de tu logo]
- Usos permitidos: fondo claro, fondo oscuro
- Espacio de protección mínimo alrededor del logo
- [PENDIENTE] si no hay archivos todavía

## Paleta de colores

| Nombre        | HEX     | OKLCH               | Uso                    | Token shadcn        |
|---------------|---------|---------------------|------------------------|---------------------|
| Ejemplo azul  | #1E3A5F | oklch(0.35 0.05 250)| Primario: botones, CTA | --primary           |
| Ejemplo claro | #F5F5F0 | oklch(0.96 0.01 90) | Fondo principal        | --background        |
| ...           | ...     | ...                 | ...                    | ...                 |

### Verificación de contraste
Para cada par texto/fondo que se use en el sitio:
- Texto normal (< 18px): ratio mínimo 4.5:1 (WCAG AA)
- Texto grande (>= 18px bold o >= 24px): ratio mínimo 3:1
- Elementos de interfaz (bordes, iconos): ratio mínimo 3:1

| Par                          | Ratio | Cumple AA |
|------------------------------|-------|-----------|
| Texto (#...) sobre Fondo (#...)| X.X:1 | Sí / No  |

Si un par NO cumple, propón un tono ajustado y pregúntale al dueño si acepta el cambio.
Nunca publiques un par que falle sin avisarle.

## Tipografía
- Familia de títulos: [nombre] (disponible en Google Fonts)
- Familia de cuerpo: [nombre] (disponible en Google Fonts)
- Escala de tamaños (mobile-first):
  - Título principal (h1): clamp(1.75rem, 4vw, 2.5rem)
  - Subtítulo (h2): clamp(1.25rem, 3vw, 1.75rem)
  - Cuerpo: 1rem (mínimo 16px en móvil)
  - Texto pequeño: 0.875rem
- Notas: las fuentes se cargan con next/font/google en layout.tsx para evitar
  peticiones externas y layout shift

## Imágenes y fotografía
- Estilo deseado (ej: fotos reales del negocio, ilustraciones, iconos)
- Reglas de consentimiento: solo usar fotos donde las personas hayan dado permiso
  explícito. Nunca usar fotos descargadas de internet.
- Qué evitar (ej: fotos de stock genéricas, imágenes con marcas de agua)
- Formato preferido: WebP/AVIF con fallback, max 100KB por imagen

## Componentes
- Botones: forma (redondeados/cuadrados), tamaño mínimo táctil 44x44px
- Tarjetas: radio de borde, sombra, espaciado interno
- Encabezado (header): fijo/estático, contenido (logo + nav + toggle idioma)
- Pie de página (footer): contenido mínimo (contacto, horario, redes sociales)
- Barra de contacto móvil: sticky bottom con teléfono y/o WhatsApp

## Accesibilidad e idiomas
- Bilingüe ES/EN con toggle, español por defecto
- Contraste mínimo AA en todos los pares texto/fondo
- Tamaño mínimo de texto en móvil: 16px
- Atributo lang correcto por sección de idioma
- HTML semántico (header, main, nav, footer, section)
- Respetar prefers-reduced-motion
- Tap targets mínimo 44x44px
```

### Reglas al rellenar la plantilla

- La tabla de paleta incluye la columna "Token shadcn" que mapea cada color a su variable
  semántica de shadcn (`--primary`, `--primary-foreground`, `--secondary`,
  `--secondary-foreground`, `--accent`, `--accent-foreground`, `--background`,
  `--foreground`, `--muted`, `--muted-foreground`, `--card`, `--card-foreground`,
  `--border`, `--input`, `--ring`, `--destructive`, `--destructive-foreground`).
  Esto hace que aplicar los tokens (Paso 3) sea buscar en la tabla, no re-derivar.

- Incluye la columna OKLCH porque shadcn v4 usa ese espacio de color. La conversión
  de HEX a OKLCH es mecánica; hazla tú, no le pidas al dueño que la haga.

- Calcula los ratios de contraste reales (luminancia relativa WCAG 2.1) para cada par
  texto/fondo. Usa la fórmula estándar, no aproximaciones. Para obtener un resultado
  fiable, calcula la luminancia relativa con un script inline en lugar de estimar
  visualmente (usa Node.js, que es lo único garantizado en las laptops del taller):
  ```bash
  node -e "const L=h=>{const[r,g,b]=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4);return 0.2126*r+0.7152*g+0.0722*b};const c=(a,b)=>{const[l1,l2]=[L(a),L(b)];return(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)};console.log(c(process.argv[1],process.argv[2]).toFixed(2)+':1')" '#1E3A5F' '#F5F5F0'
  ```

- Si la paleta del dueño produce pares que fallan AA, NO cambies el color en silencio.
  Explícale: "El texto blanco sobre tu amarillo (#FFD700) tiene un contraste de 1.3:1,
  que es muy bajo para leer. Te propongo oscurecerlo a #B8860B (contraste 4.7:1).
  ¿Te parece bien?" Solo aplica el cambio si acepta.

- Para tipografía, elige pares de fuentes que cumplan estas reglas:
  - Disponibles en Google Fonts (se cargarán con next/font/google)
  - La de títulos tiene personalidad (no es la misma que usarías para cualquier negocio)
  - La de cuerpo es legible a 16px en móvil
  - Son complementarias (una serif con una sans, o dos sans de diferente carácter)
  - La tipografía lleva la personalidad de la página, no es un vehículo neutro para
    entregar contenido. Elige fuentes que reflejen el tipo de negocio real.

- Para la dirección visual general, sigue estos principios de buen diseño:
  - Grounding: la dirección visual nace del tipo de negocio real (restaurante, salón,
    contratista). Los materiales, instrumentos y mundo propio del negocio inspiran las
    decisiones.
  - Evitar los 3 looks que la IA genera por defecto: (1) fondo crema con serif y
    terracota, (2) fondo negro con acento ácido verde/rojo, (3) layout de periódico con
    líneas finas y columnas densas. Son legítimos si el dueño los pide, pero no son la
    respuesta automática.
  - Un solo riesgo estético justificable: el elemento firma que hará memorable la página.
  - Toda propuesta se presenta al dueño para confirmación.

---

## Paso 3 — Aplicar los tokens al sitio

Este paso conecta las decisiones de DESIGN.md con el código del sitio. Solo se ejecuta
si el sitio ya fue scaffoldeado por la skill crea-tu-web.

### Detección del sitio

Busca el archivo `globals.css` en estas ubicaciones (en orden):
1. `app/globals.css`
2. `src/app/globals.css`

Si NO encuentras globals.css:
- Escribe DESIGN.md normalmente
- Muestra este mensaje: "Tu documento de marca (DESIGN.md) está listo. Cuando la skill
  crea-tu-web haya creado el sitio, vuelve a ejecutar esta skill (diseña tu marca) para
  aplicar los colores y tipografía al sitio."
- Detente aquí. No intentes crear globals.css desde cero.

### Si el sitio existe: editar globals.css

El sitio usa Tailwind v4 + shadcn, que define tokens semánticos como variables CSS en
OKLCH dentro de bloques `:root` y `.dark`. El puente con Tailwind está en un bloque
`@theme inline`.

**EDITA los valores existentes, nunca regeneres el archivo completo.** Regenerar globals.css
destruye la configuración base de shadcn y cualquier otro estilo que crea-tu-web haya
puesto.

Para cada color de la tabla de DESIGN.md que tenga un token shadcn asignado:

1. Busca la variable en el bloque `:root { ... }` y reemplaza su valor OKLCH.
2. Busca la misma variable en el bloque `.dark { ... }` y pon una variante apropiada
   para modo oscuro (ajusta la luminancia OKLCH: generalmente invertir L para fondos,
   reducir ligeramente para acentos). Presenta la variante oscura al dueño.
3. Verifica que el bloque `@theme inline { ... }` tiene la entrada correspondiente
   (`--color-primary: var(--primary);` etc.). Si falta, agrégala.

Ejemplo de lo que se edita en `:root`:
```css
:root {
  --primary: oklch(0.35 0.05 250);           /* antes: oklch(0.205 0 0) */
  --primary-foreground: oklch(0.98 0.01 250); /* antes: oklch(0.985 0 0) */
  --background: oklch(0.96 0.01 90);          /* antes: oklch(1 0 0) */
  --foreground: oklch(0.15 0.02 250);         /* antes: oklch(0.141 0.005 285.82) */
  /* ... resto de tokens ... */
}
```

Y en `.dark`:
```css
.dark {
  --primary: oklch(0.70 0.08 250);
  --primary-foreground: oklch(0.15 0.02 250);
  --background: oklch(0.15 0.02 250);
  --foreground: oklch(0.96 0.01 90);
  /* ... */
}
```

**Tokens obligatorios a mapear** (si el dueño definió colores para ellos):
- `--background` / `--foreground` — fondo y texto principal
- `--primary` / `--primary-foreground` — botones, CTAs, links activos
- `--secondary` / `--secondary-foreground` — elementos secundarios
- `--accent` / `--accent-foreground` — acentos y highlights
- `--muted` / `--muted-foreground` — fondos suaves y texto secundario
- `--card` / `--card-foreground` — tarjetas
- `--border` — bordes
- `--input` — bordes de inputs
- `--ring` — anillo de foco
- `--destructive` / `--destructive-foreground` — errores y acciones peligrosas

Si el dueño no definió un color para un token, déjalo con el valor por defecto de shadcn.
No inventes.

### Aplicar tipografía

La tipografía se aplica en `layout.tsx` (o `src/app/layout.tsx`), no en globals.css.

1. Importa las fuentes elegidas con `next/font/google`:
   ```tsx
   import { FuenteTitulos, FuenteCuerpo } from "next/font/google";

   const titulos = FuenteTitulos({
     subsets: ["latin"],
     variable: "--font-titulos",
     display: "swap",
   });

   const cuerpo = FuenteCuerpo({
     subsets: ["latin"],
     variable: "--font-cuerpo",
     display: "swap",
   });
   ```

2. Agrega las variables CSS al `<html>` o `<body>`:
   ```tsx
   <html className={`${titulos.variable} ${cuerpo.variable}`}>
   ```

3. En globals.css, registra las variables en `@theme inline` y úsalas:
   ```css
   @theme inline {
     --font-sans: var(--font-cuerpo);
     --font-heading: var(--font-titulos);
   }
   ```

4. Aplica la fuente de títulos en los encabezados mediante CSS:
   ```css
   h1, h2, h3, h4 {
     font-family: var(--font-heading);
   }
   ```

### Aplicar radio de borde y otros tokens

Si DESIGN.md define radio de borde para componentes, actualiza `--radius` en `:root`:
```css
:root {
  --radius: 0.625rem; /* o el valor que el dueño eligió */
}
```

---

## Reglas generales

- **Un cambio a la vez.** En las iteraciones en vivo, muestra un cambio, confirma con el
  dueño, luego el siguiente. No apliques todo de golpe.
- **Nunca inventes decisiones de marca.** Tu rol es proponer opciones y ejecutar las
  elegidas, no decidir por el dueño. Lo que no se decida es `[PENDIENTE]`.
- **Español claro siempre.** Si dices "OKLCH", explica: "es un formato de color que usa
  el sistema de diseño; tú solo necesitas elegir el color, yo hago la conversión".
- **Fotos solo propias.** Nunca descargues ni uses fotos de internet. Solo fotos que el
  dueño haya tomado y donde tenga permiso de las personas que aparecen.
- **Mobile-first.** Todo tamaño de texto, espaciado y componente se define primero para
  móvil y se escala hacia arriba.
- **Accesibilidad no es opcional.** Contraste AA, tap targets de 44px, HTML semántico,
  respetar prefers-reduced-motion. Si algo no cumple, avísale al dueño y propón un
  ajuste — no lo ignores.
- **DESIGN.md es la fuente de verdad.** Las demás skills (planea-tu-web)
  leerán DESIGN.md para tomar decisiones coherentes. Mantenlo actualizado si el dueño
  cambia algo.
- **El sitio puede no existir todavía.** Si globals.css no se encuentra, genera DESIGN.md,
  avisa al dueño y para. No intentes crear el sitio desde esta skill.
