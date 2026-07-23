# Crea Tu Web

Kit de skills para construir y publicar la pagina web de tu negocio con ayuda de inteligencia artificial, sin saber programar. Pensado para el taller presencial del Hispanic Affairs Project en Montrose, Colorado.

---

## Prompt de instalacion

Copia el bloque completo y pegalo en Claude Code o Codex. La IA hara todo por ti.

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

4. Verifica la instalacion listando las skills instaladas. Cada una debe tener un archivo SKILL.md. Deberias ver estas 5:
   - revisa-tu-equipo
   - crea-tu-web
   - disena-tu-marca
   - planea-tu-web
   - publica-tu-web

5. Si alguna falta, repite el paso 3 solo para esa skill.

6. Cuando las 5 esten instaladas, responde exactamente: "Listo"
```

---

## Las 5 skills del taller

Se usan en este orden. Cada una guia a la IA paso a paso para que tu solo tengas que responder preguntas sobre tu negocio.

| # | Skill | Que hace |
|---|---|---|
| 1 | **revisa-tu-equipo** | Revisa que tu laptop tenga todo lo necesario instalado (Node.js, npm, etc.) y te ayuda a arreglar lo que falte. |
| 2 | **crea-tu-web** | Te hace una entrevista corta sobre tu negocio y crea tu pagina web desde cero con Next.js, bilingue espanol/ingles. |
| 3 | **disena-tu-marca** | Elige colores, tipografia y estilo visual unicos para tu negocio — nada de plantillas genericas. |
| 4 | **planea-tu-web** | Organiza las secciones y el contenido de tu pagina segun lo que tu negocio necesita. |
| 5 | **publica-tu-web** | Sube tu pagina a internet con Vercel y genera un codigo QR para compartirla al instante. |

---

## Requisitos minimos

Una laptop con **Claude Code** o **Codex** funcionando. Eso es todo. La primera skill (revisa-tu-equipo) se encarga de verificar y preparar lo demas.

---

## Despues del taller

Tu pagina ya esta en internet. Para seguir mejorandola:

- **Un cambio a la vez.** Pidele a la IA cosas concretas: "agrega los horarios", "cambia el color del boton", "pon una seccion de preguntas frecuentes". Un pedido, ve el resultado, y luego el siguiente.
- **Usa tus propias fotos.** Reemplaza las imagenes temporales de ejemplo con fotos reales de tu negocio, tu equipo o tus productos. La IA te ayuda a colocarlas.
- **Tu pagina es tuya.** Todo el codigo esta en tu computadora. Puedes seguir editandola cuando quieras, a tu ritmo, con la misma IA que usaste en el taller.
