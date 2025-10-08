import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import CollaboratorsPanel from "./CollaboratorsPanel";

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
      {/* <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="bg-transparent rounded-full w-8 h-8"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger> */}

      <DialogContent className="rounded-xl w-full md:max-w-md" forceMount>
        <DialogHeader className="mb-3">
          <DialogTitle>Изменить список соавторов</DialogTitle>
          <DialogDescription className="sr-only">
            Добавьте редакторов или читателей в список
          </DialogDescription>
        </DialogHeader>

        <CollaboratorsPanel
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
