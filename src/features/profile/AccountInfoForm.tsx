import { accountInfoFormSchema as formSchema } from "@/shared/model/formSchemas";
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
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { PassWithToggle } from "../auth";
import useProfileMutations from "./model/useProfileMutations";

export function AccountInfoForm({
  email,
  userDocumentId,
}: {
  email: string;
  userDocumentId: string;
}) {
  const { changeEmail, changePassword } = useProfileMutations();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      userEmail: email,
      password: "",
      oldPassword: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const { isSubmitting, isDirty, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    form.reset(undefined, {
      keepDirtyValues: false,
      keepValues: true,
    });
  }, [isSubmitSuccessful, form]);

  const saveAccountInfo = async (values: z.infer<typeof formSchema>) => {
    if (form.getFieldState("userEmail").isDirty) {
      const response = await changeEmail(
        values.userEmail,
        values.oldPassword,
        userDocumentId
      );

      if (response.status !== "ok") {
        form.setError(
          "oldPassword",
          { type: "custom", message: "Неверный пароль" },
          { shouldFocus: true }
        );

        return;
      }
    }

    if (form.getFieldState("password").isDirty && values.password) {
      const response = await changePassword(
        values.password,
        values.oldPassword
      );

      if (response.status !== "ok") {
        form.setError(
          "oldPassword",
          { type: "custom", message: "Неверный пароль" },
          { shouldFocus: true }
        );

        return;
      }
    }

    setSubmitted(true);

    const timer = setTimeout(() => setSubmitted(false), 3000);
    return () => clearTimeout(timer);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => saveAccountInfo(values))}
        className="flex flex-col gap-4 md:gap-6 mt-3 md:mt-0 px-2 md:px-0 pb-2 max-w-3xl"
      >
        <p className="font-semibold text-2xl">Логин и пароль</p>
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="gap-1" htmlFor="userEmail">
                Логин
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-sm md:text-base"
                  id="userEmail"
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
              <FormLabel htmlFor="password">Новый пароль</FormLabel>
              <FormControl>
                <PassWithToggle {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isDirty && (
          <>
            <FormMessage className="text-muted-foreground">
              Для подтверждения изменений введите текущий пароль
            </FormMessage>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="oldPassword">
                    Текущий пароль <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <PassWithToggle {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex items-center gap-5">
          <Button
            type="submit"
            variant={isSubmitting ? "ghost" : "default"}
            disabled={isSubmitting || !isDirty}
            size="lg"
            className="w-fit h-14"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Сохранение...
              </>
            ) : (
              "Сохранить"
            )}
          </Button>
          {submitted && (
            <p className="inline-flex items-center gap-1.5 text-muted-foreground text-sm">
              <Check className="size-4" />
              Сохранено
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
