import { ROUTES } from "@/shared/model/routes";
import type { UserDocumentType } from "@/shared/model/types";
import { href, Link } from "react-router";
import { cn } from "../lib/css";
import { UserAvatar } from "./UserAvatar";

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
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };
  return (
    <Link to={href(ROUTES.WISHES, { userId: userId ?? "" })}>
      <div className={cn("flex items-center gap-1 -mt-1", className)}>
        <UserAvatar
          name={userName}
          avatarURL={avatarURL ?? undefined}
          size={size}
          id={userId}
        />

        <p
          className={cn(
            "max-w-[18ch] font-medium truncate owner-name",
            textSizes[size]
          )}
        >
          {userName}
        </p>
      </div>
    </Link>
  );
}

export default OwnerAvatar;
