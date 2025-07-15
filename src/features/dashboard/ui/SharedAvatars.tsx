import { cn } from "@/shared/lib/css";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { ID } from "appwrite";
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
  maxCount,
  className,
}: SharedAvatarsProps & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex -space-x-2 *:data-[slot=avatar]:grayscale mt-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
    >
      {users.slice(0, maxCount).map((user) => (
        <Avatar className={`w-${size} h-${size}`} key={ID.unique()}>
          <AvatarImage src="https://github.com/shadcn.png" alt={user} />
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

export default SharedAvatars;
