import { cn } from "@/shared/lib/css";
import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import type {
  UserDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
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
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { Form } from "@/shared/ui/kit/form";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListPlus, Loader2, Pencil, PlusCircleIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { href, useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "../auth";
import { useFindUser } from "../dashboard";
import { useWishlistMutations } from "./model/useWishlistMutations";
import { CollaboratorsSection } from "./ui/CollaboratorsSection";
import { WishlistFormFields } from "./ui/WishlistFormFields";

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

type WishlistDialogPropsType = React.ComponentProps<"button"> & {
  action: "edit" | "create";
  wishlist?: WishlistDocumentType;
  triggerVariant?: "gallery" | "table" | "dropdown";
};

export function WishlistDialog({
  action = "edit",
  wishlist,
  triggerVariant = "gallery",
  className,
}: WishlistDialogPropsType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: wishlist?.title || "",
      description: wishlist?.description || "",
      isPrivate: wishlist?.isPrivate || false,
    },
  });

  const { current } = useAuth();
  const navigate = useNavigate();

  const { user: userDocument } = useFindUser(current?.$id ?? "");
  const { createWishlist, updateWishlist } = useWishlistMutations(
    current?.$id ?? ""
  );

  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (action === "edit") {
      await updateWishlist(wishlist!.$id, values.isPrivate, values);
      setIsOpen(false);
    }

    if (action === "create") {
      const response = await createWishlist({
        ...values,
        ownerId: current?.$id ?? "",
        owner: userDocument as UserDocumentType,
      });

      if (response && response.newWishlist) {
        navigate(href(ROUTES.WISHLIST, { listId: response.newWishlist.$id }));
      }
    }
  }

  if (!current) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {triggerVariant === "dropdown" ? (
        <InDropdownTrigger setIsOpen={setIsOpen} />
      ) : (
        <InCardTrigger
          variant={triggerVariant}
          icon={headerVariants[action].icon}
          className={className}
        />
      )}
      <DialogContent className="rounded-2xl sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="gap-1 mb-2">
              <DialogTitle>{headerVariants[action].title}</DialogTitle>
              <DialogDescription>
                {headerVariants[action].description}
              </DialogDescription>
            </DialogHeader>

            <WishlistFormFields form={form} />

            {wishlist && (
              <CollaboratorsSection wishlist={wishlist} form={form} />
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
    </Dialog>
  );
}

function InCardTrigger({
  variant,
  icon,
  className,
}: React.ComponentProps<"button"> & {
  variant: "table" | "gallery";
  icon: ReactNode;
}) {
  const { isMobile } = useSidebar();

  return (
    <DialogTrigger asChild>
      <Button
        size={isMobile ? "sm" : "icon"}
        type="button"
        variant="secondary"
        className={cn(
          "z-10",
          variant === "gallery" &&
            "border-0 rounded-full transition duration-300 show-on-hover",
          variant === "table" &&
            "bg-transparent shadow-none rounded-full hover:bg-muted",
          className
        )}
      >
        {icon}
      </Button>
    </DialogTrigger>
  );
}

function InDropdownTrigger({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <DialogTrigger asChild>
      <DropdownMenuItem
        className="focus:bg-transparent"
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <ListPlus className="stroke-[1.3px]" /> Новый список
      </DropdownMenuItem>
    </DialogTrigger>
  );
}
