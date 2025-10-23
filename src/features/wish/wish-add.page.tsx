import type { wishFormSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { href, useNavigate } from "react-router";
import type z from "zod";
import { normalizeWishData } from "./model/normalizeWishData";
import { useWishMutations } from "./model/useWishMutations";
import WishEditor from "./ui/WishEditor";

function WishAddPage() {
  const { user, isLoading, error } = useCurrentUser();
  const { create } = useWishMutations();
  const navigate = useNavigate();

  async function createWish(
    formData: z.infer<typeof wishFormSchema> & { imageURL?: string | null }
  ) {
    if (!user) return;

    const wish = {
      ...normalizeWishData(formData),
      ownerId: user.userId,
      owner: user.$id,
    };

    const response = await create(wish);

    if (response)
      navigate(
        href(ROUTES.WISH, { userId: wish.ownerId, wishId: response.$id }),
        {
          state: {
            data: {
              wishTitle: response.title,
            },
          },
        }
      );
  }

  if (isLoading) return "Загрузка...";
  if (error) return "Ошибка";

  return <WishEditor onSubmit={createWish} />;
}

export const Component = WishAddPage;
