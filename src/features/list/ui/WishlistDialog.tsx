import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { Form } from "@/shared/ui/kit/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { href, useNavigate } from "react-router";
import { z } from "zod";
import { useWishlist } from "../model/useWishlist";
import { useWishlistMutations } from "../model/useWishlistMutations";
import { CollaboratorsSection } from "./CollaboratorsSection";
import { WishlistFormFields } from "./WishlistFormFields";

const headerVariants = {
  edit: {
    title: "Редактировать список",
    description: "Редактируйте существующий список",
    icon: <Pencil className="stroke-[1.3px]" />,
  },
  create: {
    title: "Создать список",
    description: "Создайте новый список",
    icon: <PlusCircleIcon className="stroke-1 size-10" />,
  },
};

export type WishlistDialogPropsType = React.ComponentProps<"button"> & {
  action: "edit" | "create";
  wishlistId?: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function WishlistDialog({
  action = "edit",
  wishlistId,
  isOpen,
  setIsOpen,
}: WishlistDialogPropsType) {
  const { wishlist, isLoading } = useWishlist(wishlistId ?? null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: wishlist?.title || "",
      description: wishlist?.description || "",
      isPrivate: wishlist?.isPrivate || false,
    },
  });

  const navigate = useNavigate();
  const { user: currentUser } = useCurrentUser();

  const { createWishlist, updateWishlist } = useWishlistMutations(
    currentUser?.userId ?? ""
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (action === "edit") {
      await updateWishlist(wishlist!.$id, values.isPrivate, values);
      setIsOpen(isOpen);
    }

    if (action === "create") {
      const response = await createWishlist({
        ...values,
        ownerId: currentUser?.userId ?? "",
        owner: currentUser,
      });

      if (response && response.newWishlist) {
        navigate(href(ROUTES.WISHLIST, { listId: response.newWishlist.$id }));
      }
    }
  }

  if (!currentUser) return null;
  if (isLoading) return <div>Загрузка...</div>; // TODO скелетон диалога

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal container={document.querySelector("main")!}>
        <DialogContent className="rounded-2xl sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="gap-1 mb-6">
                <DialogTitle>{headerVariants[action].title}</DialogTitle>
                <DialogDescription className="sr-only">
                  {headerVariants[action].description}
                </DialogDescription>
              </DialogHeader>

              <WishlistFormFields form={form} />

              {wishlist && (
                <CollaboratorsSection
                  wishlistId={wishlist.$id}
                  owner={wishlist.owner}
                  collaborators={wishlist.collaborators}
                  isPrivate={wishlist.isPrivate}
                  form={form}
                />
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    className="bg-muted hover:bg-muted/60 shadow-none rounded-xl"
                  >
                    Отмена
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="shadow-none rounded-xl"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin" />
                  )}
                  Сохранить
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default WishlistDialog;
