import CreateButtonWithDropdown from "@/features/create";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode } from "react";

export function DashboardContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative pt-3 2xl:pr-2 pb-18">
      <motion.div layout>
        <AnimatePresence>{children}</AnimatePresence>
      </motion.div>
      <CreateButtonWithDropdown />
    </div>
  );
}
