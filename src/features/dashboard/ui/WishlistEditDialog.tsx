import { cn } from "@/shared/lib/css";
import type { WishlistDocumentType } from "@/shared/model/types";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import AvatarsGroup from "./AvatarsGroup";
import { useDashboardContext } from "./layouts/DashboardLayout";

const formSchema = z.object({
  title: z.string({ required_error: "Введите название списка" }),
  description: z
    .string()
    .max(500, { message: "Описание должно содержать не более 500 символов" })
    .optional(),
  isPrivate: z.boolean().default(false).optional(),
});

const actionVariants = {
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

function WishlistEditDialog({
  wishlist,
  actionVariant = "edit",
  triggerVariant = "gallery",
  className,
}: React.ComponentProps<"div"> & {
  wishlist?: WishlistDocumentType;
  triggerVariant?: "gallery" | "table";
  actionVariant: "edit" | "create";
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: wishlist?.title || "",
      description: wishlist?.description || "",
      isPrivate: wishlist?.isPrivate || false,
    },
  });

  const { isMobile } = useSidebar();
  const { dashboardUser } = useDashboardContext();

  return (
    <Dialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            actionVariants[actionVariant].submitAction
          )}
        >
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
              <DialogTitle>{actionVariants[actionVariant].title}</DialogTitle>
              <DialogDescription>
                {actionVariants[actionVariant].description}
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
                          onCheckedChange={field.onChange}
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
                {!wishlist && (
                  <AvatarsGroup
                    users={dashboardUser.user ? [dashboardUser.user] : []}
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
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  className="bg-muted hover:bg-muted/60 shadow-none rounded-2xl"
                >
                  Отмена
                </Button>
              </DialogClose>
              <Button type="submit" className="shadow-none rounded-2xl">
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

export default WishlistEditDialog;
