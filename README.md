# Crea Tu Web

Kit de skills para construir y publicar la pagina web de tu negocio con ayuda de inteligencia artificial, sin saber programar. Pensado para el taller presencial del Hispanic Affairs Project en Montrose, Colorado.

---

## Instalacion en Claude Code (recomendada: 2 comandos)

Este repositorio es un plugin marketplace de Claude Code. Dentro de Claude Code escribe:

```text
/plugin marketplace add JairoTorregrosa/crea-tu-web
/plugin install crea-tu-web@crea-tu-web
```

Listo: las 6 skills quedan instaladas y con actualizaciones. Cuando el kit mejore,
actualizas con `/plugin marketplace update crea-tu-web` y `/plugin update crea-tu-web`.
Las skills del plugin tambien se pueden invocar con su nombre completo, por ejemplo
`/crea-tu-web:publica-tu-web`.

## Instalacion en Codex (prompt de instalacion)

Codex todavia no permite marketplaces de terceros (sus plugins vienen de un registro
curado por OpenAI), asi que en Codex se instala copiando las skills. Copia el bloque
completo y pegalo en Codex. La IA hara todo por ti. Este mismo bloque tambien funciona
en Claude Code si prefieres no usar el plugin.

```text
Eres mi asistente de instalacion. Necesito que instales las skills del taller "Crea Tu Web".
Sigue estos pasos en orden:

1. Limpia descargas anteriores (si las hay):
   rm -rf /tmp/crea-tu-web /tmp/crea-tu-web.zip /tmp/crea-tu-web-main

2. Descarga el repositorio:
   - Si tienes git instalado, clona: git clone https://github.com/JairoTorregrosa/crea-tu-web.git /tmp/crea-tu-web
   - Si no tienes git, descarga y descomprime: curl -L https://github.com/JairoTorregrosa/crea-tu-web/archive/refs/heads/main.zip -o /tmp/crea-tu-web.zip && unzip -o /tmp/crea-tu-web.zip -d /tmp && mv /tmp/crea-tu-web-main /tmp/crea-tu-web

3. Detecta que herramienta estoy usando y copia las skills a la carpeta correcta:
   - Si estoy en Claude Code, copia la carpeta skills/ completa:
     mkdir -p ~/.claude/skills && cp -r /tmp/crea-tu-web/skills/* ~/.claude/skills/
   - Si estoy en Codex, copia la carpeta skills/ completa:
     mkdir -p ~/.codex/skills && cp -r /tmp/crea-tu-web/skills/* ~/.codex/skills/

4. Verifica la instalacion listando las skills instaladas. Cada una debe tener un archivo SKILL.md. Deberias ver estas 6:
   - revisa-tu-equipo
   - crea-tu-web
   - disena-tu-marca
   - planea-tu-web
   - publica-tu-web
   - taste-skill

5. Si alguna falta, repite el paso 3 solo para esa skill.

6. Cuando las 6 esten instaladas, responde exactamente: "Listo"
```

---

## Las 6 skills del taller

Las primeras 5 se usan en este orden. Cada una guia a la IA paso a paso para que tu solo tengas que responder preguntas sobre tu negocio.

| # | Skill | Que hace |
|---|---|---|
| 1 | **revisa-tu-equipo** | Revisa que tu laptop tenga todo lo necesario instalado (Node.js, npm, etc.) y te ayuda a arreglar lo que falte. |
| 2 | **crea-tu-web** | Te hace una entrevista corta sobre tu negocio y crea tu pagina web desde cero con Next.js, bilingue espanol/ingles. |
| 3 | **disena-tu-marca** | Elige colores, tipografia y estilo visual unicos para tu negocio — nada de plantillas genericas. |
| 4 | **planea-tu-web** | Organiza las secciones y el contenido de tu pagina segun lo que tu negocio necesita. |
| 5 | **publica-tu-web** | Sube tu pagina a internet con Cloudflare Pages (gratis, sin tarjeta) y genera un codigo QR para compartirla al instante. |
| 6 | **taste-skill** | Guia de buen gusto visual que la IA consulta sola mientras disena y construye: evita que tu pagina se vea como plantilla generica de IA. No tienes que invocarla; esta en ingles porque es material tecnico para la IA. |

---

## El flujo completo

```text
  [0] revisa-tu-equipo ................. "revisa mi equipo"
      Deja listo: Node.js + npm + internet + agente CLI
      + cuenta de Cloudflare (la usa el paso 4)
        |
        v
  [1] crea-tu-web ...................... "crea mi pagina"
      Entrevista de 8 preguntas -> proyecto Next.js
      Produce: carpeta <negocio>/ + negocio.json
      + sitio corriendo en localhost                          +--------------------+
        |                                                     |     taste-skill    |
        |  negocio.json (colores, que NO quiere, logo)        |  (apoyo, en ingles)|
        v                                                     |                    |
  [2] disena-tu-marca ................. "disena mi marca"     |  La IA la consulta |
      Entrevista de marca -> paleta verificada AA             |  sola en los pasos |
      (scripts/contraste.mjs) -> tokens aplicados             |  1, 2 y 3 para que |
      Produce: DESIGN.md + globals.css con tu marca      <----+  la pagina no se   |
        |                                                     |  vea de plantilla  |
        |  DESIGN.md (paleta, tipografia, componentes)        |  generica.         |
        v                                                     +--------------------+
  [3] planea-tu-web ................... "planeemos mi pagina"
      Lluvia de ideas -> prioriza V1 / V2 / fuera
      Produce: PRD.md -> y la IA implementa la V1 (paso 8)
        |
        |  PRD.md con la V1 completa (o el dueno decide publicar como esta)
        v
  [4] publica-tu-web .................. "publica mi pagina"
      Revisa V1 pendiente -> export estatico -> build
      -> wrangler login (un clic en Allow) -> deploy
      Resultado: https://<negocio>.pages.dev + codigo QR
        |
        v
      TU PAGINA EN INTERNET, en tu cuenta, gratis.
      Para cambios futuros: pide el cambio y luego "publica mi pagina".
```

Cada flecha es un archivo real que la skill siguiente lee: `negocio.json` evita
repetir preguntas, `DESIGN.md` da las decisiones visuales, `PRD.md` define que
se construye y cuando esta listo.

## Requisitos minimos

Una laptop con **Claude Code** o **Codex** funcionando. Eso es todo. La primera skill (revisa-tu-equipo) se encarga de verificar y preparar lo demas.

---

## Despues del taller

Tu pagina ya esta en internet. Para seguir mejorandola:

- **Un cambio a la vez.** Pidele a la IA cosas concretas: "agrega los horarios", "cambia el color del boton", "pon una seccion de preguntas frecuentes". Un pedido, ve el resultado, y luego el siguiente.
- **Usa tus propias fotos.** Reemplaza las imagenes temporales de ejemplo con fotos reales de tu negocio, tu equipo o tus productos. La IA te ayuda a colocarlas.
- **Tu pagina es tuya.** Todo el codigo esta en tu computadora. Puedes seguir editandola cuando quieras, a tu ritmo, con la misma IA que usaste en el taller.
