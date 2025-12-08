import { appwriteService } from "@/shared/api/appwrite";
import db from "@/shared/api/databases";
import { handleError } from "@/shared/entities/errors/handleError";
import type { UserDocumentType } from "@/shared/types";
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
