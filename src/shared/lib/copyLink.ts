import { toast } from "sonner";

export async function copyLink(link: string) {
  try {
    await navigator.clipboard.writeText(link);
    toast.success("Ссылка скопирована в буфер обмена");
  } catch {
    toast.error("Не удалось скопировать ссылку");
  }
}
