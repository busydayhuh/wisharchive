import { ROUTES } from "@/shared/config/routes";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import Logo from "@/shared/ui/components/Logo";
import LogoExtended from "@/shared/ui/components/LogoExtended";
import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/utils/css";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../sidebar";

export function Header() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { page, loginArea } = useAppLocation();

  if (page.wish || page.list || loginArea) return null;

  return (
    <div
      className={cn(
        "flex justify-between items-center mx-auto mt-1 px-2 md:px-0 pb-1.5 border-b-1 md:border-b-0 w-full",
        page.home && "px-2 md:px-5 md:pt-2"
      )}
    >
      <Link to={ROUTES.HOME}>
        {isMobile ? (
          <Logo variant="default" />
        ) : (
          <LogoExtended variant="default" />
        )}
      </Link>
      <div className="flex items-center gap-2">
        {page.home && (
          <>
            <ModeToggle withText={false} />
            <Button
              className="text-xs md:text-sm"
              variant="link"
              size={isMobile ? "sm" : "default"}
              onClick={() => navigate(ROUTES.SIGNUP)}
            >
              Регистрация
            </Button>
          </>
        )}
        <Button
          className="rounded-3xl text-xs md:text-sm"
          size={isMobile ? "sm" : "default"}
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}
