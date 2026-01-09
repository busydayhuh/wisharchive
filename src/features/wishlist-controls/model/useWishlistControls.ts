import type { AccessRoles } from "@/features/collaborators/model";
import { useQuickActions } from "@/features/dashboard/model";
import {
  notifyError,
  notifySuccessExpanded,
} from "@/shared/entities/errors/notify";
import { useConfirmationDialog } from "@/shared/store/confirmation-dialog/useConfirmationDialog";
import type { WishDocumentType, WishlistDocumentType } from "@/shared/types";
import { useCallback } from "react";

export default function useWishlistControls(
  wish: WishDocumentType,
  roles?: AccessRoles
) {
  const { $id, title, imageURL, wishlist } = wish;
  const { changeWishlist, removeFromWishlist } = useQuickActions($id);
  const { openConfDialog } = useConfirmationDialog();

  const remove = useCallback(
    () =>
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
            title,
            imageURL ?? undefined
          );
        },
        name: wishlist?.title,
        isOwner: roles?.isWishOwner,
      }),
    [
      imageURL,
      openConfDialog,
      removeFromWishlist,
      roles?.isWishOwner,
      title,
      wishlist?.title,
    ]
  );

  const move = useCallback(
    async (newWlId: string, newWl?: WishlistDocumentType) => {
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
        newWl?.title ?? "Без списка",
        imageURL ?? undefined
      );
    },
    [changeWishlist, imageURL]
  );

  return { remove, move };
}
