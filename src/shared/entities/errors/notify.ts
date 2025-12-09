import { customToast } from "@/shared/ui/components/CustomToast";
import { toast } from "sonner";

export const notifyError = (
  message: string,
  description = "Повторите попытку позже"
) => toast.error(message, { description });

export const notifySuccessSimple = (message: string, description?: string) =>
  toast.success(message, { description });

export const notifySuccessExpanded = (
  message: string,
  title: string,
  imageURL?: string,
  button?: {
    label?: string;
    onClick?: () => void;
  }
) =>
  customToast({ title: message, description: title, icon: imageURL, button });
