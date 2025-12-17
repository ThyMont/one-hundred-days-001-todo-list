import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#EEF2FF" },
          100: { value: "#E0E7FF" },
          200: { value: "#C7D2FE" },
          300: { value: "#A5B4FC" },
          400: { value: "#818CF8" },
          500: { value: "#6366F1" },
          600: { value: "#4F46E5" },
          700: { value: "#4338CA" },
          800: { value: "#3730A3" },
          900: { value: "#312E81" },
        },
        success: { 500: { value: "#10B981" } },
        warning: { 500: { value: "#F59E0B" } },
        danger: { 500: { value: "#EF4444" } },
      },
    },

    semanticTokens: {
      colors: {
        // Backgrounds (o Chakra usa bastante bg/bg.muted/bg.subtle)
        bg: { value: { base: "#F8FAFC", _dark: "#0F172A" } },
        "bg.subtle": { value: { base: "#F1F5F9", _dark: "#111C33" } },
        "bg.muted": { value: { base: "#E2E8F0", _dark: "#0B1224" } },

        // Surface / border
        surface: { value: { base: "#FFFFFF", _dark: "#020617" } },
        border: { value: { base: "#E2E8F0", _dark: "#1E293B" } },

        // Foreground (o Chakra usa fg/fg.muted/fg.subtle nos componentes)
        fg: { value: { base: "#0F172A", _dark: "#F8FAFC" } },
        "fg.muted": { value: { base: "#475569", _dark: "#94A3B8" } },
        "fg.subtle": { value: { base: "#64748B", _dark: "#64748B" } },

        // Ações / estados
        primary: { value: { base: "{colors.brand.500}", _dark: "{colors.brand.400}" } },
        success: { value: { base: "{colors.success.500}", _dark: "{colors.success.500}" } },
        warning: { value: { base: "{colors.warning.500}", _dark: "{colors.warning.500}" } },
        danger: { value: { base: "{colors.danger.500}", _dark: "{colors.danger.500}" } },

        // Opcional: caso você ainda use "text" no código legado
        text: { value: { base: "{colors.fg}", _dark: "{colors.fg}" } },
        mutedText: { value: { base: "{colors.fg.muted}", _dark: "{colors.fg.muted}" } },
      },
    },
  },
});
