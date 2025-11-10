import type { wishFormSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { href, useParams } from "react-router";
import { toast } from "sonner";
import type z from "zod";
import { useAuth } from "../auth";
import { useRoute } from "../breadcrumbs";
import { normalizeWishData } from "./model/normalizeWishData";
import { useWish } from "./model/useWish";
import { useWishMutations } from "./model/useWishMutations";
import WishEditor from "./ui/WishEditor";
import { WishEditorSkeleton } from "./ui/WishEditorSkeleton";

function WishEditPage() {
  const { current: authUser, isLoggedIn } = useAuth();
  const { update } = useWishMutations();
  const { navigateWithState } = useRoute();

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

      navigateWithState(
        href(ROUTES.WISH, { wishId, userId: updatedWish.ownerId }),
        {
          userId: updatedWish.ownerId,
          wishTitle: updatedWish.title,
        }
      );
    }
  }

  if (wish && authUser?.$id !== wish.ownerId)
    return "Нет прав на доступ к этой странице.";

  if (error)
    return (
      <ErrorMessage
        variant="default-error"
        message="Что-то пошло не так"
        description="Не удалось загрузить желание, повторите попытку позже"
        withButton={isLoggedIn}
        buttonText="К моим желаниям"
        action={() =>
          navigateWithState(href(ROUTES.WISHES, { userId: authUser!.$id }))
        }
      />
    );
  if (isLoading) return <WishEditorSkeleton />;

  if (wish)
    return (
      <WishEditor
        wish={wish}
        onSubmit={updateWish}
        storageImageURL={wish.imageURL}
      />
    );
}

export const Component = WishEditPage;
