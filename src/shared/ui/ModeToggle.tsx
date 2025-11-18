import { useEffect, useState } from "react";
import { useTheme } from "../model/theme/createThemeProvider";

import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/css";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState<"dark" | "light" | undefined>();

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    if (theme === "system") return setMode(systemTheme);

    setMode(theme);
  }, [theme]);

  const onThemeChange = (value: "light" | "dark") => {
    const newMode = value === "light" ? "dark" : "light";
    setMode(newMode);
    setTheme(newMode);
  };

  return (
    <div
      className="inline-flex gap-2 bg-transparent p-0! overflow-hidden"
      onClick={() => onThemeChange(mode ?? "light")}
    >
      <span className="flex justify-center items-center">
        <Sun
          className={cn(
            "size-4 rotate-0 scale-100 transition-transform",
            mode === "dark" && "-rotate-90 scale-0"
          )}
        />
        <Moon
          className={cn(
            "absolute size-4 rotate-90 scale-0 transition-transform",
            mode === "dark" && "rotate-0 scale-100"
          )}
        />
      </span>
      {mode === "dark" ? "Тёмная тема" : "Светлая тема"}
    </div>
  );
}
