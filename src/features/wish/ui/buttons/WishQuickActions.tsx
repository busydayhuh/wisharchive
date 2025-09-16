import { cn } from "@/shared/lib/css";
import DataStatePropInterceptor from "@/shared/lib/react/DataStatePropInterceptor";
import ConfirmationDialog, {
  type ConfirmationDialogProps,
} from "@/shared/ui/ConfirmationDialog";
import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";
import { ID } from "appwrite";
import { cva, type VariantProps } from "class-variance-authority";
import { ArchiveRestore, Check, Edit2, Ellipsis, Trash2 } from "lucide-react";
import { useMemo, useState, type JSX } from "react";

const actionsVariants = cva(
  "inline-flex justify-center items-center border-0 rounded-full size-8 md:size-9 text-foreground text-sm transition duration-300 cursor-pointer shrink-0",
  {
    variants: {
      triggerVariant: {
        gallery: "bg-secondary hover:bg-muted",
        page: "bg-muted hover:bg-muted/60",
        table:
          "md:bg-transparent bg-muted hover:bg-muted/60 shadow-none md:mx-auto ms-auto me-1",
      },
    },
  }
);

type ActionVariants = VariantProps<typeof actionsVariants>;

type MenuItems = {
  title: string;
  icon: JSX.Element;
  action: () => void;
}[];

type WishQuickActionsProps = {
  archiveWish: (archived: boolean) => void;
  deleteWish: () => void;
  editWish: () => void;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
  wishId?: string;
  isArchived?: boolean;
  title?: string;
};

export function WishQuickActions({
  align = "end",
  side = "top",
  triggerVariant = "gallery",
  isArchived = false,
  title,
  archiveWish,
  deleteWish,
  editWish,
  className,
}: React.ComponentProps<"div"> & ActionVariants & WishQuickActionsProps) {
  const { isMobile } = useSidebar();
  const [dialogProps, setDialogProps] =
    useState<null | ConfirmationDialogProps>(null);

  const items = useMemo(
    () => [
      {
        title: isArchived ? "Вернуть из архива" : "Уже подарили",
        icon: isArchived ? <ArchiveRestore /> : <Check />,
        action: () => {
          setDialogProps({
            title: isArchived
              ? "Восстановить желание?"
              : "Переместить в архив?",
            description: isArchived ? (
              <>
                Вернуть желание <span className="font-bold">{title}</span> в
                список актуальных?
              </>
            ) : (
              <>
                <p>
                  Вы уверены, что хотите переместить исполненное желание{" "}
                  <span className="font-bold">{title}</span> в архив?
                </p>

                <p className="mt-1">
                  Вы сможете найти его позже в разделе «Архив желаний».
                </p>
              </>
            ),
            actionText: isArchived ? "Вернуть" : "Переместить",
            open: true,
            onConfirm: () => {
              archiveWish(isArchived);
              setDialogProps(null);
            },
            onCancel: () => {
              setDialogProps(null);
            },
          });
        },
      },
      { title: "Редактировать", icon: <Edit2 />, action: editWish },
      {
        title: "Удалить",
        icon: <Trash2 />,
        action: () => {
          setDialogProps({
            title: "Удалить желание?",
            description: (
              <>
                Вы уверены, что хотите удалить желание{" "}
                <span className="font-bold">{title}</span>? Это действие нельзя
                отменить.
              </>
            ),
            actionText: "Удалить",
            open: true,
            onConfirm: () => {
              deleteWish();
              setDialogProps(null);
            },
            onCancel: () => {
              setDialogProps(null);
            },
          });
        },
      },
    ],
    [isArchived, archiveWish, editWish, deleteWish, title]
  );

  const useButtons = triggerVariant === "gallery" && !isMobile;

  return (
    <>
      {useButtons ? (
        <Buttons
          items={items}
          triggerVariant={triggerVariant}
          className={className}
        />
      ) : (
        <Dropdown
          items={items}
          align={align}
          side={side}
          triggerVariant={triggerVariant}
          className={className}
        />
      )}
      {dialogProps && <ConfirmationDialog {...dialogProps} />}
    </>
  );
}

function Buttons({
  items,
  triggerVariant,
  className,
}: { items: MenuItems } & React.ComponentProps<"div"> & ActionVariants) {
  return (
    <div className="flex gap-2">
      {items.map(({ title, icon, action }) => (
        <Tooltip key={ID.unique()}>
          <TooltipTrigger asChild>
            <DataStatePropInterceptor>
              <Button
                onClick={action}
                className={cn(actionsVariants({ triggerVariant, className }))}
              >
                {icon}
              </Button>
            </DataStatePropInterceptor>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

function Dropdown({
  items,
  align,
  side,
  triggerVariant,
  className,
}: {
  items: MenuItems;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
} & React.ComponentProps<"div"> &
  ActionVariants) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(actionsVariants({ triggerVariant, className }))}
      >
        <Ellipsis className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="**:[&_svg]:stroke-[1.5px] w-56 selection-menu"
        align={align}
        side={side}
      >
        <DropdownMenuGroup>
          {items.map(({ title, icon }) => (
            <DropdownMenuItem key={ID.unique()}>
              {icon} {title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
