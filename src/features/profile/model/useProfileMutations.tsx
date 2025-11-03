import { useAuth } from "@/features/auth";
import { appwriteService } from "@/shared/model/appwrite";
import db from "@/shared/model/databases";
import { useCallback } from "react";

function useProfileMutations() {
  const { current } = useAuth();

  const changeEmail = useCallback(
    async (email: string, password: string, userDocumentId: string) => {
      if (current?.password !== password)
        return { status: "error", message: "Неверный пароль" };

      try {
        await appwriteService.account.updateEmail(email, password);
        await db.users.update(userDocumentId, { userEmail: email });

        return { status: "ok", message: "" };
      } catch (e) {
        console.log("Не удалось обновить email", e);
        return { status: "error", message: e };
      }
    },
    [current]
  );

  const changeName = useCallback(
    async (name: string, userDocumentId: string) => {
      try {
        await appwriteService.account.updateName(name);
        await db.users.update(userDocumentId, { userName: name });

        return { status: "ok", message: "" };
      } catch (e) {
        console.log("Не удалось изменить имя", e);
        return { status: "error", message: e };
      }
    },
    []
  );

  const changeAvatar = useCallback(
    async (avatarURL: string, userDocumentId: string) => {
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
      if (current?.password !== oldPassword)
        return { status: "error", message: "Неверный пароль" };

      try {
        await appwriteService.account.updatePassword(password, oldPassword);

        return { status: "ok", message: "" };
      } catch (e) {
        console.log("Не удалось обновить пароль");
        return { status: "error", message: e };
      }
    },
    [current]
  );

  const deleteProfile = useCallback(
    async (password: string) => {
      if (current?.password !== password)
        return { status: "error", message: "Неверный пароль" };

      try {
        await appwriteService.account.updateStatus();

        return { status: "ok", message: "" };
      } catch (e) {
        console.log("Не удалось удалить аккаунт");
        return { status: "error", message: e };
      }
    },
    [current]
  );

  return {
    changeEmail,
    changeName,
    changeAvatar,
    changePassword,
    deleteProfile,
  };
}

export default useProfileMutations;
