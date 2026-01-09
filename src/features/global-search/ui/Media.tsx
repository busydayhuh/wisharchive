import { UserAvatar } from "@/shared/ui/components/UserAvatar";
import type { AnyDocument, Category } from "../model/types";

export function Media({
  category,
  item,
}: {
  category: Category;
  item: AnyDocument;
}) {
  if (category === "users")
    return (
      <UserAvatar
        size="md"
        avatarURL={item.avatarURL ?? undefined}
        name={item.userName}
        id={item.userId}
      />
    );
  if (category === "wishes")
    return item.imageURL ? (
      <img
        src={item.imageURL}
        alt={item.title?.[0] || ""}
        className="flex justify-center items-center bg-muted font-medium"
      />
    ) : (
      <div className="flex justify-center items-center bg-muted w-full h-full font-medium">
        {item.title?.[0] || ""}
      </div>
    );
  if (category === "wishlists")
    return item.wishes?.at(-1)?.imageURL ? (
      <img
        src={item.wishes?.at(-1)?.imageURL}
        alt={item.title?.[0] || ""}
        className="flex justify-center items-center bg-muted font-medium"
      />
    ) : (
      <div className="flex justify-center items-center bg-muted w-full h-full font-medium">
        {item.title?.[0] || ""}
      </div>
    );
}
