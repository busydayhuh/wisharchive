import { memo } from "react";
import { ArchiveButton } from "../actions/ArchiveButton";
import { BookButton } from "../actions/BookButton";
import { FormattedPrice } from "../FormattedPrice";

export const WishFooter = memo(function WishFooter({
  wishId,
  wishTitle,
  isBooked,
  price,
  currency,
  isArchived,
  isOwner,
  isBooker,
}: {
  wishId: string;
  wishTitle: string;
  isBooked: boolean;
  price: number | null;
  currency: string;
  isArchived: boolean;
  shopURL: string | null;
  isOwner: boolean;
  isBooker: boolean;
}) {
  return (
    <div className="flex md:flex-row flex-col md:justify-between items-start md:items-center gap-4 md:gap-10 md:mt-auto max-w-3xl">
      {price && (
        <FormattedPrice
          price={price}
          currency={currency}
          className="font-bold text-2xl lg:text-3xl"
        />
      )}
      {isOwner ? (
        <ArchiveButton
          wishId={wishId}
          variant="button"
          wishTitle={wishTitle}
          isArchived={isArchived}
          className="w-full md:w-fit h-14"
        />
      ) : (
        <BookButton
          wishId={wishId}
          triggerVariant="page"
          isBooked={isBooked}
          isBookedByCurrentUser={isBooker}
          className="w-full md:w-fit h-14"
        />
      )}
    </div>
  );
});
