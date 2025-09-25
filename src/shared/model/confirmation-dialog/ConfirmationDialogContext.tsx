import ConfirmationDialog from "@/shared/ui/ConfirmationDialog";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { getConfirmationText } from "./getConfirmationText";

export type Action = "delete" | "archive" | "book" | "edit";

type OpenConfDialogProps = {
  action?: Action;
  onConfirm: () => void;
  name?: string;
  isActive?: boolean;
};

type ConfirmationDialogContextType = {
  openConfDialog: (props: OpenConfDialogProps) => void;
  closeConfDialog: () => void;
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

const ConfirmationDialogContext =
  createContext<ConfirmationDialogContextType | null>(null);

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
      props.isActive
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

export function useConfirmationDialog() {
  const ctx = useContext(ConfirmationDialogContext);

  if (!ctx)
    throw new Error(
      "useConfirmationDialogProvider должен использоваться только внутри ConfirmationDialogProvider"
    );

  return ctx;
}
