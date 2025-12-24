import { cn } from "@/shared/utils/css";

export function GradientCircle({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-radial from-landing-circle to-49% to-background blur-3xl rounded-full aspect-square",
        className
      )}
    />
  );
}
