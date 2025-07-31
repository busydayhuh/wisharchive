import { cn } from "@/shared/lib/css";
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
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { Pencil } from "lucide-react";

function WishlistEditDialogLayout({
  actionVariant = "edit",
  triggerVariant = "gallery",
  className,
}: React.ComponentProps<"div"> & {
  triggerVariant?: "gallery" | "table";
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

  const { isMobile } = useSidebar();

  return (
    <Dialog>
      <form action={variants[actionVariant].submitAction}>
        <DialogTrigger asChild>
          <Button
            size={isMobile ? "sm" : "icon"}
            variant="secondary"
            className={cn(
              "z-10",
              triggerVariant === "gallery" &&
                "border-0 rounded-full transition duration-300 show-on-hover",
              triggerVariant === "table" &&
                "bg-transparent shadow-none rounded-full hover:bg-muted",
              className
            )}
          >
            <Pencil className="stroke-[1.3px]" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{variants[actionVariant].title}</DialogTitle>
            <DialogDescription>
              {variants[actionVariant].description}
            </DialogDescription>
          </DialogHeader>
          <div className="gap-5 grid">
            <div className="gap-4 grid">
              <Label htmlFor="title">Название списка</Label>
              <Input id="title" name="title" defaultValue="Pedro Duarte" />
            </div>
            <div className="gap-4 grid">
              <Label htmlFor="title">Название списка</Label>
              <Input id="title" name="title" defaultValue="Pedro Duarte" />
            </div>
          </div>
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

export default WishlistEditDialogLayout;
