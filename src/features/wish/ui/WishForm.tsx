import { useAuth } from "@/features/auth";
import { useWishlists } from "@/features/wishlist";
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
import { Loader2, Lock, UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useBlocker, useNavigate } from "react-router";
import type z from "zod";

function WishForm({
  wish,
  onSubmit,
}: {
  wish: WishDocumentType;
  onSubmit: (wishId: string, values: z.infer<typeof formSchema>) => void;
}) {
  const [blockNavigate, setBlockNavigate] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: wish?.title || "",
      description: wish?.description || "",
      shopURL: wish?.shopURL || "",
      price: wish?.price || 0,
      currency: wish?.currency || "RUB",
      wishlist: wish?.wishlistId || "none",
    },
  });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname && blockNavigate
  );
  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          setBlockNavigate(false);
          onSubmit(wish.$id, values);
        })}
        className="flex flex-col gap-6 md:ml-4 px-2 md:px-0 pb-2 max-w-xl"
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
                  placeholder="Добавьте краткое описание желания..."
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
              <FormLabel>Где купить?</FormLabel>
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

        <div className="flex items-end gap-0.5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="w-[10rem] text-sm md:text-base"
                    value={String(field.value)}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
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

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="wishlist"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Добавить в вишлист?</FormLabel>
              <WishlistSelect
                onValueChange={field.onChange}
                value={field.value}
              />

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:bottom-5 md:left-[50%] md:fixed flex sm:flex-row flex-col-reverse gap-2 md:gap-4 mt-2 md:translate-x-[-50%]">
          <Button
            type="button"
            variant="secondary"
            className="bg-muted hover:bg-muted/60 shadow-none py-6"
            onClick={() => navigate(-1)}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="shadow-none py-6"
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
      className="shadow-none px-1 pb-6 border-none outline-0 text-muted-foreground"
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
      label: "— Без вишлиста —",
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
        <span className="flex items-center gap-2 py-1">
          {opt.label} {opt.icon}
        </span>
      )}
    />
  );
}

export default WishForm;
