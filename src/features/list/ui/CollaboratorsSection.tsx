import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
import type { UserDocumentType } from "@/shared/model/types";
import AvatarsGroup from "@/shared/ui/AvatarsGroup";
import { FormLabel } from "@/shared/ui/kit/form";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import CollaboratorsDialog from "./CollaboratorsDialog";

type CollaboratorsSectionProps = {
  wishlistId: string;
  owner: UserDocumentType;
  collaborators: UserDocumentType[] | null;
  isPrivate: boolean;
  form?: UseFormReturn<z.infer<typeof formSchema>>;
};

export function CollaboratorsSection({
  wishlistId,
  owner,
  collaborators,
  isPrivate,
  form,
}: CollaboratorsSectionProps) {
  const users = useMemo(
    () => [owner, ...(collaborators ?? [])],
    [owner, collaborators]
  );

  const isPrivateChecked = form?.watch("isPrivate") ?? isPrivate;

  return (
    <div className="space-y-3 mt-6">
      <FormLabel>Соавторы списка</FormLabel>
      <div className="flex items-baseline gap-2">
        <AvatarsGroup users={users} size={8} maxCount={4} />
        <CollaboratorsDialog
          isPrivateChecked={isPrivateChecked}
          wishlistId={wishlistId}
        />
      </div>
    </div>
  );
}
