import { Button, buttonVariants } from "@/shared/ui/kit/button";
import type { VariantProps } from "class-variance-authority";
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

function BackButton({ children, ...props }: BackButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    return navigate(-1);
  }
  return (
    <>
      <Button onClick={handleClick} {...props} size="lg">
        {children}
      </Button>
    </>
  );
}

export default BackButton;
