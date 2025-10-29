import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "../lib/css";
import { getFallbackColor } from "../lib/getFallbackColor";

export function UserAvatar({
  avatarURL,
  name,
  id,
  size = "md",
  className,
}: {
  avatarURL?: string;
  name: string;
  id: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const fallbackColor = getFallbackColor(id);

  return (
    <Avatar className={cn("block rounded-full", sizes[size], className)}>
      <AvatarImage src={avatarURL} alt={id} className="rounded-full" />
      <AvatarFallback
        className={cn(
          "flex justify-center items-center rounded-full w-full h-full"
        )}
        style={{ background: fallbackColor }}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

function getInitials(name: string) {
  const initialsArr = name.split(" ");

  return initialsArr.reduce(
    (acc, part) => acc + part.charAt(0).toUpperCase(),
    ""
  );
}
