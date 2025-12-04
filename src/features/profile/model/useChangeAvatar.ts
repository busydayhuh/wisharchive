import { uploadToStorage } from "@/shared/model/uploadToStorage";
import { useCallback, useState } from "react";
import type { UpdateUserCache } from "../profile.page";
import useProfileMutations from "./useProfileMutations";

type SavingState = {
  isSuccess: boolean;
  isError: boolean;
  isSaving: boolean;
};

export function useChangeAvatar() {
  const [saving, setSaving] = useState<SavingState>({
    isSuccess: false,
    isSaving: false,
    isError: false,
  });
  const { changeAvatar: postAvatar } = useProfileMutations();

  const changeAvatar = useCallback(
    async (
      compressedAvatar: File | null | undefined,
      updateUserCache: UpdateUserCache,
      documentId: string
    ) => {
      setSaving({ isSuccess: false, isSaving: true, isError: false });

      if (!compressedAvatar) {
        const { ok } = await postAvatar(null, documentId);
        if (ok) updateUserCache(documentId, { avatarURL: null });

        return setSaving({
          isSuccess: ok,
          isSaving: false,
          isError: !ok,
        });
      }

      const { ok: storageOk, response: uploadedURL } = await uploadToStorage(
        compressedAvatar
      );
      if (!storageOk) {
        setSaving({
          isSuccess: false,
          isSaving: false,
          isError: true,
        });
        return;
      }

      const { ok } = await postAvatar(uploadedURL as string, documentId);
      if (!ok) {
        setSaving({
          isSuccess: false,
          isSaving: false,
          isError: true,
        });
        return;
      }

      updateUserCache(documentId, { avatarURL: uploadedURL });
      setSaving({
        isSuccess: ok,
        isSaving: false,
        isError: !ok,
      });
    },
    [postAvatar]
  );
  return { changeAvatar, saving, setSaving };
}
