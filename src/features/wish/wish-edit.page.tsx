import type { wishFormSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { href, useNavigate, useParams } from "react-router";
import type z from "zod";
import { useAuth } from "../auth";
import { uploadToStorage } from "./model/uploadToStorage";
import { useWish } from "./model/useWish";
import { wishMutations } from "./model/wishMutations";
import BackButton from "./ui/buttons/BackButton";
import WishForm from "./ui/WishForm";
import WishImageUpload from "./ui/WishImageUpload";
import { WishLayout } from "./ui/WishLayout";

function WishEditPage() {
  const { current: authUser } = useAuth();
  const navigate = useNavigate();

  const { wishId } = useParams();
  const { wish, isLoading, error } = useWish(wishId ?? null);

  const [newImage, setNewImage] = useState<File | null | undefined>(undefined);

  async function updateWish(
    wishId: string,
    formData: z.infer<typeof wishFormSchema>
  ) {
    const imageURL = newImage ? await uploadToStorage(newImage) : newImage;

    const wishlistId = formData.wishlist === "none" ? null : formData.wishlist;
    const price =
      formData.price === 0 || !formData.price ? null : formData.price;

    const wishUpdates = {
      ...formData,
      price,
      shopURL: formData.shopURL ?? null,
      wishlistId: wishlistId,
      wishlist: wishlistId,
      imageURL,
    };

    const updatedWish = await wishMutations.update(wishId, wishUpdates);

    if (updatedWish) navigate(href(ROUTES.WISH, { wishId }));
  }

  if (wish && authUser?.$id !== wish.ownerId)
    return "Нет прав на доступ к этой странице.";

  if (error) return "Ошибка";
  if (isLoading) return "Загрузка...";
  if (wish && authUser)
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
            storageURL={wish.imageURL}
            setCompressedImage={setNewImage}
          />
        }
        infoSlot={<WishForm wish={wish} onSubmit={updateWish} />}
      />
    );
}
export const Component = WishEditPage;
