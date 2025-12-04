import { cn } from "../lib/css";
import Logo from "./Logo";

export function DefaultLoader() {
  const circleClass =
    "border-1 border-muted-foreground/60 animate-pulse rounded-full grid place-content-center";

  return (
    <div className="flex justify-center items-center w-full min-h-full">
      <div className={cn(circleClass, "size-36")}>
        <div className={cn(circleClass, "size-24 border-dashed")}>
          <div className={cn(circleClass, "size-16")}>
            <Logo variant="default" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLoader;
