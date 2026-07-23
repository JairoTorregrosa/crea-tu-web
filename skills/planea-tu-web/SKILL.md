---
name: planea-tu-web
description: >
  Modera una lluvia de ideas para planear la página web de un pequeño negocio y genera un PRD.md
  con el plan completo. Usa esta skill cuando el asistente quiera planificar qué debe tener su
  página, definir prioridades, hacer una lluvia de ideas sobre funcionalidades, o crear un
  documento de requisitos (PRD). También se activa con frases como "qué debería tener mi página",
  "planear mi sitio", "quiero definir qué va en mi web", "lluvia de ideas", "qué necesito en mi
  página", "hacer el PRD", o cualquier variante de planificación de contenido y funcionalidades
  para una página web de negocio.
---

# Planea tu web

Guía al dueño de un pequeño negocio a través de una lluvia de ideas para definir qué necesita su
página web, y produce un PRD.md (documento de plan) listo para que la IA construya el sitio.

Todo el proceso es en español claro, sin jerga técnica. Si un término técnico es inevitable,
explícalo en una frase sencilla entre paréntesis.

## Contexto

Esta skill es la fase 4 de 5 en el flujo "crea-tu-web":
revisa-tu-equipo -> crea-tu-web -> disena-tu-marca -> **planea-tu-web** -> publica-tu-web.

A esta altura el asistente ya tiene:
- Su entorno funcionando (fase 1)
- Un proyecto Next.js creado con una página inicial (fase 2)
- Su DESIGN.md con paleta, tipografía e identidad visual (fase 3)

Lo que falta es definir QUÉ va en la página: secciones, contenido, funcionalidades. El PRD.md
será la guía que la IA siga para completar y mejorar el sitio.

## Paso 1 — Abrir la conversación

Saluda brevemente y explica lo que van a hacer:

> Ahora vamos a planear qué debe tener tu página web. Vamos a hacer una lluvia de ideas: tú me
> dices todo lo que te gustaría que tu página pudiera hacer, y yo lo anoto TODO. No te preocupes
> si algo suena difícil o loco — primero anotamos, después decidimos qué va primero.

Antes de empezar la lluvia de ideas, haz estas DOS preguntas para entender el negocio (si no
tienes esa información de fases anteriores). Hazlas una a la vez:

Primero pregunta:

1. **"Cuéntame de tu negocio en una o dos frases — ¿qué haces y para quién?"**

Espera la respuesta. Después pregunta:

2. **"Cuando alguien busca tu negocio en internet, ¿qué es lo primero que necesita saber?"**

Espera la respuesta antes de continuar. No asumas nada sobre el negocio.

## Paso 2 — Lluvia de ideas (captura sin filtrar)

Usa esta pregunta para abrir la lluvia:

> **"Si tu página pudiera hacer cualquier cosa, ¿qué tendría?"**

Reglas durante la lluvia:
- Anota TODA idea que diga el asistente, sin juzgar ni filtrar.
- Si el asistente se queda callado, ofrece estas categorías como inspiración (una a la vez, no
  todas de golpe):
  - "¿Qué información necesita alguien que no te conoce?" (dirección, horarios, qué ofreces)
  - "¿Cómo te contactan tus clientes hoy?" (teléfono, WhatsApp, visita, redes)
  - "¿Tienes fotos de tu trabajo o tu negocio que quisieras mostrar?"
  - "¿Hay algo que tus clientes siempre te preguntan?" (precios, horarios, cómo llegar)
  - "¿Qué hacen tus competidores en internet que tú quisieras tener?"
  - "¿Necesitas que la gente pueda hacer algo en la página?" (pedir cita, hacer pedido, ver menú)
- No sugieras funcionalidades complejas (e-commerce, login, base de datos). Si el asistente
  las pide, anótalas sin objeción — la priorización viene después.
- Cuando el asistente diga que ya no tiene más ideas, lee la lista completa en voz alta para
  confirmar que no falte nada.

## Paso 3 — Priorizar

Ahora ayuda a separar las ideas en tres grupos. Explica así:

> Vamos a organizar tus ideas en tres grupos:
> 1. **Lo que necesitas YA** — sin esto, la página no sirve. Es lo que vamos a completar hoy.
> 2. **Lo que quieres después** — buenas ideas que pueden esperar unas semanas.
> 3. **Lo que NO vamos a hacer por ahora** — y está bien, no es un "no" para siempre.

Para cada idea de la lista, pregunta:

> **"[Idea] — ¿la necesitas ya, la quieres pero puede esperar, o la descartamos por ahora?"**

Si el asistente duda, ayuda con esta pregunta:

> **"Si alguien entra a tu página mañana, ¿necesita ver esto para confiar en tu negocio?"**

Si responde que sí, va a V1. Si no, va a V2 o fuera de alcance.

## Paso 4 — Definir "listo" para cada ítem de V1

Para cada ítem que quedó en "lo que necesitas YA", pregunta:

> **"¿Cómo sabemos que [ítem] está listo? Por ejemplo: ¿qué información tiene que aparecer, o
> qué debe poder hacer la persona que lo ve?"**

Traduce la respuesta del asistente a un criterio concreto. Ejemplo:
- Idea: "Mostrar los servicios"
- Criterio de listo: "Aparece una sección con el nombre, una descripción corta y el precio de
  cada servicio. Mínimo 3 servicios."

Si el asistente no sabe qué decir, sugiere un criterio razonable y pregunta si le parece bien.

## Paso 5 — Contenido necesario

Para cada ítem de V1, identifica qué contenido hace falta y QUIÉN lo va a conseguir. Pregunta:

> **"Para [ítem], ¿qué textos o fotos necesitamos? Y lo más importante: ¿quién los tiene?"**

Recuerda estas reglas del taller:
- Las fotos deben ser PROPIAS del negocio. Nunca fotos de internet.
- No se incluyen datos personales de terceros (clientes, empleados) sin su permiso.
- Si el asistente no tiene fotos, anota que se usarán ilustraciones o íconos como reemplazo
  temporal.

## Paso 6 — Generar PRD.md

Con toda la información recogida, genera el archivo PRD.md usando exactamente esta plantilla.
Rellena cada sección con las respuestas del asistente. Lo que no se haya decidido, márcalo
como `[PENDIENTE — pregunta específica]`.

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
- **Fácil de actualizar**: el dueño puede pedir cambios a la IA sin saber programar.

## Mantenimiento

- **Quién actualiza:** [Nombre o rol]
- **Cómo:** [Herramienta — ejemplo: "Pidiendo cambios a tu asistente de IA"]
- **Cada cuánto:** [Frecuencia — ejemplo: "Cuando cambien los precios o servicios"]

## Riesgos y preguntas abiertas

- [Riesgo o pregunta que quedó sin resolver. Ejemplo: "No tenemos fotos del local todavía."]
```

## Paso 7 — Confirmar con el asistente

Antes de guardar, muestra un resumen corto del PRD al asistente:

> Así quedó tu plan. Revísalo conmigo:
> - **Tu página resuelve:** [problema]
> - **Versión 1 tiene:** [lista corta de ítems]
> - **Para después:** [lista corta]
> - **Nos falta conseguir:** [contenido pendiente]
>
> **¿Te parece bien? ¿Quieres cambiar algo?**

Si pide cambios, aplícalos y vuelve a confirmar. Solo cuando el asistente diga que está bien,
guarda el archivo PRD.md en la raíz del proyecto.

## Notas importantes

- Este PRD es para UNA página web de UN negocio pequeño. No es un plan de software empresarial.
  Mantén el lenguaje simple y las expectativas realistas para alguien sin equipo técnico.
- Si el asistente pide algo que requiere backend, base de datos, o pagos en línea, anótalo en
  V2 o fuera de alcance y explica con honestidad: "Eso es posible pero necesita más trabajo del
  que podemos hacer hoy. Lo anotamos para la siguiente fase."
- No inventes contenido por el asistente. Si no dijo qué servicios ofrece, no pongas servicios
  de ejemplo. Marca `[PENDIENTE]` con la pregunta específica.
- Los requisitos no funcionales (bilingüe, móvil, accesible, rápida, actualizable) siempre se
  incluyen — son parte del taller, no opcionales.
