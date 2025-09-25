import { cn } from "@/shared/lib/css";
import { useConfirmationDialog } from "@/shared/model/confirmation-dialog/ConfirmationDialogContext";
import { IconBtnWithTooltip } from "@/shared/ui/IconBtnWithTooltip";
import { Button } from "@/shared/ui/kit/button";
import { Archive, ArchiveRestore } from "lucide-react";

type ArchiveButtonProps = {
  variant: "button" | "quick-action";
  isArchived: boolean;
  wishTitle: string;
  action: (archived: boolean) => void;
} & React.ComponentProps<"div">;

export function ArchiveButton({
  variant = "button",
  action,
  isArchived,
  wishTitle,
  className,
}: ArchiveButtonProps) {
  const { openConfDialog } = useConfirmationDialog();

  const handleClick = () =>
    openConfDialog({
      action: "archive",
      onConfirm: () => action(isArchived),
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
