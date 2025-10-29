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
  // const avatarSizes = {
  //   sm: "w-6 h-6",
  //   md: "lg:w-7 lg:h-7 w-5 h-5",
  //   lg: "lg:w-10 lg:h-10 w-7 h-7",
  // };

  const textSizes = {
    sm: "text-sm",
    md: "text-sm lg:text-base",
    lg: "text-base lg:text-lg",
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

        <span
          className={cn(
            "max-w-[18ch] font-medium truncate owner-name",
            textSizes[size]
          )}
        >
          {userName}
        </span>
      </div>
    </Link>
  );
}

export default OwnerAvatar;
