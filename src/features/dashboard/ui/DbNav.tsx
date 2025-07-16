import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import { memo } from "react";
import { href, NavLink, useParams } from "react-router";

const DashboardNav = memo(function DashboardNav() {
  const userId = useParams().userId;

  const styles = ({ isActive }: { isActive: boolean }) =>
    cn(
      "px-4 pt-0.5 pb-1.5 border-1 border-foreground rounded-2xl text-sm transition",
      isActive && "pointer-events-none bg-foreground text-background",
      !isActive && "hover:bg-ring/20"
    );

  if (userId)
    return (
      <div className="flex gap-1 px-1 py-1 rounded-3xl w-fit">
        <NavLink
          className={styles}
          to={href(ROUTES.WISHES, { userId: userId })}
        >
          желания
        </NavLink>
        <NavLink
          className={styles}
          to={href(ROUTES.WISHLISTS, { userId: userId })}
        >
          вишлисты
        </NavLink>
      </div>
    );

  return null;
});

export default DashboardNav;
