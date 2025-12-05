import type { CollaboratorType } from "@/features/collaborators";
import {
  CollaboratorsGroup,
  useCollaboratorsDialog,
} from "@/features/collaborators";
import { Button } from "@/shared/ui/kit/button";
import { PlusIcon } from "lucide-react";

type CollaboratorsProps = {
  wishlistId: string;
  isPrivate: boolean;
  collaborators?: CollaboratorType[];
  isLoading: boolean;
  error?: Error;
  isOwner: boolean;
};

export function Collaborators({
  wishlistId,
  collaborators,
  isLoading,
  error,
  isPrivate,
  isOwner,
}: CollaboratorsProps) {
  const { openCollabDialog } = useCollaboratorsDialog();

  if (collaborators)
    return (
      <div className="flex items-center gap-2">
        <CollaboratorsGroup
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
            className="bg-transparent w-8 h-8"
            onClick={() => openCollabDialog(wishlistId, isPrivate)}
          >
            <PlusIcon />
          </Button>
        )}
      </div>
    );
}
