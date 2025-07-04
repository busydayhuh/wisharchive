import db from "@/shared/model/databases";
import { ROUTES } from "@/shared/model/routes";
import { Badge } from "@/shared/ui/kit/badge";
import { Lock } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router";
import SharedAvatars from "./SharedAvatars";

type ListcardProps = {
  list: {
    name: string;
    imagesUrl: Array<string | undefined>;
    isPrivate: boolean;
    wishCount: number;
    canRead?: string[];
    canEdit?: string[];
  };
};

// TODO переместить ListcardProps, дубль

const DbWishlistTableItem = memo(function DbWishlistTableItem({
  list,
}: ListcardProps) {
  async function getList() {
    const response = await db.wishlists.get("683b1b740034699a097f");
    console.log("response :>> ", response);
  }

  getList();
  return (
    <div className="items-center gap-6 grid grid-cols-[fit-content(128px)_3fr_2fr_2fr_2fr] hover:bg-muted pt-2 pb-4 pl-3 transition">
      <Link to={href(ROUTES.WISHLIST, { listId: list.name })}>
        <div className="relative">
          <div className="bg-muted w-28 aspect-video">
            {list.imagesUrl[2] && (
              <img
                src={list.imagesUrl[2]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="top-1 -left-1 absolute bg-muted border-1 border-background w-28 aspect-video">
            {list.imagesUrl[1] && (
              <img
                src={list.imagesUrl[1]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="top-2 -left-2 absolute bg-muted border-1 border-background w-28 aspect-video">
            {list.imagesUrl[0] && (
              <img
                src={list.imagesUrl[0]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </Link>
      <Link to={href(ROUTES.WISHLIST, { listId: list.name })}>
        <div className="flex flex-col basis-2xs">
          <span className="pr-1 font-medium text-lg truncate">
            {list.name}
            {list.isPrivate && (
              <Badge className="ms-2 px-1 py-1 rounded-full">
                <Lock className="size-3" />
              </Badge>
            )}
          </span>
          <span className="text-xs">{`${list.wishCount} жел.`}</span>
        </div>
      </Link>
      <div className="text-muted-foreground text-sm">
        изменен: 17 июня 2025г.
      </div>
      {list.isPrivate && list.canRead ? (
        <SharedAvatars users={list.canRead} size={8} maxCount={4} space={3} />
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default DbWishlistTableItem;
