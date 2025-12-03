import { Loader2 } from "lucide-react";
import { cn } from "../lib/css";
import { Button } from "./kit/button";

export function SubmitBtn({
  text,
  loaderText,
  isSubmitting,
  isDirty = true,
  className,
}: {
  text: string;
  loaderText?: string;
  isSubmitting: boolean;
  isDirty?: boolean;
  className?: string;
}) {
  return (
    <Button
      type="submit"
      size="xl"
      disabled={isSubmitting || !isDirty}
      className={cn("h-14", className)}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" />
          {loaderText || text}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
