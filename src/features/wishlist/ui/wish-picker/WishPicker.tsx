import { useAuth } from "@/features/auth";
import { useWishes } from "@/features/wish";
import {
  notifyError,
  notifySuccessSimple,
} from "@/shared/entities/errors/notify";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
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
import { useMoveWishes } from "../../model/hooks/useMoveWishes";
import { WishPickerBoundary } from "./WishPickerBoundary";
import { WishPickerGrid, WishPickerGridSkeleton } from "./WishPickerGrid";
import { WishPickerList, WishPickerListSkeleton } from "./WishPickerList";

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
      limit: 100,
    },
    "main-wishes",
    userId
  );
  const { onPickWish, moveWishes, pickedIds } = useMoveWishes(wishlistId);
  const isDisabled = pickedIds.length === 0;

  const onMoveWishes = async () => {
    const { ok } = await moveWishes(wishlistId);
    if (!ok) {
      notifyError("Не удалось перенести желания", "Повторите попытку позже");
      return;
    }
    notifySuccessSimple("Желания перенесены");
  };

  if (isMobile)
    return (
      <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Выберите желания</SheetTitle>
          </SheetHeader>
          <WishPickerBoundary
            wishlistId={wishlistId}
            wishes={wishes}
            isLoading={isLoading}
            error={error}
            skeleton={<WishPickerListSkeleton />}
          >
            {(safeItems) => (
              <WishPickerList wishes={safeItems} onPickWish={onPickWish} />
            )}
          </WishPickerBoundary>
          <SheetFooter>
            <SheetClose asChild>
              <Button size="lg" onClick={onMoveWishes} disabled={isDisabled}>
                Перенести
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  return (
    <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
      <DialogContent className="flex flex-col gap-6 min-w-[calc(100%-10rem)] h-[calc(100%-6rem)]">
        <DialogHeader>
          <DialogTitle>Перенести желания в этот список</DialogTitle>
        </DialogHeader>
        <WishPickerBoundary
          wishlistId={wishlistId}
          wishes={wishes}
          isLoading={isLoading}
          error={error}
          skeleton={<WishPickerGridSkeleton />}
        >
          {(safeItems) => (
            <WishPickerGrid wishes={safeItems} onPickWish={onPickWish} />
          )}
        </WishPickerBoundary>
        <DialogFooter className="bottom-2 left-1/2 fixed -translate-x-1/2">
          <DialogClose asChild>
            <Button size="xl" onClick={onMoveWishes} disabled={isDisabled}>
              Перенести
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
