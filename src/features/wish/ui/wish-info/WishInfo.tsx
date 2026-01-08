import type { WishRoles } from "@/features/collaborators/model";
import type { WishDocumentType } from "@/shared/types";
import { memo } from "react";
import { useWishNavigation } from "../../model/hooks/useWishNavigation";
import { WishDetails } from "./WishDetails";
import { WishFooter } from "./WishFooter";
import { WishHeader } from "./WishHeader";

export const WishInfo = memo(function WishInfo({
  wish,
  roles,
}: {
  wish: WishDocumentType;
  roles?: WishRoles;
}) {
  const { onEditWish } = useWishNavigation(wish);
  return (
    <div className="flex flex-col gap-6 lg:gap-10 2xl:gap-12 px-2 md:px-0 py-2.5">
      <WishHeader
        title={wish.title}
        owner={wish.owner}
        editWish={onEditWish}
        isEditor={roles?.isWishOwner}
        imageURL={wish.imageURL ?? undefined}
      />
      <WishDetails wish={wish} roles={roles} />
      <WishFooter wish={wish} roles={roles as WishRoles} />
    </div>
  );
});
