import { cn } from "@/shared/lib/css";
import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { Switch } from "@/shared/ui/kit/switch";
import { Textarea } from "@/shared/ui/kit/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { z } from "zod";
import AvatarsGroup from "../../shared/ui/AvatarsGroup";
import { useUser } from "../auth";
import { useFindUser } from "../dashboard";
import { CollaboratorsDialog } from "./CollaboratorsDialog";
import { useWishlistMutations } from "./model/useWishlistMutations";

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

type WishlistEditDialogPropsType = React.ComponentProps<"div"> & {
  wishlist?: WishlistDocumentType;
  triggerVariant?: "gallery" | "table";
  actionVariant: "edit" | "create";
  isOwner?: boolean;
};

export function WishlistEditDialog({
  wishlist,
  actionVariant = "edit",
  triggerVariant = "gallery",
  className,
}: WishlistEditDialogPropsType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: wishlist?.title || "",
      description: wishlist?.description || "",
      isPrivate: wishlist?.isPrivate || false,
    },
  });

  const { current } = useUser();
  const { user } = useFindUser(current!.$id);
  const path = useLocation().pathname;

  const { updateWishlist } = useWishlistMutations(current!.$id, path);

  const { isMobile } = useSidebar();

  const [openDialog, setOpenDialog] = useState(false);
  const [isPrivateChecked, setIsPrivateChecked] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (actionVariant === "edit") {
      updateWishlist(wishlist!.$id, values);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <DialogContent className="rounded-2xl sm:max-w-[425px]">
            <DialogHeader className="gap-1 mb-2">
              <DialogTitle>{headerVariants[actionVariant].title}</DialogTitle>
              <DialogDescription>
                {headerVariants[actionVariant].description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название списка *</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-2xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание списка</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="rounded-2xl resize-none"
                        placeholder="Добавьте пояснения к списку..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setIsPrivateChecked(checked);
                          }}
                          className="data-[state=unchecked]:bg-ring"
                        />
                      </FormControl>
                      <FormLabel>Секретный список</FormLabel>
                    </div>
                    {field.value && (
                      <FormDescription>
                        Список будет доступен только вам и соавторам
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3">
                <FormLabel>Соавторы списка</FormLabel>
                <div className="flex items-baseline gap-2">
                  {!wishlist && (
                    <AvatarsGroup
                      users={user ? [user as UserDocumentType] : []}
                      size={8}
                      maxCount={4}
                    />
                  )}
                  {wishlist && (
                    <AvatarsGroup
                      users={[wishlist.owner].concat(wishlist.collaborators)}
                      size={8}
                      maxCount={4}
                    />
                  )}
                  <CollaboratorsDialog
                    wishlist={wishlist}
                    isPrivateChecked={isPrivateChecked}
                  />
                </div>
              </div>
            </div>
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
                className="shadow-none rounded-xl"
                onClick={async () => {
                  const isValid = await form.trigger();

                  if (isValid) {
                    onSubmit(form.getValues());
                    setOpenDialog(false);
                  }
                }}
              >
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
