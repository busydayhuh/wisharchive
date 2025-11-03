import imageCompression from "browser-image-compression";
import { useCallback, useEffect, useState } from "react";
import {
  type FileRejection,
  type FileWithPath,
  useDropzone,
} from "react-dropzone";
import type { Setter } from "./types";

function useImageDrop(
  setCompressedImage: Setter<File | null | undefined>,
  storageURL?: string
) {
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
      if (e.code === "file-invalid-type") return "Неверный формат файла";
      if (e.code === "file-invalid-type") return "Файл слишком тяжелый";
      return e.message;
    });

    setErrorMessages(errorMessages);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
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

  return {
    preview,
    setPreview,
    errorMessages,
    getInputProps,
    getRootProps,
    isDragActive,
    open,
    isCompressing,
  };
}

export default useImageDrop;
