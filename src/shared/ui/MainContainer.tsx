import type { ReactNode } from "react";
import { matchRoutes, useLocation } from "react-router";
import { cn } from "../lib/css";
import { ROUTES } from "../model/routes";

function MainContainer({
  children,
}: {
  children: ReactNode;
  slimLayout?: boolean;
  outside?: boolean;
}) {
  const { pathname } = useLocation();

  const slim = Boolean(
    matchRoutes(
      [{ path: ROUTES.WISH }, { path: ROUTES.EDIT }, { path: ROUTES.PROFILE }],
      pathname
    )
  );
  const outside = Boolean(
    matchRoutes(
      [{ path: ROUTES.HOME }, { path: ROUTES.LOGIN }, { path: ROUTES.SIGNUP }],
      pathname
    )
  );

  return (
    <main
      className={cn(
        "relative mt-0 md:mt-2 lg:mt-4 lg:px-5 md:pb-4 md:pl-2 lg:pl-8 w-full",
        outside && "px-0 py-0 md:px-0 md:py-0 lg:px-0 lg:py-0",
        slim && "mx-auto max-w-[100rem]"
      )}
    >
      {children}
    </main>
  );
}

export default MainContainer;
