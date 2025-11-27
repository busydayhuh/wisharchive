import type { wishFormSchema } from "@/shared/model/formSchemas";
import type { WishlistDocumentType } from "@/shared/model/types";
import type z from "zod";

export function normalizeWishData(
  formData: z.infer<typeof wishFormSchema> & { imageURL?: string | null }
) {
  const wishlistId =
    formData.wishlistId === "none" ? null : formData.wishlistId;
  const price = formData.price === 0 || !formData.price ? null : formData.price;
  const shopURL = formData.shopURL === "" ? null : formData.shopURL;

  return {
    ...formData,
    price,
    shopURL,
    wishlistId,
    wishlist: formData.wishlist as WishlistDocumentType,
    imageURL: formData.imageURL ?? null,
  };
}
