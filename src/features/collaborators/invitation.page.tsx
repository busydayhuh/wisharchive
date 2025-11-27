import { Button } from "@/shared/ui/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";

import { useWishlist } from "@/features/wishlist";
import { handleError } from "@/shared/model/handleError";
import { ROUTES } from "@/shared/model/routes";
import team from "@/shared/model/teams";
import { customToast, notifyError } from "@/shared/ui/CustomToast";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/kit/item";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { href, useSearchParams } from "react-router";
import { useAuth } from "../auth";
import { useRoute } from "../breadcrumbs";
import { useMembership } from "./model/membership/useMembership";

function InvitationPage() {
  const { isLoggedIn, initSession } = useAuth();

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const { membership } = useMembership(params.teamId, params.membershipId);
  const { wishlist, isLoading, error } = useWishlist(params.teamId);
  const wlImage = wishlist?.wishes?.at(-1)?.imageURL || undefined;

  const [loading, setLoading] = useState(false);

  const { navigateWithState } = useRoute();

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
        icon: wlImage,
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
        <Card className="shadow-none border-0 w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-bold text-xl md:text-2xl">
              Новое приглашение
            </CardTitle>
            <CardDescription className="sr-only">
              Принять приглашение в команду соавторов списка {params.teamName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Привет, <strong>{params.userId}</strong>!
            </p>
            <p>
              Нажимая кнопку ниже, ты подтверждаешь своё участие в команде
              соавторов списка <strong>«{params.teamName}»</strong> в роли{" "}
              <strong>{roleName}</strong>.
            </p>
            <Item variant="muted">
              <ItemMedia variant="image">
                <img
                  src={wlImage}
                  className="place-content-center grid bg-muted rounded-sm size-8"
                  alt={wishlist.title[0]}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <span className="font-semibold line-clamp-2">
                    {wishlist.title}
                  </span>
                </ItemTitle>
                <ItemDescription>владелец: @{wishlist.ownerId}</ItemDescription>
              </ItemContent>
            </Item>
          </CardContent>
          <CardFooter>
            <Button
              onClick={onAcceptInvite}
              className="h-14"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" />}
              {loading ? "Авторизация..." : "Принять и перейти к списку"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
}

export const Component = InvitationPage;
