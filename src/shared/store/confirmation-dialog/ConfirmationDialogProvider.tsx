import ConfirmationDialog from "@/shared/ui/components/ConfirmationDialog";
import { useCallback, useState, type ReactNode } from "react";
import { ConfirmationDialogContext } from "./Context";
import { getConfirmationText } from "./getConfirmationText";

export type Action = "delete" | "archive" | "book" | "edit" | "deactivate";

export type OpenConfDialogProps = {
  action?: Action;
  onConfirm: () => void;
  name?: string;
  isActive?: boolean;
  isOwner?: boolean;
};

export type ConfirmationTextType = {
  title: string;
  description: ReactNode;
  actionText: string;
};

type ConfirmationDialogStateType = {
  open: boolean;
} & ConfirmationTextType &
  OpenConfDialogProps;

export function ConfirmationDialogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dialogState, setDialogState] =
    useState<ConfirmationDialogStateType | null>(null);

  const openConfDialog = useCallback((props: OpenConfDialogProps) => {
    const dialogText = getConfirmationText(
      props.action,
      props.name,
      props.isActive,
      props.isOwner
    );
    if (dialogText)
      setDialogState({ ...dialogText, open: true, onConfirm: props.onConfirm });
  }, []);

  const closeConfDialog = useCallback(() => {
    setDialogState((prev) => (prev ? { ...prev, open: false } : null));
  }, []);

  return (
    <ConfirmationDialogContext.Provider
      value={{ openConfDialog, closeConfDialog }}
    >
      {children}

      {dialogState && (
        <ConfirmationDialog {...dialogState} onCancel={closeConfDialog} />
      )}
    </ConfirmationDialogContext.Provider>
  );
}
