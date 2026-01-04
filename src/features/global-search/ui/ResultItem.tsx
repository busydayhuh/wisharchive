import { useRoute } from "@/features/breadcrumbs";
import { ROUTES } from "@/shared/config/routes";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/kit/item";
import { cn } from "@/shared/utils/css";
import { href } from "react-router-dom";
import type { AnyDocument, Category } from "../GlobalSearch";
import { Media } from "./Media";

export function ResultItem({
  item,
  category,
  isMobile,
  setOpen,
  className,
}: {
  item: AnyDocument;
  category: Category;
  isMobile?: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  className?: string;
}) {
  const { navigateWithState } = useRoute();

  function handleNavigation() {
    if (category === "wishes")
      navigateWithState(
        href(ROUTES.WISH, { userId: item.ownerId, wishId: item.$id }),
        { wishTitle: item.title }
      );

    if (category === "wishlists")
      navigateWithState(
        href(ROUTES.WISHLIST, { userId: item.ownerId, listId: item.$id }),
        { wlTitle: item.title }
      );

    if (category === "users")
      navigateWithState(href(ROUTES.WISHES, { userId: item.userId }));

    setOpen(false);
  }

  return (
    <Item
      size={isMobile ? "sm" : "default"}
      className={cn(
        isMobile && "px-1 py-2",
        "hover:bg-muted/50 cursor-pointer",
        className
      )}
      onClick={handleNavigation}
    >
      <ItemMedia variant="image">
        <Media item={item} category={category} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <span className="line-clamp-2">{item.title || item.userName}</span>
        </ItemTitle>
        <ItemDescription>
          {category === "users" ? `@${item.userId}` : item.description ?? ""}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
