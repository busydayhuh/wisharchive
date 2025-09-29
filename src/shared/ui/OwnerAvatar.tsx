import { ROUTES } from "@/shared/model/routes";
import type { UserDocumentType } from "@/shared/model/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { href, Link } from "react-router";
import { cn } from "../lib/css";

function OwnerAvatar({
  userId,
  userName,
  avatarURL,
  className,
  size = "sm",
}: Pick<UserDocumentType, "userId" | "userName" | "avatarURL"> & {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const avatarSizes = {
    sm: "w-5 h-5",
    md: "lg:w-7 lg:h-7 w-5 h-5",
    lg: "lg:w-10 lg:h-10 w-7 h-7",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-sm lg:text-base",
    lg: "text-base lg:text-lg",
  };
  return (
    <Link to={href(ROUTES.WISHES, { userId: userId ?? "" })}>
      <div className={cn("flex items-center gap-1 -mt-1", className)}>
        <Avatar className={cn("rounded-full", avatarSizes[size])}>
          <AvatarImage src={avatarURL ?? undefined} alt={userId} />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <span
          className={cn("max-w-[18ch] font-medium truncate", textSizes[size])}
        >
          {userName}
        </span>
      </div>
    </Link>
  );
}

export default OwnerAvatar;
