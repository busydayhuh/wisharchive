import { useQuickActions } from "@/features/dashboard";
import {
  notifyError,
  notifySuccessExpanded,
} from "@/shared/entities/errors/notify";
import { useConfirmationDialog } from "@/shared/store/confirmation-dialog/useConfirmationDialog";
import { IconBtnWithTooltip } from "@/shared/ui/components/IconBtnWithTooltip";
import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/utils/css";
import { Archive, ArchiveRestore } from "lucide-react";

type ArchiveButtonProps = {
  wishId: string;
  variant: "button" | "quick-action";
  isArchived: boolean;
  imageURL?: string;
  wishTitle: string;
} & React.ComponentProps<"div">;

export function ArchiveButton({
  wishId,
  variant = "button",
  isArchived,
  wishTitle,
  imageURL,
  className,
}: ArchiveButtonProps) {
  const { openConfDialog } = useConfirmationDialog();
  const { archiveWish } = useQuickActions(wishId);

  const handleClick = () =>
    openConfDialog({
      action: "archive",
      onConfirm: async () => {
        const { ok } = await archiveWish(isArchived);
        if (!ok) {
          notifyError("Не удалось переместить в архив");
          return;
        }
        notifySuccessExpanded(
          isArchived ? "Восстановлено" : "Перенесено в архив",
          wishTitle,
          imageURL
        );
      },
      name: wishTitle,
      isActive: isArchived,
    });

  const title = isArchived ? "Вернуть из архива" : "Переместить в архив";

  const iconBtn = (
    <IconBtnWithTooltip tooltipText={title}>
      <Button
        onClick={handleClick}
        variant="secondary"
        size="icon"
        className={cn(className)}
        aria-label={title}
      >
        {isArchived ? <ArchiveRestore /> : <Archive />}
      </Button>
    </IconBtnWithTooltip>
  );

  const extendedBtn = (
    <Button
      variant={isArchived ? "secondary" : "default"}
      onClick={handleClick}
      size="lg"
      className={cn("shadow-none", className)}
      aria-label={title}
    >
      {isArchived ? <ArchiveRestore /> : <Archive />}
      {title}
    </Button>
  );

  return variant === "button" ? extendedBtn : iconBtn;
}
