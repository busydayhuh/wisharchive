import {
  CollaboratorsAvatars,
  useCollaboratorsDialog,
  useDashboardCollaborators,
} from "@/features/collaborators";
import { Button } from "@/shared/ui/kit/button";
import { PlusIcon } from "lucide-react";

export function WishlistCollaborators({
  wishlistId,
  isPrivate,
  editors,
  readers,
  isOwner,
}: {
  wishlistId: string;
  isPrivate: boolean;
  editors: string[];
  readers: string[];
  isOwner: boolean;
}) {
  const { collaborators, isLoading, error } = useDashboardCollaborators(
    editors,
    readers
  );
  const { openCollabDialog } = useCollaboratorsDialog();

  console.log(collaborators);

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
        {isOwner && (
          <Button
            type="button"
            variant="ghost"
            className="bg-transparent rounded-full w-8 h-8"
            onClick={() => openCollabDialog(wishlistId, isPrivate)}
          >
            <PlusIcon />
          </Button>
        )}
      </div>
    );
}
