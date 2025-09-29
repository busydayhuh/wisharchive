import type { CollaboratorType } from "@/features/collaborators/model/useCollaborators";
import { cn } from "@/shared/lib/css";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import { MailCheck, Plus, Trash2 } from "lucide-react";
import { useCollaboratorsContext } from "../../model/CollaboratorsContext";

export default function Collaborator({
  avatarURL,
  userId,
  userName,
  userEmail,
  roles,
  confirm,
}: CollaboratorType) {
  const { addMember, deleteMember } = useCollaboratorsContext();

  const isOwner = roles?.includes("owner");
  const isConfirmed = roles && confirm;
  const isInvited = roles && !confirm;

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

      {isConfirmed && !isOwner && (
        <Button
          type="button"
          size="default"
          className={cn(
            "bg-muted-foreground hover:bg-muted-foreground/60 ms-auto rounded-sm w-9 md:w-auto h-9 md:h-11 text-foreground"
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteMember(userId);
          }}
        >
          <span className="md:hidden">
            <Trash2 />
          </span>
          <span className="hidden md:inline">Исключить</span>
        </Button>
      )}

      {isInvited && !isOwner && (
        <Button
          type="button"
          size="default"
          variant="destructive"
          className={cn("ms-auto rounded-sm w-9 md:w-auto h-9 md:h-11")}
          disabled
        >
          <span className="md:hidden">
            <MailCheck />
          </span>
          <span className="hidden md:inline">Приглашён</span>
        </Button>
      )}

      {!roles && (
        <Button
          type="button"
          variant="destructive"
          size="default"
          className="ms-auto rounded-sm w-9 md:w-auto h-9 md:h-11"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addMember(userId, userEmail);
          }}
        >
          <span className="md:hidden">
            <Plus />
          </span>
          <span className="hidden md:inline">Пригласить</span>
        </Button>
      )}
    </div>
  );
}
