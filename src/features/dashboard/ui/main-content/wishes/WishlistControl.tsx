import { useQuickActions, WishlistChanger } from "@/features/wish";
import { cn } from "@/shared/lib/css";
import { useConfirmationDialog } from "@/shared/model/confirmation-dialog/useConfirmationDialog";
import type { WishlistDocumentType } from "@/shared/model/types";
import { WishlistBadge } from "@/shared/ui/Badges";
import { Button } from "@/shared/ui/kit/button";
import { X } from "lucide-react";

export function WishlistControl({
  isOwner,
  isMobile,
  isEditor,
  wishlist,
  wishId,
  wishTitle,
  onListPage,
  imageURL,
  className,
  variant = "gallery",
}: {
  isOwner: boolean;
  isMobile?: boolean;
  isEditor: boolean;
  wishlist: WishlistDocumentType | null;
  wishId: string;
  onListPage?: boolean;
  wishTitle: string;
  imageURL?: string;
  className?: string;
  variant?: "gallery" | "table";
}) {
  const { changeWishlist, removeFromWishlist } = useQuickActions(
    wishId,
    imageURL,
    wishTitle
  );
  const { openConfDialog } = useConfirmationDialog();

  const handleRemove = () =>
    openConfDialog({
      action: "edit",
      onConfirm: removeFromWishlist,
      name: wishlist?.title,
      isOwner: isOwner,
    });

  if (isOwner && !onListPage) {
    if (isMobile && variant === "gallery") return null;

    return (
      <WishlistChanger
        value={wishlist?.$id ?? "none"}
        onValueChange={(newWlId: string, newWlTitle: string) => {
          changeWishlist(newWlId === "none" ? null : newWlId, newWlTitle);
        }}
        className={className}
      />
    );
  }
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

  if (wishlist && !onListPage)
    return (
      <WishlistBadge
        id={wishlist.$id}
        title={wishlist.title}
        className={className}
        isPrivate={wishlist.isPrivate}
        ownerId={wishlist.ownerId}
      />
    );

  return null;
}
