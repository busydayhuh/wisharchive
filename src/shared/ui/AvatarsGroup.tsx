import { cn } from "@/shared/lib/css";
import type { UserDocumentType } from "@/shared/model/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { ID } from "appwrite";
import { memo } from "react";

type AvatarsGroupProps = {
  users: UserDocumentType[];
  size: number;
  space?: number;
  maxCount: number;
};

const AvatarsGroup = memo(function AvatarsGroup({
  users,
  size,
  maxCount,
  className,
}: AvatarsGroupProps & React.ComponentProps<"div">) {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
    >
      {users.slice(0, maxCount).map((user) => (
        <Avatar className={`w-${size} h-${size}`} key={ID.unique()}>
          <AvatarImage src={user.avatarURL} alt={user.userName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}

      {users.length > 3 && (
        <Avatar className={`w-${size} h-${size}`}>
          <AvatarImage />
          <AvatarFallback className="text-xs">
            +{users.length - maxCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
});

export default AvatarsGroup;
