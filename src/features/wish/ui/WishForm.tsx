import { CURRENCY } from "@/shared/lib/currency";
import { wishFormSchema as formSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { PRIORITIES, PriorityBadge } from "@/shared/ui/Badges";
import ConfirmationDialog from "@/shared/ui/ConfirmationDialog";
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
import { Textarea } from "@/shared/ui/kit/textarea";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { href, useBlocker, useNavigate } from "react-router";
import type z from "zod";
import DeleteButton from "../../../shared/ui/DeleteButton";
import { wishMutations } from "../model/wishMutations";
import { WishlistSelect } from "./wish-info/WishlistSelect";

function WishForm({
  wish,
  onSubmit,
}: {
  wish?: WishDocumentType;
  onSubmit: (values: z.infer<typeof formSchema>, wishId?: string) => void;
}) {
  const [blockNavigate, setBlockNavigate] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: wish?.title || "",
      description: wish?.description || "",
      shopURL: wish?.shopURL || "",
      price: wish?.price || null,
      currency: wish?.currency || "RUB",
      wishlist: wish?.wishlistId || "none",
      priority: wish?.priority || "medium",
    },
  });

  const { errors } = form.formState;
  const pageHeader = wish ? "Редактировать желание" : "Новое желание";

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname && blockNavigate
  );
  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          setBlockNavigate(false);
          await onSubmit(values, wish?.$id);
        })}
        className="flex flex-col gap-6 md:ml-4 px-2 md:px-0 pb-2"
      >
        <span className="font-bold text-lg md:text-2xl">{pageHeader}</span>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="gap-1">
                Название <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="text-sm md:text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-24 md:h-28 text-sm md:text-base resize-none"
                  placeholder="Добавьте описание или примечание к желанию"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Приоритет</FormLabel>
              <PrioritySelect
                onValueChange={field.onChange}
                value={field.value}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shopURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на магазин</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full text-sm md:text-base"
                  placeholder="https://"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormLabel>Цена</FormLabel>
          <div className="flex justify-between items-center gap-1 bg-secondary pr-2 focus-within:border-ring rounded-md focus-within:ring-[3px] focus-within:ring-ring/50 md:w-fit">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <NumericFormat
                      getInputRef={field.ref}
                      className="focus-visible:border-0 focus-visible:ring-0 text-sm md:text-base"
                      thousandSeparator=" "
                      decimalScale={0}
                      allowNegative={false}
                      placeholder="0"
                      defaultValue={field.value ?? ""}
                      customInput={Input}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue ?? null);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <CurrencySelect
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormItem>
              )}
            />
          </div>
          <FormMessage>
            {errors.price && errors.price.message}
            {errors.currency && errors.currency.message}
          </FormMessage>
        </div>

        <FormField
          control={form.control}
          name="wishlist"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Выберите вишлист</FormLabel>
              <WishlistSelect
                variant="form"
                value={field.value}
                onValueChange={field.onChange}
                className="py-6 w-full md:w-[24rem] text-sm md:text-base"
              />

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex sm:flex-row flex-col sm:justify-between gap-2 mt-2 w-full">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size="lg"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Сохранение...
              </>
            ) : (
              "Сохранить"
            )}
          </Button>
          {wish && (
            <DeleteButton
              variant="button"
              wishTitle={wish.title}
              action={async () => {
                await wishMutations.delete(wish.$id);

                setBlockNavigate(false);
                navigate(href(ROUTES.WISH, { wishId: wish.$id }));
              }}
              buttonText="Удалить желание"
            />
          )}
        </div>
      </form>
      {blocker.state === "blocked" && (
        <ConfirmationDialog
          title="Покинуть страницу?"
          description="Вы точно хотите покинуть эту страницу? Изменения не будут сохранены."
          actionText="Покинуть"
          onConfirm={() => {
            setBlockNavigate(false);
            blocker.proceed();
          }}
          onCancel={blocker.reset}
          open={true}
        />
      )}
    </Form>
  );
}

function CurrencySelect({
  onValueChange,
  value,
}: {
  onValueChange: (value: string) => void;
  value: string;
}) {
  const options = useMemo(
    () =>
      CURRENCY.map((c) => ({
        value: c.abbr,
        label: c.title,
        icon: c.icon,
      })),
    []
  );
  const triggerText = CURRENCY.find((c) => c.abbr === value)?.icon ?? null;

  return (
    <ResponsiveSelect
      options={options}
      onChange={onValueChange}
      value={value}
      triggerJSX={
        <span className="flex justify-between items-center gap-1">
          {triggerText}
        </span>
      }
      triggerCSS="bg-muted/60 px-3 rounded-sm h-9 text-muted-foreground"
      renderOption={(opt) => (
        <span className="flex justify-between items-center gap-2 py-2 w-full">
          {opt.label}
          <span className="text-muted-foreground">{opt.icon}</span>
        </span>
      )}
    />
  );
}

function PrioritySelect({
  onValueChange,
  value = "medium",
}: {
  onValueChange: (value: string) => void;
  value: "high" | "medium" | "low";
}) {
  const options = useMemo(
    () =>
      Object.entries(PRIORITIES).map((i) => ({
        value: i[0],
        label: i[1].title,
        colors: i[1].colors,
        icon: i[1].icon,
      })),
    []
  );

  const triggerText = (
    <PriorityBadge
      priority={value}
      size="md"
      className="rounded-sm md:rounded-sm 2xl:text-sm"
    />
  );

  return (
    <ResponsiveSelect
      options={options}
      onChange={onValueChange}
      value={value}
      triggerJSX={triggerText}
      triggerCSS="py-6 pl-1.5"
    />
  );
}

export default WishForm;
