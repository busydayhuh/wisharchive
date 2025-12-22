import { cn } from "@/shared/utils/css";
import { Lock, Plus } from "lucide-react";
import { motion, type MotionValue } from "motion/react";
import type { HeroImageType } from "../model/heroImages";

export default function HeroImage({
  image,
  variant,
  coordinates,
}: {
  image: HeroImageType;
  variant: "side" | "full";
  coordinates: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  return (
    <motion.div
      className={cn(
        "absolute place-content-center grid shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-2xl",
        image.position[variant],
        image.position.z,
        image.size[variant]
      )}
      style={coordinates}
    >
      <div
        className={cn(
          "group/image relative place-items-center grid",
          image.size[variant]
        )}
      >
        <img
          src={image.src}
          alt={image.name}
          className={cn(
            "block rounded-2xl w-full h-full object-cover transition-all duration-200",
            image.blur && "blur-[2px] hover:blur-none active:blur-none",
            image.size[variant]
          )}
        />
        {image.blur && (
          <Lock className="z-100 absolute group-active/image:opacity-0 group-hover/image:opacity-0 size-6 text-white transition-opacity duration-200" />
        )}
        {image.hasButton && (
          <div
            className={cn(
              "absolute place-content-center grid bg-foreground p-2 rounded-md size-9",
              image.buttonPosition
            )}
          >
            <Plus className="size-4 text-background" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
