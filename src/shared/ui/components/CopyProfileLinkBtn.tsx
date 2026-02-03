import { LinkIcon } from "lucide-react";
import { copyLink } from "../../utils/copyLink";
import { Button } from "../kit/button";

export function CopyProfileLinkBtn({
  text,
  userId,
  variant,
  size,
}: {
  text?: string;
  userId: string;
  variant: "secondary" | "default" | "ghost";
  size?: "sm" | "default";
}) {
  return (
    <Button
      variant={variant}
      onClick={() =>
        copyLink(`${window.location.origin}/wisharchive/#/${userId}`)
      }
      className="w-fit"
      size={size || "default"}
    >
      <LinkIcon />
      {text || "Копировать ссылку"}
    </Button>
  );
}
