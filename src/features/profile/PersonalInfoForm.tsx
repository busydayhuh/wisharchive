import { userFormSchema as formSchema } from "@/shared/model/formSchemas";
import type { Setter, UserDocumentType } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import { Calendar } from "@/shared/ui/kit/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { Textarea } from "@/shared/ui/kit/textarea";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { KeyedMutator } from "swr";
import type z from "zod";
import useProfileMutations from "./model/useProfileMutations";
import { ProfileImageUploader } from "./ProfileImageUploader";

export function PersonalInfoForm({
  userInfo,
  mutateUser,
}: {
  userInfo: UserDocumentType;
  mutateUser: KeyedMutator<UserDocumentType>;
}) {
  const { changeName, changePersonalInfo } = useProfileMutations();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      userName: userInfo.userName,
      sex: userInfo.sex,
      birthDate: userInfo.birthDate ? new Date(userInfo.birthDate) : null,
      bio: userInfo.bio ?? "",
    },
  });

  const { isSubmitting, isDirty, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    form.reset(undefined, {
      keepDirtyValues: false,
      keepValues: true,
    });
  }, [isSubmitSuccessful, form]);

  const savePersonalInfo = async (values: z.infer<typeof formSchema>) => {
    if (form.getFieldState("userName").isDirty) changeName(values.userName);

    const response = await changePersonalInfo(values, userInfo.$id);
    if (response.status === "ok") {
      mutateUser();
      toast.success("Профиль успешно обновлён");
    } else {
      toast.error("Не удалось обновить профиль", {
        description: "Повторите попытку позже",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => savePersonalInfo(values))}
        className="flex flex-col gap-4 md:gap-6 mx-auto mt-3 md:mt-0 px-2 md:px-0 pb-2 lg:max-w-3xl max-w-4xl"
      >
        <p className="font-semibold text-xl lg:text-2xl">Личные данные</p>

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="gap-1" htmlFor="userName">
                Полное имя <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-sm md:text-base"
                  id="userName"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-4 lg:gap-10">
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="sex">Ваш пол</FormLabel>
                <FormControl>
                  <SexSelect
                    value={field.value ?? "none"}
                    onValueChange={(value) => {
                      field.onChange(value === "none" ? null : value);
                    }}
                    className="py-6 text-sm md:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="birthDate">Дата рождения</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <p className="font-medium text-muted-foreground text-sm">Аватар</p>
          <ProfileImageUploader
            imageURL={userInfo.avatarURL ?? undefined}
            userId={userInfo.userId}
            documentId={userInfo.$id}
            name={userInfo.userName}
            mutateUser={mutateUser}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="bio">О себе</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  className="h-24 md:h-28 text-sm md:text-base resize-none"
                  placeholder="Расскажите о себе"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
      </form>
    </Form>
  );
}

function DatePicker({
  date,
  setDate,
}: {
  date?: Date;
  setDate: Setter<Date | undefined>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          id="date"
          className="justify-between w-48 h-12 font-normal text-sm md:text-base"
        >
          {date ? date.toLocaleDateString() : "Не выбрана"}
          <ChevronDownIcon className="text-muted-foreground/65" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto overflow-hidden" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function SexSelect({
  value,
  onValueChange,
  className,
}: {
  value?: "male" | "female" | "other" | "none";
  onValueChange: (value: string) => void;
  className?: string;
}) {
  const options = [
    { value: "none", label: "Не указан" },
    { value: "male", label: "Мужской" },
    { value: "female", label: "Женский" },
    { value: "other", label: "Другое" },
  ];

  return (
    <ResponsiveSelect
      options={options}
      onChange={onValueChange}
      value={value}
      title="Пол"
      triggerCSS={className}
    />
  );
}
