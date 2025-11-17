import { appwriteService } from "@/shared/model/appwrite";
import db from "@/shared/model/databases";
import { handleError } from "@/shared/model/handleError";
import type { UserDocumentType } from "@/shared/model/types";
import { useCallback } from "react";

function useProfileMutations() {
  const changeEmail = useCallback(
    async (email: string, password: string, userDocumentId: string) => {
      try {
        await appwriteService.account.updateEmail(email, password);
        await db.users.update(userDocumentId, { userEmail: email });

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    []
  );

  const changeName = useCallback(async (name: string) => {
    try {
      await appwriteService.account.updateName(name);

      return { ok: true };
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const changePersonalInfo = useCallback(
    async (payload: Partial<UserDocumentType>, userDocumentId: string) => {
      try {
        await db.users.update(userDocumentId, payload);

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    []
  );

  const changeAvatar = useCallback(
    async (avatarURL: string | null, userDocumentId: string) => {
      try {
        await db.users.update(userDocumentId, { avatarURL });

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    []
  );

  const changePassword = useCallback(
    async (password: string, oldPassword: string) => {
      try {
        await appwriteService.account.updatePassword(password, oldPassword);

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    []
  );

  const deleteProfile = useCallback(async () => {
    try {
      await appwriteService.account.updateStatus();

      return { ok: true };
    } catch (error) {
      return handleError(error);
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
