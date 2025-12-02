import {
  Bubbles,
  CloudRainWind,
  Key,
  Origami,
  PackageOpen,
} from "lucide-react";
import { motion } from "motion/react";
import { STATUS_MESSAGES } from "../model/errors/messages";
import type { Entity, Variant } from "../model/errors/types";
import { Button } from "./kit/button";

const ICONS = {
  "no-items": <Origami />,
  "no-results": <Bubbles />,
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
      className="flex flex-col justify-center items-center gap-2 lg:gap-5 pt-5 md:pt-10 lg:pt-20 w-full"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="[&_svg]:stroke-1 [&_svg]:size-16 text-primary">
        {ICONS[variant]}
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="w-full max-w-3xs font-bold text-primary text-2xl text-center">
          {message.header}
        </p>
        <p className="w-full max-w-sm text-primary text-center">
          {message.description}
        </p>
      </div>
      {withButton && (
        <Button size="lg" className="mt-2 md:mt-6 h-14" onClick={action}>
          {message.CAT}
        </Button>
      )}
    </motion.div>
  );
}
