import type { CollaboratorType } from "@/features/collaborators/model/types";
import { cn } from "@/shared/lib/css";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import { Loader2, MailCheck, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCollaboratorsDialogContext } from "../../model/CollaboratorsPanelContext";

export default function Collaborator({
  avatarURL,
  userId,
  userName,
  userEmail,
  roles,
  confirm,
}: CollaboratorType) {
  const isOwner = roles?.includes("owner") ?? false;
  const isConfirmed = (roles && confirm) ?? false;
  const isInvited = (roles && !confirm) ?? false;

  const roleName = (roles: string[]) => {
    if (isOwner) return "Владелец";
    if (roles.includes("editors")) return "Редактор";
    return "Читатель";
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar className="rounded-full w-10 h-10">
        <AvatarImage src={avatarURL ?? undefined} alt={userId} />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="font-medium text-sm md:text-base">{userName}</span>
        <span className="text-muted-foreground text-xs leading-tight">
          {roles ? roleName(roles) : null}
        </span>
      </div>

      <CollaboratorActionButton
        userId={userId}
        userEmail={userEmail}
        isOwner={isOwner}
        isConfirmed={isConfirmed}
        isInvited={isInvited}
      />
    </div>
  );
}

function CollaboratorActionButton({
  userId,
  userEmail,
  isOwner,
  isConfirmed,
  isInvited,
}: Pick<CollaboratorType, "userEmail" | "userId"> & {
  isOwner: boolean;
  isConfirmed: boolean;
  isInvited: boolean;
}) {
  const { addMember, deleteMember } = useCollaboratorsDialogContext();
  const [loading, setLoading] = useState(false);
  const variant = isConfirmed ? "remove" : isInvited ? "invited" : "add";

  const variants = {
    remove: {
      icon: <Trash2 />,
      text: "Исключить",
      action: "remove",
      disabled: loading,
      styles:
        "bg-muted-foreground hover:bg-muted-foreground/60  text-foreground",
    },
    invited: {
      icon: <MailCheck />,
      text: "Приглашён",
      action: null,
      disabled: true,
    },
    add: {
      icon: <Plus />,
      text: "Пригласить",
      action: "add",
      disabled: loading,
    },
  };

  async function handleMembershipChange(
    e: React.MouseEvent,
    action: "remove" | "add" | "invited"
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (action === "invited") return;

    setLoading(true);

    try {
      if (action === "remove") await deleteMember(userId);
      if (action === "add") await addMember(userId, userEmail);
    } finally {
      setLoading(false);
    }
  }

  if (!isOwner)
    return (
      <Button
        type="button"
        variant={variant === "remove" ? "default" : "destructive"}
        size="default"
        className={cn(
          "ms-auto rounded-sm w-9 md:w-auto h-9 md:h-11",
          variant === "remove" &&
            "bg-muted-foreground hover:bg-muted-foreground/60  text-foreground"
        )}
        onClick={(e) => handleMembershipChange(e, variant)}
        disabled={variants[variant].disabled}
      >
        <span className="md:hidden">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            variants[variant].icon
          )}
        </span>
        <span className="hidden md:inline">{variants[variant].text}</span>
      </Button>
    );
}
