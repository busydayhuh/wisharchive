import type { wishFormSchema } from "@/shared/model/formSchemas";
import type z from "zod";

export function normalizeWishData(
  formData: z.infer<typeof wishFormSchema> & { imageURL?: string | null }
) {
  const wishlistId = formData.wishlist === "none" ? null : formData.wishlist;
  const price = formData.price === 0 || !formData.price ? null : formData.price;
  const shopURL = formData.shopURL === "" ? null : formData.shopURL;

  return {
    ...formData,
    price,
    shopURL,
    wishlistId,
    wishlist: wishlistId,
    imageURL: formData.imageURL ?? null,
  };
}
