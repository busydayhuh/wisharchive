import type { wishFormSchema } from "@/shared/model/formSchemas";
import { ROUTES } from "@/shared/model/routes";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { href } from "react-router";
import { toast } from "sonner";
import type z from "zod";
import { useRoute } from "../breadcrumbs";
import { normalizeWishData } from "./model/normalizeWishData";
import { useWishMutations } from "./model/useWishMutations";
import WishEditor from "./ui/WishEditor";
import { WishEditorSkeleton } from "./ui/WishEditorSkeleton";

function WishAddPage() {
  const { user, isLoading, error } = useCurrentUser();
  const { create } = useWishMutations();
  const { navigateWithState } = useRoute();

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

    if (response) {
      toast.success("Желание создано", {
        description: response.title,
      });

      navigateWithState(
        href(ROUTES.WISH, { userId: wish.ownerId, wishId: response.$id }),
        { wishTitle: response.title }
      );
    }
  }

  if (isLoading) return <WishEditorSkeleton />;
  if (error) return "Ошибка";

  return <WishEditor onSubmit={createWish} />;
}

export const Component = WishAddPage;
