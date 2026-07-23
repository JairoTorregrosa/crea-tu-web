#!/usr/bin/env node
// contraste.mjs — WCAG 2.1 contrast-ratio checker
// Usage: node contraste.mjs '#1E3A5F' '#F5F5F0'
// Prints the contrast ratio and AA pass/fail for normal and large text.

const [, , hex1, hex2] = process.argv;

if (!hex1 || !hex2) {
  console.error("Uso: node contraste.mjs '#COLOR1' '#COLOR2'");
  process.exit(1);
}

function relativeLuminance(hex) {
  const raw = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(raw.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const L1 = relativeLuminance(hex1);
const L2 = relativeLuminance(hex2);
const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

const passNormal = ratio >= 4.5;  // AA for normal text (< 18px)
const passLarge = ratio >= 3.0;   // AA for large text (>= 18px bold or >= 24px)

console.log(`Par: ${hex1} / ${hex2}`);
console.log(`Ratio: ${ratio.toFixed(2)}:1`);
console.log(`AA texto normal (>= 4.5:1): ${passNormal ? "PASA" : "FALLA"}`);
console.log(`AA texto grande  (>= 3.0:1): ${passLarge ? "PASA" : "FALLA"}`);
