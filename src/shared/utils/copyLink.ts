import { notifyError, notifySuccessSimple } from "../entities/errors/notify";

export async function copyLink(link: string) {
  try {
    await navigator.clipboard.writeText(link);
    notifySuccessSimple("Ссылка скопирована в буфер обмена");
  } catch {
    notifyError("Не удалось скопировать ссылку");
  }
}
