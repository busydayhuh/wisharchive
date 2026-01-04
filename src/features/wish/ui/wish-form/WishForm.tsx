import { ROUTES } from "@/shared/config/routes";
import {
  notifyError,
  notifySuccessExpanded,
} from "@/shared/entities/errors/notify";
import { wishFormSchema as formSchema } from "@/shared/formSchemas";
import type { WishDocumentType, WishlistDocumentType } from "@/shared/types";
import { SubmitBtn } from "@/shared/ui/components/SubmitBtn";
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
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { href, useNavigate } from "react-router-dom";
import type z from "zod";
import DeleteButton from "../../../../shared/ui/components/DeleteButton";
import { useWishMutations } from "../../model/hooks/useWishMutations";
import { CurrencySelect } from "./CurrencySelect";
import { PrioritySelect } from "./PrioritySelect";
import { WishlistSelect } from "./WishlistSelect";

export function WishForm({
  wish,
  onSubmit,
  setBlockNavigate,
}: {
  wish?: WishDocumentType;
  onSubmit: (
    values: z.infer<typeof formSchema>,
    wishId?: string
  ) => Promise<void>;
  setBlockNavigate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const actions = useWishMutations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: wish?.title || "",
      description: wish?.description || "",
      shopURL: wish?.shopURL || "",
      price: wish?.price || null,
      currency: wish?.currency || "RUB",
      wishlistId: wish?.wishlistId || "none",
      wishlist: wish?.wishlist || null,
      priority: wish?.priority || "1",
    },
  });

  const { errors } = form.formState;
  const pageHeader = wish ? "Редактировать желание" : "Новое желание";

  const onSave = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values, wish?.$id);
    setBlockNavigate(false);
  };

  const onDelete = async () => {
    setBlockNavigate(false);

    const { ok } = await actions.deleteW(wish!.$id);

    if (!ok) {
      notifyError("Не удалось удалить желание");
      return;
    }

    notifySuccessExpanded(
      "Желание удалено",
      wish!.title,
      wish!.imageURL ?? undefined
    );
    navigate(href(ROUTES.WISHES, { userId: wish!.ownerId }));
  };

  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="flex flex-col gap-4 md:gap-6 mt-3 md:mt-0 md:ml-4 px-2 md:px-0 pb-2 max-w-3xl"
      >
        <p className="hidden md:block font-headers font-bold text-lg md:text-2xl lg:text-3xl">
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
              <FormLabel htmlFor="description">Описание</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
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
              <FormLabel htmlFor="priority">Приоритет</FormLabel>
              <PrioritySelect
                setPriority={(value: number) => field.onChange(String(value))}
                priority={Number(field.value)}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shopURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="shopURL">Ссылка на магазин</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full text-sm md:text-base"
                  placeholder="https://"
                  id="shopURL"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormLabel htmlFor="price">Цена</FormLabel>
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
                      value={field.value ?? ""}
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

        {!wish?.isArchived && (
          <FormField
            control={form.control}
            name="wishlistId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1" htmlFor="wishlistId">
                  Выберите вишлист
                </FormLabel>
                <WishlistSelect
                  selectedValue={field.value}
                  onSelect={(
                    wishlistId: string,
                    wishlist: WishlistDocumentType | null
                  ) => {
                    form.setValue("wishlistId", wishlistId);
                    form.setValue("wishlist", wishlist);
                  }}
                  className="py-6 pl-2 w-full md:w-[24rem] text-sm md:text-base"
                />

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex sm:flex-row flex-col sm:justify-between gap-2 mt-2 lg:mt-8 w-full">
          <SubmitBtn
            text="Сохранить"
            loaderText="Сохранение..."
            isSubmitting={form.formState.isSubmitting}
          />
          {wish && (
            <DeleteButton
              variant="button"
              wishTitle={wish.title}
              action={onDelete}
              buttonText="Удалить желание"
            />
          )}
        </div>
      </form>
    </Form>
  );
}
