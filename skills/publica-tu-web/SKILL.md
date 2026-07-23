---
name: publica-tu-web
description: Publish the attendee's website live on Vercel and celebrate the moment. Use this skill when the user wants to deploy, publish, upload, or put their site online, or when they say "publicar", "subir mi pagina", "ponerla en internet", "deploy", "vercel", or ask for a public URL or QR code of their site. Also trigger when the user says "ya termine mi pagina" or asks "como la comparto". This is the grand finale of the workshop -- it takes the locally running Next.js site and makes it live on the internet.
---

# Publica tu web

Esta skill guia al asistente paso a paso para publicar su sitio en internet usando Vercel. Al terminar, tendra una URL publica que puede abrir en su telefono con un codigo QR.

Toda la comunicacion con el asistente es en espanol claro. Si un termino tecnico es inevitable, explicalo en una frase sencilla.

---

## Paso 0 — Verificar que el sitio compila

Antes de publicar, el sitio tiene que funcionar sin errores. Ejecuta:

```bash
npm run build
```

### Si el build falla

1. Lee el mensaje de error completo.
2. Arregla el problema (errores de TypeScript, imports rotos, archivos faltantes).
3. Vuelve a correr `npm run build`.
4. Repite hasta que el build pase limpio.

Dile al asistente algo como:

> "Estoy revisando que tu pagina este lista para publicar. Dame un momento..."

Si tuviste que arreglar algo:

> "Habia un detallito que arregle. Ya esta listo."

No continuar al paso siguiente hasta que `npm run build` termine con exito (exit code 0).

---

## Paso 1 — Instalar Vercel CLI

Verifica si Vercel CLI esta instalado:

```bash
npx --yes vercel --version
```

Si no esta instalado o el comando falla, instalalo:

```bash
npm install -g vercel
```

Si `npm install -g` falla por permisos, intenta:

```bash
npx --yes vercel --version
```

Usar `npx vercel` como alternativa funciona sin instalacion global. Si se va por esta via, todos los comandos `vercel` del resto de esta skill se ejecutan como `npx vercel` en su lugar.

---

## Paso 2 — Iniciar sesion en Vercel

Este paso requiere la participacion del asistente. Explicale exactamente lo que va a pasar ANTES de ejecutar el comando.

Dile al asistente:

> "Ahora vamos a conectarnos a Vercel, que es el servicio donde va a vivir tu pagina. Necesito tu correo electronico -- el mismo que usaste para crear tu cuenta de Vercel."

Espera a que el asistente proporcione su email. Luego:

> "Perfecto. Voy a correr un comando y Vercel te va a enviar un correo de confirmacion. Cuando te llegue, solo tienes que hacer clic en el boton que dice 'Verify' o 'Confirmar'. Nada mas."

Ejecuta:

```bash
vercel login EMAIL_DEL_ASISTENTE
```

**IMPORTANTE para la IA:** ejecuta este comando con un timeout extendido de 300000 milisegundos (5 minutos). El asistente necesita tiempo para abrir su correo, buscar el mensaje de Vercel (puede estar en spam) y hacer clic en el enlace de verificacion. El timeout por defecto de 2 minutos no es suficiente.

Donde `EMAIL_DEL_ASISTENTE` es el correo que proporciono.

### Que va a pasar

1. La terminal muestra un mensaje pidiendo que revise su correo.
2. Vercel envia un email con un boton de verificacion.
3. El asistente hace clic en el boton desde su correo (en su telefono o laptop).
4. La terminal detecta la verificacion y muestra un mensaje de exito.

### Errores comunes en el login

**El correo no llega:**
> "A veces tarda un par de minutos. Revisa tambien la carpeta de spam o correo no deseado. Si no llega en 3 minutos, lo intentamos de nuevo."

Reintenta el comando si es necesario.

**El login expira (timeout):**
> "Se paso el tiempo. No te preocupes, lo intentamos otra vez."

Vuelve a ejecutar `vercel login`.

**El asistente no tiene cuenta de Vercel:**
> "Necesitas una cuenta gratuita de Vercel. Ve a vercel.com, haz clic en 'Sign Up', elige 'Continue with Email', pon tu correo y sigue los pasos. Es gratis y toma un minuto."

Espera a que termine y reintenta el login.

---

## Paso 3 — Publicar el sitio

Dile al asistente:

> "Ya casi! Ahora voy a subir tu pagina a internet. Esto puede tomar entre 1 y 3 minutos dependiendo de la velocidad del internet."

Ejecuta el deploy desde el directorio raiz del proyecto:

```bash
vercel --yes --prod
```

El flag `--yes` acepta las preguntas de configuracion automaticamente. Vercel auto-detecta que es un proyecto Next.js y configura todo solo.

### Si es la primera vez (proyecto nuevo en Vercel)

El flag `--yes` se encarga de toda la configuracion automaticamente: crea un proyecto nuevo bajo la cuenta del asistente, acepta el nombre de la carpeta como nombre del proyecto, y configura el directorio sin hacer ninguna pregunta interactiva. No aparecera ningun prompt.

**Si el comando parece colgado** (sin producir salida por mas de 60 segundos), matalo y ejecuta estos dos comandos por separado:

```bash
vercel link --yes
```

Esto pre-configura el proyecto. Luego reintenta el deploy:

```bash
vercel --yes --prod
```

### Errores comunes en el deploy

**Build falla en el servidor de Vercel:**
El build local paso pero el remoto fallo. Causa comun: dependencias que faltan o variables de entorno. Lee el log de error de Vercel, arregla el problema localmente, vuelve a correr `npm run build` para confirmar, y reintenta `vercel --yes --prod`.

**Red lenta o timeout:**
> "El internet esta un poco lento. Voy a intentar de nuevo."

Reintenta el comando. Si sigue fallando despues de 3 intentos:
> "Parece que el internet no esta cooperando ahorita. Tu pagina esta lista en tu computadora -- cuando tengas mejor conexion, abre tu terminal, ve a la carpeta de tu proyecto, y escribe `vercel --prod`. Con eso se publica."

**Error de autenticacion:**
Si el token expiro entre el login y el deploy, reintenta el login (Paso 2).

---

## Paso 4 — Capturar la URL y mostrar el QR

Cuando el deploy termine con exito, Vercel muestra la URL de produccion en la salida del comando. Captura esa URL (tiene el formato `https://nombre-del-proyecto.vercel.app`).

Muestra el codigo QR en la terminal para que el asistente lo escanee con su telefono:

```bash
echo "URL_PUBLICA" | npx --yes qrcode-terminal
```

Dile al asistente:

> "Tu pagina ya esta EN VIVO en internet! Esta es tu direccion:"
>
> **URL_PUBLICA**
>
> "Abre la camara de tu telefono y apuntala al codigo QR de la pantalla. Te va a llevar directo a tu pagina. Ensenaselaa a quien quieras -- es tuya!"

---

## Paso 5 — Celebrar y proximos pasos

Este es el momento culminante del taller. Dale su espacio. Despues, dile:

> "Felicidades! Tu pagina ya esta en internet y cualquier persona en el mundo puede verla. Aqui van tres cosas importantes:"
>
> "1. **La URL es tuya.** Guardala -- es la direccion de tu pagina: URL_PUBLICA"
>
> "2. **Para publicar cambios** que hagas despues, abre la terminal en la carpeta de tu proyecto y escribe `vercel --prod`. En un par de minutos tu pagina se actualiza."
>
> "3. **Dominio propio** (opcional): si quieres que tu pagina se llame algo como `www.tunegocio.com` en vez de `tunegocio.vercel.app`, puedes comprar un dominio y conectarlo desde tu cuenta de Vercel. Eso lo puedes hacer despues con calma."

---

## Resumen de comandos

Para referencia rapida si el asistente necesita republicar despues del taller:

```bash
# 1. Ir a la carpeta del proyecto
cd mi-proyecto

# 2. Verificar que todo funciona
npm run build

# 3. Publicar
vercel --prod
```

---

## Notas tecnicas (para la IA, no para el asistente)

- Todos los comandos usan `npm`, nunca `pnpm`, `bun` ni `yarn`.
- El deploy es directo desde el directorio local, sin necesidad de un repositorio git.
- `vercel --yes --prod` evita prompts interactivos en la mayoria de los casos.
- Si `npx vercel` se usa en lugar de `vercel` global, mantener esa forma en todos los pasos.
- El proyecto es Next.js con rendering por defecto (server) -- Vercel lo detecta como proyecto Next.js y lo despliega con zero-config.
- No mencionar GitHub, GitLab ni ningun servicio de repositorios al asistente. El flujo es email puro.
- Si el asistente pregunta por costos: el plan gratuito de Vercel es suficiente para una landing page. No se cobra nada extra.
- Si `echo URL | npx --yes qrcode-terminal` no funciona (raro), usa como alternativa: `npx --yes qrcode "URL_PUBLICA"` o simplemente muestra la URL en texto grande.
