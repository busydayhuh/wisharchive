import {
  CollaboratorsAvatars,
  useCollaboratorsDialog,
  useTeamCollaborators,
} from "@/features/collaborators";
import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
import { Button } from "@/shared/ui/kit/button";
import { FormLabel } from "@/shared/ui/kit/form";
import { PlusIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type CollaboratorsSectionProps = {
  wishlistId: string;
  isPrivate: boolean;
  form?: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function CollaboratorsSection({
  wishlistId,
  isPrivate,
  form,
}: CollaboratorsSectionProps) {
  const { collaborators, isLoading, error } = useTeamCollaborators(wishlistId);
  const { openCollabDialog } = useCollaboratorsDialog();

  const isPrivateChecked = form?.watch("isPrivate") ?? isPrivate;

  return (
    <div className="space-y-3 mt-6">
      <FormLabel>Соавторы списка</FormLabel>

      {collaborators && (
        <div className="flex items-center gap-2">
          <CollaboratorsAvatars
            collaborators={collaborators}
            isLoading={isLoading}
            error={error}
            maxVisible={5}
            size="default"
          />
          <Button
            type="button"
            variant="ghost"
            className="bg-transparent rounded-full w-8 h-8"
            onClick={() => openCollabDialog(wishlistId, isPrivateChecked)}
          >
            <PlusIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
