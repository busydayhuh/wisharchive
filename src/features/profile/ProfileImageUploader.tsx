import { cn } from "@/shared/lib/css";
import type { UserDocumentType } from "@/shared/model/types";
import { uploadToStorage } from "@/shared/model/uploadToStorage";
import useImageDrop from "@/shared/model/useImageDrop";
import { Button } from "@/shared/ui/kit/button";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import {
  Camera,
  Check,
  CircleX,
  ImagePlusIcon,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { KeyedMutator } from "swr";
import useProfileMutations from "./model/useProfileMutations";

type SavingState = {
  isSuccess: boolean;
  isError: boolean;
  isSaving: boolean;
};

export function ProfileImageUploader({
  imageURL,
  userId,
  documentId,
  name,
  mutateUser,
}: {
  imageURL?: string;
  userId: string;
  documentId: string;
  name: string;
  mutateUser: KeyedMutator<UserDocumentType>;
}) {
  const [compressedAvatar, setCompressedAvatar] = useState<
    File | null | undefined
  >();
  const [saving, setSaving] = useState<SavingState>({
    isSuccess: false,
    isSaving: false,
    isError: false,
  });

  const { changeAvatar } = useProfileMutations();

  const handleAvatarChange = useCallback(async () => {
    setSaving({ isSuccess: false, isSaving: true, isError: false });

    if (!compressedAvatar) {
      const response = await changeAvatar(null, documentId);
      if (response.status === "ok") mutateUser();

      return setSaving({
        isSuccess: response.status === "ok",
        isSaving: false,
        isError: response.status === "error",
      });
    }

    const uploadedURL = await uploadToStorage(compressedAvatar);
    if (uploadedURL) {
      const response = await changeAvatar(uploadedURL, documentId);
      if (response.status === "ok") mutateUser();

      return setSaving({
        isSuccess: response.status === "ok",
        isSaving: false,
        isError: response.status === "error",
      });
    } else {
      return setSaving({
        isSuccess: false,
        isSaving: false,
        isError: true,
      });
    }
  }, [changeAvatar, compressedAvatar, documentId, mutateUser]);

  useEffect(
    () => setSaving({ isSuccess: false, isSaving: false, isError: false }),
    [compressedAvatar]
  );

  const {
    preview,
    setPreview,
    errorMessages,
    getInputProps,
    getRootProps,
    isDragActive,
    isCompressing,
  } = useImageDrop(setCompressedAvatar, imageURL);

  return (
    <div className="flex flex-col justify-center items-center gap-2.5 w-36">
      <div className="relative w-fit">
        <div {...getRootProps()}>
          {isDragActive || isCompressing ? (
            <div
              className={cn(
                "place-content-center grid bg-muted rounded-full w-24 h-24",
                isDragActive && "outline-2 outline-muted"
              )}
            >
              {isDragActive && (
                <ImagePlusIcon className="size-5 text-muted-foreground" />
              )}
              {isCompressing && (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
              )}
            </div>
          ) : (
            <div className="group/avatar relative rounded-full w-fit overflow-clip cursor-pointer">
              <UserAvatar
                avatarURL={preview ?? undefined}
                id={userId}
                name={name}
                size="3xl"
              />
              <div className="-bottom-6 absolute place-content-center grid bg-muted/70 w-full h-6 text-muted-foreground transition-all group-hover/avatar:-translate-y-6 duration-250">
                <Camera className="size-4" />
              </div>
            </div>
          )}
          <input {...getInputProps()} id="image-dropzone" />
        </div>
        {(compressedAvatar || preview) && (
          <Button
            variant="secondary"
            onClick={() => {
              setCompressedAvatar(null);
              setPreview(null);
            }}
            size="sm"
            className="-right-2 -bottom-1 z-10 absolute"
          >
            <Trash2 className="size-3" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {compressedAvatar !== undefined && (
          <SaveButton saving={saving} handleAvatarChange={handleAvatarChange} />
        )}
      </div>

      {errorMessages && (
        <div className="bg-destructive/30 px-4 py-2 rounded-md w-fit text-destructive text-sm">
          {errorMessages.map((m) => (
            <p
              key={m}
              className="inline-flex items-center gap-2 [&_svg]:size-4"
            >
              <CircleX />
              {m}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function SaveButton({
  saving,
  handleAvatarChange,
}: {
  saving: SavingState;
  handleAvatarChange: () => void;
}) {
  const defaultState = !saving.isSaving && !saving.isSuccess;
  const isLoading = saving.isSaving && !saving.isSuccess;
  const isSuccess = !saving.isSaving && saving.isSuccess;
  const isError = !saving.isSaving && saving.isError;

  return (
    <Button
      disabled={isLoading || isSuccess}
      variant={defaultState ? "default" : "ghost"}
      onClick={handleAvatarChange}
    >
      {defaultState && <>Сохранить</>}
      {isLoading && (
        <>
          <Loader2 className="animate-spin" />
          Сохранение...
        </>
      )}
      {isSuccess && (
        <>
          <Check />
          Сохранено
        </>
      )}
      {isError && (
        <>
          <X />
          Не удалось сохранить
        </>
      )}
    </Button>
  );
}
