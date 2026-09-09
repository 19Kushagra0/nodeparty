import { useRoomStore } from "@/store/useRoomStore";

// --- Palette Tokens -----------------------------------------------------------
// Dark = Homepage "Tap House Gold" palette
// Light = Clean white / zinc palette

const DARK = {
  bg:           "#0c0a07",
  surface:      "#161310",
  surfaceHover: "#1e1a14",
  border:       "#27211a",
  borderHover:  "#3a3022",
  text:         "#f2e9d6",
  muted:        "#907a5a",
  accent:       "#c8962e",
  accentHover:  "#dba940",
  accentFg:     "#0c0a07",
  isDark:       true  as const,
};

const LIGHT = {
  bg:           "#F9FAFB",
  surface:      "#FFFFFF",
  surfaceHover: "#F4F4F5",
  border:       "#E4E4E7",
  borderHover:  "#D4D4D8",
  text:         "#18181B",
  muted:        "#71717A",
  accent:       "#F43F5E",
  accentHover:  "#E11D48",
  accentFg:     "#FFFFFF",
  isDark:       false as const,
};

export interface RoomTheme {
  bg: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderHover: string;
  text: string;
  muted: string;
  accent: string;
  accentHover: string;
  accentFg: string;
  isDark: boolean;
}

export function useRoomTheme(): RoomTheme {
  const themeMode = useRoomStore((s) => s.themeMode);
  return themeMode === "dark" ? DARK : LIGHT;
}
