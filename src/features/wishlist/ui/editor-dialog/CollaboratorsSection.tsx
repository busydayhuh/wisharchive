import {
  CollaboratorsAvatars,
  useCollaboratorsDialog,
  useDashboardCollaborators,
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
  editors: string[];
  readers: string[];
  ownerId: string;
  form?: UseFormReturn<z.infer<typeof formSchema>>;
  isOwner: boolean;
};

export default function CollaboratorsSection({
  wishlistId,
  isPrivate,
  editors = [],
  readers = [],
  ownerId,
  form,
  isOwner,
}: CollaboratorsSectionProps) {
  const { collaborators, isLoading, error } = useDashboardCollaborators(
    ownerId,
    editors,
    readers
  );
  const { openCollabDialog } = useCollaboratorsDialog();

  const isPrivateChecked = form?.watch("isPrivate") ?? isPrivate;

  return (
    <div className="mt-6">
      <FormLabel className="mb-3">Соавторы списка</FormLabel>

      <div className="flex items-center gap-2">
        <CollaboratorsAvatars
          collaborators={collaborators}
          isLoading={isLoading}
          error={error}
          maxVisible={5}
          size="md"
        />
        {isOwner && (
          <Button
            type="button"
            variant="ghost"
            className="bg-transparent rounded-full w-8 h-8"
            onClick={() => openCollabDialog(wishlistId, isPrivateChecked)}
          >
            <PlusIcon />
          </Button>
        )}
        {!isOwner && (
          <p className="text-muted-foreground text-xs">
            Только владелец может редактировать список соавторов
          </p>
        )}
      </div>
    </div>
  );
}
