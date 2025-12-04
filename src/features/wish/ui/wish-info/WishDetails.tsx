import type { WishRoles } from "@/features/collaborators";
import { WishlistControls } from "@/features/wishlist-controls";
import type { WishDocumentType } from "@/shared/model/types";
import { PriorityBadge, ShopBadge } from "@/shared/ui/Badges";
import ExpandableText from "@/shared/ui/ExpandableText";
import { memo } from "react";

type WishDetailsProps = {
  wish: WishDocumentType;
  roles?: WishRoles;
};

export const WishDetails = memo(function WishDetails({
  wish,
  roles,
}: WishDetailsProps) {
  const showWishlistControls =
    Boolean(wish.wishlist) || Boolean(roles?.isWishOwner);
  const rows = [
    {
      header: "вишлист",
      element: showWishlistControls && (
        <WishlistControls
          wish={wish}
          roles={roles}
          variant="table"
          wishlist={wish.wishlist}
        />
      ),
    },
    {
      header: "приоритет",
      element: <PriorityBadge priority={wish.priority} />,
    },
    {
      header: "магазин",
      element: wish.shopURL && <ShopBadge shopURL={wish.shopURL} size="md" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 lg:gap-10 2xl:gap-12 max-w-3xl">
      <div className="flex flex-col justify-between gap-2 md:gap-2.5 bg-background text-xs md:text-sm">
        {rows.map((r) => (
          <div
            key={r.header}
            className="flex justify-between items-center gap-1 md:gap-4 md:basis-0"
          >
            <p className="text-muted-foreground/80 shrink-0">{r.header}</p>
            <div className="border-b-1 border-b-muted-foreground/50 border-dotted w-full h-1"></div>
            {r.element ? (
              r.element
            ) : (
              <p className="py-1 text-muted-foreground/50">нет</p>
            )}
          </div>
        ))}
      </div>
      {wish.description && (
        <div className="space-y-3">
          <div className="font-bold text-lg md:text-xl 2xl:text-2xl">
            О желании
          </div>
          <ExpandableText text={wish.description} className="text-sm" />
        </div>
      )}
    </div>
  );
});
