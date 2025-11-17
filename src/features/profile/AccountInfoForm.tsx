import { accountInfoFormSchema as formSchema } from "@/shared/model/formSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { SubmitBtn } from "@/shared/ui/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

  const { isSubmitting, isDirty, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    form.reset(undefined, {
      keepDirtyValues: false,
      keepValues: true,
    });
  }, [isSubmitSuccessful, form]);

  const saveAccountInfo = async (values: z.infer<typeof formSchema>) => {
    if (form.getFieldState("userEmail").isDirty) {
      const { ok } = await changeEmail(
        values.userEmail,
        values.oldPassword,
        userDocumentId
      );

      if (!ok) {
        form.setError(
          "oldPassword",
          { type: "custom", message: "Неверный пароль" },
          { shouldFocus: true }
        );
        return;
      }
      toast.success("Email успешно обновлён");
    }

    if (form.getFieldState("password").isDirty && values.password) {
      const { ok } = await changePassword(values.password, values.oldPassword);

      if (!ok) {
        form.setError(
          "oldPassword",
          { type: "custom", message: "Неверный пароль" },
          { shouldFocus: true }
        );
        return;
      }
      toast.success("Пароль успешно обновлён");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => saveAccountInfo(values))}
        className="flex flex-col gap-4 md:gap-6 mx-auto mt-3 md:mt-0 px-2 md:px-0 pb-2 w-full lg:max-w-3xl max-w-4xl"
      >
        <p className="font-semibold text-xl lg:text-2xl">Логин и пароль</p>
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
                <PassWithToggle {...field} className="text-sm md:text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isDirty && (
          <>
            <FormMessage className="text-muted-foreground">
              Для подтверждения изменений введите текущий пароль:
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
                    <PassWithToggle
                      {...field}
                      className="text-sm md:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex items-center gap-5">
          <SubmitBtn
            text="Сохранить"
            loaderText="Сохранение..."
            isSubmitting={isSubmitting}
            isDirty={isDirty}
            className="w-fit"
          />
        </div>
      </form>
    </Form>
  );
}
