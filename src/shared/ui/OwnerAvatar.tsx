import { ROUTES } from "@/shared/model/routes";
import type { UserDocumentType } from "@/shared/model/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { href, Link } from "react-router";

function OwnerAvatar({
  userId,
  userName,
  avatarURL,
}: Pick<UserDocumentType, "userId" | "userName" | "avatarURL">) {
  return (
    <Link to={href(ROUTES.WISHES, { userId: userId })}>
      <div className="flex items-center gap-1 -mt-1">
        <Avatar className="rounded-full size-5">
          <AvatarImage src={avatarURL} alt={userId} />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <span className="max-w-[18ch] text-xs md:text-sm truncate">
          {userName}
        </span>
      </div>
    </Link>
  );
}

export default OwnerAvatar;
