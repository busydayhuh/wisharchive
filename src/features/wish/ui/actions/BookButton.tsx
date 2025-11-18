import { cn } from "@/shared/lib/css";
import { useConfirmationDialog } from "@/shared/model/confirmation-dialog/useConfirmationDialog";
import { IconBtnWithTooltip } from "@/shared/ui/IconBtnWithTooltip";
import { Toggle } from "@/shared/ui/kit/toggle";
import { cva } from "class-variance-authority";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { memo } from "react";
import { useQuickActions } from "../../model/useQuickActions";

const bookButtonVariants = cva(
  "inline-flex justify-center items-center border-0 transition duration-300 cursor-pointer shrink-0",
  {
    variants: {
      triggerVariant: {
        gallery:
          "hover:bg-muted bg-secondary shadow-xs md:size-12 data-[state=on]:bg-primary data-[state=on]:text-background data-[state=on]:hover:bg-primary/90 hover:text-foreground ",
        page: "bg-primary text-primary-foreground hover:bg-primary/90 data-[state=on]:bg-secondary shadow-none hover:text-primary-foreground data-[state=on]:hover:bg-secondary/80 h-12 rounded-md px-6 has-[>svg]:px-4",
        table:
          "shadow-none bg-secondary text-foreground hover:bg-secondary/90 hover:text-foreground data-[state=on]:bg-primary data-[state=on]:text-background data-[state=on]:hover:bg-primary/90",
      },
    },
  }
);

export const BookButton = memo(function BookButton({
  wishId,
  triggerVariant = "gallery",
  wishTitle,
  isBooked = false,
  isBookedByCurrentUser,
  imageURL,
  className,
}: React.ComponentProps<"div"> & {
  wishId: string;
  wishTitle: string;
  triggerVariant?: "gallery" | "table" | "page";
  isBooked: boolean;
  isBookedByCurrentUser: boolean;
  imageURL?: string;
}) {
  const { openConfDialog } = useConfirmationDialog();
  const { bookWish } = useQuickActions(wishId, imageURL, wishTitle);

  const handlePress = () =>
    openConfDialog({
      onConfirm: () => bookWish(!isBookedByCurrentUser),
      action: "book",
      isActive: isBookedByCurrentUser,
    });

  const bookedBySomebody = isBooked && !isBookedByCurrentUser;

  const title = isBooked
    ? isBookedByCurrentUser
      ? "Отменить бронь"
      : "Желание забронировано"
    : "Забронировать желание";

  const extendedBtn = (
    <Toggle
      defaultPressed={isBookedByCurrentUser}
      className={cn(bookButtonVariants({ triggerVariant }), className)}
      onPressedChange={handlePress}
      aria-label={title}
      disabled={bookedBySomebody}
    >
      {isBookedByCurrentUser ? <LockKeyholeOpen /> : <LockKeyhole />}
      {title}
    </Toggle>
  );

  const iconBtn = (
    <IconBtnWithTooltip tooltipText={title}>
      <Toggle
        defaultPressed={isBookedByCurrentUser}
        aria-label={title}
        className={cn(bookButtonVariants({ triggerVariant }), className)}
        onPressedChange={handlePress}
      >
        {isBookedByCurrentUser ? <LockKeyholeOpen /> : <LockKeyhole />}
      </Toggle>
    </IconBtnWithTooltip>
  );

  // На дашборде если желание уже забронировано — не показываем кнопку

  return triggerVariant === "page"
    ? extendedBtn
    : !bookedBySomebody
    ? iconBtn
    : null;
});
