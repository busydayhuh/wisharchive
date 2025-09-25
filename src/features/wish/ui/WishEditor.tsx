import type { wishFormSchema } from "@/shared/model/formSchemas";
import type { WishDocumentType } from "@/shared/model/types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type z from "zod";
import { uploadToStorage } from "../model/uploadToStorage";
import BackButton from "./buttons/BackButton";
import WishForm from "./WishForm";
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

  return (
    <WishLayout
      backSlot={
        <BackButton
          children={<ArrowLeft />}
          size="icon"
          variant="ghost"
          className="rounded-full"
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
  );
}

export default WishEditor;
