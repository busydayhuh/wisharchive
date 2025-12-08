import { ROUTES } from "@/shared/config/routes";
import type { wishFormSchema } from "@/shared/formSchemas";
import { customToast } from "@/shared/ui/components/CustomToast";
import { ErrorMessage } from "@/shared/ui/components/ErrorMessage";
import { href, useParams } from "react-router";
import { toast } from "sonner";
import type z from "zod";
import { useAuth } from "../auth";
import { useRoute } from "../breadcrumbs";
import { useWish } from "./model/hooks/useWish";
import { useWishMutations } from "./model/hooks/useWishMutations";
import { normalizeWishData } from "./model/normalizeWishData";
import WishEditor from "./ui/WishEditor";
import { WishEditorSkeleton } from "./ui/WishEditorSkeleton";

function WishEditPage() {
  const { userId } = useAuth();
  const { update } = useWishMutations();
  const { navigateWithState } = useRoute();

  const { wishId } = useParams();
  const { wish, isLoading, error } = useWish(wishId ?? null);

  async function onUpdateWish(
    formData: z.infer<typeof wishFormSchema>,
    wishId?: string
  ) {
    if (!wishId) return;
    const wishUpdates = normalizeWishData(formData);
    const { ok, response } = await update(wishId, wishUpdates);

    if (!ok) {
      toast.error("Не удалось сохранить изменения");
      return;
    }
    customToast({
      title: "Сохранено",
      description: response!.title,
      icon: response!.imageURL,
    });
    navigateWithState(
      href(ROUTES.WISH, { wishId, userId: response!.ownerId }),
      {
        userId: response!.ownerId,
        wishTitle: response!.title,
      }
    );
  }

  if (wish && userId !== wish.ownerId)
    return <ErrorMessage variant="no-access" />;
  if (error) return <ErrorMessage variant="default" />;
  if (isLoading) return <WishEditorSkeleton />;

  if (wish)
    return (
      <WishEditor
        wish={wish}
        saveChanges={onUpdateWish}
        storageImageURL={wish.imageURL}
      />
    );
}

export const Component = WishEditPage;
