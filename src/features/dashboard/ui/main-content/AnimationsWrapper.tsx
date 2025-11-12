import { cn } from "@/shared/lib/css";
import { motion } from "motion/react";
import React from "react";

export function AnimationsWrapper({
  type,
  viewMode,
  children,
}: {
  type: "wish" | "wishlist";
  viewMode: "gallery" | "table";
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={cn(type === "wish" && "group-card-wrapper")}
      layout
      initial={viewMode === "gallery" && { opacity: 0, y: 10 }}
      animate={viewMode === "gallery" && { opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
