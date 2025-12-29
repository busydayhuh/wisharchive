import Ellipse from "@/shared/assets/images/Ellipse.svg?react";
import { ROUTES } from "@/shared/config/routes";

import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/utils/css";
import { Link } from "react-router-dom";
import { GradientCircle } from "./GradientCircle";

export function CallToAction({ text = "Загадать желание" }: { text?: string }) {
  const ellipseClasses =
    "absolute w-[20rem] lg:w-[30rem] transition-transform duration-400 text-foreground";
  return (
    <Link to={ROUTES.LOGIN}>
      <div className="group/CAT z-200 relative flex justify-center items-center mx-auto w-fit max-w-full min-h-[5rem] cursor-pointer">
        <Ellipse className={cn("group-hover/CAT:rotate-5", ellipseClasses)} />
        <Ellipse
          className={cn("rotate-5 group-hover/CAT:rotate-0", ellipseClasses)}
        />
        <GradientCircle className="-z-100 absolute opacity-0 group-hover/CAT:opacity-100 rounded-[30%] w-[30rem] aspect-video transition-opacity duration-200" />
        <div className="-top-4 right-0 absolute opacity-0 group-hover/CAT:opacity-100 text-lg transition-opacity duration-200">
          ✨
        </div>

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
