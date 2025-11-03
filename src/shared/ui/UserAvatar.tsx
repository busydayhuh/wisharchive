import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "../lib/css";
import { getFallbackColor } from "../lib/getFallbackColor";

export const AVATAR_SIZES = {
  sm: "w-6 h-6 text-xs",
  md: "w-9 h-9 text-xs",
  lg: "w-12 h-12 text-sm",
};

// const getInitials = (name: string) =>
//   name.split(" ").reduce((acc, part) => acc + part.charAt(0).toUpperCase(), "");

export function UserAvatar({
  avatarURL,
  name,
  id,
  size = "md",
  className,
  fallbackText,
}: {
  avatarURL?: string;
  name: string;
  id: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fallbackText?: string;
}) {
  return (
    <Avatar
      className={cn(
        "block border-1 border-border rounded-full",
        AVATAR_SIZES[size],
        className
      )}
    >
      <AvatarImage src={avatarURL} alt={id + name} className="rounded-full" />
      <AvatarFallback
        className={cn(
          "flex justify-center items-center rounded-full w-full h-full font-medium text-neutral-200"
        )}
        style={{
          background: fallbackText
            ? "var(--muted)"
            : getFallbackColor(id, { dark: false }),
        }}
      >
        {fallbackText || size === "sm" ? "" : "✨"}
      </AvatarFallback>
    </Avatar>
  );
}
