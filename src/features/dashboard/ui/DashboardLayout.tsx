import { useUser } from "@/features/auth";
import StarFrame from "@/shared/ui/StarFrame";
import { Outlet, useParams } from "react-router";
import useFindUser from "../model/useFindUser";
import DashboardNav from "./DbNav";
import DashboardUser from "./DbUser";

export function DashboardLayout() {
  const { current } = useUser();

  const userId = useParams().userId;
  const foundUser = useFindUser(userId);

  const isOwner = current?.$id === userId;

  return (
    <div className="flex flex-col gap-11 mt-8">
      <div className="flex justify-between items-baseline">
        {isOwner && (
          <div className="font-semibold text-5xl leading-tight">
            Мой дашборд
          </div>
        )}
        <DashboardUser {...foundUser} />
      </div>
      <DashboardNav />
      <StarFrame>
        <Outlet />
      </StarFrame>
    </div>
  );
}
