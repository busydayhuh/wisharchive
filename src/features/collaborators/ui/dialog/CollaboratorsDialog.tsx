import useMembershipMutations from "@/features/collaborators/model/membership/useMembershipMutations";
import { type CollaboratorType } from "@/features/collaborators/model/useCollaborators";
import type { Setter } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import Searchbar from "../../../../shared/ui/Searchbar";
import { CollaboratorsContext } from "../../model/CollaboratorsContext";
import CollaboratorsList from "./CollaboratorsList";
import RoleSelect from "./RoleSelect";

type CollaboratorsDialogProps = {
  collaborators: CollaboratorType[];
  wishlistId: string;
  isPrivateChecked?: boolean;
};

export function CollaboratorsDialog({
  wishlistId,
  isPrivateChecked = false,
  collaborators,
}: CollaboratorsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState("editors");
  const [searchString, setSearchString] = useState("");

  const { addMemberAsEditor, addMemberAsReader, deleteMember } =
    useMembershipMutations(wishlistId);

  const addMember = async (userId: string, userEmail: string) => {
    const newMembership =
      selectedRole === "editors"
        ? await addMemberAsEditor(userEmail, userId)
        : await addMemberAsReader(userEmail, userId);

    return newMembership;
  };

  if (collaborators)
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="bg-transparent rounded-full w-8 h-8"
          >
            <PlusIcon />
          </Button>
        </DialogTrigger>

        <DialogContent className="rounded-xl w-full md:max-w-md">
          <CollaboratorsContext.Provider
            value={{
              wishlistId,
              selectedRole,
              setSelectedRole,
              addMember,
              deleteMember,
            }}
          >
            <DialogHeader className="mb-3">
              <DialogTitle>Изменить список соавторов</DialogTitle>
              <DialogDescription className="sr-only">
                Добавьте редакторов или читателей в список
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 lg:gap-8">
              <RoleSelect isPrivateChecked={isPrivateChecked} />

              <Search
                searchString={searchString}
                setSearchString={setSearchString}
              />

              <CollaboratorsList
                searchString={searchString}
                collaborators={collaborators}
              />
            </div>
            <DialogFooter className="sm:justify-start mt-6">
              <Button size="lg" onClick={() => setIsOpen(false)}>
                Готово
              </Button>
            </DialogFooter>
          </CollaboratorsContext.Provider>
        </DialogContent>
      </Dialog>
    );
}

function Search({
  searchString,
  setSearchString,
}: {
  searchString: string;
  setSearchString: Setter<string>;
}) {
  return (
    <div>
      <span className="inline-block mb-2 font-medium text-muted-foreground text-sm">
        Найти пользователя по имени или никнейму
      </span>
      <Searchbar
        searchString={searchString}
        setSearchString={setSearchString}
        grow={false}
        className="[&_input]:h-12"
      />
    </div>
  );
}
