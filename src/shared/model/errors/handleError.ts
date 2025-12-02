import { AppwriteException, type Models } from "appwrite";

export type ResponseType = {
  ok: boolean;
  errorMessage?: string;
  errorType?: string;
  response?: Models.Document;
};

const appwriteErrorsMap = new Map([
  [
    "team_invalid_secret",
    "Ссылка на приглашение неактивна. Получите новое приглашение и попробуйте позже",
  ],
  ["team_invite_mismatch", "Приглашение не принадлежит активному юзеру"],
  ["user_invalid_credentials", "Неверный логин или пароль"],
  ["user_password_mismatch", "Пароли не совпадают"],
  ["user_email_already_exists", "Пользователь с таким email уже существует"],
  ["user_already_exists", "Никнейм занят"],
  ["general_server_error", "Ошибка сервера"],
]);

export function handleError(err: unknown): ResponseType {
  if (err instanceof AppwriteException) {
    console.error(err);
    return {
      ok: false,
      errorMessage: appwriteErrorsMap.get(err.type) || err.message,
      errorType: err.type,
    };
  }
  console.error("Unknown error", err);
  return { ok: false, errorMessage: "Unknown error" };
}
