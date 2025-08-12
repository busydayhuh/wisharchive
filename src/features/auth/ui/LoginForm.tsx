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
import { useAuth } from "../model/authContext";
import PassWithToggle from "./PassInputWithToggle";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Введите логин",
    })
    .email("Неверный email"),
  password: z
    .string({ required_error: "Введите пароль" })
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
  const user = useAuth();

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(user.login)}>
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
        {user.status.status === "error" && (
          <div className="text-destructive">
            {user.status.login_error_message}
          </div>
        )}
        <Button type="submit" size="lg">
          Войти <ArrowRight />
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
