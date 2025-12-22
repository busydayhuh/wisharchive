import Slogan from "@/shared/assets/images/Slogan.svg?react";
import { useParallax } from "../model/useParallax";
import { CallToAction } from "./CallToAction";
import { GradientCircle } from "./GradientCircle";
import { ParallaxContainer } from "./ParallaxContainer";

export function Hero() {
  const { ref, onPointerMove, mouseX, mouseY } = useParallax();

  return (
    <div
      className="flex flex-col items-center gap-5 md:gap-7 2xl:gap-18 pt-5 md:pt-0 w-full"
      ref={ref}
      onPointerMove={onPointerMove}
    >
      <div className="relative flex justify-center items-center border-1 border-red-700 w-full h-[20rem] sm:h-[30rem] lg:h-[45rem]">
        <GradientCircle className="-z-10 w-full md:w-[70%]" />
        <Slogan className="z-100 absolute w-[min(70%,47rem)] text-foreground" />

        <p className="hidden lg:block bottom-0 xl:bottom-20 z-100 absolute w-[min(70%,47rem)] font-grandis text-base text-center">
          Собери все желания в одном месте, поделись
          <br />с близкими и забудь про неудачные подарки
        </p>

        <ParallaxContainer mouseX={mouseX} mouseY={mouseY} />
      </div>

      <p className="lg:hidden z-100 w-full sm:w-[70%] font-grandis text-xs md:text-sm text-center">
        Собери все желания в одном месте, поделись с близкими и забудь про
        неудачные подарки
      </p>

      <CallToAction />
    </div>
  );
}
