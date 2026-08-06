---
name: disena-tu-marca
description: "Entrevista de marca en español para pequeños negocios: pregunta colores, sensación, qué NO parecer, logo; genera DESIGN.md con paleta verificada AA, tipografía y componentes; aplica los tokens al sitio Next.js/Tailwind v4/shadcn. Úsala siempre que el usuario diga \"diseña mi marca\", \"los colores de mi negocio\", \"cambia los colores\", \"identidad visual\", \"paleta\", \"quiero que se vea más profesional\", \"quiero que se vea más cercana\", \"quiero que se vea festiva\", \"look and feel\", \"personalizar el diseño\", \"colores de mi página\", o cualquier variante de pedir colores, marca o identidad visual. Ejecútala DESPUÉS de crea-tu-web."
---

<!-- ============================================================
  CONTEXTO PARA EL AGENTE (no mostrar al dueño)

  Quién es el usuario: un pequeño empresario hispanohablante, no
  técnico, en un taller presencial. Acaba de crear su sitio con
  crea-tu-web (paso 1). Ahora toca dar identidad visual (paso 2).
  Después vendrán planea-tu-web y publica-tu-web.

  Principio fundamental: las decisiones de marca pertenecen al
  DUEÑO, no al agente. Es SU identidad — sus colores, su
  sensación, su negocio. Si inventas decisiones de marca por él,
  el resultado será una página que no reconoce como suya y que
  terminará descartando. Tu rol es aportar oficio (hexadecimales
  concretos, contrastes verificados, pares tipográficos) dentro
  de la dirección que el dueño elija.
============================================================ -->

# Diseña tu marca

Guía al dueño para definir la identidad visual de su sitio web.
El proceso tiene tres pasos: entrevistar, documentar y aplicar.

Habla siempre en español claro, sin jerga. Si un término técnico
es inevitable, explícalo en una frase ("OKLCH es un formato de
color que usa el sistema de diseño; tú solo eliges el color, yo
hago la conversión").

---

## Paso 1 — Entrevista de marca

Antes de preguntar nada, lee `negocio.json` en la raíz del proyecto
(si existe). Lo genera crea-tu-web y contiene campos que ya responden
algunas preguntas: `colores`, `no_quiere`, `tiene_logo`. Si un campo
ya tiene valor, NO repitas la pregunta — confírmala brevemente ("Veo
que te gustan los colores rojo y amarillo, ¿sigue siendo así o
quieres cambiar?"). Solo pregunta de cero si el campo está vacío o
no existe.

Lee también el sitio scaffoldeado (si existe) para no repetir
preguntas sobre el tipo de negocio.

### Preguntas obligatorias

Haz UNA pregunta a la vez. Espera la respuesta antes de la siguiente.

1. **Colores** — "¿Qué colores te representan o te gustan para tu
   negocio? Puede ser un color exacto, el color de tu local, o una
   idea general como 'azul marino'."
   *(Omitir si negocio.json ya tiene `colores` — solo confirmar.)*

2. **Sensación** — "¿Qué sensación debe dar tu página a quien la
   visite? Por ejemplo: cercana y familiar, profesional y seria,
   festiva y alegre, moderna y limpia, otra."

3. **Qué NO parecer** — "¿Hay algo que tu página NO debería parecer?
   Por ejemplo: aburrida, infantil, demasiado formal, barata."
   *(Omitir si negocio.json ya tiene `no_quiere` — solo confirmar.)*

4. **Logo** — "¿Ya tienes un logo? Si lo tienes, pásame el archivo.
   Si no tienes, ¿quieres que te proponga una idea sencilla?"
   *(Omitir si negocio.json ya tiene `tiene_logo` — solo confirmar.)*

### Preguntas opcionales (solo si hay tiempo)

5. "¿Hay algún negocio cuya página te guste cómo se ve?"
6. "¿Tienes fotos propias de tu negocio o productos que quieras usar
   en la página?"

### Reglas de la entrevista

- **`[PENDIENTE]` antes que inventar.** Si el dueño no tiene
  preferencia en algo, escribe `[PENDIENTE]` y la pregunta literal en
  DESIGN.md. Nunca rellenes tú la respuesta — las decisiones de marca
  inventadas por el agente producen una página que el dueño no reconoce
  como suya y que termina descartando.

- **Profundiza las ideas vagas.** Si dice "algo bonito", ofrece
  opciones concretas: "Bonito puede significar muchas cosas. ¿Te
  inclinas más a elegante y limpio, o a colorido y llamativo?"

- **Concreta los colores genéricos.** Si dice "rojo", propón 2-3
  tonos con nombre y HEX para que elija: "Rojo cereza (#DC143C), rojo
  ladrillo (#8B2500), rojo vivo (#E02020) — ¿cuál te gusta más?"

---

## Paso 2 — Generar DESIGN.md

Con las respuestas, genera `DESIGN.md` en la raíz del proyecto (junto
a package.json, para que las demás skills lo encuentren).

### Plantilla obligatoria

Usa esta plantilla tal cual. Rellena lo que el dueño haya decidido;
lo que no, déjalo como `[PENDIENTE: pregunta literal]`.

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
| Azul marino   | #1E3A5F | oklch(0.35 0.05 250)| Primario: botones, CTA | --primary           |
| Crema suave   | #F5F5F0 | oklch(0.96 0.01 90) | Fondo principal        | --background        |
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

**Paleta y tokens shadcn.** La columna "Token shadcn" mapea cada color
a su variable semántica (`--primary`, `--background`, etc.). Esto hace
que aplicar los tokens en el Paso 3 sea buscar en la tabla, no
re-derivar. Incluye la columna OKLCH porque shadcn v4 usa ese espacio
de color; la conversión HEX a OKLCH es mecánica — hazla tú, no le
pidas al dueño que la haga.

**Verificar contraste con el script.** Los clientes del dueño incluyen
personas mayores leyendo en teléfonos baratos bajo el sol — el
contraste AA no es cosmético, es la diferencia entre poder leer la
página o no. Verifica cada par texto/fondo con el script bundled en
`scripts/contraste.mjs` dentro de esta skill. Tu cwd no es la carpeta
de la skill; resuelve la ruta absoluta del directorio que contiene este
SKILL.md y ejecuta:

```bash
node <ruta-de-la-skill>/scripts/contraste.mjs '#1E3A5F' '#F5F5F0'
```

Imprime el ratio y AA pass/fail. Registra los resultados en la tabla
de verificación de DESIGN.md.

**Si un par falla AA**, NO cambies el color en silencio. Explícale al
dueño: "El texto blanco sobre tu amarillo (#FFD700) tiene un contraste
de 1.4:1, que es muy bajo para leer. Te propongo oscurecerlo a #B8860B
(contraste 4.7:1). ¿Te parece bien?" Solo aplica el cambio si acepta.

**Tipografía.** Elige pares de fuentes que cumplan:
- Disponibles en Google Fonts (se cargan con next/font/google).
- La de títulos tiene personalidad — refleja el tipo de negocio real,
  no es genérica.
- La de cuerpo es legible a 16px en móvil.
- Son complementarias (serif + sans, o dos sans de carácter distinto).

**Dirección visual.** Sigue estos principios de buen diseño:
- *Grounding*: la dirección visual nace del tipo de negocio real
  (restaurante, salón, contratista). Los materiales e instrumentos
  del negocio inspiran las decisiones.
- Evita los 3 looks por defecto de la IA: (1) fondo crema con serif
  y terracota, (2) fondo negro con acento ácido verde/rojo, (3) layout
  de periódico con columnas densas. Son legítimos si el dueño los pide,
  pero no son tu respuesta automática.
- Un solo riesgo estético justificable: el elemento firma que hará
  memorable la página.
- Toda propuesta se presenta al dueño para confirmación.

---

## Paso 3 — Aplicar los tokens al sitio

Conecta las decisiones de DESIGN.md con el código. Solo se ejecuta si
el sitio ya fue scaffoldeado por crea-tu-web.

### Si el sitio no existe todavía

Busca `globals.css` en: `app/globals.css` o `src/app/globals.css`.

Si NO lo encuentras:
1. Escribe DESIGN.md normalmente.
2. Muestra al dueño: "Tu documento de marca (DESIGN.md) está listo.
   Cuando la skill crea-tu-web haya creado el sitio, vuelve a ejecutar
   diseña tu marca para aplicar los colores y tipografía al sitio."
3. Detente aquí. No intentes crear globals.css ni ningún archivo del
   sitio desde esta skill — hacerlo genera un proyecto incompleto que
   crea-tu-web después no puede scaffoldear encima.

### Si el sitio existe: editar globals.css

El sitio usa Tailwind v4 + shadcn con tokens semánticos como variables
CSS en OKLCH dentro de bloques `:root` y `.dark`, y un bloque
`@theme inline` que los conecta a Tailwind.

**EDITA los valores existentes, nunca regeneres el archivo completo.**
Regenerar globals.css destruye la configuración base de shadcn y
cualquier estilo que crea-tu-web haya puesto.

Para cada color de DESIGN.md que tenga un token shadcn asignado:

1. Busca la variable en `:root { ... }` y reemplaza su valor OKLCH.
2. Busca la misma variable en `.dark { ... }` y pon una variante para
   modo oscuro (ajusta la luminancia OKLCH: generalmente invertir L
   para fondos, reducir ligeramente para acentos). Presenta la variante
   oscura al dueño.
3. Verifica que `@theme inline { ... }` tiene la entrada correspondiente
   (`--color-primary: var(--primary);` etc.). Si falta, agrégala.

Ejemplo de edición en `:root`:
```css
:root {
  --primary: oklch(0.35 0.05 250);           /* antes: oklch(0.205 0 0) */
  --primary-foreground: oklch(0.98 0.01 250); /* antes: oklch(0.985 0 0) */
  --background: oklch(0.96 0.01 90);          /* antes: oklch(1 0 0) */
  --foreground: oklch(0.15 0.02 250);         /* antes: oklch(0.141 0.005 285.82) */
}
```

Y en `.dark`:
```css
.dark {
  --primary: oklch(0.70 0.08 250);
  --primary-foreground: oklch(0.15 0.02 250);
  --background: oklch(0.15 0.02 250);
  --foreground: oklch(0.96 0.01 90);
}
```

**Tokens obligatorios a mapear** (si el dueño definió colores):
- `--background` / `--foreground` — fondo y texto principal
- `--primary` / `--primary-foreground` — botones, CTAs, links activos
- `--secondary` / `--secondary-foreground` — elementos secundarios
- `--accent` / `--accent-foreground` — acentos y highlights
- `--muted` / `--muted-foreground` — fondos suaves y texto secundario
- `--card` / `--card-foreground` — tarjetas
- `--border` — bordes
- `--input` — bordes de inputs
- `--ring` — anillo de foco
- `--destructive` / `--destructive-foreground` — errores

Si el dueño no definió un color para un token, déjalo con el valor por
defecto de shadcn. No inventes.

### Aplicar tipografía

La tipografía se aplica en `layout.tsx` (o `src/app/layout.tsx`).

1. Importa las fuentes con `next/font/google`:
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

2. Agrega las variables al `<html>`:
   ```tsx
   <html className={`${titulos.variable} ${cuerpo.variable}`}>
   ```

3. En globals.css, registra en `@theme inline` y aplica:
   ```css
   @theme inline {
     --font-sans: var(--font-cuerpo);
     --font-heading: var(--font-titulos);
   }

   h1, h2, h3, h4 {
     font-family: var(--font-heading);
   }
   ```

### Aplicar radio de borde

Si DESIGN.md define radio de borde, actualiza `--radius` en `:root`:
```css
:root {
  --radius: 0.625rem;
}
```

---

## Reglas generales

- **Un cambio a la vez.** Muestra un cambio, confirma con el dueño,
  luego el siguiente. No apliques todo de golpe.

- **Nunca inventes decisiones de marca.** Lo que no se decida es
  `[PENDIENTE]` con la pregunta literal — porque las decisiones de
  marca inventadas producen una página que el dueño no reconoce como
  suya y que descarta.

- **Fotos solo propias.** Nunca descargues ni uses fotos de internet.
  Solo fotos que el dueño haya tomado y donde tenga permiso de las
  personas que aparecen.

- **Mobile-first.** Todo tamaño, espaciado y componente se define
  primero para móvil y se escala hacia arriba.

- **Accesibilidad no es opcional.** Contraste AA, tap targets de 44px,
  HTML semántico, respetar prefers-reduced-motion. Si algo no cumple,
  avísale al dueño y propón ajuste. Los clientes del negocio incluyen
  personas mayores en teléfonos baratos — no asumir pantallas grandes
  ni visión perfecta.

- **DESIGN.md es la fuente de verdad.** Las demás skills (planea-tu-web)
  leerán DESIGN.md para tomar decisiones coherentes. Mantenlo
  actualizado si el dueño cambia algo.

- **El sitio puede no existir todavía.** Si globals.css no se
  encuentra, genera DESIGN.md, avisa al dueño y para. No intentes
  crear el sitio desde esta skill.
