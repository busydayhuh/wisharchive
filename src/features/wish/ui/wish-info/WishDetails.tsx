import { cn } from "@/shared/lib/css";
import type { WishlistDocumentType } from "@/shared/model/types";
import { PriorityBadge, ShopBadge, WishlistBadge } from "@/shared/ui/Badges";
import ExpandableText from "@/shared/ui/ExpandableText";
import { memo } from "react";

function getBasicInfo(
  priority: "high" | "medium" | "low",
  wishlist?: WishlistDocumentType | null,
  shopURL?: string | null
) {
  return [
    {
      header: "вишлист",
      element: wishlist && (
        <WishlistBadge
          id={wishlist.$id}
          title={wishlist.title}
          isPrivate={wishlist.isPrivate}
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

export const WishDetails = memo(function WishDetails({
  wishlist,
  priority = "medium",
  description,
  shopURL,
  className,
}: {
  wishlist?: WishlistDocumentType | null;
  priority: "high" | "medium" | "low";
  description?: string | null;
  shopURL?: string | null;
  className?: string;
}) {
  const basicInfo = getBasicInfo(priority, wishlist, shopURL);

  return (
    <div className="flex flex-col gap-6 lg:gap-10 2xl:gap-12 max-w-3xl">
      <div className="flex flex-col justify-between gap-x-0 gap-y-4 md:gap-4 text-sm md:text-base">
        {basicInfo.map((i) => (
          <div
            key={i.header}
            className={cn(
              "flex justify-between items-baseline gap-1 md:gap-4 basis-1/2 md:basis-0",
              className
            )}
          >
            <p className="font-medium text-muted-foreground/50 md:text-base shrink-0">
              {i.header}
            </p>

            <div className="border-b-1 border-b-muted-foreground/30 border-dotted w-full h-1"></div>

            {i.element ? (
              i.element
            ) : (
              <p className="text-muted-foreground/50 text-sm 2xl:text-base">
                нет
              </p>
            )}
          </div>
        ))}
      </div>

      {description && (
        <div className="space-y-3 2xl:space-y-5">
          <div className="font-bold text-lg md:text-xl 2xl:text-2xl">
            О желании
          </div>
          <ExpandableText text={description} className="text-sm md:text-base" />
        </div>
      )}
    </div>
  );
});
