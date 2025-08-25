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
            <FormLabel>Название списка *</FormLabel>
            <FormControl>
              <Input {...field} className="rounded-xl" />
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
                className="rounded-xl resize-none"
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
    </div>
  );
}
