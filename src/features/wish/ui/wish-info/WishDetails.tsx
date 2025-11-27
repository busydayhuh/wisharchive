import { WishlistDisplayManager } from "@/features/dashboard";
import { cn } from "@/shared/lib/css";
import type { WishlistDocumentType } from "@/shared/model/types";
import { PriorityBadge, ShopBadge } from "@/shared/ui/Badges";
import ExpandableText from "@/shared/ui/ExpandableText";
import { memo } from "react";

function getBasicInfo(params: WishDetailsProps) {
  const {
    isOwner,
    wishlist,
    isArchived,
    wishId,
    wishTitle,
    imageURL,
    shopURL,
    priority,
  } = params;
  return [
    {
      header: "вишлист",
      element:
        (!isOwner && !wishlist) || isArchived ? null : (
          <WishlistDisplayManager
            wishTitle={wishTitle}
            imageURL={imageURL}
            isOwner={isOwner}
            isEditor={false}
            onListPage={false}
            wishlist={wishlist ?? null}
            wishId={wishId}
          />
        ),
    },
    {
      header: "приоритет",
      element: <PriorityBadge priority={priority} />,
    },
    {
      header: "магазин",
      element: shopURL && <ShopBadge shopURL={shopURL} size="md" />,
    },
  ];
}

export const WishDetails = memo(function WishDetails(props: WishDetailsProps) {
  const basicInfo = getBasicInfo(props);
  const { description, className } = props;

  return (
    <div className="flex flex-col gap-6 lg:gap-10 2xl:gap-12 max-w-3xl">
      <div className="flex flex-col justify-between gap-2 md:gap-2.5 text-xs md:text-sm">
        {basicInfo.map((i) => (
          <div
            key={i.header}
            className={cn(
              "flex justify-between items-center gap-1 md:gap-4 md:basis-0",
              className
            )}
          >
            <p className="font-medium text-muted-foreground/80 shrink-0">
              {i.header}
            </p>

            <div className="border-b-1 border-b-muted-foreground/50 border-dotted w-full h-1"></div>

            {i.element ? (
              i.element
            ) : (
              <p className="py-1 text-muted-foreground/50">нет</p>
            )}
          </div>
        ))}
      </div>

      {description && (
        <div className="space-y-3">
          <div className="font-bold text-lg md:text-xl 2xl:text-2xl">
            О желании
          </div>
          <ExpandableText text={description} className="text-sm" />
        </div>
      )}
    </div>
  );
});

type WishDetailsProps = {
  wishId: string;
  wishTitle: string;
  imageURL?: string;
  wishlist?: WishlistDocumentType | null;
  isArchived: boolean;
  priority: "0" | "1" | "2";
  description?: string | null;
  shopURL?: string | null;
  isOwner: boolean;
  className?: string;
};
