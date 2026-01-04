import { ROUTES } from "@/shared/config/routes";
import { SubmitBtn } from "@/shared/ui/components/SubmitBtn";
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
import { useForm } from "react-hook-form";
import { href, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../model/authContext";
import { ForgotPassDialog } from "./ForgotPassDialog";
import { PassWithToggle } from "./PassInputWithToggle";

const formSchema = z.object({
  email: z.email("Неверный email"),
  password: z
    .string("Введите пароль")
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
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
    <div className="relative">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onLogin)}>
          <Button
            className="bg-blue-bg/60 hover:bg-blue-bg/50 mb-6 rounded-3xl w-fit font-normal text-blue text-xs"
            onClick={(e) => {
              e.preventDefault();
              form.setValue("email", "valeria.busyday@yandex.ru");
              form.setValue("password", "newpass!");
            }}
            type="button"
          >
            Войти в демо-аккаунт
          </Button>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    id="email"
                  />
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
                <FormLabel htmlFor="password">Пароль</FormLabel>
                <FormControl>
                  <PassWithToggle {...field} id="password" />
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
          <SubmitBtn
            isSubmitting={form.formState.isSubmitting}
            text="Войти"
            className="px-6"
          />
        </form>
      </Form>
      <div className="right-0 bottom-1 absolute w-fit">
        <ForgotPassDialog />
      </div>
    </div>
  );
}

export default LoginForm;
