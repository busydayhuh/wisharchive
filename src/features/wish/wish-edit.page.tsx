import type { wishFormSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import { href, useNavigate, useParams } from "react-router";
import type z from "zod";
import { useAuth } from "../auth";
import { normalizeWishData } from "./model/normalizeWishData";
import { useWish } from "./model/useWish";
import { wishMutations } from "./model/wishMutations";
import WishEditor from "./ui/WishEditor";

function WishEditPage() {
  const { current: authUser } = useAuth();
  const navigate = useNavigate();

  const { wishId } = useParams();
  const { wish, isLoading, error } = useWish(wishId ?? null);

  async function updateWish(
    formData: z.infer<typeof wishFormSchema>,
    wishId?: string
  ) {
    if (!wishId) return;

    const wishUpdates = normalizeWishData(formData);
    const updatedWish = await wishMutations.update(wishId, wishUpdates);
    console.log(
      "🚀 ~ wish-edit.page.tsx:26 ~ updateWish ~ updatedWish:",
      updatedWish
    );

    if (updatedWish)
      navigate(href(ROUTES.WISH, { wishId, userId: updatedWish.ownerId }), {
        state: {
          data: {
            userId: updatedWish.ownerId,
            wishTitle: updatedWish.title,
          },
        },
      });
  }

  if (wish && authUser?.$id !== wish.ownerId)
    return "Нет прав на доступ к этой странице.";

  if (error) return "Ошибка";
  if (isLoading) return "Загрузка...";
  if (wish && authUser)
    return (
      <WishEditor
        wish={wish}
        onSubmit={updateWish}
        storageImageURL={wish.imageURL}
      />
    );
}

export const Component = WishEditPage;
