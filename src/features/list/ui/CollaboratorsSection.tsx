import { wishlistFormSchema as formSchema } from "@/shared/model/formSchemas";
import type { WishlistDocumentType } from "@/shared/model/types";
import AvatarsGroup from "@/shared/ui/AvatarsGroup";
import { FormLabel } from "@/shared/ui/kit/form";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CollaboratorsDialog } from "../CollaboratorsDialog";

type CollaboratorsSectionProps = {
  wishlist: WishlistDocumentType;
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function CollaboratorsSection({
  wishlist,
  form,
}: CollaboratorsSectionProps) {
  const isPrivate = form.watch("isPrivate");

  const users = useMemo(
    () => [wishlist.owner, ...wishlist.collaborators],
    [wishlist.owner, wishlist.collaborators]
  );

  return (
    <div className="space-y-3 mt-6">
      <FormLabel>Соавторы списка</FormLabel>
      <div className="flex items-baseline gap-2">
        <AvatarsGroup users={users} size={8} maxCount={4} />
        <CollaboratorsDialog wishlist={wishlist} isPrivateChecked={isPrivate} />
      </div>
    </div>
  );
}
