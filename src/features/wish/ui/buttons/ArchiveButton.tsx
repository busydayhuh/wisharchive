import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { ArchiveRestore, Smile } from "lucide-react";

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
      className={cn(
        "shadow-none px-4.5 md:px-6.5 py-3 md:py-5 rounded-xl",
        className
      )}
    >
      {isArchived ? <ArchiveRestore /> : <Smile />}
      {isArchived ? "Вернуть из архива" : "Уже подарили"}
    </Button>
  );
}
