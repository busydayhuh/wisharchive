import { memo } from "react";
import { ArchiveButton } from "../buttons/ArchiveButton";
import { BookButton } from "../buttons/BookButton";
import { FormattedPrice } from "../FormattedPrice";

export const WishFooter = memo(function WishFooter({
  wishTitle,
  isBooked,
  price,
  currency,
  isArchived,
  isOwner,
  isBooker,
  archiveWish,
  bookWish,
}: {
  wishTitle: string;
  isBooked: boolean;
  price: number | null;
  currency: string;
  isArchived: boolean;
  shopURL: string | null;
  isOwner: boolean;
  isBooker: boolean;
  archiveWish: (archived: boolean) => Promise<void>;
  bookWish: (pressed: boolean) => Promise<void>;
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
          variant="button"
          wishTitle={wishTitle}
          action={archiveWish}
          isArchived={isArchived}
          className="w-full md:w-fit"
        />
      ) : (
        <BookButton
          triggerVariant="page"
          isBooked={isBooked}
          isBookedByCurrentUser={isBooker}
          action={bookWish}
          className="w-full md:w-fit"
        />
      )}
    </div>
  );
});
