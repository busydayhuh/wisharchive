import type { Roles } from "@/features/collaborators";
import { wishlistFormSchema as formSchema } from "@/shared/formSchemas";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Switch } from "@/shared/ui/kit/switch";
import { Textarea } from "@/shared/ui/kit/textarea";
import { cn } from "@/shared/utils/css";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  roles?: Roles;
  action: "edit" | "create";
};

export function WishlistFormFields({ form, roles, action }: FormFieldsProps) {
  const isNotOwner = !roles || (roles && !roles.isWishlistOwner);
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="gap-1 font-semibold" htmlFor="title">
              Название <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} id="title" />
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
            <FormLabel htmlFor="description">Описание</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="rounded-xl h-24 md:h-28 resize-none"
                placeholder="Добавьте заметку к списку"
                id="description"
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
            <div className="flex items-start gap-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isNotOwner && action !== "create"}
                  id="isPrivate"
                />
              </FormControl>
              <div className="flex flex-col gap-1">
                <FormLabel
                  className={cn(
                    field.value && "text-foreground",
                    "cursor-pointer"
                  )}
                  htmlFor="isPrivate"
                >
                  Секретный список
                </FormLabel>
                {field.value && (
                  <FormDescription className="text-xs">
                    Список будет доступен только владельцу и соавторам списка
                  </FormDescription>
                )}
              </div>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
