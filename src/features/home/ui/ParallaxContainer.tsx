import { MotionValue, useTransform } from "motion/react";
import { IMAGES } from "../model/heroImages";
import HeroImage from "./HeroImage";

export function ParallaxContainer({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const layerX = useTransform(mouseX, (v) => v * 20);
  const layerY = useTransform(mouseY, (v) => v * 20);

  const layer2X = useTransform(mouseX, (v) => v * 40);
  const layer2Y = useTransform(mouseY, (v) => v * 40);

  const layer3X = useTransform(mouseX, (v) => v * 60);
  const layer3Y = useTransform(mouseY, (v) => v * 60);

  return (
    <div className="top-0 bottom-0 left-1/2 absolute border-1 border-green-500 w-[min(100%,1440px)] -translate-x-1/2">
      <HeroImage
        image={IMAGES[0]}
        variant="full"
        coordinates={{ x: layerX, y: layerY }}
      />
      <HeroImage
        image={IMAGES[1]}
        variant="full"
        coordinates={{ x: layer2X, y: layer2Y }}
      />
      <HeroImage
        image={IMAGES[2]}
        variant="full"
        coordinates={{ x: layer3X, y: layer3Y }}
      />
      <HeroImage
        image={IMAGES[3]}
        variant="full"
        coordinates={{ x: layer2X, y: layer2Y }}
      />
      <HeroImage
        image={IMAGES[4]}
        variant="full"
        coordinates={{ x: layerX, y: layerY }}
      />
      <HeroImage
        image={IMAGES[5]}
        variant="full"
        coordinates={{ x: layer3X, y: layer3Y }}
      />
    </div>
  );
}
