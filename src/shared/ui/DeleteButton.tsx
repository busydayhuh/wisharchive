import { cn } from "@/shared/lib/css";
import { useConfirmationDialog } from "@/shared/model/confirmation-dialog/ConfirmationDialogContext";
import { IconBtnWithTooltip } from "@/shared/ui/IconBtnWithTooltip";
import { Button } from "@/shared/ui/kit/button";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  variant = "button",
  action,
  wishTitle,
  buttonText = "Удалить",
  className,
}: {
  variant: "button" | "quick-action";
  wishTitle: string;
  action: () => void;
  buttonText?: string;
} & React.ComponentProps<"div">) {
  const { openConfDialog } = useConfirmationDialog();

  const handleClick = () =>
    openConfDialog({
      action: "delete",
      onConfirm: action,
      name: wishTitle,
    });

  const iconBtn = (
    <IconBtnWithTooltip tooltipText="Удалить">
      <Button
        onClick={handleClick}
        variant="secondary"
        size="icon"
        className={cn(className)}
        aria-label="Удалить"
      >
        <Trash2 />
      </Button>
    </IconBtnWithTooltip>
  );

  const extendedBtn = (
    <Button
      type="button"
      variant="outline"
      aria-label="Удалить"
      onClick={handleClick}
      size="lg"
      className={cn(
        "bg-muted md:bg-transparent shadow-none text-muted-foreground md:text-foreground",
        className
      )}
    >
      <Trash2 />
      {buttonText}
    </Button>
  );

  return variant === "button" ? extendedBtn : iconBtn;
}

export default DeleteButton;
