import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../shared/store/theme/useTheme";
import { cn } from "../../shared/utils/css";

export function ModeToggle({ withText = true }) {
  const { setTheme, colorScheme, setColorScheme } = useTheme();

  const onThemeChange = (value: "light" | "dark") => {
    const newMode = value === "light" ? "dark" : "light";
    setTheme(newMode);
    setColorScheme(newMode);
  };

  const text = colorScheme === "dark" ? "Тёмная тема" : "Светлая тема";

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
      {withText && text}
    </div>
  );
}
