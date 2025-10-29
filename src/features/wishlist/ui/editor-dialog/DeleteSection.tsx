import DeleteButton from "@/shared/ui/DeleteButton";
import { FormLabel } from "@/shared/ui/kit/form";
import { useWishlistMutations } from "../../model/useWishlistMutations";

type DeleteSectionProps = {
  wishlistId: string;
  wishlistTitle: string;
  setDialogOpen: (isOpen: boolean) => void;
};

export function DeleteSection({
  wishlistId,
  wishlistTitle,
  setDialogOpen,
}: DeleteSectionProps) {
  const actions = useWishlistMutations();

  async function onConfirm() {
    await actions.delete(wishlistId);
    setDialogOpen(false);
  }

  return (
    <div className="mt-6">
      <FormLabel>Удаление списка</FormLabel>
      <DeleteButton
        variant="button"
        wishTitle={wishlistTitle}
        action={onConfirm}
        buttonText="Удалить вишлист"
        className="mt-2 md:mt-0 h-12"
      />
    </div>
  );
}
