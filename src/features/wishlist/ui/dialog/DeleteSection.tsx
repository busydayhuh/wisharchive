import DeleteButton from "@/shared/ui/DeleteButton";
import { wishlistMutations } from "../../model/wishlistMutations";

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
  //const [confirmOpen, setConfirmOpen] = useState(false);

  async function onConfirm() {
    await wishlistMutations.delete(wishlistId);
    setDialogOpen(false);
  }

  return (
    // <>
    //   <div className="flex flex-col gap-2 mt-6">
    //     <Button
    //       type="button"
    //       variant="ghost"
    //       className="hover:bg-transparent has-[>svg]:px-0 w-fit hover:text-red-600"
    //       onClick={(e) => {
    //         e.preventDefault();
    //         setConfirmOpen(true);
    //       }}
    //     >
    //       <Trash2 />
    //       Удалить вишлист
    //     </Button>
    //   </div>
    //   <ConfirmationDialog
    //     open={confirmOpen}
    //     onOpenChange={setConfirmOpen}
    //     title="Удалить вишлист?"
    //     description={
    //       <>
    //         Вы уверены, что хотите удалить вишлист{" "}
    //         <span className="font-medium">{wishlistTitle}</span>? Это действие
    //         нельзя отменить.
    //       </>
    //     }
    //     actionText="Удалить вишлист"
    //     onConfirm={onConfirm}
    //   />
    // </>
    <DeleteButton
      variant="button"
      wishTitle={wishlistTitle}
      action={onConfirm}
      buttonText="Удалить вишлист"
    />
  );
}
