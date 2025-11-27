import { useQuickActions, WishlistChanger } from "@/features/wish";
import { cn } from "@/shared/lib/css";
import { useConfirmationDialog } from "@/shared/model/confirmation-dialog/useConfirmationDialog";
import type { WishlistDocumentType } from "@/shared/model/types";
import { WishlistBadge } from "@/shared/ui/Badges";
import { notifyError, notifySuccessExpanded } from "@/shared/ui/CustomToast";
import { Button } from "@/shared/ui/kit/button";
import { X } from "lucide-react";

export function WishlistDisplayManager({
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
}: WishlistControllerProps) {
  const { changeWishlist, removeFromWishlist } = useQuickActions(wishId);
  const { openConfDialog } = useConfirmationDialog();

  const remove = () =>
    openConfDialog({
      action: "edit",
      onConfirm: async () => {
        const { ok } = await removeFromWishlist();
        if (!ok) {
          notifyError("Не удалось исключить желание");
          return;
        }
        notifySuccessExpanded(
          "Желание исключено из списка",
          wishTitle,
          imageURL
        );
      },
      name: wishlist?.title,
      isOwner: isOwner,
    });

  const move = async (newWlId: string, newWl?: WishlistDocumentType) => {
    const { ok } = await changeWishlist(
      newWlId === "none" ? null : newWlId,
      newWl
    );
    if (!ok) {
      notifyError("Не удалось переместить желание");
      return;
    }
    notifySuccessExpanded(
      "Перемещено в",
      newWl?.title ?? "без списка",
      imageURL
    );
  };

  // перенос в другой вишлист [дашборд]
  if (isOwner && !onListPage) {
    if (isMobile && variant === "gallery") return null;
    return (
      <WishlistChanger
        selectedValue={wishlist?.$id ?? "none"}
        onSelect={move}
        className={className}
      />
    );
  }
  // убрать из вишлиста [страница вишлиста]
  if ((isEditor || isOwner) && onListPage)
    return (
      <Button
        onClick={remove}
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
  // бейдж с названием [для гостей]
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

type WishlistControllerProps = {
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
};
