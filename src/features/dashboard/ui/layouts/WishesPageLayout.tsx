import type { WishDocumentType } from "@/shared/model/types";
import { ID } from "appwrite";
import Masonry from "react-masonry-css";
import WishGalleryItem from "../gallery-view/WishGalleryItem";
import WishTableItem from "../table-view/WishTableItem";
import { useDashboardContext } from "./DashboardLayout";

function WishesPageLayout({
  wishes,
  isLoading,
  error,
}: {
  wishes?: WishDocumentType[];
  isLoading: boolean;
  error?: unknown;
}) {
  const { viewMode } = useDashboardContext();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Не удалось загрузить желания ☹️</div>;

  if (wishes && wishes.length === 0) {
    return <div>Нет желаний 😶</div>;
  }
  if (wishes && wishes.length > 0)
    return (
      <div className="flex flex-col gap-1 md:gap-2">
        {viewMode === "gallery" && (
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 768: 2 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {wishes.map((wish) => (
              <WishGalleryItem wish={wish} key={ID.unique()} />
            ))}
          </Masonry>
        )}
        {viewMode === "table" &&
          wishes.map((wish) => <WishTableItem wish={wish} key={wish.$id} />)}
      </div>
    );
}
export default WishesPageLayout;
