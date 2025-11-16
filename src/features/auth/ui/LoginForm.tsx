import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
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
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { href, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../model/authContext";
import { PassWithToggle } from "./PassInputWithToggle";

const formSchema = z.object({
  email: z.email("Неверный email"),
  password: z
    .string("Введите пароль")
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { current, login } = useAuth();
  const navigate = useNavigate();

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    const { ok, errorMessage } = await login(values);

    if (!ok) form.setError("root", { type: "custom", message: errorMessage });
    if (current) navigate(href(ROUTES.WISHES, { userId: current.$id }));
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onLogin)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PassWithToggle {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root?.message}
          </div>
        )}
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          Войти
          <ArrowRight />
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
