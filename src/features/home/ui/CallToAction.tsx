import Ellipse from "@/shared/assets/images/Ellipse.svg?react";
import { ROUTES } from "@/shared/config/routes";

import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/utils/css";
import { Link } from "react-router-dom";

export function CallToAction({ text = "Загадать желание" }: { text?: string }) {
  const ellipseClasses =
    "absolute w-[20rem] lg:w-[30rem] transition-transform duration-400 text-foreground";
  return (
    <Link to={ROUTES.LOGIN}>
      <div className="group/CAT z-200 relative flex justify-center items-center border-1 border-amber-400 max-w-full min-h-[4.5rem] cursor-pointer">
        <Ellipse className={cn("group-hover/CAT:rotate-5", ellipseClasses)} />
        <Ellipse
          className={cn("rotate-5 group-hover/CAT:rotate-0", ellipseClasses)}
        />

        <Button
          className="hover:bg-transparent font-grandis font-medium text-sm md:text-base lg:text-lg"
          variant="ghost"
        >
          {text}
        </Button>
      </div>
    </Link>
  );
}
