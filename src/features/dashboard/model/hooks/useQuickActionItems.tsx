import {
  notifyError,
  notifySuccessExpanded,
} from "@/shared/entities/errors/notify";
import { Archive, ArchiveRestore, Edit2, Trash2 } from "lucide-react";
import type { MenuItem } from "../../ui/content/wishes/QuickActions";
import { useQuickActions } from "./useQuickActions";

export function useQuickActionItems({
  title,
  imageURL,
  isArchived,
  wishId,
  onEditWish,
}: {
  title: string;
  imageURL?: string;
  isArchived: boolean;
  wishId: string;
  onEditWish: () => void;
}) {
  const { archiveWish, deleteWish } = useQuickActions(wishId);

  const onArchive = async () => {
    const { ok } = await archiveWish(isArchived);
    if (!ok) return notifyError("Не удалось переместить в архив");

    notifySuccessExpanded(
      isArchived ? "Восстановлено" : "Перенесено в архив",
      title,
      imageURL
    );
  };

  const onDelete = async () => {
    const { ok } = await deleteWish();
    if (!ok) return notifyError("Не удалось удалить желание");

    notifySuccessExpanded("Удалено", title, imageURL);
  };

  return [
    {
      title: isArchived ? "Вернуть из архива" : "В архив",
      icon: isArchived ? <ArchiveRestore /> : <Archive />,
      action: onArchive,
      actionName: "archive",
      isActive: isArchived,
      confirmation: true,
    },
    {
      title: "Редактировать",
      icon: <Edit2 />,
      action: onEditWish,
      actionName: "edit",
      confirmation: false,
    },
    {
      title: "Удалить",
      icon: <Trash2 />,
      action: onDelete,
      actionName: "delete",
      confirmation: true,
    },
  ] satisfies MenuItem[];
}
