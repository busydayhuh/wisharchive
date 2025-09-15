import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/kit/alert-dialog";
import type { ReactNode } from "react";
import type { Setter } from "../model/types";

export type ConfirmationDialogProps = {
  title: string;
  description: ReactNode;
  actionText: string;
  onConfirm: (() => void) | undefined;
  onCancel?: () => void;

  open: boolean;
  onOpenChange?: Setter<boolean>;
};

function ConfirmationDialog({
  title,
  description,
  actionText,
  onConfirm,
  onCancel,
  open,
  onOpenChange,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-muted hover:bg-muted/60 shadow-none py-6 border-0"
            onClick={onCancel}
          >
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="py-6">
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmationDialog;
