import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { updateRecoverySchema as formSchema } from "../model/schemas";
import { updateRecovery } from "../model/updateRecovery";

export function ForgotPassDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="font-normal text-muted-foreground text-sm"
          variant="link"
        >
          Забыли пароль?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Восстановление пароля</DialogTitle>
        </DialogHeader>
        <p>
          Введите свой email, чтобы получить ссылку на восстановление пароля:
        </p>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((values) => {
              updateRecovery(values);
              setOpen(false);
            })}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">
                    Ваш email<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input id="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="xl" type="submit">
              Отправить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
