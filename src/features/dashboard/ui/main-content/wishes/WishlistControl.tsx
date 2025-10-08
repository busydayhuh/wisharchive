import { useWishQuickActions, WishlistSelect } from "@/features/wish";
import { cn } from "@/shared/lib/css";
import { useConfirmationDialog } from "@/shared/model/confirmation-dialog/ConfirmationDialogContext";
import type { WishlistDocumentType } from "@/shared/model/types";
import { WishlistBadge } from "@/shared/ui/Badges";
import { Button } from "@/shared/ui/kit/button";
import { X } from "lucide-react";

export function WishlistControl({
  isOwner,
  isEditor,
  wishlist,
  wishId,
  onListPage,
  className,
  variant = "gallery",
}: {
  isOwner: boolean;
  isEditor: boolean;
  wishlist: WishlistDocumentType | null;
  wishId: string;
  onListPage?: boolean;
  className?: string;
  variant?: "gallery" | "table";
}) {
  const { changeWishlist, removeFromWishlist } = useWishQuickActions(wishId);
  const { openConfDialog } = useConfirmationDialog();

  const handleRemove = () =>
    openConfDialog({
      action: "edit",
      onConfirm: removeFromWishlist,
      name: wishlist?.title,
      isOwner: isOwner,
    });

  if (isOwner && !onListPage)
    return (
      <WishlistSelect
        value={wishlist?.$id ?? "none"}
        onValueChange={(newWlId: string) => {
          changeWishlist(newWlId === "none" ? null : newWlId);
        }}
        className={className}
      />
    );

  if ((isEditor || isOwner) && onListPage)
    return (
      <Button
        onClick={handleRemove}
        size="icon"
        variant="secondary"
        className={cn(
          className,
          variant === "gallery" && "aspect-square",
          variant === "table" && "px-2.5",
          "h-9 md:h-9"
        )}
        aria-label="Убрать из списка"
      >
        <X />
        {variant === "table" && "Убрать"}
      </Button>
    );

  if (wishlist)
    return (
      <WishlistBadge
        id={wishlist.$id}
        title={wishlist.title}
        className={className}
        isPrivate={wishlist.isPrivate}
      />
    );

  return null;
}
