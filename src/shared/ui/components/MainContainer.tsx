import type { ReactNode } from "react";
import { useAppLocation } from "../../hooks/useAppLocation";
import { cn } from "../../utils/css";

function MainContainer({
  children,
}: {
  children: ReactNode;
  slimLayout?: boolean;
  loginArea?: boolean;
}) {
  const { page, loginArea } = useAppLocation();
  const slimPage = page.wish || page.edit || page.profile;

  return (
    <main
      className={cn(
        "relative lg:px-5 md:pb-4 md:pl-2 lg:pl-8 w-full",
        loginArea && "!p-0 !m-0",
        slimPage && "mx-auto max-w-[100rem] md:mt-2"
      )}
    >
      {children}
    </main>
  );
}

export default MainContainer;
