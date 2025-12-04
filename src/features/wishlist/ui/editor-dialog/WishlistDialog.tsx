import type { Roles } from "@/features/collaborators";
import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
import type {
  UserDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
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
import { Form } from "@/shared/ui/kit/form";
import { SubmitBtn } from "@/shared/ui/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useWishlistMutations } from "../../model/useWishlistMutations";
import { Collaborators } from "../Collaborators";
import { DeleteSection } from "./DeleteSection";
import { WishlistFormFields } from "./WishlistFormFields";

const headerVariants = {
  edit: {
    title: "Редактировать список",
    description: "Редактируйте существующий список",
  },
  create: {
    title: "Создать список",
    description: "Создайте новый список",
  },
};

export type WishlistDialogPropsType = React.ComponentProps<"button"> & {
  action: "edit" | "create";
  wishlist?: WishlistDocumentType | null;
  roles?: Roles;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function WishlistDialog({
  action = "edit",
  wishlist,
  roles,
  isOpen,
  setIsOpen,
}: WishlistDialogPropsType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: wishlist?.title || "",
      description: wishlist?.description || "",
      isPrivate: wishlist?.isPrivate || false,
    },
  });

  const actions = useWishlistMutations();
  const { user } = useCurrentUser();

  async function onSaveChanges(values: z.infer<typeof formSchema>) {
    if (!user) return;
    const { userId, $id: docId } = user;

    if (action === "edit") {
      const privacyChanged = form.getFieldState("isPrivate").isDirty;
      const { ok } = await actions.update(
        wishlist!.$id,
        values,
        values.isPrivate,
        privacyChanged
      );
      if (!ok) {
        toast.error("Не удалось сохранить изменения");
        return;
      }
      toast.success("Изменения сохранены");
      setIsOpen(false);
    }

    if (action === "create") {
      const { ok, response } = await actions.create({
        ...values,
        ownerId: userId,
        owner: docId as unknown as UserDocumentType,
      });
      if (!ok) {
        toast.error("Не удалось сохранить список");
        return;
      }
      toast.success("Список создан", { description: response!.title });
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-xl sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSaveChanges)}>
            <DialogHeader className="gap-1 mb-6">
              <DialogTitle>{headerVariants[action].title}</DialogTitle>
              <DialogDescription className="sr-only">
                {headerVariants[action].description}
              </DialogDescription>
            </DialogHeader>

            <WishlistFormFields form={form} roles={roles} />
            {wishlist && (
              <>
                <p className="inline-block mt-5 mb-2 font-medium text-muted-foreground text-sm">
                  Соавторы списка
                </p>
                <Collaborators
                  wishlistId={wishlist.$id}
                  editors={wishlist.editorsIds}
                  readers={wishlist.readersIds}
                  ownerId={wishlist.ownerId}
                  isPrivate={form?.watch("isPrivate") ?? wishlist.isPrivate}
                  isOwner={roles?.isWishlistOwner ?? false}
                />
                {!roles?.isWishlistOwner && (
                  <p className="text-muted-foreground text-xs">
                    Только владелец может редактировать список соавторов
                  </p>
                )}
                {roles?.isWishlistOwner && (
                  <DeleteSection
                    wishlistId={wishlist.$id}
                    wishlistTitle={wishlist.title}
                    setDialogOpen={setIsOpen}
                  />
                )}
              </>
            )}
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button className="h-12 cancel-button" size="xl">
                  Отмена
                </Button>
              </DialogClose>
              <SubmitBtn
                text="Сохранить"
                loaderText="Сохранение..."
                isSubmitting={form.formState.isSubmitting}
                className="h-12"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default WishlistDialog;
