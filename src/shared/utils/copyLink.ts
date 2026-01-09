import { notifyError, notifySuccessSimple } from "../entities/errors/notify";

export async function copyLink(link: string) {
  try {
    await navigator.clipboard.writeText(link);
    notifySuccessSimple("Ссылка скопирована в буфер обмена");
  } catch {
    copyFallback(link);
  }
}

function copyFallback(link: string) {
  const textarea = document.createElement("textarea");
  textarea.value = link;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy"); // fallback для Safari
    notifySuccessSimple("Ссылка скопирована в буфер обмена");
  } catch {
    notifyError("Не удалось скопировать ссылку");
  } finally {
    document.body.removeChild(textarea);
  }
}
