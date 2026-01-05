import Star from "@/shared/assets/images/Star.svg?react";
import { motion } from "motion/react";

const items = ["Бронируй подарки", "Делись списками", "Сохраняй желания"];

export function RunningString() {
  return (
    <div className="lg:mt-30 max-w-screen overflow-hidden">
      <motion.div
        className="flex items-center gap-2 w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 font-grandis font-medium text-base md:text-lg xl:text-2xl uppercase"
          >
            {item}
            <Star className="h-6 text-foreground" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
