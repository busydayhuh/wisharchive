import z from "zod";

export const wishlistFormSchema = z.object({
  title: z.string().min(1, { message: "Это обязательное поле" }),
  description: z
    .string()
    .max(500, { message: "Описание должно содержать не более 500 символов" })
    .optional(),
  isPrivate: z.boolean().default(false).optional(),
});
