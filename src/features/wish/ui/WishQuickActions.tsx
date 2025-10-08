import { cn } from "@/shared/lib/css";
import {
  useConfirmationDialog,
  type Action,
} from "@/shared/model/confirmation-dialog/ConfirmationDialogContext";
import { IconBtnWithTooltip } from "@/shared/ui/IconBtnWithTooltip";
import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { cva, type VariantProps } from "class-variance-authority";
import { Archive, ArchiveRestore, Edit2, Ellipsis, Trash2 } from "lucide-react";
import { type JSX } from "react";
import DeleteButton from "../../../shared/ui/DeleteButton";
import { useWishQuickActions } from "../model/useWishQuickActions";
import { ArchiveButton } from "./buttons/ArchiveButton";

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

type WishQuickActionsProps = {
  wishId: string;
  title: string;
  isArchived?: boolean;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
} & React.ComponentProps<"div"> &
  DropdownTriggerVariants;

export function WishQuickActions({
  wishId,
  title,
  isArchived = false,
  align = "end",
  side = "top",
  triggerVariant = "gallery",
  className,
}: WishQuickActionsProps) {
  const { isMobile } = useSidebar();
  const { openConfDialog } = useConfirmationDialog();
  const { archiveWish, deleteWish, editWish } = useWishQuickActions(wishId);

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
      title: isArchived ? "Вернуть из архива" : "Переместить в архив",
      icon: isArchived ? <ArchiveRestore /> : <Archive />,
      action: () => archiveWish(isArchived),
      actionName: "archive" as Action,
      isActive: isArchived,
      confirmation: true,
    },
    {
      title: "Редактировать",
      icon: <Edit2 />,
      action: editWish,
      actionName: "edit" as Action,
      confirmation: false,
    },
    {
      title: "Удалить",
      icon: <Trash2 />,
      action: deleteWish,
      actionName: "delete" as Action,
      confirmation: true,
    },
  ];

  const useButtons = triggerVariant === "gallery" && !isMobile;

  return (
    <>
      {useButtons ? (
        <Buttons title={title} items={items} wishId={wishId} />
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
  title,
  wishId,
  items,
}: {
  title: string;
  wishId: string;
  items: MenuItem[];
} & React.ComponentProps<"div"> &
  DropdownTriggerVariants) {
  const renderers: Partial<Record<Action, (item: MenuItem) => JSX.Element>> = {
    archive: (item: MenuItem) => (
      <ArchiveButton
        wishId={wishId}
        key={wishId + item.actionName}
        variant="quick-action"
        isArchived={item.isActive ?? false}
        wishTitle={title}
      />
    ),
    edit: (item: MenuItem) => (
      <IconBtnWithTooltip
        key={wishId + item.actionName}
        tooltipText="Редактировать"
      >
        <Button size="icon" variant="secondary" onClick={item.action}>
          {item.icon}
        </Button>
      </IconBtnWithTooltip>
    ),
    delete: (item: MenuItem) => (
      <DeleteButton
        key={wishId + item.actionName}
        variant="quick-action"
        wishTitle={title}
        action={item.action}
      />
    ),
  };
  return (
    <div className="flex gap-2">
      {items.map((item) => renderers[item.actionName]?.(item))}
    </div>
  );
}
