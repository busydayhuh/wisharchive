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
}: Pick<UserDocumentType, "userId" | "userName" | "avatarURL"> & {
  className?: string;
}) {
  return (
    <Link to={href(ROUTES.WISHES, { userId: userId })}>
      <div className={cn("flex items-center gap-1 -mt-1", className)}>
        <Avatar className="rounded-full size-5">
          <AvatarImage src={avatarURL ?? undefined} alt={userId} />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <span className="max-w-[18ch] truncate">{userName}</span>
      </div>
    </Link>
  );
}

export default OwnerAvatar;
