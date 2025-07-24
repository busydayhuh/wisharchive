import { ID } from "appwrite";
import Masonry from "react-masonry-css";
import { useFetchWishesByUser } from "./model/useFetchWishes";
import { useDashboardContext } from "./ui/DashboardLayout";
import DbWishGalleryItem from "./ui/DbWishGalleryItem";
import DbWishTableItem from "./ui/DbWishTableItem";

function WishesPage() {
  const { galleryMode, dashboardUserId, searchString } = useDashboardContext();
  const { wishes, isLoading, error } = useFetchWishesByUser(
    dashboardUserId,
    searchString
  );

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Не удалось загрузить желания ☹️</div>;

  if (wishes && wishes.length === 0) {
    return <div>Нет желаний 😶</div>;
  }
  if (wishes && wishes.length > 0)
    return (
      <div className="flex flex-col gap-1 md:gap-2">
        {galleryMode === "gallery" && (
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 768: 2 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {wishes.map((wish) => (
              <DbWishGalleryItem wish={wish} key={ID.unique()} />
            ))}
          </Masonry>
        )}
        {galleryMode === "table" &&
          wishes.map((wish) => <DbWishTableItem wish={wish} key={wish.$id} />)}
      </div>
    );
}

export const Component = WishesPage;
