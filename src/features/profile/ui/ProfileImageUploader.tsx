import { cn } from "@/shared/lib/css";
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
import { useEffect, useState } from "react";
import { useChangeAvatar } from "../model/useChangeAvatar";
import type { UpdateUserCache } from "../profile.page";

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
  updateUserCache,
}: {
  imageURL?: string;
  userId: string;
  documentId: string;
  name: string;
  updateUserCache: UpdateUserCache;
}) {
  const [compressedAvatar, setCompressedAvatar] = useState<
    File | null | undefined
  >();
  const { saving, setSaving, changeAvatar } = useChangeAvatar();
  const {
    preview,
    setPreview,
    errorMessages,
    getInputProps,
    getRootProps,
    isDragActive,
    isCompressing,
    open,
  } = useImageDrop(setCompressedAvatar, imageURL);

  useEffect(
    () => setSaving({ isSuccess: false, isSaving: false, isError: false }),
    [compressedAvatar, setSaving]
  );

  return (
    <div className="flex flex-col gap-4 md:gap-6 px-2 md:px-0 pb-2">
      <div className="flex items-center gap-4 w-36">
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
              type="button"
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
          {compressedAvatar !== undefined ? (
            <SaveButton
              saving={saving}
              handleAvatarChange={() =>
                changeAvatar(compressedAvatar, updateUserCache, documentId)
              }
            />
          ) : (
            <Button
              type="button"
              className="rounded-2xl"
              onClick={() => open()}
            >
              Выбрать
            </Button>
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
      className="rounded-2xl"
      type="button"
    >
      {defaultState && <>Обновить аватар</>}
      {isLoading && (
        <>
          <Loader2 className="animate-spin" />
          Сохранение...
        </>
      )}
      {isSuccess && (
        <>
          <Check />
          Аватар обновлен
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
