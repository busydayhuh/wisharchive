import { useWishlist } from "@/features/wishlist/model";
import { ErrorMessage } from "@/shared/ui/components/ErrorMessage";
import { Card } from "@/shared/ui/kit/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAcceptInvite } from "./model/hooks/useAcceptInvite";
import { InvitationCard } from "./ui/InvitationCard";

function InvitationPage() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const { wishlist, isLoading, error } = useWishlist(params.teamId);

  const [loading, setLoading] = useState(false);
  const wlImageURL = wishlist?.wishes?.at(-1)?.imageURL || undefined;

  const acceptInvite = useAcceptInvite();

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
          wlImageURL={wlImageURL}
          wlTitle={wishlist.title}
          wlOwnerId={wishlist.ownerId}
          loading={loading}
          onAcceptInvite={() =>
            acceptInvite(params, setLoading, wishlist!.ownerId, wlImageURL)
          }
        />
      </div>
    );
}

export const Component = InvitationPage;
