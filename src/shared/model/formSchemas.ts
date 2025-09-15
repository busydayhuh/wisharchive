import { z } from "zod";

export const wishlistFormSchema = z.object({
  title: z.string().min(1, { message: "Это обязательное поле" }),
  description: z
    .string()
    .max(500, { message: "Описание должно содержать не более 500 символов" })
    .optional(),
  isPrivate: z.boolean(),
});

export const wishFormSchema = z.object({
  title: z.string().min(1, { message: "Это обязательное поле" }),
  description: z
    .string()
    .max(500, { message: "Описание должно содержать не более 500 символов" })
    .optional(),
  shopURL: z.url({ message: "Не валидная ссылка" }).optional(),
  price: z
    .number()
    .nonnegative({ message: "Только положительные числа" })
    .int({ message: "Только целые числа" })
    .optional(),
  currency: z.string(),
  wishlist: z.string(),
});
