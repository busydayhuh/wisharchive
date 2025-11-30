import type { CollaboratorType } from "@/features/collaborators/model/types";
import type { UserDocumentType } from "@/shared/model/types";
import { useUsers } from "@/shared/model/user/useUsers";
import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import { Frown, Loader2, Wind } from "lucide-react";
import Collaborator from "./Collaborator";

export default function CollaboratorsList({
  searchString,
  collaborators,
  collaboratorsLoading,
  collaboratorsError,
}: {
  searchString: string;
  collaboratorsLoading?: boolean;
  collaboratorsError?: Error;
  collaborators?: CollaboratorType[];
}) {
  const {
    users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers(searchString ? [searchString] : null);

  const roleMap = new Map(collaborators?.map((c) => [c.userId, c.roles]));
  const reversedCollaborators = collaborators?.slice().reverse();

  if (collaboratorsLoading || usersLoading)
    return (
      <div className="flex justify-center items-center bg-background p-4 rounded-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
      </div>
    );

  if (collaboratorsError || usersError)
    return (
      <div className="flex justify-center items-center gap-2 bg-background p-4 rounded-sm text-muted-foreground">
        <Frown className="size-4" />
        Ошибка
      </div>
    );

  if (!searchString && reversedCollaborators)
    return <CurrentCollaborators collabs={reversedCollaborators} />;

  if (searchString && users)
    return <SearchResults users={users} roleMap={roleMap} />;
}

function CurrentCollaborators({ collabs }: { collabs: CollaboratorType[] }) {
  return (
    <ScrollArea className="max-h-[16rem]">
      <div className="space-y-4 px-2">
        {collabs.map((c) => (
          <Collaborator
            key={c.userId}
            avatarURL={c.avatarURL}
            userId={c.userId}
            userName={c.userName}
            userEmail={c.userEmail}
            roles={c.roles}
            confirm={c.confirm}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

function SearchResults({
  users,
  roleMap,
}: {
  users: UserDocumentType[];
  roleMap: Map<string, string[] | undefined>;
}) {
  if (users?.length === 0)
    return (
      <div className="flex justify-center items-center gap-2 bg-background p-4 rounded-sm text-muted-foreground">
        <Wind className="size-4" />
        Пользователь не найден
      </div>
    );

  return (
    <ScrollArea className="max-h-[16rem]">
      <div className="space-y-4 px-2">
        {users?.map((user: UserDocumentType) => {
          return (
            <Collaborator
              key={user.userId}
              avatarURL={user.avatarURL}
              userId={user.userId}
              userName={user.userName}
              userEmail={user.userEmail}
              roles={roleMap.get(user.userId) ?? undefined}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}
