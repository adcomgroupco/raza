# Raza.do, Centro de documentos

Portada documental y experiencias interactivas para explorar la estrategia de Raza.do.

## Uso local

No requiere instalación ni proceso de compilación.

1. Abre `index.html` directamente en el navegador; o
2. Desde esta carpeta ejecuta `python -m http.server 8000` y visita `http://localhost:8000`.

## Archivos

- `index.html`: centro de documentos y punto de entrada del proyecto.
- `flow-digital.html`: flow digital interactivo con filtros, mix por objetivo, ranking por canal, funnel de registros→FTD y tendencia mensual de resultados.
- `tendencias-busqueda.html`: análisis interactivo de tendencias de búsqueda para lotería, casino, apuestas deportivas y verticales específicas en República Dominicana.
- `styles.css`: capa de diseño de `flow-digital.html`, sobre el sistema Adcom.
- `app.js`: datos, filtros, gráficos y vistas interactivas del flow.
- `tendencias.css`: capa de diseño de `tendencias-busqueda.html`, sobre el sistema.
- `tendencias.js`: datos y visualización del análisis de búsquedas.
- `assets/css/adcom.css` y `assets/js/adcom.js`: el sistema de diseño de Adcom.
  **Son copias generadas.** No se editan aquí: se editan en `adcom/sistema/` y se
  reparten con `sync.ps1`. La documentación del sistema está en `adcom/sistema/DESIGN.md`.
- `assets/launch-energy.jpg`: imagen extraída del PDF maestro del proyecto.

## Diseño

Este repo usa el sistema de diseño de Adcom en **suelo tinta**: fondo oscuro,
Poppins, y el amarillo de Adcom como único acento. El suelo se declara en el
`<html>` de cada archivo:

```html
<html lang="es" data-suelo="tinta">
```

Antes de cambiar cualquier estilo, lee `adcom/sistema/DESIGN.md`. En corto:

- El color y la estructura viven en `assets/css/adcom.css` y se comparten con los
  otros 13 repos. Un cambio ahí es un cambio en todos.
- `styles.css` y `tendencias.css` solo llevan la geometría de los componentes
  propios de cada documento. No declaran tokens, ni tipografía, ni suelo, y no
  fijan ningún color en hex: todo sale de `var(--…)`. Por eso cambiarle el suelo
  al documento no obliga a tocarlos.
- Sobre tinta el amarillo de marca es también el amarillo de dato
  (`--accent-fg` resuelve a `#ffd400`, 14.2:1). Eso es lo que le da presencia.
- Los gráficos con varias series usan la escala de 3 ranuras del sistema por
  objetivo (`--serie-1` Performance, `--serie-2` Awareness, `--serie-3`
  Consideración), validada para daltonismo y escalonada por suelo. El amarillo
  de marca no entra a esa escala.
- Un documento **no alterna de suelo**. Para un momento invertido está `.slab`,
  una vez y con los tokens `--inv-*`.

## Fuente de cifras

Flow digital neto de US$655K, de octubre de 2026 a febrero de 2027, distribuido en 11 canales. Los escenarios Base, Optimista y Pesimista mantienen la inversión y modelan una variación de ±20% en resultados.

Calendario: expectativa previa al lanzamiento del 12 de octubre (Día de la Raza, cuando se encienden las campañas de conversión) y mantenimiento de noviembre a febrero. Octubre concentra US$305K (46,56% del plan). Programática sale con formatos estándar Display y Push (solo con claim); DCO queda como una posible evolución.
