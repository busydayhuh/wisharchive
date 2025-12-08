import type { WishDocumentType } from "@/shared/types";
import PageBoundary from "@/shared/ui/components/PageBoundary";
import { useParams } from "react-router";
import { useAuth } from "../auth";
import type { WishRoles } from "../collaborators";
import { useAccess } from "../dashboard";
import { useWish } from "./model/hooks/useWish";
import { RelatedWishes } from "./ui/RelatedWishes";
import { WishInfo } from "./ui/wish-info/WishInfo";
import { WishImage } from "./ui/WishImage";
import { WishLayout } from "./ui/WishLayout";
import { WishPageSkeleton } from "./ui/WishPageSkeleton";

function WishPage() {
  const { wishId } = useParams();
  const { wish, isLoading, error } = useWish(wishId ?? null);
  const { userId, isLoggedIn } = useAuth();
  const { hasAccess, roles } = useAccess("wish", wish);

  return (
    <PageBoundary
      item={wish}
      isLoggedIn={isLoggedIn}
      userId={userId}
      hasAccess={hasAccess}
      isLoading={isLoading}
      error={error}
      skeleton={<WishPageSkeleton />}
    >
      {(safeItem) => (
        <WishLayout
          imageSlot={
            <WishImage
              wishId={safeItem.$id}
              url={safeItem.imageURL}
              alt={safeItem.title}
              isBooked={safeItem.isBooked}
              variant="page"
            />
          }
          infoSlot={
            <WishInfo
              wish={safeItem as WishDocumentType}
              roles={roles as WishRoles}
            />
          }
          relatedSlot={
            <RelatedWishes
              userId={safeItem.owner.userId}
              userName={safeItem.owner.userName}
              wishId={safeItem.$id}
            />
          }
        />
      )}
    </PageBoundary>
  );
}
export const Component = WishPage;
