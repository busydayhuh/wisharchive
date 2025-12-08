import { ROUTES } from "@/shared/config/routes";
import { SubmitBtn } from "@/shared/ui/components/SubmitBtn";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { href, useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "../model/authContext";
import { PassWithToggle } from "./PassInputWithToggle";

const formSchema = z
  .object({
    email: z.email("Неверный email"),
    nickname: z.string().min(1, "Это обязательное поле"),
    name: z
      .string()
      .min(
        1,
        "Введите имя. Позднее вы сможете изменить его в настройках аккаунта"
      ),
    password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { current, register } = useAuth();
  const navigate = useNavigate();

  const onRegister = async (values: z.infer<typeof formSchema>) => {
    const { ok, errorMessage } = await register(values);

    if (!ok) form.setError("root", { type: "custom", message: errorMessage });
    if (current) navigate(href(ROUTES.WISHES, { userId: current.$id }));
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onRegister)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Никнейм<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Короткое имя, по которому друзья смогут найти ваш аккаунт
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Полное имя<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Василиса Премудрая" {...field} />
              </FormControl>
              <FormDescription>
                Можно изменить в настройках аккаунта позже
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Пароль<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <PassWithToggle {...field} />
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
              <FormLabel>
                Повторите пароль<span className="text-destructive">*</span>
              </FormLabel>
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
        <SubmitBtn
          isSubmitting={form.formState.isSubmitting}
          text="Зарегистрироваться"
        />
      </form>
    </Form>
  );
}

export default RegisterForm;
