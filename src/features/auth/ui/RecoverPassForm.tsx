import { ROUTES } from "@/shared/config/routes";
import { SubmitBtn } from "@/shared/ui/components/SubmitBtn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import type z from "zod";
import { createRecovery } from "../model/createRecovery";
import { createRecoverySchema as formSchema } from "../model/schemas";
import { PassWithToggle } from "./PassInputWithToggle";

export function RecoverPassForm() {
  const [searchParams] = useSearchParams();
  const { userId, secret } = Object.fromEntries(searchParams);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(async (values) => {
          const { ok } = await createRecovery(values, userId, secret);
          if (ok) navigate(ROUTES.LOGIN);
        })}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">
                Новый пароль<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <PassWithToggle {...field} id="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">
                Повторите пароль<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <PassWithToggle {...field} id="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitBtn
          isSubmitting={form.formState.isSubmitting}
          text="Сохранить"
        />
      </form>
    </Form>
  );
}
