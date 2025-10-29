import { wishFormSchema as formSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { href, useBlocker, useNavigate } from "react-router";
import type z from "zod";
import DeleteButton from "../../../../shared/ui/DeleteButton";
import { useWishMutations } from "../../model/useWishMutations";
import { CurrencySelect } from "./CurrencySelect";
import { PrioritySelect } from "./PrioritySelect";
import { WishlistSelect } from "./WishlistSelect";

export function WishForm({
  wish,
  onSubmit,
}: {
  wish?: WishDocumentType;
  onSubmit: (values: z.infer<typeof formSchema>, wishId?: string) => void;
}) {
  const [blockNavigate, setBlockNavigate] = useState(true);
  const actions = useWishMutations();

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
      priority: wish?.priority || "1",
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
        className="flex flex-col gap-4 md:gap-6 mt-3 md:mt-0 md:ml-4 px-2 md:px-0 pb-2 max-w-3xl"
      >
        <p className="hidden md:block font-bold text-lg md:text-2xl">
          {pageHeader}
        </p>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="gap-1" htmlFor="title">
                Название <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="text-sm md:text-base" id="title" />
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
                className="py-6 pl-2 w-full md:w-[24rem] text-sm md:text-base"
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
            className="h-14"
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
                await actions.delete(wish.$id);

                setBlockNavigate(false);
                navigate(
                  href(ROUTES.WISH, { wishId: wish.$id, userId: wish.ownerId })
                );
              }}
              buttonText="Удалить желание"
            />
          )}
        </div>
      </form>
      {blocker.state === "blocked" && (
        <ConfirmationDialog
          title="Покинуть страницу?"
          description={
            <p>
              Вы точно хотите покинуть эту страницу? Изменения не будут
              сохранены.
            </p>
          }
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
