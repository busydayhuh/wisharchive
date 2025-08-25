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

type ConfirmationDialogProps = {
  title: string;
  description: ReactNode;
  actionText: string;
  onConfirm: () => void;

  open: boolean;
  onOpenChange: Setter<boolean>;
};

function ConfirmationDialog({
  title,
  description,
  actionText,
  onConfirm,
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
          <AlertDialogCancel className="bg-muted hover:bg-muted/60 shadow-none border-0">
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmationDialog;
