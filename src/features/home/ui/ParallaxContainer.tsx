import { cn } from "@/shared/utils/css";
import { MotionValue, useTransform } from "motion/react";
import { IMAGES } from "../model/heroImages";
import HeroImage from "./HeroImage";

export function ParallaxContainer({
  mouseX,
  mouseY,
  variant = "full",
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  variant?: "full" | "side";
}) {
  const layerX = useTransform(mouseX, (v) => v * 20);
  const layerY = useTransform(mouseY, (v) => v * 20);

  const layer2X = useTransform(mouseX, (v) => v * 40);
  const layer2Y = useTransform(mouseY, (v) => v * 40);

  const layer3X = useTransform(mouseX, (v) => v * 60);
  const layer3Y = useTransform(mouseY, (v) => v * 60);

  return (
    <div
      className={cn(
        "top-0 bottom-0 left-1/2 absolute w-[min(100%,1440px)] -translate-x-1/2",
        variant === "side" && "max-w-[45rem] max-h-screen"
      )}
    >
      <HeroImage
        image={IMAGES[0]}
        variant={variant}
        coordinates={{ x: layerX, y: layerY }}
      />
      <HeroImage
        image={IMAGES[1]}
        variant={variant}
        coordinates={{ x: layer2X, y: layer2Y }}
      />
      <HeroImage
        image={IMAGES[2]}
        variant={variant}
        coordinates={{ x: layer3X, y: layer3Y }}
      />
      <HeroImage
        image={IMAGES[3]}
        variant={variant}
        coordinates={{ x: layer2X, y: layer2Y }}
      />
      <HeroImage
        image={IMAGES[4]}
        variant={variant}
        coordinates={{ x: layerX, y: layerY }}
      />
      <HeroImage
        image={IMAGES[5]}
        variant={variant}
        coordinates={{ x: layer3X, y: layer3Y }}
      />
    </div>
  );
}
