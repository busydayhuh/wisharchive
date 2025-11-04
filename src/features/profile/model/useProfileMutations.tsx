import { appwriteService } from "@/shared/model/appwrite";
import db from "@/shared/model/databases";
import type { UserDocumentType } from "@/shared/model/types";
import { useCallback } from "react";

function useProfileMutations() {
  const changeEmail = useCallback(
    async (email: string, password: string, userDocumentId: string) => {
      try {
        await appwriteService.account.updateEmail(email, password);
        await db.users.update(userDocumentId, { userEmail: email });

        return { status: "ok", message: "" };
      } catch (e) {
        console.log("Не удалось обновить email", e);
        return { status: "error", message: e };
      }
    },
    []
  );

  const changeName = useCallback(async (name: string) => {
    try {
      await appwriteService.account.updateName(name);
      // await db.users.update(userDocumentId, { userName: name });

      return { status: "ok", message: "" };
    } catch (e) {
      console.log("Не удалось изменить имя", e);
      return { status: "error", message: e };
    }
  }, []);

  const changePersonalInfo = useCallback(
    async (payload: Partial<UserDocumentType>, userDocumentId: string) => {
      try {
        await db.users.update(userDocumentId, payload);

        return { status: "ok", message: "" };
      } catch (e) {
        console.log("Не удалось сохранить изменения", e);
        return { status: "error", message: e };
      }
    },
    []
  );

  const changeAvatar = useCallback(
    async (avatarURL: string | null, userDocumentId: string) => {
      try {
        await db.users.update(userDocumentId, { avatarURL });

        return { status: "ok", message: "" };
      } catch (e) {
        console.log("Не удалось изменить аватар", e);
        return { status: "error", message: e };
      }
    },
    []
  );

  const changePassword = useCallback(
    async (password: string, oldPassword: string) => {
      try {
        await appwriteService.account.updatePassword(password, oldPassword);

        return { status: "ok", message: "" };
      } catch (e) {
        console.log("Не удалось обновить пароль");
        return { status: "error", message: e };
      }
    },
    []
  );

  const deleteProfile = useCallback(async () => {
    try {
      await appwriteService.account.updateStatus();

      return { status: "ok", message: "" };
    } catch (e) {
      console.log("Не удалось удалить аккаунт");
      return { status: "error", message: e };
    }
  }, []);

  return {
    changeEmail,
    changeName,
    changeAvatar,
    changePassword,
    deleteProfile,
    changePersonalInfo,
  };
}

export default useProfileMutations;
