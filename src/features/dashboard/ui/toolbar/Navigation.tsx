import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import { memo } from "react";
import { href, NavLink, useParams } from "react-router";

const Navigation = memo(function Navigation() {
  const { userId } = useParams();

  const styles = ({ isActive }: { isActive: boolean }) =>
    cn(
      "px-2 py-1 text-sm transition",
      isActive &&
        "pointer-events-none border-b-3 border-b-foreground font-semibold",
      !isActive && "hover:bg-ring/20 text-muted-foreground font-semibold"
    );

  if (userId)
    return (
      <div className="flex gap-1 px-1 w-fit">
        <NavLink
          className={styles}
          to={{
            pathname: href(ROUTES.WISHES, { userId: userId }),
            search: "?view=profile",
          }}
        >
          желания
        </NavLink>
        <NavLink
          className={styles}
          to={{
            pathname: href(ROUTES.WISHLISTS, { userId: userId }),
            search: "?view=profile",
          }}
        >
          списки
        </NavLink>
      </div>
    );

  return null;
});

export default Navigation;
