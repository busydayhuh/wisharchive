import DeleteButton from "@/shared/ui/DeleteButton";
import { FormLabel } from "@/shared/ui/kit/form";
import { toast } from "sonner";
import { useWishlistMutations } from "../../model/hooks/useWishlistMutations";

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

  async function onDelete() {
    const { ok } = await actions.delete(wishlistId);

    if (!ok) {
      toast.error("Не удалось удалить список");
      return;
    }

    toast.success("Список удален", { description: wishlistTitle });
    setDialogOpen(false);
  }

  return (
    <div className="mt-6">
      <FormLabel>Удаление списка</FormLabel>
      <DeleteButton
        variant="button"
        wishTitle={wishlistTitle}
        action={onDelete}
        buttonText="Удалить"
        className="bg-transparent mt-1 md:mt-0 !px-0 h-12"
      />
    </div>
  );
}
