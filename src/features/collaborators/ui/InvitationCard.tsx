import { Button } from "@/shared/ui/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/kit/item";
import { Loader2 } from "lucide-react";

type InvitationCardProps = {
  params: {
    [k: string]: string;
  };
  wlImageURL?: string;
  wlTitle: string;
  wlOwnerId: string;
  loading: boolean;
  onAcceptInvite: () => Promise<void>;
};

export function InvitationCard({
  params,
  wlImageURL,
  wlTitle,
  wlOwnerId,
  loading,
  onAcceptInvite,
}: InvitationCardProps) {
  return (
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
          Нажимая кнопку ниже, ты подтверждаешь своё участие в команде соавторов
          списка <strong>«{params.teamName}»</strong>.
        </p>
        <Item variant="muted">
          <ItemMedia variant="image">
            <img
              src={wlImageURL}
              className="place-content-center grid bg-muted rounded-sm size-8"
              alt={wlTitle[0]}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              <span className="font-semibold line-clamp-2">{wlTitle}</span>
            </ItemTitle>
            <ItemDescription>владелец: @{wlOwnerId}</ItemDescription>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter>
        <Button onClick={onAcceptInvite} className="h-14" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Авторизация..." : "Принять и перейти к списку"}
        </Button>
      </CardFooter>
    </Card>
  );
}
