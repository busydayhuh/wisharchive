import { ROUTES } from "@/shared/model/routes";
import { CopyProfileLinkBtn } from "@/shared/ui/CopyProfileLinkBtn";
import { Button } from "@/shared/ui/kit/button";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { ArrowUpRight } from "lucide-react";
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
    <div className="flex flex-wrap sm:justify-between gap-y-3 px-2 lg:px-0">
      <div className="flex items-center gap-4">
        <UserAvatar
          avatarURL={imageURL ?? undefined}
          id={userId}
          name={name}
          size="xl"
          className="shrink-0"
        />
        <div>
          <p className="mb-1 font-semibold text-lg lg:text-xl leading-4">
            {name}
          </p>
          <p className="text-muted-foreground text-sm lg:text-base">
            @{userId}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <CopyProfileLinkBtn variant="secondary" userId={userId} />
        <Link to={href(ROUTES.DASHBOARD, { userId: userId })}>
          <Button variant="secondary">
            <ArrowUpRight />К профилю
          </Button>
        </Link>
      </div>
    </div>
  );
}
