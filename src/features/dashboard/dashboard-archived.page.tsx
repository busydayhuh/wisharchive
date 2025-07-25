import { useFetchWishesByUser } from "./model/useFetchWishes";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishesPageLayout from "./ui/layouts/WishesPageLayout";

function ArchivedWishesPage() {
  const { dashboardUserId, searchString } = useDashboardContext();
  const { wishes, isLoading, error } = useFetchWishesByUser(
    dashboardUserId,
    searchString,
    true
  );

  return (
    <WishesPageLayout wishes={wishes} isLoading={isLoading} error={error} />
  );
}

export const Component = ArchivedWishesPage;
