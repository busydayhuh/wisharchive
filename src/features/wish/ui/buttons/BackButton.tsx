import ConfirmationDialog from "@/shared/ui/ConfirmationDialog";
import { Button, buttonVariants } from "@/shared/ui/kit/button";
import type { VariantProps } from "class-variance-authority";
import { useState } from "react";
import { useNavigate } from "react-router";

type BackButtonProps = {
  confirmation?: boolean;
  confDialogProps?: {
    title: string;
    description: string;
    actionText: string;
  };
  children: React.ReactNode;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

function BackButton({
  confirmation = false,
  confDialogProps,
  children,
  ...props
}: BackButtonProps) {
  const [confOpen, setConfOpen] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    if (!confirmation) return navigate(-1);

    setConfOpen(true);
  }
  return (
    <>
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>

      {confDialogProps && (
        <ConfirmationDialog
          title={confDialogProps.title}
          description={confDialogProps.description}
          actionText={confDialogProps.actionText}
          open={confOpen}
          onOpenChange={setConfOpen}
          onConfirm={() => navigate(-1)}
        />
      )}
    </>
  );
}

export default BackButton;
