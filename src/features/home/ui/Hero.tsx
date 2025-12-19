import Slogan from "@/shared/assets/images/Slogan.svg?react";
import { GradientCircle } from "./GradientCircle";
import { ParallaxContainer } from "./ParallaxContainer";

export function Hero() {
  return (
    <div className="relative flex justify-center items-center border-1 border-red-700 h-[50rem] grow">
      <GradientCircle className="z-0 w-[70%]" />
      <Slogan className="z-100 absolute max-w-[47rem] text-foreground" />
      <ParallaxContainer />
    </div>
  );
}
