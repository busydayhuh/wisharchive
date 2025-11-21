import { appwriteService } from "@/shared/model/appwrite";
import { CONFIG } from "@/shared/model/config";
import { ID } from "appwrite";
import { handleError } from "./handleError";

export async function uploadToStorage(blob: File) {
  const bucketId = CONFIG.APPWRITE_STORAGE_BUCKET;
  const file = new File([blob], blob.name, { type: blob.type });

  try {
    const uploadedFile = await appwriteService.storage.createFile(
      bucketId,
      ID.unique(),
      file
    );

    return {
      ok: true,
      response: appwriteService.storage.getFileView(bucketId, uploadedFile.$id),
    };
  } catch (error) {
    console.log("Не удалось загрузить файл");
    return handleError(error);
  }
}
