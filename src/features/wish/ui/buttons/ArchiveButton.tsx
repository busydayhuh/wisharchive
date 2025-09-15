import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { ArchiveRestore } from "lucide-react";

export function ArchiveButton({
  // wishId,
  onClick,
  isArchived,
  className,
}: {
  wishId: string;
  isArchived: boolean;
  onClick?: () => void;
} & React.ComponentProps<"div">) {
  return (
    <Button
      variant={isArchived ? "secondary" : "destructive"}
      onClick={onClick}
      size="lg"
      className={cn("shadow-none py-6", className)}
    >
      {isArchived ? <ArchiveRestore /> : null}
      {isArchived ? "Вернуть из архива" : "Исполнено"}
    </Button>
  );
}
