/** JS mirror of the @theme tokens in styles/globals.css — for SVG/JS-driven colours. */
export const colors = {
  brand: {
    50: "#f0f8fd",
    100: "#e8f4fb",
    200: "#b8e0f6",
    300: "#7acdf2",
    400: "#3aaee8",
    500: "#1a8fd1",
    600: "#1d6ea8",
    700: "#1e5080",
    800: "#1a3d5c",
    900: "#0f2d4a",
    950: "#0a1929",
  },
  accent: { 100: "#fff0e8", 500: "#f05a20", 600: "#c4461a" },
  success: { 100: "#e6f7ef", 500: "#22a564", 600: "#1a7a4a" },
  warning: { 100: "#fef3c7", 500: "#f59e0b", 600: "#b45309" },
  danger: { 100: "#fee2e2", 500: "#ef4444", 600: "#b91c1c" },
  /* Icon hues (lib/iconTones.ts): soft bg · light (on dark) · mid · deep (≥4.5:1 on 100) */
  sky: { 100: "#e0f5fa", 300: "#7dd6ea", 500: "#0ea5c6", 700: "#0b6e88" },
  violet: { 100: "#f1edfe", 300: "#bcaafb", 500: "#7c5cf0", 700: "#5a3bc4" },
  indigo: { 100: "#ebedfd", 300: "#a7b2f8", 500: "#5b67f0", 700: "#3a43b8" },
  emerald: { 100: "#e2f6ec", 300: "#74d4a7", 500: "#16a36a", 700: "#0f7149" },
  teal: { 100: "#ddf5f1", 300: "#6fd5c6", 500: "#13a291", 700: "#0d6f66" },
  rose: { 100: "#fdeaf0", 300: "#f5a3bb", 500: "#e5487a", 700: "#b02558" },
  amber: { 100: "#fdf1d6", 300: "#f6c95f", 500: "#e9970c", 700: "#975407" },
  orange: { 100: "#ffede3", 300: "#fbae86", 500: "#f0662a", 700: "#b44515" },
} as const;

/** Neutrals (mirror of the gray @theme scale) for SVG fills. */
export const neutral = {
  white: "#ffffff",
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  700: "#374151",
} as const;

/** Illustration-only tones (skin, hair, wood, foliage) used by src/components/illustrations. */
export const illo = {
  skin: { light: "#e9b98f", medium: "#c98d60", deep: "#8c5a3a" },
  hair: { black: "#21170f", brown: "#4b2e20" },
  wood: { light: "#e6b67f", base: "#c88a52", dark: "#94603a" },
  leaf: { light: "#6cc08b", base: "#3f9a68", dark: "#2a6f4b" },
  marigold: "#f6b335",
  plum: "#8a4f8e",
  teal: "#2a9d8f",
  cream: "#fdf6ec",
} as const;
