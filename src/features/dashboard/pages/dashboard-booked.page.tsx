import { useWishes } from "@/features/wish";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishesPageLayout from "../ui/main-content/wishes/WishesPageLayout";

function BookedPage() {
  const { dashboardUserId, searchString } = useDashboardContext();
  const { wishes, isLoading, error } = useWishes(dashboardUserId, searchString);

  return (
    <WishesPageLayout wishes={wishes} isLoading={isLoading} error={error} />
  );
}

export const Component = BookedPage;
