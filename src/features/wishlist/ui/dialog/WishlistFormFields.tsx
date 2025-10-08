import { cn } from "@/shared/lib/css";
import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
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
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function WishlistFormFields({ form }: FormFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="gap-1">
              Название <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} />
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
            <FormLabel>Описание</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="rounded-xl h-24 md:h-28 resize-none"
                placeholder="Добавьте заметку к списку"
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
                  className="data-[state=unchecked]:bg-ring"
                />
              </FormControl>
              <div className="flex flex-col gap-1">
                <FormLabel
                  className={cn(
                    field.value && "text-foreground",
                    "cursor-pointer"
                  )}
                >
                  Секретный список
                </FormLabel>
                {field.value && (
                  <FormDescription className="text-xs">
                    Список будет доступен только вам и соавторам списка
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
