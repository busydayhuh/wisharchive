import { ROUTES } from "@/shared/config/routes";
import type { wishFormSchema } from "@/shared/formSchemas";
import { useCurrentUser } from "@/shared/hooks/user/useCurrentUser";
import { customToast } from "@/shared/ui/components/CustomToast";
import { ErrorMessage } from "@/shared/ui/components/ErrorMessage";
import { href } from "react-router";
import { toast } from "sonner";
import type z from "zod";
import { useAuth } from "../auth";
import { useRoute } from "../breadcrumbs";
import { useWishMutations } from "./model/hooks/useWishMutations";
import { normalizeWishData } from "./model/normalizeWishData";
import WishEditor from "./ui/WishEditor";
import { WishEditorSkeleton } from "./ui/WishEditorSkeleton";

function WishAddPage() {
  const { userId, isLoggedIn } = useAuth();
  const { user, isLoading, error } = useCurrentUser();
  const { create } = useWishMutations();
  const { navigateWithState } = useRoute();

  async function onAddWish(
    formData: z.infer<typeof wishFormSchema> & { imageURL?: string | null }
  ) {
    if (!user || !userId) return;

    const wish = {
      ...normalizeWishData(formData),
      ownerId: user.userId,
      owner: user.$id,
    };

    const { ok, response } = await create(wish);

    if (!ok) {
      toast.error("Не удалось создать желание", {
        description: "Повторите попытку позже",
      });
      return;
    }

    customToast({
      title: "Желание создано",
      description: response!.title,
      button: {
        label: "Создать ещё",
        onClick: () => navigateWithState(ROUTES.ADD),
      },
      icon: response!.imageURL,
    });

    navigateWithState(
      href(ROUTES.WISH, { userId: wish.ownerId, wishId: response!.$id }),
      { wishTitle: response!.title }
    );
  }

  if (isLoading) return <WishEditorSkeleton />;
  if (error)
    return (
      <ErrorMessage
        variant="default"
        withButton={isLoggedIn}
        action={() =>
          navigateWithState(href(ROUTES.WISHES, { userId: userId! }))
        }
      />
    );

  return <WishEditor saveChanges={onAddWish} />;
}

export const Component = WishAddPage;
