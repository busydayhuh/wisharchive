import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/utils/css";
import { memo } from "react";
import { href, NavLink, useParams } from "react-router-dom";

const Navigation = memo(function Navigation() {
  const { userId } = useParams();

  const styles = ({ isActive }: { isActive: boolean }) =>
    cn(
      "hover:bg-transparent px-2 py-1 font-semibold text-muted-foreground hover:text-foreground text-sm transition-all duration-300",
      isActive &&
        "pointer-events-none border-b-3 border-b-foreground text-foreground"
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
