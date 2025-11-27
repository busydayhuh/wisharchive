import { useTheme } from "../model/theme/createThemeProvider";

import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/css";

export function ModeToggle() {
  const { setTheme, colorScheme, setColorScheme } = useTheme();

  const onThemeChange = (value: "light" | "dark") => {
    const newMode = value === "light" ? "dark" : "light";
    setTheme(newMode);
    setColorScheme(newMode);
  };

  return (
    <div
      className="inline-flex gap-2 bg-transparent p-0! overflow-hidden"
      onClick={() => onThemeChange(colorScheme ?? "light")}
    >
      <span className="flex justify-center items-center">
        <Sun
          className={cn(
            "size-4 rotate-0 scale-100 transition-transform",
            colorScheme === "dark" && "-rotate-90 scale-0"
          )}
        />
        <Moon
          className={cn(
            "absolute size-4 rotate-90 scale-0 transition-transform",
            colorScheme === "dark" && "rotate-0 scale-100"
          )}
        />
      </span>
      {colorScheme === "dark" ? "Тёмная тема" : "Светлая тема"}
    </div>
  );
}
