import { cn } from "@/shared/lib/css";
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
} from "lucide-react";
import { useCallback, useState } from "react";
import useProfileMutations from "./model/useProfileMutations";

export function ProfileImageUploader({
  imageURL,
  userId,
  documentId,
  name,
}: {
  imageURL?: string;
  userId: string;
  documentId: string;
  name: string;
}) {
  const [compressedAvatar, setCompressedAvatar] = useState<
    File | null | undefined
  >();
  const [saving, setSaving] = useState({ success: false, isSaving: false });

  const { changeAvatar } = useProfileMutations();

  const handleAvatarChange = useCallback(async () => {
    setSaving({ success: false, isSaving: true });

    if (!compressedAvatar) {
      const response = await changeAvatar(null, documentId);
      if (response.status === "ok")
        setSaving({ success: true, isSaving: false });
      return;
    }

    const uploadedURL = await uploadToStorage(compressedAvatar);
    if (uploadedURL) {
      const response = await changeAvatar(uploadedURL, documentId);
      if (response.status === "ok")
        setSaving({ success: true, isSaving: false });
    }
  }, [changeAvatar, compressedAvatar, documentId]);

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
    <div className="flex flex-col gap-5">
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
            <div className="group/avatar relative rounded-full hover:outline-2 hover:outline-muted w-fit overflow-clip cursor-pointer">
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
        {compressedAvatar !== undefined && !errorMessages && (
          <Button
            disabled={saving.isSaving || saving.success}
            variant={saving.success ? "ghost" : "default"}
            onClick={handleAvatarChange}
          >
            {saving.isSaving && <Loader2 className="animate-spin" />}
            {saving.success && <Check />}
            {saving.success ? "Сохранено" : "Сохранить"}
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
  );
}
