import {
  notifyError,
  notifySuccessSimple,
} from "@/shared/entities/errors/notify";
import { useState } from "react";
import useMembershipMutations from "../../model/hooks/useMembershipMutations";
import { useTeamCollaborators } from "../../model/hooks/useTeamCollaborators";
import {
  CollaboratorsManager as ManagerContext,
  type SelectedRole,
} from "../../model/store/collab-manager/Context";
import { CollaboratorSearch } from "./CollaboratorSearch";
import CollaboratorsList from "./CollaboratorsList";
import RoleSelect from "./RoleSelect";

function CollaboratorsManager({
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
      notifyError("Не удалось добавить пользователя");
      return;
    }
    notifySuccessSimple(
      "Приглашение отправлено",
      `${userId} приглашён как ${
        selectedRole === "editors" ? "редактор" : "читатель"
      }`
    );
  };

  const onDeleteMember = async (userId: string) => {
    const { ok } = await deleteMember(userId);
    if (!ok) {
      notifyError("Не удалось удалить пользователя");
      return;
    }
    notifySuccessSimple(`${userId} удален из команды списка`);
  };

  return (
    <ManagerContext.Provider
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
    </ManagerContext.Provider>
  );
}

export default CollaboratorsManager;
