import { useCollaborators } from "@/features/collaborators/model/useCollaborators";
import useMembershipMutations from "@/shared/model/membership/useMembershipMutations";
import type { Setter } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { FormLabel } from "@/shared/ui/kit/form";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import Searchbar from "../../../../shared/ui/Searchbar";
import {
  CollaboratorsContext,
  type SelectedRole,
} from "../../model/CollaboratorsContext";
import CollaboratorsList from "./CollaboratorsList";
import RoleSelect from "./RoleSelect";

type CollaboratorsDialogProps = {
  wishlistId: string;
  isPrivateChecked?: boolean;
};

export function CollaboratorsDialog({
  wishlistId,
  isPrivateChecked = false,
}: CollaboratorsDialogProps) {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>("editors");
  const [searchString, setSearchString] = useState("");

  const { collaborators, isLoading, error } = useCollaborators(wishlistId);
  const { addMemberAsEditor } = useMembershipMutations(wishlistId);

  const addMember = async (userId: string, userEmail: string) => {
    if (selectedRole === "editors") {
      const newMembership = await addMemberAsEditor(
        wishlistId,
        userEmail,
        userId
      );

      return newMembership;
    }
  };

  if (isLoading) return <div>Загрузка...</div>; // TODO скелетон
  if (error) {
    alert("Что-то пошло не так");
    return null;
  } // TODO тост ошибки

  if (collaborators)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="bg-transparent rounded-full w-8 h-8"
          >
            <PlusIcon />
          </Button>
        </DialogTrigger>

        <DialogContent className="rounded-2xl sm:max-w-md">
          <CollaboratorsContext.Provider
            value={{ wishlistId, selectedRole, setSelectedRole, addMember }}
          >
            <DialogHeader className="mb-3">
              <DialogTitle>Изменить список соавторов</DialogTitle>
              <DialogDescription className="sr-only">
                Добавьте редакторов или читателей в список
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6">
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
              <DialogClose asChild>
                <Button type="button" className="rounded-xl">
                  Готово
                </Button>
              </DialogClose>
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
    <div className="space-y-3">
      <FormLabel>Найти пользователя по имени или никнейму</FormLabel>
      <Searchbar
        searchString={searchString}
        setSearchString={setSearchString}
        grow={false}
        className="[&_input]:h-10"
      />
    </div>
  );
}
