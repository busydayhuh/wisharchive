import { useLocalStorage } from "@/shared/lib/react/useLocalStorage";
import { useEffect, useState } from "react";
import { ThemeProviderContext } from "./createThemeProvider";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorScheme?: "dark" | "light";
  setColorScheme: (scheme: "dark" | "light") => void;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage(storageKey, defaultTheme);
  const [colorScheme, setColorScheme] = useState<
    "dark" | "light" | undefined
  >();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setColorScheme(systemTheme);
      return;
    }

    root.classList.add(theme);
    setColorScheme(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    colorScheme,
    setColorScheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
