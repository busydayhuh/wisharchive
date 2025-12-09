import { userFormSchema as formSchema } from "@/shared/formSchemas";
import type { Setter, UserDocumentType } from "@/shared/types";
import { ResponsiveSelect } from "@/shared/ui/components/ResponsiveSelect";
import { SubmitBtn } from "@/shared/ui/components/SubmitBtn";
import { Button } from "@/shared/ui/kit/button";
import { Calendar } from "@/shared/ui/kit/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { Textarea } from "@/shared/ui/kit/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ru } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { useSaveInfo } from "../model/useSaveAccountInfo";
import type { UpdateUserCache } from "../profile.page";
import { ProfileImageUploader } from "./ProfileImageUploader";

export type FormValues = z.infer<typeof formSchema>;

export function PersonalInfoForm({
  userInfo,
  updateUserCache,
}: {
  userInfo: UserDocumentType;
  updateUserCache: UpdateUserCache;
}) {
  const form = useForm<FormValues>({
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
  const { savePersonalInfo } = useSaveInfo();

  useEffect(() => {
    form.reset(undefined, {
      keepDirtyValues: false,
      keepValues: true,
    });
  }, [isSubmitSuccessful, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) =>
          savePersonalInfo(values, form, userInfo.$id, updateUserCache)
        )}
        className="flex flex-col gap-4 md:gap-6 mx-auto mt-3 md:mt-0 px-2 md:px-0 pb-2 lg:max-w-3xl xl:max-w-4xl"
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
            updateUserCache={updateUserCache}
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
                  id="bio"
                />
              </FormControl>
              <FormDescription>Макс. 150 символов</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitBtn
          text="Сохранить"
          loaderText="Сохранение..."
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          className="w-fit"
        />
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
          locale={ru}
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
      onSelect={onValueChange}
      selectedValue={value}
      title="Пол"
      triggerClassName={className}
    />
  );
}
