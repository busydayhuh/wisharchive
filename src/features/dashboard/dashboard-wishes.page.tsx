import type { PathParams } from "@/shared/model/routes";
import { ROUTES } from "@/shared/model/routes";
import { useParams } from "react-router";

function WishesPage() {
  const params = useParams<PathParams[typeof ROUTES.WISHES]>();

  return <div>WishesPage for user with id {params.userId}</div>;
}

export const Component = WishesPage;
