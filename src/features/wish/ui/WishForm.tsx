import { useAuth } from "@/features/auth";
import { useWishlists } from "@/features/wishlist";
import { cn } from "@/shared/lib/css";
import { CURRENCY } from "@/shared/lib/currency";
import { wishFormSchema as formSchema } from "@/shared/model/formSchemas";
import type { WishDocumentType } from "@/shared/model/types";
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
import { Loader2, Lock, Trash2, UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useBlocker, useNavigate } from "react-router";
import type z from "zod";
import { wishMutations } from "../model/wishMutations";

function WishForm({
  wish,
  onSubmit,
}: {
  wish: WishDocumentType;
  onSubmit: (wishId: string, values: z.infer<typeof formSchema>) => void;
}) {
  const [blockNavigate, setBlockNavigate] = useState(true);
  const [deleteConfOpen, setDeleteConfOpen] = useState(false);

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
    },
  });

  const { errors } = form.formState;

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
          await onSubmit(wish.$id, values);
        })}
        className="flex flex-col gap-6 md:ml-4 px-2 md:px-0 pb-2"
      >
        <span className="font-bold text-lg md:text-2xl">
          Редактировать желание
        </span>
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
                  className="h-18 md:h-24 text-sm md:text-base resize-none"
                  placeholder="Добавьте описание или примечание к желанию"
                />
              </FormControl>
              <FormMessage />
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
          <div className="flex items-center gap-1 bg-secondary pr-2 focus-within:border-ring rounded-md focus-within:ring-[3px] focus-within:ring-ring/50 w-fit">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <NumericFormat
                      getInputRef={field.ref}
                      className="focus-visible:border-0 focus-visible:ring-0 w-[10rem] text-sm md:text-base"
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
                onValueChange={field.onChange}
                value={field.value}
              />

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex sm:flex-row flex-col-reverse gap-2 mt-2 sm:mt-24 w-full">
          <Button
            type="button"
            variant="secondary"
            className="bg-muted hover:bg-muted/60"
            onClick={() => navigate(-1)}
            size="lg"
          >
            Отмена
          </Button>
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
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="sm:ms-auto mb-5 sm:mb-0"
              onClick={() => {
                setDeleteConfOpen(true);
              }}
            >
              <Trash2 /> Удалить желание
            </Button>
          )}
        </div>
      </form>
      {blocker.state === "blocked" && (
        <ConfirmationDialog
          title="Покинуть страницу?"
          description="Вы точно хотите покинуть эту страницу? Изменения не будут сохранены."
          actionText="Покинуть"
          onConfirm={blocker.proceed}
          onCancel={blocker.reset}
          open={true}
        />
      )}
      <ConfirmationDialog
        title="Удалить желание?"
        description="Вы точно хотите удалить это желание? Это действие нельзя отменить."
        actionText="Удалить"
        onConfirm={async () => {
          await wishMutations.delete(wish.$id);

          setBlockNavigate(false);
          navigate(-1);
        }}
        onCancel={() => setDeleteConfOpen(false)}
        open={deleteConfOpen}
      />
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
      triggerText={triggerText}
      className="bg-muted/60 px-3 py-2"
      renderOption={(opt) => (
        <span className="flex justify-between items-center gap-2 py-1 w-full">
          {opt.label}
          <span className="text-muted-foreground">{opt.icon}</span>
        </span>
      )}
    />
  );
}

function WishlistSelect({
  onValueChange,
  value,
}: {
  onValueChange: (value: string) => void;
  value?: string;
}) {
  const { current } = useAuth();
  const { wishlists, isLoading, error } = useWishlists(current?.$id ?? null);

  const options = [
    {
      value: "none",
      label: "Без вишлиста",
    },
    ...(wishlists ?? []).map((wl) => ({
      value: wl.$id,
      label: wl.title,
      icon: (
        <>
          {wl.isPrivate && <Lock className="size-3" />}
          {wl.ownerId !== current?.$id && <UsersIcon />}
        </>
      ),
    })),
  ];

  return (
    <ResponsiveSelect
      options={options}
      onChange={onValueChange}
      value={value}
      className="shadow-none py-6 w-full md:w-[24rem]"
      isLoading={isLoading}
      error={error}
      renderOption={(opt) => (
        <span className={cn("flex items-center gap-2 py-1")}>
          {opt.label} {opt.icon}
        </span>
      )}
    />
  );
}

export default WishForm;
