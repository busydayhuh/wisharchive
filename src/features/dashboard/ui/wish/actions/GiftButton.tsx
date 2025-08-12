import { cn } from "@/shared/lib/css";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { Toggle } from "@/shared/ui/kit/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";
import { Gift } from "lucide-react";
import DataStatePropInterceptor from "../../DataStatePropInterceptor";

export function GiftButton({
  variant = "gallery",
  isBooked = false,
  isBookedByCurrentUser,
  onPressed,
  className,
}: React.ComponentProps<"div"> & {
  variant?: "gallery" | "table";
  isBooked: boolean;
  isBookedByCurrentUser: boolean;
  onPressed?: (pressed: boolean) => void;
}) {
  const { isMobile } = useSidebar();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DataStatePropInterceptor>
          <Toggle
            size={isMobile ? "sm" : "default"}
            disabled={isBooked && !isBookedByCurrentUser}
            defaultPressed={isBookedByCurrentUser}
            className={cn(
              "z-10 data-[state=on]:bg-destructive border-0 rounded-full data-[state=on]:text-secondary cursor-pointer",
              variant === "gallery" &&
                "hover:bg-secondary/80 hover:text-secondary-foreground bg-secondary shadow-xs transition duration-300 show-on-hover disabled:bg-secondary/30 disabled:text-muted/60",
              variant === "table" &&
                "bg-muted shadow-none rounded-full hover:bg-destructive hover:text-secondary",
              className
            )}
            onPressedChange={onPressed}
          >
            <Gift className="stroke-[1.3px]" />
          </Toggle>
        </DataStatePropInterceptor>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isBookedByCurrentUser ? "Отменить бронь" : "Хочу подарить"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
