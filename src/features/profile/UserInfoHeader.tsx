import { Button } from "@/shared/ui/kit/button";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { ArrowUpRight, Link } from "lucide-react";

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
        <Button variant="secondary">
          <Link />
          Копировать ссылку
        </Button>
        <Button variant="secondary">
          <ArrowUpRight />К профилю
        </Button>
      </div>
    </div>
  );
}
