import {
  CollaboratorsAvatars,
  useCollaboratorsDialog,
  useTeamCollaborators,
} from "@/features/collaborators";
import { Button } from "@/shared/ui/kit/button";
import { PlusIcon } from "lucide-react";

export function WishlistCollaborators({
  wishlistId,
  isPrivate,
}: {
  wishlistId: string;
  isPrivate: boolean;
}) {
  const { collaborators, isLoading, error } = useTeamCollaborators(wishlistId);
  const { openCollabDialog } = useCollaboratorsDialog();

  if (collaborators)
    return (
      <div className="flex items-center gap-2">
        <CollaboratorsAvatars
          collaborators={collaborators}
          isLoading={isLoading}
          error={error}
          maxVisible={5}
          size="md"
        />
        <Button
          type="button"
          variant="ghost"
          className="bg-transparent rounded-full w-8 h-8"
          onClick={() => openCollabDialog(wishlistId, isPrivate)}
        >
          <PlusIcon />
        </Button>
      </div>
    );
}
