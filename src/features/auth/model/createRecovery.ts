import { appwriteService } from "@/shared/api/appwrite";
import { handleError } from "@/shared/entities/errors/handleError";
import {
  notifyError,
  notifySuccessSimple,
} from "@/shared/entities/errors/notify";
import type z from "zod";
import { createRecoverySchema as formSchema } from "../model/schemas";

export async function createRecovery(
  values: z.infer<typeof formSchema>,
  userId: string,
  secret: string
) {
  try {
    await appwriteService.account.updateRecovery(
      userId,
      secret,
      values.password
    );

    notifySuccessSimple("Пароль успешно обновлён");
    return { ok: true };
  } catch (error) {
    notifyError("Невозможно восстановить пароль");
    return handleError(error);
  }
}
