import { useState } from "react";
import { toast } from "sonner";
import {
  CollaboratorsPanelContext,
  type SelectedRole,
} from "../../model/CollaboratorsPanelContext";
import useMembershipMutations from "../../model/membership/useMembershipMutations";
import { useTeamCollaborators } from "../../model/team-api-hooks/useTeamCollaborators";
import { CollaboratorSearch } from "./CollaboratorSearch";
import CollaboratorsList from "./CollaboratorsList";
import RoleSelect from "./RoleSelect";

function CollaboratorsPanel({
  wishlistId,
  isPrivateChecked,
}: {
  wishlistId: string;
  isPrivateChecked: boolean;
}) {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>("editors");
  const [searchString, setSearchString] = useState("");

  const { collaborators, isLoading, error } = useTeamCollaborators(wishlistId);
  const { addMember, deleteMember } = useMembershipMutations(wishlistId);

  const onAddMember = async (userId: string, userEmail: string) => {
    const { ok } = await addMember(userEmail, userId, selectedRole);

    if (!ok) {
      toast.error("Не удалось добавить пользователя", {
        description: "Повторите попытку позже",
      });
      return;
    }

    toast.success("Приглашение отправлено", {
      description: `${userId} приглашён как ${
        selectedRole === "editors" ? "редактор" : "читатель"
      }`,
    });
  };

  const onDeleteMember = async (userId: string) => {
    const { ok } = await deleteMember(userId);

    if (!ok) {
      toast.error("Не удалось удалить пользователя", {
        description: "Повторите попытку позже",
      });
      return;
    }

    toast.success(`${userId} удален из команды списка`);
  };

  return (
    <CollaboratorsPanelContext.Provider
      value={{
        wishlistId,
        selectedRole,
        setSelectedRole,
        onAddMember,
        onDeleteMember,
      }}
    >
      <div className="flex flex-col gap-6 lg:gap-8">
        <RoleSelect isPrivateChecked={isPrivateChecked} />

        <CollaboratorSearch
          searchString={searchString}
          setSearchString={setSearchString}
        />

        <CollaboratorsList
          searchString={searchString}
          collaborators={collaborators}
          collaboratorsLoading={isLoading}
          collaboratorsError={error}
        />
      </div>
    </CollaboratorsPanelContext.Provider>
  );
}

export default CollaboratorsPanel;
