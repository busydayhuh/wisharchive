import type { wishFormSchema } from "@/shared/model/formSchemas";
import type { WishDocumentType } from "@/shared/model/types";
import ConfirmationDialog from "@/shared/ui/ConfirmationDialog";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useBlocker } from "react-router";
import type z from "zod";
import { uploadToStorage } from "../../../shared/model/uploadToStorage";
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
  onSubmit: WishSubmitHandlerType;
  storageImageURL?: string | null;
};

function WishEditor({ wish, onSubmit, storageImageURL }: WishEditorProps) {
  const [newImage, setNewImage] = useState<File | null | undefined>(undefined);
  const [blockNavigate, setBlockNavigate] = useState(true);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname && blockNavigate
  );

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
            onSubmit={async (values, id) => {
              const imageURL = newImage
                ? await uploadToStorage(newImage)
                : storageImageURL;

              await onSubmit({ ...values, imageURL }, id);
            }}
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
