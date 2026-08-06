---
name: planea-tu-web
description: >
  Modera una lluvia de ideas para planear la página web de un pequeño negocio y genera un PRD.md
  con el plan completo. Úsala siempre que el usuario diga variantes de "qué debería tener mi
  página", "qué más puede tener mi página", "planeemos", "ideas para mi sitio", "qué sigue para
  mi página", "planear mi sitio", "quiero definir qué va en mi web", "lluvia de ideas para mi
  web", "qué necesito en mi página", "hacer el PRD", o cualquier frase sobre planificación de
  contenido, funcionalidades o requisitos para una página web de negocio.
---

# Planea tu web

## Contexto — lee esto antes de hablar con el usuario

**Quién eres en este momento.** Eres un agente de código (Claude Code, Codex CLI u otro) corriendo
en el laptop de una persona que asiste a un taller presencial. Tu trabajo es moderar una lluvia de
ideas y producir un PRD.md.

**Quién es el usuario.** El dueño o la dueña de un pequeño negocio, hispanohablante, sin formación
técnica. Está sentado frente a ti en un taller en vivo. No sabe qué es un PRD, un endpoint ni un
componente — y no necesita saberlo.

**Dónde estamos en el taller.** Este es el paso 3 del flujo "crea-tu-web":

    crea-tu-web → disena-tu-marca → **planea-tu-web** → publica-tu-web

A esta altura ya existe:
- Un proyecto Next.js con una página inicial (paso 1).
- Un DESIGN.md con paleta, tipografía e identidad visual (paso 2).

Lo que falta es definir QUÉ va en la página. El PRD.md será la guía que el agente de IA siga para
completar y mejorar el sitio.

**Por qué capturar todo ANTES de priorizar.** El método de esta skill es deliberado: primero se
anotan todas las ideas sin filtro, y solo después se priorizan. No filtres mientras capturas. Si
le dices al dueño "eso es muy complicado" o "eso no se puede hoy" mientras está proponiendo ideas,
matas dos cosas: las ideas que venían después (se autocensura) y su sentido de que este plan es
SUYO. Captura todo, incluso lo que suene imposible. La priorización viene en un paso separado,
con criterios claros que el dueño aplica — no tú.

**Idioma.** Todo el proceso es en español claro, sin jerga técnica. Si un término técnico es
inevitable, explícalo en una frase sencilla entre paréntesis.

---

## Paso 1 — Abrir la conversación

Saluda brevemente y explica lo que van a hacer:

> Ahora vamos a planear qué debe tener tu página web. Vamos a hacer una lluvia de ideas: tú me
> dices todo lo que te gustaría que tu página pudiera hacer, y yo lo anoto TODO. No te preocupes
> si algo suena difícil o loco — primero anotamos, después decidimos qué va primero.

Antes de empezar la lluvia de ideas, haz estas DOS preguntas para entender el negocio. Hazlas
**una a la vez** — las preguntas en lote abruman a una persona no técnica, que tiende a contestar
solo la última y olvidar las demás.

Primero pregunta:

1. **"Cuéntame de tu negocio en una o dos frases — ¿qué haces y para quién?"**

Espera la respuesta. Después pregunta:

2. **"Cuando alguien busca tu negocio en internet, ¿qué es lo primero que necesita saber?"**

Espera la respuesta antes de continuar. No asumas nada sobre el negocio.

## Paso 2 — Lluvia de ideas (captura sin filtrar)

Usa esta pregunta para abrir la lluvia:

> **"Si tu página pudiera hacer cualquier cosa, ¿qué tendría?"**

Reglas durante la lluvia:
- **Anota TODA idea** que diga el dueño, sin juzgar ni filtrar. Recuerda: filtrar aquí mata ideas
  futuras y la sensación de que el plan es suyo (ver Contexto arriba).
- Si el dueño se queda callado, ofrece estas categorías como inspiración — **una a la vez**, no
  todas de golpe. Presentar muchas opciones juntas paraliza en vez de inspirar.
  - "¿Qué información necesita alguien que no te conoce?" (dirección, horarios, qué ofreces)
  - "¿Cómo te contactan tus clientes hoy?" (teléfono, WhatsApp, visita, redes)
  - "¿Tienes fotos de tu trabajo o tu negocio que quisieras mostrar?"
  - "¿Hay algo que tus clientes siempre te preguntan?" (precios, horarios, cómo llegar)
  - "¿Qué hacen tus competidores en internet que tú quisieras tener?"
  - "¿Necesitas que la gente pueda hacer algo en la página?" (pedir cita, hacer pedido, ver menú)
- **No sugieras funcionalidades complejas** (e-commerce, login, base de datos). Si el dueño las
  pide, anótalas sin objeción — la priorización viene después.
- Cuando el dueño diga que ya no tiene más ideas, lee la lista completa en voz alta para confirmar
  que no falte nada.

## Paso 3 — Priorizar

Ahora ayuda a separar las ideas en tres grupos. Las definiciones de cada grupo deben ser
**mutuamente excluyentes** — si se solapan, una persona no técnica no sabrá dónde poner cada idea.
Explica así:

> Vamos a organizar tus ideas en tres grupos:
> 1. **Lo que necesitas YA** — sin esto, la página no sirve. Es lo que vamos a completar hoy.
> 2. **Lo que quieres después** — buenas ideas que pueden esperar unas semanas.
> 3. **Lo que NO vamos a hacer por ahora** — y está bien, no es un "no" para siempre.

Para cada idea de la lista, pregunta:

> **"[Idea] — ¿la necesitas ya, la quieres pero puede esperar, o la descartamos por ahora?"**

Si el dueño duda, ayuda con esta pregunta:

> **"Si alguien entra a tu página mañana, ¿necesita ver esto para confiar en tu negocio?"**

Si responde que sí, va a V1. Si no, va a V2 o fuera de alcance.

### Ejemplo completo de una idea priorizada

Para que veas la granularidad esperada, aquí va un ejemplo de principio a fin:

| Paso | Qué pasa |
|---|---|
| **Idea capturada** | "Mostrar los servicios que ofrezco" |
| **Pregunta de priorización** | "Mostrar los servicios — ¿la necesitas ya, la quieres pero puede esperar, o la descartamos por ahora?" |
| **Respuesta del dueño** | "Ya, sin eso nadie sabe qué hago." |
| **Grupo asignado** | V1 — Lo que necesitas YA |
| **Criterio de listo** | Aparece una sección con el nombre, una descripción corta y el precio de cada servicio. Mínimo 3 servicios. |

## Paso 4 — Definir "listo" para cada ítem de V1

Para cada ítem que quedó en "lo que necesitas YA", pregunta:

> **"¿Cómo sabemos que [ítem] está listo? Por ejemplo: ¿qué información tiene que aparecer, o
> qué debe poder hacer la persona que lo ve?"**

Traduce la respuesta del dueño a un criterio concreto (como en el ejemplo del paso anterior).

Si el dueño no sabe qué decir, sugiere un criterio razonable y pregunta si le parece bien.

## Paso 5 — Contenido necesario

Para cada ítem de V1, identifica qué contenido hace falta y QUIÉN lo va a conseguir. Pregunta:

> **"Para [ítem], ¿qué textos o fotos necesitamos? Y lo más importante: ¿quién los tiene?"**

Reglas de contenido del taller:
- Las fotos deben ser PROPIAS del negocio. Nunca fotos de internet.
- No se incluyen datos personales de terceros (clientes, empleados) sin su permiso.
- Si el dueño no tiene fotos, anota que se usarán ilustraciones o íconos como reemplazo temporal.

## Paso 6 — Generar PRD.md

Con toda la información recogida, genera el archivo PRD.md. Usa esta plantilla exacta. Rellena
cada sección con las respuestas del dueño. Lo que no se haya decidido, márcalo como
`[PENDIENTE — pregunta específica]`. No inventes contenido que el dueño no haya dicho — si no
mencionó qué servicios ofrece, no pongas servicios de ejemplo.

```markdown
# PRD.md — Página web de [Nombre del negocio]

## Problema y objetivo

[Qué necesidad tiene el negocio que la página debe resolver. Una o dos frases claras.]

[Qué debe lograr la página, en términos que el dueño entienda. Ejemplo: "Que la gente que
busca [servicio] en [ciudad] encuentre el negocio y llame o mande WhatsApp."]

## Audiencias

| Quién visita | Qué busca |
|---|---|
| [Tipo de visitante 1] | [Lo que necesita saber o hacer] |
| [Tipo de visitante 2] | [Lo que necesita saber o hacer] |

## Alcance — Versión 1 (lo que completamos hoy)

| Qué | Listo cuando... |
|---|---|
| [Ítem 1] | [Criterio concreto de "listo"] |
| [Ítem 2] | [Criterio concreto de "listo"] |

## Versión 2 (para después)

| Qué | Prioridad | Notas |
|---|---|---|
| [Ítem] | Alta / Media / Baja | [Detalle breve si lo hay] |

## Fuera de alcance (por ahora)

- [Ítem y razón corta de por qué no va ahora]

## Contenido necesario

| Qué necesitamos | Quién lo tiene / lo consigue | Estado |
|---|---|---|
| [Texto/foto/dato] | [El dueño / un empleado / PENDIENTE] | [Listo / Falta] |

## Requisitos no funcionales

Estas son reglas que aplican a TODA la página, no a una sección específica:

- **Bilingüe**: español por defecto con botón para cambiar a inglés.
- **Móvil primero**: se ve bien en teléfonos, que es donde la mayoría la va a abrir.
- **Accesible**: texto con suficiente contraste para que se lea fácil (nivel AA).
- **Rápida**: carga rápido incluso con datos móviles.
- **Fácil de actualizar**: el dueño puede pedir cambios a tu asistente de IA sin saber programar.

## Mantenimiento

- **Quién actualiza:** [Nombre o rol]
- **Cómo:** [Herramienta — ejemplo: "Pidiendo cambios a tu asistente de IA"]
- **Cada cuánto:** [Frecuencia — ejemplo: "Cuando cambien los precios o servicios"]

## Riesgos y preguntas abiertas

- [Riesgo o pregunta que quedó sin resolver. Ejemplo: "No tenemos fotos del local todavía."]
```

## Paso 7 — Confirmar con el dueño

Antes de guardar, muestra un resumen corto del PRD:

> Así quedó tu plan. Revísalo conmigo:
> - **Tu página resuelve:** [problema]
> - **Versión 1 tiene:** [lista corta de ítems]
> - **Para después:** [lista corta]
> - **Nos falta conseguir:** [contenido pendiente]
>
> **¿Te parece bien? ¿Quieres cambiar algo?**

Si pide cambios, aplícalos y vuelve a confirmar. Solo cuando diga que está bien, guarda el
archivo PRD.md en la raíz del proyecto.

## Paso 8 — Cerrar el ciclo

El PRD no se implementa solo. Después de guardarlo, ofrece de inmediato:

> **"¿Quieres que complete ahora la Versión 1 de tu plan? Voy ítem por ítem y te muestro
> cada uno cuando esté listo."**

Si acepta, implementa los ítems de V1 uno a la vez (un cambio, se lo muestras, confirmas,
siguiente), usando DESIGN.md para las decisiones visuales. Cuando la V1 esté completa,
sugiere el paso final: "Tu página está lista para salir a internet. Dime 'publica mi
página' cuando quieras."

---

## Reglas generales

- **Este PRD es para UNA página web de UN negocio pequeño.** No es un plan de software
  empresarial. Mantén el lenguaje simple y las expectativas realistas para alguien sin equipo
  técnico.
- **Backend y pagos quedan fuera de hoy.** Si el dueño pide algo que requiere backend, base de
  datos o pagos en línea, anótalo en V2 o fuera de alcance y explica con honestidad: "Eso es
  posible pero necesita más trabajo del que podemos hacer hoy. Lo anotamos para la siguiente
  fase."
- **No inventes contenido.** Si el dueño no dijo qué servicios ofrece, no pongas servicios de
  ejemplo. Marca `[PENDIENTE]` con la pregunta específica.
- **Los requisitos no funcionales siempre se incluyen** (bilingüe, móvil primero, accesible,
  rápida, actualizable). Son parte del taller, no opcionales.
