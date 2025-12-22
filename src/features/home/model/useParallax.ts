import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useMotionValue } from "motion/react";
import React, { useRef } from "react";

export function useParallax() {
  const isMobile = useIsMobile();

  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onPointerMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (isMobile) return { ref, mouseX, mouseY };

  return {
    ref,
    onPointerMove,
    onPointerLeave,
    mouseX,
    mouseY,
  };
}
