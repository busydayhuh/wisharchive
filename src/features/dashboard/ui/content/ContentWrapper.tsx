import { useAuth } from "@/features/auth";
import { CreateFAB } from "@/features/create";
import { WishPickerProvider } from "@/features/wishlist/model";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode } from "react";

export function ContentWrapper({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();

  return (
    <WishPickerProvider>
      <div className="relative pt-3 2xl:pr-2 pb-18">
        <motion.div layout>
          <AnimatePresence>{children}</AnimatePresence>
        </motion.div>
        {isLoggedIn && <CreateFAB />}
      </div>
    </WishPickerProvider>
  );
}
