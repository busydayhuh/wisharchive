import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { type Action } from "@/shared/model/confirmation-dialog/ConfirmationDialogContext";
import { useConfirmationDialog } from "@/shared/model/confirmation-dialog/useConfirmationDialog";
import { notifyError, notifySuccessExpanded } from "@/shared/ui/CustomToast";
import { IconBtnWithTooltip } from "@/shared/ui/IconBtnWithTooltip";
import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { Archive, ArchiveRestore, Edit2, Ellipsis, Trash2 } from "lucide-react";
import { type JSX } from "react";
import { useQuickActions } from "../../model/useQuickActions";

const dropdownTriggerVariants = cva(
  "inline-flex justify-center items-center border-0 rounded-sm size-9 text-foreground text-sm transition duration-300 cursor-pointer shrink-0",
  {
    variants: {
      triggerVariant: {
        gallery: "bg-secondary hover:bg-muted",
        page: "bg-muted hover:bg-muted/60",
        table:
          "bg-secondary hover:bg-secondary/80 shadow-none lg:mx-auto ms-auto me-1 data-[state=open]:bg-muted",
      },
    },
  }
);

type DropdownTriggerVariants = VariantProps<typeof dropdownTriggerVariants>;

type MenuItem = {
  title: string;
  icon: JSX.Element;
  action: () => void;
  actionName: Action;
  isActive?: boolean;
  confirmation?: boolean;
};

type QuickActionsProps = {
  wishId: string;
  title: string;
  onEditWish: () => void;
  isArchived?: boolean;
  imageURL?: string;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
} & React.ComponentProps<"div"> &
  DropdownTriggerVariants;

export function QuickActions({
  wishId,
  title,
  imageURL,
  onEditWish,
  isArchived = false,
  align = "end",
  side = "top",
  triggerVariant = "gallery",
  className,
}: QuickActionsProps) {
  const isMobile = useIsMobile();
  const { openConfDialog } = useConfirmationDialog();
  const { archiveWish, deleteWish } = useQuickActions(wishId);

  const handleItemSelect = (item: MenuItem) => {
    if (item.confirmation) {
      return requestAnimationFrame(() => {
        openConfDialog({
          onConfirm: item.action,
          action: item.actionName,
          isActive: item.isActive,
          name: title,
        });
      });
    }
    return item.action();
  };

  const items = [
    {
      title: isArchived ? "Вернуть из архива" : "В архив",
      icon: isArchived ? <ArchiveRestore /> : <Archive />,
      action: async () => {
        const { ok } = await archiveWish(isArchived);
        if (!ok) {
          notifyError("Не удалось переместить в архив");
          return;
        }
        notifySuccessExpanded(
          isArchived ? "Восстановлено" : "Перенесено в архив",
          title,
          imageURL
        );
      },
      actionName: "archive" as Action,
      isActive: isArchived,
      confirmation: true,
    },
    {
      title: "Редактировать",
      icon: <Edit2 />,
      action: () => onEditWish(),
      actionName: "edit" as Action,
      confirmation: false,
    },
    {
      title: "Удалить",
      icon: <Trash2 />,
      action: async () => {
        const { ok } = await deleteWish();
        if (!ok) {
          notifyError("Не удалось удалить желание");
          return;
        }
        notifySuccessExpanded("Удалено", title, imageURL);
      },
      actionName: "delete" as Action,
      confirmation: true,
    },
  ];

  const useButtons = triggerVariant === "gallery" && !isMobile;

  return (
    <>
      {useButtons ? (
        <Buttons
          title={title}
          items={items}
          wishId={wishId}
          handleItemSelect={handleItemSelect}
          className={className}
        />
      ) : (
        <Dropdown
          wishId={wishId}
          items={items}
          align={align}
          side={side}
          triggerVariant={triggerVariant}
          className={className}
          handleItemSelect={handleItemSelect}
        />
      )}
    </>
  );
}

function Dropdown({
  wishId,
  items,
  align,
  side,
  triggerVariant,
  handleItemSelect,
  className,
}: {
  wishId: string;
  items: MenuItem[];
  handleItemSelect: (item: MenuItem) => void;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
} & React.ComponentProps<"div"> &
  DropdownTriggerVariants) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(dropdownTriggerVariants({ triggerVariant }), className)}
      >
        <Ellipsis className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-secondary w-56"
        align={align}
        side={side}
      >
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem
              key={wishId + item.actionName}
              onSelect={() => handleItemSelect(item)}
              aria-label={item.title}
              className="flex gap-2 [&_svg]:stroke-[1.5px] font-medium cursor-pointer"
            >
              {item.icon} {item.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Buttons({
  wishId,
  handleItemSelect,
  items,
  className,
}: {
  wishId: string;
  handleItemSelect: (item: MenuItem) => void;
  items: MenuItem[];
  className?: string;
} & React.ComponentProps<"div"> &
  DropdownTriggerVariants) {
  return (
    <div className={cn("flex gap-2", className)}>
      {items.map((item) => (
        <IconBtnWithTooltip
          key={wishId + item.actionName}
          tooltipText={item.title}
        >
          <Button
            size="icon"
            variant="secondary"
            onClick={() => handleItemSelect(item)}
          >
            {item.icon}
          </Button>
        </IconBtnWithTooltip>
      ))}
    </div>
  );
}
