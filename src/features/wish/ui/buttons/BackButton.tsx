import ConfirmationDialog from "@/shared/ui/ConfirmationDialog";
import { Button } from "@/shared/ui/kit/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type BackButtonProps = {
  confirmation?: boolean;
  confDialogProps?: {
    title: string;
    description: string;
    actionText: string;
  };
};

function BackButton({
  confirmation = false,
  confDialogProps,
}: BackButtonProps) {
  const [confOpen, setConfOpen] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    if (!confirmation) return navigate(-1);

    setConfOpen(true);
  }
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full"
        onClick={handleClick}
      >
        <ArrowLeft />
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
