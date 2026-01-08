import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import CollaboratorsManager from "./CollaboratorsManager";

export type CollaboratorsDialogProps = {
  wishlistId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPrivateChecked?: boolean;
};

export function CollaboratorsDialog({
  open,
  onOpenChange,
  wishlistId,
  isPrivateChecked = false,
}: CollaboratorsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl w-full md:max-w-md" forceMount>
        <DialogHeader className="mb-3">
          <DialogTitle>Изменить список соавторов</DialogTitle>
          <DialogDescription className="sr-only">
            Добавьте редакторов или читателей в список
          </DialogDescription>
        </DialogHeader>
        <CollaboratorsManager
          wishlistId={wishlistId}
          isPrivateChecked={isPrivateChecked}
        />
        <DialogFooter className="sm:justify-start mt-6">
          <DialogClose asChild>
            <Button size="lg">Готово</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
