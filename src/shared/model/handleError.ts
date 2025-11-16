import { AppwriteException } from "appwrite";

export type ResponseType = { ok: boolean; errorMessage?: string };

export function handleError(err: unknown): ResponseType {
  if (err instanceof AppwriteException) {
    console.error(err);
    return { ok: false, errorMessage: err.message };
  }
  console.error("Unknown error", err);
  return { ok: false, errorMessage: "Unknown error" };
}
