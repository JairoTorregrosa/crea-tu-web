---
name: publica-tu-web
description: >-
  Publica la web del asistente en Cloudflare Pages y muestra un QR para
  escanear con el móvil. Usa esta skill siempre que el usuario quiera
  publicar, subir, desplegar o poner su página en internet, o diga cualquier
  variante: "publica mi página", "súbela a internet", "quiero mi link",
  "cómo la comparto", "ya terminé mi página", "ponla en línea", "deploy",
  "cloudflare", "dame mi URL", "quiero enseñarla", "quiero compartirla",
  "subir mi página", "ponerla en internet", "hacerla pública", "cómo la
  publico", "sácala en vivo".
---

# Publica tu web

> **Contexto — lee esto antes de ejecutar nada.**
>
> Este es el paso 4 del taller, el gran final: la página del dueño de negocio
> sale EN VIVO y la escanea con su teléfono frente al grupo. Todo el taller se
> construyó para llegar a este momento. Un deploy atascado frente al salón es
> el peor fallo posible, así que cada paso lleva su ruta de recuperación lista.
> No dejes al asistente esperando sin saber qué pasa — narra cada etapa en
> español sencillo y anticípate a los problemas antes de que ocurran.

Toda la comunicación con el asistente es en español claro. Si un término
técnico es inevitable, explícalo en una frase sencilla. No menciones GitHub,
GitLab ni ningún servicio de repositorios — la publicación es una subida
directa desde su computadora; no hace falta ningún repositorio.

El servicio de publicación es **Cloudflare Pages**: gratis, sin tarjeta, y su
plan gratuito sí permite la página de un negocio (la única restricción
relevante: la página no debe procesar pagos ni datos de tarjetas — una página
informativa con teléfono y WhatsApp es perfectamente válida).

---

## Paso 0 — Preparar el sitio para exportación estática

La página se publica como sitio estático. Antes de compilar, revisa
`next.config.ts` en la raíz del proyecto. Debe incluir `output: "export"` e
imágenes sin optimizador (el optimizador de imágenes necesita un servidor que
aquí no existe):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

Si el archivo no tiene estas dos opciones, agrégalas sin borrar lo demás.

Luego ejecuta el build ANTES de cualquier otra cosa. Hazlo primero porque si
intentas hacer login antes y el build falla después, habrás quemado tiempo
de la sesión frente al salón arreglando errores de compilación.

```bash
npm run build
```

Dile al asistente:

> "Estoy revisando que tu página esté lista para publicar. Dame un momento..."

El build debe terminar sin errores y dejar una carpeta `out/` en la raíz del
proyecto con un `index.html` adentro. Verifícalo antes de seguir.

### Si pasa: el build falla

No avances hasta resolverlo. 

1. Lee el mensaje de error completo.
2. Arregla el problema (errores de TypeScript, imports rotos, archivos
   faltantes; si el error menciona `next/image` y "unoptimized", revisa que
   `images: { unoptimized: true }` quedó bien puesto).
3. Vuelve a correr `npm run build`.
4. Repite hasta que el build pase limpio (exit code 0) y exista `out/index.html`.

Si tuviste que arreglar algo, dile:

> "Había un detallito que arreglé. Ya está listo."

**No continúes al paso siguiente hasta que `npm run build` termine con éxito
y exista `out/index.html`.**

---

## Paso 1 — Verificar wrangler (la herramienta de Cloudflare)

No hace falta instalar nada globalmente: usa `npx`, que descarga la
herramienta la primera vez y la reutiliza después.

```bash
npx --yes wrangler --version
```

Si pasa -> continúa al Paso 2.

Si falla por red -> revisa la conexión a internet y reintenta. Usa
`npx --yes wrangler` como forma consistente en **todos** los comandos del
resto de esta skill.

---

## Paso 2 — Iniciar sesión en Cloudflare

Este paso requiere la participación del asistente. El login abre el navegador
para autorizar — es la forma normal, no un error. Explícale exactamente qué
va a pasar ANTES de ejecutar el comando para que no se sorprenda.

Dile al asistente:

> "Ahora vamos a conectarnos a Cloudflare, que es el servicio donde va a
> vivir tu página. Se va a abrir tu navegador con una pantalla de Cloudflare.
> Si te pide entrar, entra con tu cuenta; luego aparece un botón azul que
> dice **'Allow'** (permitir). Dale clic a ese botón y listo."

Ejecuta:

```bash
npx --yes wrangler login
```

**CRÍTICO:** ejecuta este comando con un timeout de **300000 milisegundos
(5 minutos)**. El asistente puede necesitar iniciar sesión en Cloudflare,
recuperar su contraseña o leer la pantalla con calma. El timeout por defecto
de 2 minutos lo matará a mitad de proceso y tendrás que repetir frente a todo
el salón.

### Qué va a pasar

1. La terminal imprime un enlace y abre el navegador.
2. El asistente entra a su cuenta de Cloudflare (si no tenía la sesión abierta).
3. Aparece la pantalla de autorización; el asistente hace clic en **Allow**.
4. La terminal muestra "Successfully logged in".

### Si pasa: el navegador no se abre

Copia el enlace `https://dash.cloudflare.com/oauth2/auth?...` que la terminal
imprimió y dile al asistente que lo abra en su navegador.

### Si pasa: el asistente no tiene cuenta de Cloudflare

> "Necesitas una cuenta gratuita de Cloudflare. Ve a
> dash.cloudflare.com/sign-up, pon tu correo y una contraseña, y confirma el
> correo que te llega. Es gratis, no pide tarjeta, y toma un minuto."

Espera a que termine y reintenta el login.

### Si pasa: el login expira (timeout)

> "Se pasó el tiempo. No te preocupes, lo intentamos otra vez."

Vuelve a ejecutar `npx --yes wrangler login` con el mismo timeout de 300000ms.

---

## Paso 3 — Publicar el sitio

Dile al asistente:

> "¡Ya casi! Ahora voy a subir tu página a internet. Esto toma menos de un
> minuto."

Usa el slug del proyecto (el nombre de la carpeta, por ejemplo
`taqueria-la-estrella`) como nombre del sitio. Primero crea el proyecto una
única vez:

```bash
npx --yes wrangler pages project create <slug> --production-branch=main
```

Luego sube la carpeta `out/`:

```bash
npx --yes wrangler pages deploy out --project-name=<slug> --branch=main --commit-dirty=true
```

La dirección pública del sitio es `https://<slug>.pages.dev`.

**Ojo:** el comando de deploy imprime una URL de vista previa con un código
al principio (por ejemplo `https://8d4393fc.<slug>.pages.dev`). Esa no es la
dirección que se comparte. La dirección real es `https://<slug>.pages.dev`,
sin el código. Tarda entre 15 y 30 segundos en empezar a responder después
del primer deploy — espera y verifica tú mismo que carga antes de anunciarla.

### Si pasa: el nombre del proyecto ya está ocupado

Otro sitio en el mundo ya usa ese nombre. Prueba variantes hasta encontrar
una libre, en este orden: `<slug>-<pueblo>` (ej. `taqueria-la-estrella-montrose`),
`<slug>-<estado>` (ej. `-co`), `<slug>-oficial`. Repite el
`project create` con el nombre nuevo y usa ese mismo nombre en el deploy.

### Si pasa: "project not found" en el deploy

El `project create` no llegó a ejecutarse o falló. Córrelo de nuevo y
reintenta el deploy.

### Si pasa: error de autenticación

Si el token expiró entre el login y el deploy, regresa al Paso 2 y repite
el login.

### Si pasa: red lenta o timeout

> "El internet está un poco lento. Voy a intentar de nuevo."

Reintenta el deploy. Si sigue fallando después de 3 intentos:

> "Parece que el internet no está cooperando ahorita. Tu página está lista en
> tu computadora — cuando tengas mejor conexión, me pides 'publica mi página'
> otra vez y en un minuto queda."

---

## Paso 4 — Mostrar el QR y la URL

Cuando la URL `https://<slug>.pages.dev` ya responda, muestra el código QR
en la terminal. Usa la forma por stdin — la forma con argumento posicional
silenciosamente no produce nada:

```bash
echo "https://<slug>.pages.dev" | npx --yes qrcode-terminal
```

### Si pasa: qrcode-terminal no funciona

Usa esta alternativa (también con `--yes` para evitar prompts de npx):

```bash
npx --yes qrcode "https://<slug>.pages.dev"
```

Si ninguna funciona, muestra la URL en texto grande y dile al asistente
que la escriba en su teléfono.

Dile al asistente:

> "¡Tu página ya está EN VIVO en internet! Esta es tu dirección:"
>
> **https://<slug>.pages.dev**
>
> "Abre la cámara de tu teléfono y apúntala al código QR de la pantalla. Te va
> a llevar directo a tu página. ¡Enséñasela a quien quieras — es tuya!"

---

## Paso 5 — Celebrar y cerrar

Este es el momento culminante del taller. Dale su espacio al asistente para
que lo disfrute. Después, cierra con el mensaje final. Usa esta plantilla:

### Usa esta plantilla

> "¡Felicidades! Tu página ya está en internet y cualquier persona en el mundo
> puede verla."
>
> "Tu dirección es: **https://<slug>.pages.dev**"
>
> "Tres cosas importantes:"
>
> "1. **La URL es tuya.** Guárdala — es la dirección permanente de tu página."
>
> "2. **Para publicar cambios** que hagas después, me dices 'publica mi
> página' y yo corro los dos comandos (compilar y subir). En menos de un
> minuto tu página se actualiza."
>
> "3. **Dominio propio** (opcional): si quieres que tu página se llame algo
> como `www.tunegocio.com` en vez de `tunegocio.pages.dev`, puedes comprar un
> dominio (~US$10 al año) y conectarlo desde tu cuenta de Cloudflare. Eso lo
> puedes hacer después con calma — yo te guío cuando quieras."

---

## Referencia rápida para republicar

Para republicar cambios después del taller (desde la carpeta del proyecto):

```bash
# 1. Verificar que todo funciona
npm run build

# 2. Publicar
npx --yes wrangler pages deploy out --project-name=<slug> --branch=main --commit-dirty=true
```

En macOS/Linux se pueden encadenar con `&&`. En Windows (PowerShell),
ejecutar de uno en uno.

---

## Notas técnicas (para el agente, no para el asistente)

- Todos los comandos usan `npm` y `npx --yes`, nunca `pnpm`, `bun` ni `yarn`.
- El deploy es una subida directa de la carpeta `out/`, sin necesidad de un
  repositorio git. `--commit-dirty=true` evita el warning por cambios sin
  commit cuando la carpeta sí es un repo.
- En Windows/PowerShell el operador `&&` no existe (PowerShell 5.1): ejecuta
  los comandos de uno en uno.
- El sitio es Next.js con `output: "export"` — 100% estático. Sin server
  actions, sin API routes, sin `next/image` optimizado (por eso
  `unoptimized: true`).
- La primera vez, `wrangler login` guarda el token en la máquina del
  asistente; las republicaciones futuras no vuelven a pedir login hasta que
  expire.
- Ciclo completo medido: build+deploy ~15 s en un proyecto pequeño, más
  ~15-30 s de propagación de la URL de producción la primera vez.
- Si el asistente pregunta por costos: el plan gratuito de Cloudflare Pages
  es suficiente para la página de un negocio y no pide tarjeta. La página no
  debe procesar pagos ni datos de tarjetas (una página informativa con
  botones de llamar/WhatsApp está bien).
- No mencionar GitHub, GitLab ni repositorios al asistente. El flujo es
  navegador + subida directa.
