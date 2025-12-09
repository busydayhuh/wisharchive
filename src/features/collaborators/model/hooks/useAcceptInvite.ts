import { useAuth } from "@/features/auth";
import { useRoute } from "@/features/breadcrumbs";
import team from "@/shared/api/teams";
import { ROUTES } from "@/shared/config/routes";
import { handleError } from "@/shared/entities/errors/handleError";
import {
  notifyError,
  notifySuccessExpanded,
} from "@/shared/entities/errors/notify";
import { useCallback } from "react";
import { href } from "react-router";

export function useAcceptInvite() {
  const { isLoggedIn, initSession } = useAuth();
  const { navigateWithState } = useRoute();

  const onAcceptInvite = useCallback(
    async (
      params: {
        [k: string]: string;
      },
      setLoading: (loading: boolean) => void,
      wishlistOwnerId: string,
      wlImageURL?: string
    ) => {
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
            userId: wishlistOwnerId,
            listId: params.teamId!,
          }),
          { wlTitle: params.teamName }
        );

        notifySuccessExpanded(
          "Приглашение принято",
          params.teamName,
          wlImageURL
        );
      } catch (error) {
        const { errorMessage } = handleError(error);
        notifyError("Не удалось принять приглашение", errorMessage);
        return;
      } finally {
        setLoading(false);
      }
    },
    [initSession, isLoggedIn, navigateWithState]
  );

  return onAcceptInvite;
}
