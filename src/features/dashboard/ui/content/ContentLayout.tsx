import type { WishDocumentType, WishlistDocumentType } from "@/shared/types";
import { cn } from "@/shared/utils/css";
import type { Models } from "appwrite";
import { useToolbar } from "../../model/store/toolbar/useToolbar";
import { AccessGate } from "./AccessGate";
import { ContentGrid } from "./ContentGrid";
import { ItemAnimation } from "./ItemAnimation";
import { ItemSkeleton, RequestBoundary } from "./RequestBoundary";
import WishGalleryCard from "./wishes/WishGalleryCard";
import WishTableRow from "./wishes/WishTableRow";
import WishlistGalleryCard from "./wishlists/WishlistGalleryCard";
import WishlistTableRow from "./wishlists/WishlistTableRow";

type ContentLayoutProps = {
  items?: Models.Document[];
  type: "wish" | "wishlist";
  isLoading: boolean;
  isValidating: boolean;
  error?: unknown;
};

export function ContentLayout({
  items,
  type,
  isLoading,
  error,
  isValidating,
}: ContentLayoutProps) {
  const { toolbarState } = useToolbar();
  const { viewMode } = toolbarState;

  return (
    <RequestBoundary
      items={items}
      type={type}
      isLoading={isLoading}
      error={error}
      viewMode={viewMode}
    >
      {(safeItems) => (
        <ContentGrid
          viewMode={viewMode}
          className={cn(isLoading && "opacity-60")}
        >
          {safeItems.map((i) => (
            <AccessGate type={type} item={i} key={i.$id}>
              <ItemAnimation type={type} viewMode={viewMode}>
                <Item type={type} viewMode={viewMode} item={i} />
              </ItemAnimation>
            </AccessGate>
          ))}
          {isValidating && <ItemSkeleton type={type} viewMode={viewMode} />}
        </ContentGrid>
      )}
    </RequestBoundary>
  );
}

function Item({
  type,
  viewMode,
  item,
}: {
  type: "wish" | "wishlist";
  viewMode: "gallery" | "table";
  item: Models.Document;
}) {
  if (type === "wish")
    return viewMode === "gallery" ? (
      <WishGalleryCard wish={item as WishDocumentType} />
    ) : (
      <WishTableRow wish={item as WishDocumentType} />
    );

  return viewMode === "gallery" ? (
    <WishlistGalleryCard wishlist={item as WishlistDocumentType} />
  ) : (
    <WishlistTableRow wishlist={item as WishlistDocumentType} />
  );
}
