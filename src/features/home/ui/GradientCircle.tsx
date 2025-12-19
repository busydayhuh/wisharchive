import { cn } from "@/shared/utils/css";

export function GradientCircle({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        className,
        "rounded-full bg-radial from-landing-circle to-49% to-background blur-3xl aspect-square"
      )}
    />
  );
}
