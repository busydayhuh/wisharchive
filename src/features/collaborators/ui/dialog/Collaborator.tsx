import { UserAvatar } from "@/shared/ui/components/UserAvatar";
import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/utils/css";
import { Loader2, MailCheck, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCollabManager } from "../../model/store/collab-manager/useCollabManager";
import type { CollaboratorType } from "../../model/types";

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
      <UserAvatar
        size="md"
        avatarURL={avatarURL ?? undefined}
        id={userId}
        name={userName}
      />
      <div className="flex flex-col">
        <p className="font-medium text-sm md:text-base">{userName}</p>
        <p className="text-muted-foreground text-xs leading-tight">
          {roles ? roleName(roles) : null}
        </p>
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
  const { onAddMember, onDeleteMember } = useCollabManager();
  const [loading, setLoading] = useState(false);
  const variant = isConfirmed ? "remove" : isInvited ? "invited" : "add";

  const variants = {
    remove: {
      icon: <Trash2 />,
      text: "Исключить",
      action: "remove",
      disabled: loading,
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
      if (action === "remove") await onDeleteMember(userId);
      if (action === "add") await onAddMember(userId, userEmail);
    } finally {
      setLoading(false);
    }
  }

  if (!isOwner)
    return (
      <Button
        type="button"
        variant="default"
        size="default"
        className={cn(
          "ms-auto rounded-sm w-9 md:w-auto h-9 md:h-11",
          variant === "remove" &&
            "bg-muted hover:bg-muted/60 text-muted-foreground"
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
        <span className="hidden md:inline-flex items-center gap-1.5">
          {loading && <Loader2 className="animate-spin" />}
          {variants[variant].text}
        </span>
      </Button>
    );
}
