import type { WishDocumentType } from "@/shared/model/types";
import Masonry from "react-masonry-css";
import WishGalleryItem, { CardWrapper } from "./WishGalleryItem";
import WishTableItem from "./WishTableItem";
import { WishesSkeleton } from "./WishesSkeleton";

export function WishesPageLayout({
  wishes,
  isLoading,
  isValidating,
  error,
  viewMode,
}: {
  wishes?: WishDocumentType[];
  isLoading: boolean;
  isValidating: boolean;
  error?: unknown;
  viewMode: "gallery" | "table";
}) {
  if (isLoading && !wishes)
    return viewMode === "gallery" ? (
      <Masonry
        breakpointCols={{ default: 5, 1470: 4, 1280: 3, 768: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {[...Array(5)].map((_, index) => (
          <WishesSkeleton viewMode={viewMode} key={"wish-skeleton-" + index} />
        ))}
      </Masonry>
    ) : (
      <div className="flex flex-col gap-1 md:gap-2 -mt-2">
        {[...Array(5)].map((_, index) => (
          <WishesSkeleton viewMode={viewMode} key={"wish-skeleton-" + index} />
        ))}
      </div>
    );

  if (error) return <div>Не удалось загрузить желания ☹️</div>;

  if (wishes && wishes.length === 0) {
    return <div>Нет желаний 😶</div>;
  }
  if (wishes && wishes.length > 0) {
    if (viewMode === "gallery")
      return (
        <Masonry
          breakpointCols={{ default: 5, 1470: 4, 1280: 3, 768: 2 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {wishes.map((wish) => (
            <CardWrapper key={wish.$id} wish={wish}>
              <WishGalleryItem wish={wish} />
            </CardWrapper>
          ))}
          {isValidating && <WishesSkeleton viewMode={viewMode} />}
        </Masonry>
      );

    if (viewMode === "table")
      return (
        <div className="flex flex-col gap-1 md:gap-2 -mt-2">
          {wishes.map((wish) => (
            <WishTableItem wish={wish} key={wish.$id} />
          ))}
          {isValidating && <WishesSkeleton viewMode={viewMode} />}
        </div>
      );
  }
}
