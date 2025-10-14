import { useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return children;
};
