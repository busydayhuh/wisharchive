import type { Setter } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import imageCompression from "browser-image-compression";
import { ImageDown, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  useDropzone,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone";

function WishImageUpload({
  storageURL,
  setCompressedImage,
}: {
  storageURL?: string | null;
  setCompressedImage: Setter<File | null | undefined>;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);

  // Если у желания уже есть картинка, показываем её в превью
  useEffect(() => {
    if (storageURL) setPreview(storageURL);
  }, [storageURL]);

  // Очищаем ссылку на прошлое превью из памяти при unmount
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      setProgress(0);
      setErrorMessages(null);

      // Очистка ссылки на прошлое превью, если оно есть
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      try {
        // Попытка сжатия
        const options = {
          maxSizeMB: 1.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (progress: number) => setProgress(progress),
        };
        const compressedFile = await imageCompression(file, options);

        setPreview(URL.createObjectURL(compressedFile));
        setCompressedImage?.(compressedFile);
      } catch {
        // Если сжатие не удалось, передаём оригинальный файл
        setPreview(URL.createObjectURL(file));
        setCompressedImage?.(file);
      }
    },
    [preview, setCompressedImage]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const rejectedFile = fileRejections[0];

    const errorMessages = rejectedFile.errors.map((e) => {
      if (e.code === "file-invalid-type") return "Неверный формат файла!";
      if (e.code === "file-invalid-type") return "Файл слишком тяжелый!";
      return e.message;
    });

    setErrorMessages(errorMessages);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const isCompressing = progress > 0 && progress < 100;

  return (
    <div className="relative space-y-2 mx-auto md:mx-0 mt-2 md:mt-0">
      {preview ? (
        <>
          <Button
            size="icon"
            className="-top-1 -right-2 absolute hover:bg-accent shadow-none rounded-full size-8 cursor-pointer"
            variant="secondary"
            onClick={() => {
              setPreview(null);
              setCompressedImage(null);
            }}
          >
            <X />
          </Button>
          <div className="rounded-3xl md:w-full w-3xs max-h-[16rem] md:max-h-[36rem] 2xl:max-h-[48rem] overflow-clip">
            <img src={preview} className="w-full h-full object-cover" />
          </div>
        </>
      ) : (
        <div
          {...getRootProps({
            className: `border-1 border-dashed border-muted-foreground rounded-3xl md:w-full w-3xs md:aspect-[4/3] aspect-[16/6] flex flex-col gap-3 md:gap-8 items-center justify-center ${
              isDragActive || isCompressing ? "bg-muted" : "bg-muted/60"
            }`,
          })}
        >
          {isCompressing ? (
            <Loader2 className="size-8 md:size-12 text-muted-foreground animate-spin" />
          ) : (
            <>
              <ImageDown className="stroke-1 size-8 md:size-12 text-muted-foreground" />
              <div className="hidden md:block text-muted-foreground text-sm text-center">
                <p className="font-bold">JPG, JPEG, PNG, WEBP</p>
                <p>МАКС: 10МБ</p>
              </div>
            </>
          )}
          <input {...getInputProps()} id="image-dropzone" />
        </div>
      )}
      <div className="text-red-700 text-sm text-center">
        {errorMessages && errorMessages.map((m) => <p key={m}>{m}</p>)}
      </div>
    </div>
  );
}

export default WishImageUpload;
