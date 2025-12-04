import { UserAvatar } from "@/shared/ui/UserAvatar";
import type { Category, AnyDocument } from "../GlobalSearch";

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
        avatarURL={item.avatarURL}
        name={item.userName}
        id={item.userId}
      />
    );
  if (category === "wishes")
    return (
      <img
        src={item.imageURL}
        alt={item.title[0] || ""}
        className="flex justify-center items-center bg-muted font-medium"
      />
    );
  if (category === "wishlists")
    return (
      <img
        src={item.wishes?.at(-1)?.imageURL}
        alt={item.title[0] || ""}
        className="flex justify-center items-center bg-muted font-medium"
      />
    );
}
