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
}: CollaboratorType) {
  const { addMember } = useCollaboratorsContext();

  const isOwner = roles?.includes("owner");

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

      {roles ? (
        <Button
          size="sm"
          className={cn(
            "bg-muted hover:bg-muted/60 ms-auto rounded-2xl text-muted-foreground",
            isOwner && "hidden"
          )}
          disabled={isOwner}
        >
          Исключить
        </Button>
      ) : (
        <Button
          type="button"
          size="sm"
          className="ms-auto rounded-2xl"
          onClick={() => addMember(userId, userEmail)}
        >
          Пригласить
        </Button>
      )}
    </div>
  );
}
