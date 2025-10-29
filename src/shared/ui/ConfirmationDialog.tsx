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
import { Button } from "./kit/button";

export type ConfirmationDialogProps = {
  title: string;
  description: ReactNode;
  actionText: string;
  onConfirm: (() => void) | undefined;
  onCancel: () => void;
  open: boolean;
};

function ConfirmationDialog({
  title,
  description,
  actionText,
  onConfirm,
  onCancel,
  open,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="md:mt-6">
          <AlertDialogCancel asChild>
            <Button onClick={onCancel} size="lg" className="cancel-button">
              Отмена
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={onConfirm}
              variant="default"
              size="lg"
              className="h-12"
            >
              {actionText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmationDialog;
