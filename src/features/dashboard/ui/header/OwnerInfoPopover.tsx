import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { CakeIcon } from "lucide-react";
import { getUserBirthday } from "../../model/getUserBirthday";

export function OwnerInfoPopover({
  avatarURL,
  name,
  id,
  birthDate,
}: {
  avatarURL?: string;
  name: string;
  id: string;
  birthDate?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar
          name={name}
          id={id}
          avatarURL={avatarURL ?? undefined}
          className="p-0.5 border-1 border-muted/90"
          size="lg"
        />
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="gap-4 grid">
          <div className="flex gap-4">
            <UserAvatar
              name={name}
              id={id}
              avatarURL={avatarURL ?? undefined}
              size="md"
            />
            <div className="space-y-1">
              <p className="font-medium leading-none">{name}</p>
              <p className="text-muted-foreground text-sm">@{id}</p>
              {birthDate && (
                <p className="inline-flex items-center gap-1.5 bg-blue-bg px-2.5 py-1 rounded-sm text-blue text-xs leading-none">
                  <CakeIcon className="size-3" />
                  {getUserBirthday(birthDate)}
                </p>
              )}
            </div>
          </div>
          {/* <div className="place-content-end grid w-full">
            <CopyProfileLinkBtn
              variant="default"
              size="sm"
              userId={id}
              text="Поделиться"
            />
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
