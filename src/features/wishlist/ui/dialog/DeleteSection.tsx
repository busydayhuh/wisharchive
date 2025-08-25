import ConfirmationDialog from "@/shared/ui/ConfirmationDialog";
import { Button } from "@/shared/ui/kit/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type DeleteSectionProps = {
  wishlistId: string;
  wishlistTitle: string;
  deleteWishlist: (id: string) => Promise<void>;
  setDialogOpen: (isOpen: boolean) => void;
};

export function DeleteSection({
  wishlistId,
  wishlistTitle,
  deleteWishlist,
  setDialogOpen,
}: DeleteSectionProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function onConfirm() {
    await deleteWishlist(wishlistId);
    setDialogOpen(false);
  }

  return (
    <>
      <div className="flex flex-col gap-2 mt-6">
        <Button
          type="button"
          variant="ghost"
          className="hover:bg-transparent has-[>svg]:px-0 w-fit hover:text-red-600"
          onClick={(e) => {
            e.preventDefault();
            setConfirmOpen(true);
          }}
        >
          <Trash2 />
          Удалить вишлист
        </Button>
      </div>
      <ConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Удалить вишлист?"
        description={
          <>
            Вы уверены, что хотите удалить вишлист{" "}
            <span className="font-medium">{wishlistTitle}</span>? Это действие
            нельзя отменить.
          </>
        }
        actionText="Удалить вишлист"
        onConfirm={onConfirm}
      />
    </>
  );
}
