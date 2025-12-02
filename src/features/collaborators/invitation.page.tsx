import { Card } from "@/shared/ui/kit/card";

import { useWishlist } from "@/features/wishlist";
import { handleError } from "@/shared/model/errors/handleError";
import { ROUTES } from "@/shared/model/routes";
import team from "@/shared/model/teams";
import { customToast, notifyError } from "@/shared/ui/CustomToast";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { href, useSearchParams } from "react-router";
import { useAuth } from "../auth";
import { useRoute } from "../breadcrumbs";
import { useMembership } from "./model/hooks/useMembership";
import { InvitationCard } from "./ui/InvitationCard";

function InvitationPage() {
  const { isLoggedIn, initSession } = useAuth();
  const { navigateWithState } = useRoute();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const { membership } = useMembership(params.teamId, params.membershipId);
  const { wishlist, isLoading, error } = useWishlist(params.teamId);

  const [loading, setLoading] = useState(false);
  const wlImageURL = wishlist?.wishes?.at(-1)?.imageURL || undefined;
  const roleName = useMemo(
    () => (membership?.roles.includes("editors") ? "редактора" : "читателя"),
    [membership]
  );

  const onAcceptInvite = async () => {
    try {
      setLoading(true);

      await team.acceptInvite(
        params.teamId!,
        params.membershipId!,
        params.userId!,
        params.secret!
      );

      if (!isLoggedIn) await initSession();

      navigateWithState(
        href(ROUTES.WISHLIST, {
          userId: wishlist!.ownerId,
          listId: params.teamId!,
        }),
        { wlTitle: params.teamName }
      );

      customToast({
        title: "Приглашение принято",
        description: params.teamName,
        icon: wlImageURL,
      });
    } catch (error) {
      const { errorMessage } = handleError(error);
      notifyError("Не удалось принять приглашение", errorMessage);
      return;
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 place-content-center grid">
        <Card className="place-content-center grid shadow-none border-0 w-full md:w-2xl h-56">
          <Loader2 className="size-9 animate-spin" />
        </Card>
      </div>
    );

  if (error)
    return (
      <ErrorMessage
        variant="default-error"
        message="Что-то пошло не так"
        description="Проверьте правильность ссылки для подтверждения приглашения"
      />
    );

  if (wishlist)
    return (
      <div className="fixed inset-0 place-content-center grid">
        <InvitationCard
          params={params}
          roleName={roleName}
          wlImageURL={wlImageURL}
          wlTitle={wishlist.title}
          wlOwnerId={wishlist.ownerId}
          loading={loading}
          onAcceptInvite={onAcceptInvite}
        />
      </div>
    );
}

export const Component = InvitationPage;
