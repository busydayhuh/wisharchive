import { useAuth } from "@/features/auth";
import { useWishes } from "@/features/wish";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { WishDocumentType } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/kit/sheet";
import { Frown, Leaf, Wind } from "lucide-react";
import { useMoveWishes } from "../../model/hooks/useMoveWishes";
import { WishPickerGrid } from "./WishPickerGrid";
import { WishPickerList } from "./WishPickerList";

type WishPickerProps = {
  pickerOpen: boolean;
  setPickerOpen: (open: boolean) => void;
  wishlistId: string;
};

export default function WishPicker({
  pickerOpen,
  setPickerOpen,
  wishlistId,
}: WishPickerProps) {
  const isMobile = useIsMobile();
  const { userId } = useAuth();
  const { wishes, isLoading, error } = useWishes(
    {
      ownerId: userId,
      archived: false,
      sort: {
        field: "$sequence",
        direction: "desc",
      },
      filters: [],
    },
    "main-wishes",
    userId
  );
  const { onPickWish, moveWishes, pickedIds } = useMoveWishes(wishlistId);
  const isDisabled = pickedIds.length === 0;

  if (isMobile)
    return (
      <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Выберите желания</SheetTitle>
          </SheetHeader>
          <WishPickerBoundary
            wishes={wishes}
            isLoading={isLoading}
            error={error}
            skeleton={<>Загрузка...</>}
          >
            {(safeItems) => (
              <WishPickerList wishes={safeItems} onPickWish={onPickWish} />
            )}
          </WishPickerBoundary>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                size="lg"
                onClick={() => moveWishes(wishlistId)}
                disabled={isDisabled}
              >
                Перенести
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  return (
    <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
      <DialogContent className="min-w-[calc(100%-10rem)] h-[calc(100%-6rem)]">
        <DialogHeader>
          <DialogTitle>Перенести желания в этот список</DialogTitle>
        </DialogHeader>
        <WishPickerBoundary
          wishes={wishes}
          isLoading={isLoading}
          error={error}
          skeleton={<>Загрузка...</>}
        >
          {(safeItems) => (
            <WishPickerGrid wishes={safeItems} onPickWish={onPickWish} />
          )}
        </WishPickerBoundary>
        <DialogFooter className="bottom-2 left-1/2 fixed -translate-x-1/2">
          <DialogClose asChild>
            <Button
              size="xl"
              onClick={() => moveWishes(wishlistId)}
              disabled={isDisabled}
            >
              Перенести
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WishPickerBoundary({
  wishes,
  error,
  isLoading,
  skeleton,
  children,
}: {
  wishes?: WishDocumentType[];
  error?: unknown;
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: (safeItems: WishDocumentType[]) => React.ReactNode;
}) {
  if (isLoading) return skeleton;

  if (error)
    return (
      <p className="flex flex-col items-center gap-1 mt-2 md:mt-4 text-muted-foreground text-sm">
        <Frown />
        Не удалось загрузить желания
      </p>
    );

  if (wishes && wishes.length === 0)
    return (
      <p className="flex flex-col items-center gap-1 mt-2 md:mt-4 text-muted-foreground text-sm">
        <span className="inline-flex items-center">
          <Wind className="stroke-[1.5px]" />
          <Leaf className="size-4" />
        </span>
        Нет желаний
      </p>
    );

  if (wishes) return children(wishes);
}
