import { IMAGES } from "../model/heroImages";
import HeroImage from "./HeroImage";

export function ParallaxContainer() {
  return (
    <div className="absolute inset-0 border-1 border-green-500">
      {IMAGES.map((image) => (
        <HeroImage image={image} variant="full" />
      ))}
    </div>
  );
}
