import { ROUTES } from "@/shared/config/routes";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { UserAvatar } from "@/shared/ui/components/UserAvatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { useState } from "react";
import { href, Link } from "react-router";

export function OwnerInfoPopover({
  avatarURL,
  name,
  id,
  size = "lg",
}: {
  avatarURL?: string;
  name: string;
  id: string;
  email: string;
  size?: "sm" | "lg";
}) {
  const isMobile = useIsMobile();
  const trigger = (
    <UserAvatar
      name={name}
      id={id}
      avatarURL={avatarURL ?? undefined}
      className="p-0.5 border-1 border-muted/90"
      size={size}
    />
  );

  const [open, setOpen] = useState(false);

  const content = (
    <div className="space-y-4">
      <p className="font-headers font-semibold text-muted-foreground text-xs">
        Вы вошли как
      </p>
      <div className="flex items-center gap-4 px-2">
        <UserAvatar
          name={name}
          id={id}
          avatarURL={avatarURL ?? undefined}
          size="lg"
        />
        <div>
          <p className="mb-0.5 font-semibold">{name}</p>
          <p className="text-muted-foreground text-sm">@{id}</p>
        </div>
      </div>
      <div className="grid">
        <p className="mb-2 font-semibold text-muted-foreground text-xs">
          Профиль
        </p>
        <Link
          to={ROUTES.PROFILE}
          className="hover:bg-accent px-2 py-1.5 rounded-sm w-full font-medium text-sm"
          onClick={() => setOpen(false)}
        >
          Редактировать
        </Link>
        <Link
          to={{
            pathname: href(ROUTES.WISHES, { userId: id }),
            search: "?view=profile",
          }}
          className="hover:bg-accent px-2 py-1.5 rounded-sm w-full font-medium text-sm"
          onClick={() => setOpen(false)}
        >
          На страницу профиля
        </Link>
      </div>
    </div>
  );

  if (isMobile)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Об аккаунте</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-fit" side="left">
        {content}
      </PopoverContent>
    </Popover>
  );
}
