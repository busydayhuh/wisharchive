import { appwriteService } from "@/shared/api/appwrite";
import { handleError } from "@/shared/entities/errors/handleError";
import {
  notifyError,
  notifySuccessSimple,
} from "@/shared/entities/errors/notify";
import type z from "zod";
import { updateRecoverySchema as formSchema } from "../model/schemas";

export async function updateRecovery(values: z.infer<typeof formSchema>) {
  try {
    await appwriteService.account.createRecovery(
      values.email,
      "http://localhost:5173/recovery"
    );
    notifySuccessSimple("Ссылка отправлена", `на ${values.email}`);
  } catch (error) {
    notifyError("Не удалось отправить ссылку");
    return handleError(error);
  }
}
