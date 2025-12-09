import {
  notifyError,
  notifySuccessSimple,
} from "@/shared/entities/errors/notify";
import { accountInfoFormSchema, userFormSchema } from "@/shared/formSchemas";
import { useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { UpdateUserCache } from "../profile.page";
import type { FormValues as AccountValues } from "../ui/AccountInfoForm";
import type { FormValues as PersonalValues } from "../ui/PersonalInfoForm";
import useProfileMutations from "./useProfileMutations";

export function useSaveInfo() {
  const { changeEmail, changePassword, changeName, changePersonalInfo } =
    useProfileMutations();

  const saveAccountInfo = useCallback(
    async (
      values: z.infer<typeof accountInfoFormSchema>,
      form: UseFormReturn<AccountValues>,
      userDocumentId: string
    ) => {
      if (form.getFieldState("userEmail").isDirty) {
        const { ok, errorType, errorMessage } = await changeEmail(
          values.userEmail,
          values.oldPassword,
          userDocumentId
        );

        if (!ok) {
          if (errorType === "user_password_mismatch")
            return form.setError(
              "oldPassword",
              {
                type: "custom",
                message: errorMessage,
              },
              { shouldFocus: true }
            );

          notifyError("Не удалось обновить данные");

          return;
        }
        notifySuccessSimple("Email успешно обновлён");
      }

      if (form.getFieldState("password").isDirty && values.password) {
        const { ok, errorMessage } = await changePassword(
          values.password,
          values.oldPassword
        );

        if (!ok) {
          form.setError(
            "oldPassword",
            { type: "custom", message: errorMessage },
            { shouldFocus: true }
          );
          return;
        }
        notifySuccessSimple("Пароль успешно обновлён");
      }
    },
    [changeEmail, changePassword]
  );

  const savePersonalInfo = useCallback(
    async (
      values: z.infer<typeof userFormSchema>,
      form: UseFormReturn<PersonalValues>,
      userDocumentId: string,
      updateUserCache: UpdateUserCache
    ) => {
      let accountNameChange;

      if (form.getFieldState("userName").isDirty) {
        accountNameChange = await changeName(values.userName);
      }
      const documentInfoChange = await changePersonalInfo(
        values,
        userDocumentId
      );

      if (
        (accountNameChange && !accountNameChange.ok) ||
        !documentInfoChange.ok
      ) {
        notifyError("Не удалось обновить профиль");
        return;
      }

      updateUserCache(userDocumentId, values);
      notifySuccessSimple("Профиль успешно обновлён");
    },
    [changeName, changePersonalInfo]
  );
  return { saveAccountInfo, savePersonalInfo };
}
