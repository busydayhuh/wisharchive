import type { wishFormSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import { href, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type z from "zod";
import { useAuth } from "../auth";
import { normalizeWishData } from "./model/normalizeWishData";
import { useWish } from "./model/useWish";
import { useWishMutations } from "./model/useWishMutations";
import { WishEditorSkeleton } from "./ui/WishEditorSkeleton";
import WishEditor from "./ui/WishEditor";

function WishEditPage() {
  const { current: authUser } = useAuth();
  const { update } = useWishMutations();
  const navigate = useNavigate();

  const { wishId } = useParams();
  const { wish, isLoading, error } = useWish(wishId ?? null);

  async function updateWish(
    formData: z.infer<typeof wishFormSchema>,
    wishId?: string
  ) {
    if (!wishId) return;

    const wishUpdates = normalizeWishData(formData);
    const updatedWish = await update(wishId, wishUpdates);

    if (updatedWish) {
      toast.success("Изменения сохранены");

      navigate(href(ROUTES.WISH, { wishId, userId: updatedWish.ownerId }), {
        state: {
          data: {
            userId: updatedWish.ownerId,
            wishTitle: updatedWish.title,
          },
        },
      });
    }
  }

  if (wish && authUser?.$id !== wish.ownerId)
    return "Нет прав на доступ к этой странице.";

  if (error) return "Ошибка";
  if (isLoading) return <WishEditorSkeleton />;

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
