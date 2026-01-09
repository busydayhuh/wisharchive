import { cn } from "@/shared/utils/css";
import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";

export function ItemAnimation({
  type,
  viewMode,
  children,
}: {
  type: "wish" | "wishlist";
  viewMode: "gallery" | "table";
  children: React.ReactNode;
}) {
  const isViewSwitching = useRef(false);

  useEffect(() => {
    isViewSwitching.current = true;
    requestAnimationFrame(() => {
      isViewSwitching.current = false;
    });
  }, [viewMode]);

  return (
    <motion.div
      className={cn(type === "wish" && "group-card-wrapper")}
      layout={!isViewSwitching.current}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.div>
  );
}
