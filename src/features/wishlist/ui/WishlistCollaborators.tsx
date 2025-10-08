import {
  CollaboratorsAvatars,
  useCollaboratorsDialog,
  useTeamCollaborators,
} from "@/features/collaborators";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
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
  const isMobile = useIsMobile();

  if (collaborators)
    return (
      <div className="flex lg:flex-row-reverse items-center gap-2">
        <CollaboratorsAvatars
          collaborators={collaborators}
          isLoading={isLoading}
          error={error}
          maxVisible={5}
          size={isMobile ? "default" : "lg"}
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
