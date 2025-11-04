import { z } from "zod";

export const wishlistFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "это обязательное поле" })
    .max(100, { message: "максимум 100 символов" }),
  description: z
    .string()
    .max(500, { message: "не более 500 символов" })
    .optional(),
  isPrivate: z.boolean(),
});

export const wishFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "это обязательное поле" })
    .max(100, { message: "максимум 100 символов" }),
  description: z
    .string()
    .max(500, { message: "максимум 500 символов" })
    .optional(),
  shopURL: z
    .url({ message: "не валидная ссылка" })
    .or(z.literal(""))
    .optional(),
  price: z
    .number({ message: "введите число" })
    .nonnegative({ message: "принимаются только положительные числа" })
    .int({ message: "принимаются целые числа" })
    .transform((val) => (val === 0 ? null : val))
    .nullish(),
  currency: z.string(),
  wishlist: z.string(),
  priority: z.enum(["2", "1", "0"]),
});

export const userFormSchema = z.object({
  userName: z
    .string()
    .min(1, "это обязательное поле")
    .max(100, "максимум 100 символов"),
  sex: z.enum(["female", "male", "other"]).nullable(),
  birthDate: z.date().nullable(),
  bio: z.string().max(500, "максимум 500 символов").optional(),
});

export const accountInfoFormSchema = z.object({
  userEmail: z.email("Не валидный email"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .optional(),
  oldPassword: z.string().min(1, "Это обязательное поле"),
});
