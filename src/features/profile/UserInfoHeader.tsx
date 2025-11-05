import { copyLink } from "@/shared/lib/copyLink";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { ArrowUpRight, Link as LinkIcon } from "lucide-react";
import { href, Link } from "react-router-dom";

export function UserInfoHeader({
  imageURL,
  userId,
  name,
}: {
  imageURL?: string;
  userId: string;
  name: string;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <UserAvatar
          avatarURL={imageURL ?? undefined}
          id={userId}
          name={name}
          size="3xl"
        />
        <div>
          <p className="font-semibold text-xl">{name}</p>
          <p className="text-muted-foreground text-base">@{userId}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          onClick={() => copyLink(`http://localhost:5173/${userId}`)}
        >
          <LinkIcon />
          Копировать ссылку
        </Button>
        <Link to={href(ROUTES.DASHBOARD, { userId: userId })}>
          <Button variant="secondary">
            <ArrowUpRight />К профилю
          </Button>
        </Link>
      </div>
    </div>
  );
}
