import { useUser } from "@/features/auth";
import { useParams } from "react-router-dom";

function useIsDashboardOwner() {
  const { current } = useUser();
  const dashboardUserId = useParams().userId;

  return current?.$id === dashboardUserId;
}

export default useIsDashboardOwner;
