import type { WishDocumentType } from "@/shared/model/types";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishesPageLayout from "./ui/layouts/WishesPageLayout";

function BookedPage() {
  const { searchString, dashboardUser } = useDashboardContext();
  const { user, isLoading, error } = dashboardUser;

  let filteredBookedWishes = [] as WishDocumentType[];

  if (user && user.bookedWishes) {
    filteredBookedWishes = user.bookedWishes.filter(({ title }) =>
      title.includes(searchString)
    );
  }

  console.log("filteredBookedWishes :>> ", filteredBookedWishes);

  return (
    <WishesPageLayout
      wishes={filteredBookedWishes}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = BookedPage;
