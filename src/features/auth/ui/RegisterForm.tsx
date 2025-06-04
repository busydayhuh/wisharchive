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
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "../model/userContext";
import PassWithToggle from "./PassInputWithToggle";

const formSchema = z
  .object({
    email: z
      .string({
        required_error: "Введите логин",
      })
      .email("Неверный email"),
    name: z
      .string({
        required_error:
          "Введите имя. Позднее вы сможете изменить его в настройках аккаунта",
      })
      .optional(),
    password: z
      .string({ required_error: "Введите пароль" })
      .min(8, "Пароль должен содержать не менее 8 символов"),
    confirmPassword: z.string().optional(),
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
      password: "",
      confirmPassword: "",
    },
  });
  const user = useUser();

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(user.register)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Василиса Премудрая" {...field} />
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
              <FormLabel>Пароль*</FormLabel>
              <FormControl>
                <PassWithToggle field={field} />
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
              <FormLabel>Повторите пароль*</FormLabel>
              <FormControl>
                <PassWithToggle field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {user.status.status === "error" && (
          <div className="text-destructive">
            {user.status.register_error_message}
          </div>
        )}
        <Button type="submit" size="lg">
          Зарегистрироваться <ArrowRight />
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
