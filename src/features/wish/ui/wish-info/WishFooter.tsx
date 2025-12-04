import type { AccessRoles } from "@/features/collaborators";
import type { WishDocumentType } from "@/shared/model/types";
import { memo } from "react";
import { ArchiveButton } from "../actions/ArchiveButton";
import { BookButton } from "../actions/BookButton";
import { FormattedPrice } from "../FormattedPrice";

export const WishFooter = memo(function WishFooter({
  wish,
  roles,
}: {
  wish: WishDocumentType;
  roles: AccessRoles;
}) {
  const { price, currency, title, imageURL, $id, isArchived, isBooked } = wish;

  return (
    <div className="flex md:flex-row flex-col md:justify-between items-start md:items-center gap-4 md:gap-10 md:mt-auto max-w-3xl">
      {price && (
        <FormattedPrice
          price={price}
          currency={currency}
          className="font-bold text-2xl lg:text-3xl"
        />
      )}
      {roles.isWishOwner ? (
        <ArchiveButton
          imageURL={imageURL ?? undefined}
          wishId={$id}
          variant="button"
          wishTitle={title}
          isArchived={isArchived}
          className="w-full md:w-fit h-14"
        />
      ) : (
        <BookButton
          imageURL={imageURL ?? undefined}
          wishTitle={title}
          wishId={$id}
          triggerVariant="page"
          isBooked={isBooked}
          isBookedByCurrentUser={roles?.isBooker ?? false}
          className="w-full md:w-fit h-14"
        />
      )}
    </div>
  );
});
