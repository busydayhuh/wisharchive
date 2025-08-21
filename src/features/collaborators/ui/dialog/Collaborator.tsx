import type { CollaboratorType } from "@/features/collaborators/model/useCollaborators";
import { cn } from "@/shared/lib/css";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
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
      <Avatar className="rounded-full size-8">
        <AvatarImage src={avatarURL} alt={userId} />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="font-medium text-sm md:text-base">{userName}</span>
        <span className="text-ring text-xs md:text-sm leading-tight">
          {roles ? roleName(roles) : null}
        </span>
      </div>

      {isConfirmed && !isOwner && (
        <Button
          size="sm"
          className={cn(
            "bg-muted-foreground hover:bg-muted-foreground/60 ms-auto rounded-lg text-foreground"
          )}
          onClick={(e) => {
            e.preventDefault();
            deleteMember(userId);
          }}
        >
          Исключить
        </Button>
      )}

      {isInvited && !isOwner && (
        <Button
          size="sm"
          variant="destructive"
          className={cn("ms-auto rounded-lg")}
          disabled
        >
          Приглашён
        </Button>
      )}

      {!roles && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="ms-auto rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            addMember(userId, userEmail);
          }}
        >
          Пригласить
        </Button>
      )}
    </div>
  );
}
