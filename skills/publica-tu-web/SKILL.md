---
name: publica-tu-web
description: >-
  Publica la web del asistente en Vercel y muestra un QR para escanear con el
  móvil. Usa esta skill siempre que el usuario quiera publicar, subir, desplegar
  o poner su página en internet, o diga cualquier variante: "publica mi página",
  "súbela a internet", "quiero mi link", "cómo la comparto", "ya terminé mi
  página", "ponla en línea", "deploy", "vercel", "dame mi URL", "quiero
  enseñarla", "quiero compartirla", "subir mi página", "ponerla en internet",
  "hacerla pública", "cómo la publico", "sácala en vivo".
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
GitLab ni ningún servicio de repositorios — el flujo es solo con correo
electrónico.

---

## Paso 0 — Verificar que el sitio compila

Ejecuta el build ANTES de cualquier otra cosa. Hazlo primero porque si
intentas hacer login antes y el build falla después, habrás quemado la
ventana de autenticación — el token de Vercel puede expirar mientras arreglas
errores de compilación, y tendrás que repetir el login frente al salón.

```bash
npm run build
```

Dile al asistente:

> "Estoy revisando que tu página esté lista para publicar. Dame un momento..."

### Si pasa: el build falla

No avances hasta resolverlo. Un deploy con errores de build va a fallar en
el servidor de Vercel y la espera será más larga y frustrante.

1. Lee el mensaje de error completo.
2. Arregla el problema (errores de TypeScript, imports rotos, archivos faltantes).
3. Vuelve a correr `npm run build`.
4. Repite hasta que el build pase limpio (exit code 0).

Si tuviste que arreglar algo, dile:

> "Había un detallito que arreglé. Ya está listo."

**No continúes al paso siguiente hasta que `npm run build` termine con éxito.**

---

## Paso 1 — Instalar Vercel CLI (solo si falta)

Instala globalmente solo si no está disponible. Verifica primero:

```bash
vercel --version
```

Si pasa -> ya está instalado, salta al Paso 2.

Si falla -> instálalo:

```bash
npm i -g vercel
```

### Si pasa: npm i -g falla por permisos

Usa `npx --yes vercel` como alternativa. Si tomas esta vía, sustituye
`vercel` por `npx --yes vercel` en **todos** los comandos del resto de
esta skill y mantén esa forma consistente.

---

## Paso 2 — Iniciar sesión en Vercel (por email)

Este paso requiere la participación del asistente. Usa login por email —
es la ÚNICA forma válida. Los asistentes del taller no tienen cuenta de
GitHub ni tokens de API. Explícale exactamente qué va a pasar ANTES de
ejecutar el comando para que no se sorprenda.

Dile al asistente:

> "Ahora vamos a conectarnos a Vercel, que es el servicio donde va a vivir tu
> página. Necesito tu correo electrónico — el mismo que usaste para crear tu
> cuenta de Vercel."

Espera a que el asistente proporcione su email. Luego:

> "Perfecto. Voy a correr un comando y Vercel te va a enviar un correo de
> confirmación. Cuando te llegue, solo tienes que hacer clic en el botón que
> dice 'Verify' o 'Confirmar'. Nada más."

Ejecuta:

```bash
vercel login EMAIL_DEL_ASISTENTE
```

Donde `EMAIL_DEL_ASISTENTE` es el correo que proporcionó.

**CRÍTICO:** ejecuta este comando con un timeout de **300000 milisegundos
(5 minutos)**. El asistente necesita físicamente caminar a revisar su correo
en su teléfono, buscar el mensaje de Vercel (puede estar en spam), abrirlo y
hacer clic en el enlace de verificación. El timeout por defecto de 2 minutos
lo matará a mitad de proceso y tendrás que repetir frente a todo el salón.

### Qué va a pasar

1. La terminal muestra un mensaje pidiendo que revise su correo.
2. Vercel envía un email con un botón de verificación.
3. El asistente hace clic en el botón desde su correo (en su teléfono o laptop).
4. La terminal detecta la verificación y muestra un mensaje de éxito.

### Si pasa: el correo no llega

> "A veces tarda un par de minutos. Revisa también la carpeta de spam o correo
> no deseado. Si no llega en 3 minutos, lo intentamos de nuevo."

Reintenta el comando si es necesario.

### Si pasa: el login expira (timeout)

> "Se pasó el tiempo. No te preocupes, lo intentamos otra vez."

Vuelve a ejecutar `vercel login EMAIL_DEL_ASISTENTE` con el mismo timeout
de 300000ms.

### Si pasa: el asistente no tiene cuenta de Vercel

> "Necesitas una cuenta gratuita de Vercel. Ve a vercel.com, haz clic en
> 'Sign Up', elige 'Continue with Email', pon tu correo y sigue los pasos.
> Es gratis y toma un minuto."

Espera a que termine y reintenta el login.

---

## Paso 3 — Publicar el sitio

Dile al asistente:

> "¡Ya casi! Ahora voy a subir tu página a internet. Esto puede tomar entre
> 1 y 3 minutos dependiendo de la velocidad del internet."

Ejecuta el deploy desde el directorio raíz del proyecto:

```bash
vercel --prod --yes
```

El flag `--yes` acepta todas las preguntas de configuración automáticamente:
crea un proyecto nuevo bajo la cuenta del asistente, acepta el nombre de la
carpeta como nombre del proyecto, y configura el directorio sin hacer ninguna
pregunta interactiva. Vercel auto-detecta que es un proyecto Next.js y lo
configura todo solo.

### Si pasa: el comando parece colgado (sin salida por más de 60 segundos)

Mátalo y ejecuta estos dos comandos por separado. `vercel link` pre-configura
el proyecto de forma aislada, lo que desbloquea el deploy posterior:

```bash
vercel link --yes
```

Luego reintenta el deploy:

```bash
vercel --prod --yes
```

### Si pasa: el build falla en el servidor de Vercel

El build local pasó pero el remoto falló. Causa común: dependencias que
faltan o variables de entorno. Lee el log de error de Vercel, arregla el
problema localmente, vuelve a correr `npm run build` para confirmar, y
reintenta `vercel --prod --yes`.

### Si pasa: red lenta o timeout

> "El internet está un poco lento. Voy a intentar de nuevo."

Reintenta el comando. Si sigue fallando después de 3 intentos:

> "Parece que el internet no está cooperando ahorita. Tu página está lista en
> tu computadora — cuando tengas mejor conexión, abre tu terminal, ve a la
> carpeta de tu proyecto, y escribe `vercel --prod`. Con eso se publica."

### Si pasa: error de autenticación

Si el token expiró entre el login y el deploy, regresa al Paso 2 y repite
el login.

---

## Paso 4 — Mostrar el QR y la URL

Cuando el deploy termine con éxito, Vercel muestra la URL de producción en
la salida del comando. Captura esa URL (tiene el formato
`https://nombre-del-proyecto.vercel.app`).

Muestra el código QR en la terminal. Usa la forma por stdin — la forma con
argumento posicional silenciosamente no produce nada:

```bash
echo "URL_PUBLICA" | npx --yes qrcode-terminal
```

### Si pasa: qrcode-terminal no funciona

Usa esta alternativa (también con `--yes` para evitar prompts de npx):

```bash
npx --yes qrcode "URL_PUBLICA"
```

Si ninguna funciona, muestra la URL en texto grande y dile al asistente
que la escriba en su teléfono.

Dile al asistente:

> "¡Tu página ya está EN VIVO en internet! Esta es tu dirección:"
>
> **URL_PUBLICA**
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
> "Tu dirección es: **URL_PUBLICA**"
>
> "Tres cosas importantes:"
>
> "1. **La URL es tuya.** Guárdala — es la dirección permanente de tu página:
> URL_PUBLICA"
>
> "2. **Para publicar cambios** que hagas después, abre la terminal en la
> carpeta de tu proyecto y escribe `vercel --prod`. En un par de minutos tu
> página se actualiza."
>
> "3. **Dominio propio** (opcional): si quieres que tu página se llame algo
> como `www.tunegocio.com` en vez de `tunegocio.vercel.app`, puedes comprar un
> dominio y conectarlo desde tu cuenta de Vercel. Eso lo puedes hacer después
> con calma."

---

## Referencia rápida para republicar

Para el asistente que quiera republicar cambios después del taller:

```bash
# 1. Ir a la carpeta del proyecto
cd mi-proyecto

# 2. Verificar que todo funciona
npm run build

# 3. Publicar
vercel --prod
```

---

## Notas técnicas (para el agente, no para el asistente)

- Todos los comandos usan `npm`, nunca `pnpm`, `bun` ni `yarn`.
- El deploy es directo desde el directorio local, sin necesidad de un repositorio git.
- `vercel --prod --yes` evita prompts interactivos.
- Si `npx vercel` se usa en lugar de `vercel` global, mantén esa forma en todos los pasos.
- El proyecto es Next.js — Vercel lo detecta y lo despliega con zero-config.
- No mencionar GitHub, GitLab ni ningún servicio de repositorios al asistente. El flujo es email puro.
- Si el asistente pregunta por costos: el plan gratuito de Vercel es suficiente para una landing page. No se cobra nada extra.
- Usa `--yes` en todas las invocaciones de `npx` para evitar prompts de confirmación.
