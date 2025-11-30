import {
  CollaboratorsGroup,
  useCollaboratorsDialog,
  useDashboardCollaborators,
} from "@/features/collaborators";
import { Button } from "@/shared/ui/kit/button";
import { PlusIcon } from "lucide-react";

type CollaboratorsProps = {
  wishlistId: string;
  ownerId: string;
  isPrivate: boolean;
  editors: string[];
  readers: string[];
  isOwner: boolean;
};

export function Collaborators({
  wishlistId,
  ownerId,
  isPrivate,
  editors,
  readers,
  isOwner,
}: CollaboratorsProps) {
  const { collaborators, isLoading, error } = useDashboardCollaborators(
    ownerId,
    editors,
    readers
  );
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
