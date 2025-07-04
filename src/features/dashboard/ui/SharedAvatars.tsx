import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { memo } from "react";

type SharedAvatarsProps = {
  users: string[];
  size: number;
  space?: number;
  maxCount: number;
};

const SharedAvatars = memo(function SharedAvatars({
  users,
  size,
  space = 2,
  maxCount,
}: SharedAvatarsProps) {
  return (
    <div
      className={`flex -space-x-${space} *:data-[slot=avatar]:grayscale mt-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background`}
    >
      {users.slice(0, maxCount).map((user) => (
        <Avatar className={`size-${size}`}>
          <AvatarImage src="https://github.com/shadcn.png" alt={user} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}

      {users.length > 3 && (
        <Avatar className={`size-${size}`}>
          <AvatarImage />
          <AvatarFallback className="text-xs">
            +{users.length - maxCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
});

export default SharedAvatars;
