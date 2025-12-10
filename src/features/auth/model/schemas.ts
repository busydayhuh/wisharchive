import z from "zod";

export const createRecoverySchema = z
  .object({
    password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export const updateRecoverySchema = z.object({
  email: z.email("Неверный email"),
});
