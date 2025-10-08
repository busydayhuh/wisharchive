import { useState } from "react";
import { CollaboratorsPanelContext } from "../../model/CollaboratorsPanelContext";
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
  const [selectedRole, setSelectedRole] = useState("editors");
  const [searchString, setSearchString] = useState("");

  const { collaborators, isLoading, error } = useTeamCollaborators(wishlistId);

  const { addMemberAsEditor, addMemberAsReader, deleteMember } =
    useMembershipMutations(wishlistId);

  const addMember = async (userId: string, userEmail: string) => {
    const newMembership =
      selectedRole === "editors"
        ? await addMemberAsEditor(userEmail, userId)
        : await addMemberAsReader(userEmail, userId);

    return newMembership;
  };

  return (
    <CollaboratorsPanelContext.Provider
      value={{
        wishlistId,
        selectedRole,
        setSelectedRole,
        addMember,
        deleteMember,
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
