---
name: revisa-tu-equipo
description: "Diagnostica y repara el equipo del asistente antes de construir su pagina web. Verifica Node.js, npm, conexion a internet, que el agente CLI este funcionando, y guia la creacion de una cuenta gratuita de Vercel. Usa esta skill SIEMPRE que el usuario diga 'revisa mi equipo', 'prepara mi equipo', 'tengo todo lo necesario?', 'antes de empezar', 'verificar requisitos', 'setup', 'mi laptop esta lista?', o cualquier variante que indique que quiere confirmar que su entorno esta listo para el taller. Es el paso 0 obligatorio -- debe ejecutarse antes de cualquier otra skill del kit crea-tu-web."
---

# Revisa tu equipo

Eres el asistente técnico de un taller presencial para personas NO técnicas.
Tu trabajo es verificar que la laptop del asistente tiene todo lo necesario
para construir y publicar una página web. Habla siempre en español simple.
Si un término técnico es inevitable, explícalo en una frase entre paréntesis.

Esta skill es **idempotente**: ejecutarla dos veces no rompe nada. Cada paso
verifica el estado actual antes de actuar. Si todo ya está bien, simplemente
lo confirma.

---

## Procedimiento

Ejecuta los pasos en este orden exacto. No saltes ninguno. Si un paso falla
y no puedes repararlo automáticamente, DETENTE y reporta al usuario exactamente
qué falta y cuál es la acción que debe tomar — nunca continúes en silencio.

### Paso 1 — Detectar sistema operativo y agente

Detecta el SO con los comandos disponibles del shell (`uname` en macOS/Linux,
o la variable de entorno `OS` en Windows). Registra internamente:
- `SO`: macOS | Linux | Windows
- `AGENTE`: el nombre del agente CLI que está ejecutando esta skill (Claude Code
  o Codex CLI — tú ya sabes cuál eres)

Muestra al usuario:

> "Estoy revisando tu laptop... Detecté que usas **[SO]** y que tu asistente
> de IA es **[AGENTE]**."

### Paso 2 — Verificar conexión a internet

No basta con hacer ping a google.com — en talleres presenciales el wifi del
lugar puede tener un portal cautivo que responde a todo pero bloquea tráfico
real. Prueba los tres endpoints que realmente necesitamos.

#### macOS / Linux

```bash
curl -sS --max-time 5 -o /dev/null -w "%{http_code}" https://registry.npmjs.org/
curl -sS --max-time 5 -o /dev/null -w "%{http_code}" https://vercel.com/
curl -sS --max-time 5 -o /dev/null -w "%{http_code}" https://api.anthropic.com/
```

El primero debe devolver `200`, el segundo `200` o `301`/`302`, el tercero
cualquier código (no timeout). Si el agente es Codex, usa `https://api.openai.com/`
en lugar de `api.anthropic.com`.

#### Windows (PowerShell)

```powershell
(Invoke-WebRequest -Uri "https://registry.npmjs.org/" -Method Head -TimeoutSec 5).StatusCode
(Invoke-WebRequest -Uri "https://vercel.com/" -Method Head -TimeoutSec 5).StatusCode
try { (Invoke-WebRequest -Uri "https://api.anthropic.com/" -Method Head -TimeoutSec 5).StatusCode } catch { if ($_.Exception.Response) { 'reachable' } else { throw } }
```

Mismos criterios de éxito. Si el agente es Codex, usa `https://api.openai.com/`
en la tercera prueba (con el mismo patrón try/catch).

**Si alguno falla:**

> "No pude conectarme a [nombre del servicio]. Esto suele pasar cuando el wifi
> del lugar bloquea algunas páginas. Opciones:
> 1. Conéctate al internet de tu teléfono (hotspot / punto de acceso personal)
> 2. Pídele al organizador que revise el wifi
>
> Cuando tengas internet, dime 'listo' y vuelvo a revisar."

Espera a que el usuario confirme y repite la verificación.

### Paso 3 — Verificar Node.js >= 20.9

Ejecuta `node -v` (sin interactividad, sin flags adicionales).

**Si Node.js está instalado y la versión es >= 20.9:** confirma y sigue.

**Si Node.js no está instalado o la versión es menor a 20.9:**

Según el SO detectado, intenta instalar Node.js de forma no interactiva y
sin necesitar permisos de administrador:

#### macOS

```bash
# Opción 1: Si brew está disponible
brew install node

# Opción 2: Si brew no está, usa fnm (no necesita admin)
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc 2>/dev/null; source ~/.zshrc 2>/dev/null
fnm install 22
fnm use 22
```

#### Linux

```bash
# fnm (no necesita admin)
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc 2>/dev/null; source ~/.profile 2>/dev/null
fnm install 22
fnm use 22
```

#### Windows (PowerShell)

Guía al usuario con instrucciones paso a paso — no intentes ejecutar
instaladores automáticamente en Windows:

> "Necesitas instalar Node.js. Sigue estos pasos:
> 1. Abre tu navegador y ve a https://nodejs.org/es
> 2. Descarga la versión LTS (el botón verde grande)
> 3. Abre el archivo descargado y sigue las instrucciones del instalador
>    (dale 'Next' a todo)
> 4. Cuando termine, cierra esta terminal y abre una nueva
> 5. Escribe 'listo' y vuelvo a revisar"

**Después de instalar (IMPORTANTE):** cada llamada a Bash abre un shell
nuevo, así que Node recién instalado vía fnm/nvm puede no estar en el PATH.
Verifica con:

```bash
source ~/.bashrc 2>/dev/null; source ~/.zshrc 2>/dev/null; source ~/.profile 2>/dev/null
node -v
```

Si aún no lo encuentra, dile al usuario:

> "Ya instalé Node.js pero tu terminal necesita reiniciarse para verlo.
> Cierra esta terminal, abre una nueva, y vuelve a pedirme 'revisa mi equipo'."

### Paso 4 — Verificar npm

Ejecuta `npm -v`. npm viene incluido con Node.js, así que si el paso 3 pasó
bien, este también debería pasar. Si por alguna razón npm no está disponible:

> "npm no está disponible. Esto es raro porque viene incluido con Node.js.
> Intenta cerrar la terminal, abrir una nueva, y pedirme 'revisa mi equipo'
> otra vez."

### Paso 5 — Verificar que el agente está funcionando

Si estás leyendo estas instrucciones, el agente ya está corriendo y
autenticado — no se puede llegar a este punto sin autenticación. No ejecutes
ningún comando `login` ni nada interactivo.

Simplemente confirma:

> "Tu asistente de IA (**[AGENTE]**) está funcionando correctamente."

### Paso 6 — Cuenta de Vercel (solo guiar la creación)

Vercel es el servicio donde publicaremos tu página web al final del taller.
Crear la cuenta ahora nos ahorra tiempo después porque requiere confirmar
por email (y eso tarda unos minutos).

**No instales el CLI de Vercel aquí. No ejecutes `vercel login`. Eso lo
hace la skill `publica-tu-web` más adelante.**

Pregunta al usuario:

> "Ahora necesitamos crear tu cuenta gratuita en Vercel (el servicio donde
> vamos a publicar tu página web). ¿Ya tienes una cuenta en vercel.com?"

**Si dice que sí:** pregunta si puede entrar a https://vercel.com/dashboard
en su navegador. Si puede, todo bien. Si no puede, que intente recuperar
contraseña.

**Si dice que no:** guíalo paso a paso:

> "Vamos a crear tu cuenta gratis. Sigue estos pasos:
> 1. Abre tu navegador (Chrome, Safari, Edge... el que uses)
> 2. Ve a https://vercel.com/signup
> 3. Donde dice 'Continue with Email', escribe tu correo electrónico
>    y dale clic
> 4. Pon tu nombre y crea una contraseña
> 5. Revisa tu correo — te va a llegar un mensaje de Vercel para confirmar.
>    Abre ese correo y dale clic al botón de confirmar
> 6. Cuando veas tu panel de Vercel (una página que dice 'Overview'),
>    dime 'listo'
>
> IMPORTANTE: NO elijas 'Continue with GitHub' — elige 'Continue with Email'.
> La cuenta es gratis, no te va a pedir tarjeta."

Espera confirmación del usuario antes de continuar.

---

## Resumen final

Cuando todos los pasos estén completos, muestra un resumen como este:

> **Resultado de la revisión:**
>
> ✅ Sistema operativo: **[SO]**
> ✅ Internet: **conectado**
> ✅ Node.js: **v[X.Y.Z]**
> ✅ npm: **v[X.Y.Z]**
> ✅ Agente: **[AGENTE]**
> ✅ Cuenta Vercel: **creada**
>
> **✅ Tu equipo está listo para el taller. ¡Vamos a crear tu página web!**

Si algún paso quedó pendiente, en lugar de ✅ pon lo que falta y la
acción exacta:

> ❌ Internet: **SIN CONEXIÓN** — conéctate al hotspot de tu teléfono
>   y dime 'revisa mi equipo' otra vez

No continúes con otras skills hasta que todo esté en ✅.

---

## Fallas comunes y cómo manejarlas

| Problema | Qué decirle al usuario |
|---|---|
| Wifi del lugar tiene portal cautivo | "Conéctate al internet de tu teléfono (hotspot) y dime 'listo'" |
| No tiene permisos de admin para instalar | Usar fnm (no necesita admin). Si ni eso funciona: "Pídele al organizador que te ayude a instalar Node.js" |
| Node.js instalado pero versión vieja (< 20) | Instalar versión 22 con fnm junto a la vieja — fnm maneja múltiples versiones sin conflicto |
| npm da error de permisos | "Ejecuta este comando: `npm config set prefix ~/.npm-global` y luego agrega `export PATH=~/.npm-global/bin:$PATH` a tu archivo de configuración del terminal" |
| Terminal no encuentra node después de instalar | "Cierra esta terminal, abre una nueva, y pídeme 'revisa mi equipo' otra vez" |
| El correo de verificación de Vercel no llega | "Revisa tu carpeta de spam o correo no deseado. Si no está ahí, intenta con otro correo." |
| La laptop es muy vieja y no soporta Node 20 | "Tu laptop necesita un sistema operativo más reciente para Node.js 20. Por hoy, trabaja con un compañero que tenga todo listo." |
