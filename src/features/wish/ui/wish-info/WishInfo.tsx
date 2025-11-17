import { useAccess, useWishcardMeta } from "@/features/dashboard";
import type { WishDocumentType } from "@/shared/model/types";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { memo } from "react";
import { useQuickActions } from "../../model/useQuickActions";
import { WishDetails } from "./WishDetails";
import { WishFooter } from "./WishFooter";
import { WishHeader } from "./WishHeader";

export const WishInfo = memo(function WishInfo({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { userRoles, linkParams } = useWishcardMeta(wish);
  const { editWish } = useQuickActions(wish.$id);
  const { hasAccess } = useAccess("wish", wish);

  if (!hasAccess)
    return (
      <ErrorMessage
        variant="no-access"
        message="Нет доступа"
        description="У вас нет прав доступа для просмотра этого желания"
      />
    );

  return (
    <div className="flex flex-col gap-6 lg:gap-10 2xl:gap-12 px-2 md:px-0 py-2.5">
      <WishHeader
        title={wish.title}
        owner={wish.owner}
        isEditor={userRoles?.isWishOwner}
        editWish={() => editWish(linkParams.state)}
        imageURL={wish.imageURL ?? undefined}
      />

      <WishDetails
        wishId={wish.$id}
        isArchived={wish.isArchived}
        wishlist={wish.wishlist}
        priority={wish.priority}
        description={wish.description}
        shopURL={wish.shopURL}
        isOwner={userRoles?.isWishOwner ?? false}
      />

      <WishFooter
        wishId={wish.$id}
        wishTitle={wish.title}
        isBooked={wish.isBooked}
        price={wish.price}
        currency={wish.currency}
        shopURL={wish.shopURL}
        isArchived={wish.isArchived}
        isBooker={userRoles?.isBooker ?? false}
        isOwner={userRoles?.isWishOwner ?? false}
      />
    </div>
  );
});
