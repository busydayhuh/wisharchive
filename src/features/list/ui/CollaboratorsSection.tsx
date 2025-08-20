import {
  CollaboratorsAvatars,
  CollaboratorsAvatarsSkeleton,
  CollaboratorsDialog,
} from "@/features/collaborators";
import { useCollaborators } from "@/features/collaborators/";
import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
import { FormLabel } from "@/shared/ui/kit/form";
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
  const { collaborators, isLoading, error } = useCollaborators(wishlistId);

  const isPrivateChecked = form?.watch("isPrivate") ?? isPrivate;

  return (
    <div className="space-y-3 mt-6">
      <FormLabel>Соавторы списка</FormLabel>
      {error && <>Не удалось загрузить соавторов</>}

      {isLoading && <CollaboratorsAvatarsSkeleton maxVisible={5} size={8} />}

      {collaborators && (
        <div className="flex items-center gap-2">
          <CollaboratorsAvatars
            collaborators={collaborators}
            maxVisible={5}
            size={8}
          />

          <CollaboratorsDialog
            isPrivateChecked={isPrivateChecked}
            wishlistId={wishlistId}
          />
        </div>
      )}
    </div>
  );
}
