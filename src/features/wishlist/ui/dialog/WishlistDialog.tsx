import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { href, useNavigate } from "react-router";
import { z } from "zod";
import { wishlistMutations } from "../../model/wishlistMutations";
import CollaboratorsSection from "./CollaboratorsSection";
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
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function WishlistDialog({
  action = "edit",
  wishlist,
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

  const navigate = useNavigate();
  const { user: currentUser } = useCurrentUser();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (action === "edit") {
      const privacyChanged = form.getFieldState("isPrivate").isDirty;

      await wishlistMutations.update(
        wishlist!.$id,
        values,
        values.isPrivate,
        privacyChanged
      );
      setIsOpen(false);
    }

    if (action === "create") {
      const newWishlist = await wishlistMutations.create({
        ...values,
        ownerId: currentUser?.userId ?? "",
        owner: currentUser,
      });

      if (newWishlist) {
        setIsOpen(false);
        requestAnimationFrame(() => {
          return navigate(href(ROUTES.WISHLIST, { listId: newWishlist.$id }));
        });
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogPortal container={document.querySelector("main")!}> */}
      <DialogContent className="rounded-xl sm:max-w-[425px]">
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
              <>
                <CollaboratorsSection
                  wishlistId={wishlist.$id}
                  isPrivate={wishlist.isPrivate}
                  form={form}
                />
                <DeleteSection
                  wishlistId={wishlist.$id}
                  wishlistTitle={wishlist.title}
                  setDialogOpen={setIsOpen}
                />
              </>
            )}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" size="lg">
                  Отмена
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="shadow-none rounded-md"
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
      {/* </DialogPortal> */}
    </Dialog>
  );
}

export default WishlistDialog;
