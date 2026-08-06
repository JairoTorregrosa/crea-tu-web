---
name: revisa-tu-equipo
description: "Diagnostica y repara el equipo del asistente antes de construir su página web. Primero detecta DÓNDE corre: en una laptop con terminal verifica Node.js, npm, internet y el agente CLI; en la app o el celular (ChatGPT Work web/móvil, Claude en claude.ai o Cowork) salta lo del PC y verifica solo cuentas y conectores (GitHub, Cloudflare). Usa esta skill SIEMPRE que el usuario diga 'revisa mi equipo', 'prepara mi equipo', '¿tengo todo lo necesario?', 'antes de empezar', 'verificar requisitos', 'setup', '¿mi laptop está lista?', o cualquier variante que indique que quiere confirmar que su entorno está listo para el taller. Es el paso 0 obligatorio -- debe ejecutarse antes de cualquier otra skill del kit crea-tu-web."
---

# Revisa tu equipo

## Contexto

El usuario es un pequeño empresario hispanohablante sin experiencia técnica.
Está en un taller presencial de 2 horas donde construirá y publicará su
página web desde cero. Este es el **paso 0** del kit de 6 skills:

1. **revisa-tu-equipo** (esta skill)
2. crea-tu-web
3. diseña-tu-marca
4. planea-tu-web
5. publica-tu-web
6. taste-skill (apoyo de diseño; la consulta la IA, no el usuario)

**Éxito** significa que al terminar esta skill el equipo tiene Node.js,
npm, conexión a internet confirmada contra los servicios reales, el agente
CLI funcionando, y una cuenta de Cloudflare creada, de modo que las cuatro
skills de construcción (crea-tu-web, disena-tu-marca, planea-tu-web,
publica-tu-web) puedan ejecutarse sin interrupciones técnicas.

## Instrucciones para el agente

Habla siempre en español simple. Si un término técnico es inevitable,
explícalo en una frase entre paréntesis.

Esta skill es **idempotente**: ejecutarla dos veces no rompe nada. Cada
paso verifica el estado actual antes de actuar. Si todo ya está bien,
simplemente lo confirma.

---

## Procedimiento

Ejecuta los pasos en este orden exacto y no saltes ninguno, salvo el salto
que indique el Paso 0. Si un paso falla y no puedes repararlo
automáticamente, detente y reporta al usuario exactamente qué falta y cuál
es la acción que debe tomar. No continúes en silencio porque una falla
silenciada aquí reaparece después como un error inexplicable a mitad del
taller, lejos del punto donde se originó, y el usuario no tendrá forma de
diagnosticarlo.

### Paso 0 — ¿Dónde estás corriendo?

Antes de revisar nada, determina el MODO. Hay dos:

**Modo app/nube** — el usuario trabaja desde la app de ChatGPT (modo Work,
web o celular) o de Claude (claude.ai, Cowork, o la app del celular), y tú
corres en un sandbox en la nube, no en su computadora. Señales: tus rutas
son tipo `/root` o `/workspace`; no tienes acceso al hardware del usuario;
el usuario menciona que está en el celular o "en la app".

**Modo PC/terminal** — tú eres Claude Code o Codex CLI corriendo en la
laptop del usuario.

Si las señales no bastan para decidir, haz UNA sola pregunta:

> "¿Estás trabajando desde una laptop con la terminal (Claude Code o
> Codex), o desde la app de ChatGPT o Claude — por ejemplo en tu celular?"

**Si es modo app/nube: SALTA los Pasos 1 a 5.** No revises Node.js, npm ni
nada del PC — la construcción corre en la nube y de eso se encarga la
plataforma; revisar el sandbox confundiría al usuario con datos de una
máquina que no es la suya. Lo que sí importa en este modo son las cuentas
y los conectores:

1. **Cuenta de GitHub.** Pregunta: "¿Ya tienes cuenta en github.com?" Si
   no, guíalo: github.com → botón verde "Sign up" → correo, contraseña,
   nombre de usuario (ojo: es público; mejor el nombre del negocio que un
   apodo) → código que llega al correo.
2. **Conector de GitHub autorizado**, según su app:
   - **ChatGPT:** Settings → **Connectors** → GitHub → autorizar.
   - **Claude:** entrar a **claude.ai/code** → conectar GitHub (instala la
     app de Claude y autoriza).
3. **Cuenta de Cloudflare** — igual que el Paso 6 de abajo.

Con esas tres cosas listas, ve directo al Resumen final (variante
app/nube). En este modo el usuario NO necesita computadora: el celular o
la app bastan.

**Si es modo PC/terminal: continúa con el Paso 1.**

### Paso 1 — Detectar sistema operativo y agente

Detecta el SO con los comandos disponibles del shell (`uname` en macOS/Linux,
o la variable de entorno `OS` en Windows). Registra internamente:
- `SO`: macOS | Linux | Windows
- `AGENTE`: el nombre del agente CLI que está ejecutando esta skill (Claude Code
  o Codex CLI — tú ya sabes cuál eres)

Notas sobre Windows (probable en este taller): tanto Claude Code como
Codex corren de forma nativa en Windows y ejecutan comandos en **PowerShell**,
no en bash. En Windows usa las variantes PowerShell de cada paso.
Todos los comandos PowerShell de esta skill funcionan en Windows PowerShell
5.1 (el que viene preinstalado) — no requieren PowerShell 7. Si `uname`
falla con "no se reconoce", estás en PowerShell: confírmalo con `$env:OS`
(devuelve `Windows_NT`).

Muestra al usuario:

> "Estoy revisando tu laptop... Detecté que usas **[SO]** y que tu asistente
> de IA es **[AGENTE]**."

### Paso 2 — Verificar conexión a internet

No basta con hacer ping a google.com — en talleres presenciales el wifi del
lugar puede tener un portal cautivo (una página de login del wifi que
responde a todo pero bloquea tráfico real). Prueba los tres endpoints que
realmente necesitamos.

#### macOS / Linux

```bash
curl -sS --max-time 5 -o /dev/null -w "%{http_code}" https://registry.npmjs.org/
curl -sS --max-time 5 -o /dev/null -w "%{http_code}" https://dash.cloudflare.com/
curl -sS --max-time 5 -o /dev/null -w "%{http_code}" https://api.anthropic.com/
```

El primero debe devolver `200`, el segundo `200` o `301`/`302`, el tercero
cualquier código (no timeout). Si el agente es Codex, usa `https://api.openai.com/`
en lugar de `api.anthropic.com`.

#### Windows (PowerShell)

```powershell
(Invoke-WebRequest -Uri "https://registry.npmjs.org/" -Method Head -TimeoutSec 5 -UseBasicParsing).StatusCode
(Invoke-WebRequest -Uri "https://dash.cloudflare.com/" -Method Head -TimeoutSec 5 -UseBasicParsing).StatusCode
try { (Invoke-WebRequest -Uri "https://api.anthropic.com/" -Method Head -TimeoutSec 5 -UseBasicParsing).StatusCode } catch { if ($_.Exception.Response) { 'reachable' } else { throw } }
```

Mismos criterios de éxito. Si el agente es Codex, usa `https://api.openai.com/`
en la tercera prueba (con el mismo patrón try/catch).

Si alguno falla:

> "No pude conectarme a [nombre del servicio]. Esto suele pasar cuando el wifi
> del lugar bloquea algunas páginas. Opciones:
> 1. Conéctate al internet de tu teléfono (hotspot / punto de acceso personal)
> 2. Pídele al organizador que revise el wifi
>
> Cuando tengas internet, dime 'listo' y vuelvo a revisar."

Espera a que el usuario confirme y repite la verificación.

### Paso 3 — Verificar Node.js >= 20.9

Ejecuta `node -v` (sin interactividad, sin flags adicionales).

Si Node.js está instalado y la versión es >= 20.9, confirma y sigue.

Si Node.js no está instalado o la versión es menor a 20.9, intenta
instalarlo de forma no interactiva y sin necesitar permisos de administrador
según el SO detectado:

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

**Intento 1 — winget (automático, viene con Windows 10/11 moderno):**

Primero avisa al usuario, porque Windows mostrará un diálogo de permisos:

> "Voy a instalar Node.js. En unos segundos Windows te va a mostrar una
> ventana preguntando si permites el cambio (dice 'Control de cuentas de
> usuario'). Dale clic a **Sí**."

Luego ejecuta:

```powershell
winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
```

Después de instalar, la terminal actual no ve el nuevo PATH. Refréscalo
en la misma sesión (funciona en PowerShell 5.1 y 7) y verifica. Esto evita
tener que reiniciar la terminal o la aplicación del agente:

```powershell
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
node -v
```

Si `node -v` responde con la versión, sigue al Paso 4.

**Intento 2 — si winget no existe o falla** (Windows viejo, tienda
deshabilitada, o el usuario le dio "No" al permiso), guíalo por el navegador:

> "Vamos a instalarlo manualmente. Sigue estos pasos:
> 1. Abre tu navegador y ve a https://nodejs.org/es
> 2. Descarga la versión LTS (el botón verde grande)
> 3. Abre el archivo descargado y dale 'Next' a todo; si Windows pregunta
>    si permites el cambio, dale 'Sí'
> 4. Cuando termine, escribe 'listo' y vuelvo a revisar"

Cuando diga "listo", refresca el PATH con el comando de arriba y verifica
`node -v`. Solo si aún no aparece, pídele cerrar y reabrir la aplicación
del agente (Claude Code / Codex).

**Después de instalar — SOLO macOS / Linux:** cada llamada a Bash abre un
shell nuevo, así que Node recién instalado vía fnm/nvm puede no estar en el
PATH. En Windows no ejecutes este bloque — el refresco de PATH de Windows
ya está cubierto en el Intento 1 de arriba. Verifica con:

```bash
source ~/.bashrc 2>/dev/null; source ~/.zshrc 2>/dev/null; source ~/.profile 2>/dev/null
node -v
```

Si aún no lo encuentra, dile al usuario:

> "Ya instalé Node.js pero tu terminal necesita reiniciarse para verlo.
> Cierra esta terminal, abre una nueva, y vuelve a pedirme 'revisa mi equipo'."

### Paso 4 — Verificar npm

Ejecuta `npm -v`. npm viene incluido con Node.js, así que si el paso 3 pasó
bien, este también debería pasar.

Caso especial Windows — "running scripts is disabled": si `npm -v` o
`npx` fallan con un error tipo *"npm.ps1 cannot be loaded because running
scripts is disabled on this system"* (o en español, *"no se puede cargar
porque la ejecución de scripts está deshabilitada"*), es la política de
seguridad de PowerShell bloqueando los scripts de npm. Se arregla sin
permisos de administrador:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
npm -v
```

Explícale al usuario en una frase: "Windows bloqueaba los comandos de npm
por seguridad; acabo de dar permiso solo para tu usuario — es seguro y
reversible."

Caveat de GPO: en laptops de empresa el comando puede "funcionar" sin
error pero la política corporativa sigue bloqueando. La prueba real es que
`npm -v` devuelva un número de versión. Si después de ejecutar
Set-ExecutionPolicy `npm -v` sigue dando el mismo error de scripts
deshabilitados, usa las variantes `.cmd` en todo el taller: `npm.cmd`,
`npx.cmd` (funcionan igual, solo evitan el wrapper .ps1 que PowerShell
bloquea).

Si npm sigue sin estar disponible por otra razón:

> "npm no está disponible. Esto es raro porque viene incluido con Node.js.
> Intenta cerrar la terminal, abrir una nueva, y pedirme 'revisa mi equipo'
> otra vez."

### Paso 5 — Verificar que el agente está funcionando

Si estás leyendo estas instrucciones, el agente ya está corriendo y
autenticado — no se puede llegar a este punto sin autenticación. No ejecutes
ningún comando `login` ni nada interactivo.

Simplemente confirma:

> "Tu asistente de IA (**[AGENTE]**) está funcionando correctamente."

### Paso 6 — Cuenta de Cloudflare (solo guiar la creación)

Cloudflare es el servicio donde publicaremos la página web al final del
taller. Su plan gratuito no pide tarjeta y sí permite páginas de negocios.
Crear la cuenta ahora ahorra tiempo después porque requiere confirmar por
email (y eso tarda unos minutos).

No instales wrangler aquí. No ejecutes `wrangler login`. Eso lo
hace la skill `publica-tu-web` más adelante.

Pregunta al usuario:

> "Ahora necesitamos crear tu cuenta gratuita en Cloudflare (el servicio
> donde vamos a publicar tu página web). ¿Ya tienes una cuenta? Si fuiste
> al taller, la creaste ese día."

Si dice que sí: pregunta si puede entrar a https://dash.cloudflare.com/
en su navegador. Si puede, todo bien. Si no puede, que intente recuperar
contraseña (o que entre con el botón de GitHub si así la creó en el taller).

Si dice que no, guíalo paso a paso:

> "Vamos a crear tu cuenta gratis. Sigue estos pasos:
> 1. Abre tu navegador (Chrome, Safari, Edge... el que uses)
> 2. Ve a https://dash.cloudflare.com/sign-up
> 3. Escribe tu correo electrónico y crea una contraseña
> 4. Revisa tu correo — te va a llegar un mensaje de Cloudflare para
>    confirmar. Abre ese correo y dale clic al botón de confirmar
> 5. Cuando veas el panel de Cloudflare, dime 'listo'
>
> La cuenta es gratis, no te va a pedir tarjeta."

Espera confirmación del usuario antes de continuar.

---

## Resumen final

Cuando todos los pasos estén completos, muestra un resumen con este formato
exacto.

**Variante PC/terminal:**

> **Resultado de la revisión:**
>
> ✅ Sistema operativo: **[SO]**
> ✅ Internet: **conectado**
> ✅ Node.js: **v[X.Y.Z]**
> ✅ npm: **v[X.Y.Z]**
> ✅ Agente: **[AGENTE]**
> ✅ Cuenta Cloudflare: **creada**
>
> **✅ Tu equipo está listo para el taller. ¡Vamos a crear tu página web!**

**Variante app/nube (tras el salto del Paso 0):**

> **Resultado de la revisión:**
>
> ✅ Trabajas desde: **la app de [ChatGPT/Claude][, en tu celular]** — no
>    necesitas computadora
> ✅ Cuenta de GitHub: **lista**
> ✅ Conector de GitHub: **autorizado**
> ✅ Cuenta Cloudflare: **creada**
>
> **✅ Todo listo. ¡Vamos a crear tu página web!**

Si algún paso quedó pendiente, sustituye el checkmark por lo que falta
y la acción exacta. Por ejemplo:

> ❌ Internet: **sin conexión** — conéctate al hotspot de tu teléfono
>   y dime 'revisa mi equipo' otra vez

No continúes con otras skills hasta que todo esté resuelto.

---

## Fallas comunes y cómo manejarlas

| Problema | Qué decirle al usuario |
|---|---|
| Wifi del lugar tiene portal cautivo | "Conéctate al internet de tu teléfono (hotspot) y dime 'listo'" |
| No tiene permisos de admin para instalar | Usar fnm (no necesita admin). Si ni eso funciona: "Pídele al organizador que te ayude a instalar Node.js" |
| Node.js instalado pero versión vieja (< 20) | Instalar versión 22 con fnm junto a la vieja — fnm maneja múltiples versiones sin conflicto |
| npm da error de permisos | "Ejecuta este comando: `npm config set prefix ~/.npm-global` y luego agrega `export PATH=~/.npm-global/bin:$PATH` a tu archivo de configuración del terminal" |
| Terminal no encuentra node después de instalar | En Windows: refresca el PATH con el comando del Paso 3 (sin reiniciar). En macOS/Linux: "Cierra esta terminal, abre una nueva, y pídeme 'revisa mi equipo' otra vez" |
| (Windows) `npm`/`npx` bloqueados: "running scripts is disabled" | Ejecutar `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force` (no necesita admin). Plan B: usar `npm.cmd` / `npx.cmd` |
| (Windows) El usuario cerró o le dio "No" a la ventana de permiso (UAC) | "Voy a intentarlo de nuevo — cuando aparezca la ventana preguntando si permites el cambio, dale **Sí**" |
| (Windows) `winget` no existe | Windows viejo o tienda deshabilitada — usar el instalador del navegador (Intento 2 del Paso 3) |
| (Windows) `npm install` va lentísimo | Es el antivirus (Windows Defender) escaneando cada archivo — es normal en laptops con antivirus corporativo. "Va a tardar unos minutos, es normal en Windows; aprovecha para ir pensando en los colores de tu página" — NUNCA sugieras desactivar el antivirus |
| El correo de verificación de Cloudflare no llega | "Revisa tu carpeta de spam o correo no deseado. Si no está ahí, intenta con otro correo." |
| La laptop es muy vieja y no soporta Node 20 | "Tu laptop necesita un sistema operativo más reciente para Node.js 20. Por hoy, trabaja con un compañero que tenga todo listo." |
