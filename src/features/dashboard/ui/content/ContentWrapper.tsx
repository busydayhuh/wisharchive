import { CreateFAB } from "@/features/create";
import { WishPickerProvider } from "@/features/wishlist";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode } from "react";

export function ContentWrapper({ children }: { children: ReactNode }) {
  return (
    <WishPickerProvider>
      <div className="relative pt-3 2xl:pr-2 pb-18">
        <motion.div layout>
          <AnimatePresence>{children}</AnimatePresence>
        </motion.div>
        <CreateFAB />
      </div>
    </WishPickerProvider>
  );
}
