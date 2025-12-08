import {
  CloudRainWind,
  Key,
  Origami,
  PackageOpen,
  Telescope,
} from "lucide-react";
import { motion } from "motion/react";
import { STATUS_MESSAGES } from "../../entities/errors/messages";
import type { Entity, Variant } from "../../entities/errors/types";
import { Button } from "../kit/button";

const ICONS = {
  "no-items": <Origami />,
  "no-results": <Telescope />,
  "not-found": <PackageOpen />,
  default: <CloudRainWind />,
  "no-access": <Key />,
};

export function ErrorMessage({
  variant = "default",
  entity = "default",
  withButton,
  action,
}: {
  variant: Variant;
  entity?: Entity;
  withButton?: boolean;
  action?: () => void;
}) {
  const message = STATUS_MESSAGES[variant][entity];
  return (
    <motion.div
      className="flex flex-col justify-center items-center gap-2 lg:gap-4 pt-25 md:pt-40 w-full"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="-top-15 md:-top-35 left-1/2 -z-10 absolute bg-background blur-[2px] [&_svg]:stroke-[0.3px] rounded-full [&_svg]:size-35 md:[&_svg]:size-60 text-muted/80 -translate-x-1/2">
          {ICONS[variant]}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="w-full max-w-3xs font-headers font-bold text-primary text-2xl text-center">
            {message.header}
          </p>
          <p className="w-full max-w-sm text-primary text-sm text-center">
            {message.description}
          </p>
        </div>
      </div>
      {withButton && (
        <Button size="lg" className="mt-2 md:mt-4 h-14" onClick={action}>
          {message.CAT}
        </Button>
      )}
    </motion.div>
  );
}
