import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";

function WishlistEditDialog({
  actionVariant = "edit",
}: {
  actionVariant: "edit" | "create";
}) {
  const variants = {
    edit: {
      title: "Редактировать список",
      description: "Редактируйте существующий список",
      submitAction() {
        //TODO
      },
    },
    create: {
      title: "Создать список",
      description: "Создайте новый список",
      submitAction() {
        //TODO
      },
    },
  };

  return (
    <Dialog>
      <form action={variants[actionVariant].submitAction}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{variants[actionVariant].title}</DialogTitle>
            <DialogDescription>
              {variants[actionVariant].description}
            </DialogDescription>
          </DialogHeader>
          <div className="gap-4 grid"></div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default WishlistEditDialog;
