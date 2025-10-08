import type { CollaboratorType } from "@/features/collaborators/model/types";
import type { UserDocumentType } from "@/shared/model/types";
import { useUsers } from "@/shared/model/user/useUsers";
import { ScrollArea } from "@/shared/ui/kit/scroll-area";
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
  const { users, isLoading, error } = useUsers(
    searchString ? [searchString] : null
  );

  const roleMap = new Map(collaborators?.map((c) => [c.userId, c.roles]));
  const reversedCollaborators = collaborators?.slice().reverse();

  // дефолтное отображение всех соавторов
  if (!searchString) {
    if (collaboratorsLoading)
      return (
        <div className="flex justify-center items-center bg-background p-4 rounded-sm">
          Загрузка...
        </div>
      );

    if (collaboratorsError)
      return (
        <div className="flex justify-center items-center bg-background p-4 rounded-sm">
          Ошибка
        </div>
      );

    if (reversedCollaborators)
      return (
        <ScrollArea className="max-h-[16rem]">
          <div className="space-y-4 px-2">
            {reversedCollaborators.map((c) => (
              <Collaborator
                key={c.userId}
                avatarURL={c.avatarURL}
                userId={c.userId}
                userName={c.userName}
                userEmail={c.userEmail}
                roles={c.roles}
              />
            ))}
          </div>
        </ScrollArea>
      );
  }

  // результаты поиска
  if (searchString) {
    if (isLoading) return <>Загрузка...</>;
    if (error) return <>Не удалось загрузить пользователей ☹️</>;
    if (users?.length === 0) return <>Пользователь не найден 😶</>;

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
}
