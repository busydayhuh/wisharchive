import type { wishFormSchema } from "@/shared/formSchemas";
import type { WishDocumentType } from "@/shared/types";
import ConfirmationDialog from "@/shared/ui/components/ConfirmationDialog";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useBlocker } from "react-router";
import type z from "zod";
import { uploadToStorage } from "../../../shared/api/uploadToStorage";
import BackButton from "./actions/BackButton";
import { WishForm } from "./wish-form/WishForm";
import WishImageUpload from "./WishImageUpload";
import { WishLayout } from "./WishLayout";

type WishSubmitHandlerType = (
  formData: z.infer<typeof wishFormSchema> & { imageURL?: string | null },
  wishId?: string
) => Promise<void>;

type WishEditorProps = {
  wish?: WishDocumentType;
  saveChanges: WishSubmitHandlerType;
  storageImageURL?: string | null;
};

function WishEditor({ wish, saveChanges, storageImageURL }: WishEditorProps) {
  const [newImage, setNewImage] = useState<File | null | undefined>(undefined);
  const [blockNavigate, setBlockNavigate] = useState(true);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname && blockNavigate
  );

  const saveWishWithImage = async (
    values: z.infer<typeof wishFormSchema>,
    id?: string
  ) => {
    const imageURL = newImage
      ? ((await uploadToStorage(newImage)).response as string)
      : storageImageURL;

    setBlockNavigate(false);
    await saveChanges({ ...values, imageURL }, id);
  };

  return (
    <>
      <WishLayout
        backSlot={
          <BackButton
            children={<ArrowLeft />}
            variant="ghost"
            className="z-1 absolute md:relative"
          />
        }
        imageSlot={
          <WishImageUpload
            storageURL={storageImageURL}
            setCompressedImage={setNewImage}
          />
        }
        infoSlot={
          <WishForm
            setBlockNavigate={setBlockNavigate}
            wish={wish}
            onSubmit={saveWishWithImage}
          />
        }
      />
      {blocker.state === "blocked" && (
        <ConfirmationDialog
          title="Покинуть страницу?"
          description={
            <p>
              Вы точно хотите покинуть эту страницу? Изменения не будут
              сохранены.
            </p>
          }
          actionText="Покинуть"
          onConfirm={() => {
            setBlockNavigate(false);
            blocker.proceed();
          }}
          onCancel={blocker.reset}
          open={true}
        />
      )}
    </>
  );
}

export default WishEditor;
