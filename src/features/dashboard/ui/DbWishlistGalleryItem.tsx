import { ROUTES } from "@/shared/model/routes";
import { Badge } from "@/shared/ui/kit/badge";
import { ID } from "appwrite";
import { Lock } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router-dom";
import { BookmarkButton, EditButton } from "./ActionButtons";
import SharedAvatars from "./SharedAvatars";

type ListcardProps = {
  list: {
    $id: string;
    name: string;
    imagesUrl: Array<string | undefined>;
    isPrivate: boolean;
    wishCount: number;
    canRead?: string[];
    canEdit?: string[];
  };
};

const DbWishlistGalleryItem = memo(function DbWishlistGalleryItem({
  list,
}: ListcardProps) {
  return (
    <div className="group/cover flex flex-col gap-1 mb-4">
      <div className="relative">
        <BookmarkButton />
        <EditButton />
        <Link to={href(ROUTES.WISHLIST, { listId: list.$id })}>
          <div className="gap-0.5 grid grid-cols-[1.5fr_1fr] grid-rows-2 *:first:row-span-2 brightness-100 group-hover/cover:brightness-50 rounded-2xl h-36 overflow-hidden transition">
            {list.imagesUrl.map((url) => {
              if (url)
                return (
                  <img
                    src={url}
                    className="w-full h-full object-cover"
                    key={ID.unique()}
                  />
                );
              return <div className="bg-muted" key={ID.unique()}></div>;
            })}
          </div>
        </Link>
      </div>
      <Link to={href(ROUTES.WISHLIST, { listId: list.$id })}>
        <div className="flex justify-between items-baseline px-2">
          <span className="pr-1 font-medium text-base md:text-lg truncate">
            {list.name}
          </span>
          {list.isPrivate && (
            <Badge
              className="ms-1 me-auto px-1 py-1 rounded-full text-foreground"
              variant="outline"
            >
              <Lock className="size-3" />
            </Badge>
          )}
          <span className="text-sm md:text-base">{`(${list.wishCount})`}</span>
        </div>
        {list.isPrivate && list.canRead && (
          <SharedAvatars
            users={list.canRead}
            size={5}
            maxCount={3}
            className="px-2"
          />
        )}
      </Link>
    </div>
  );
});

export default DbWishlistGalleryItem;
