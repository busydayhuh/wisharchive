import { Card } from "@/shared/ui/kit/card";

import { useWishlist } from "@/features/wishlist";
import team from "@/shared/api/teams";
import { ROUTES } from "@/shared/config/routes";
import { handleError } from "@/shared/entities/errors/handleError";
import {
  notifyError,
  notifySuccessExpanded,
} from "@/shared/entities/errors/notify";
import { ErrorMessage } from "@/shared/ui/components/ErrorMessage";
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

      notifySuccessExpanded("Приглашение принято", params.teamName, wlImageURL);
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

  if (error) return <ErrorMessage variant="default" />;
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
