import type { WishRoles } from "@/features/collaborators/model";
import { useAccess } from "@/features/collaborators/model";
import type { WishDocumentType } from "@/shared/types";
import PageBoundary from "@/shared/ui/components/PageBoundary";
import { WishImage } from "@/shared/ui/components/WishImage";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth";
import { useWish } from "./model/hooks/useWish";
import { RelatedWishes } from "./ui/RelatedWishes";
import { WishInfo } from "./ui/wish-info/WishInfo";
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
