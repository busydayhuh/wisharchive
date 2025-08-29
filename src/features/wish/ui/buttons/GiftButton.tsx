import { cn } from "@/shared/lib/css";
import DataStatePropInterceptor from "@/shared/lib/react/DataStatePropInterceptor";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { Toggle } from "@/shared/ui/kit/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";
import { Gift, HeartHandshake } from "lucide-react";

export function GiftButton({
  variant = "gallery",
  isBooked = false,
  isBookedByCurrentUser,
  onPressed,
  className,
}: React.ComponentProps<"div"> & {
  variant?: "gallery" | "table" | "page";
  isBooked: boolean;
  isBookedByCurrentUser: boolean;
  onPressed?: (pressed: boolean) => void;
}) {
  const { isMobile } = useSidebar();
  const bookedBySomebody = isBooked && !isBookedByCurrentUser;

  if (variant === "page")
    return (
      <Tooltip>
        <Toggle
          size={isMobile ? "sm" : "default"}
          defaultPressed={isBookedByCurrentUser}
          className={cn(
            "items-center bg-destructive data-[state=on]:bg-secondary hover:bg-destructive/80 shadow-none p-4 md:p-6 rounded-xl text-secondary data-[state=on]:text-foreground hover:text-secondary cursor-pointer",
            className
          )}
          disabled={bookedBySomebody}
          onPressedChange={onPressed}
        >
          <HeartHandshake />
          {isBooked
            ? isBookedByCurrentUser
              ? "Отменить бронь"
              : "Желание забронировано"
            : "Хочу подарить"}
        </Toggle>
      </Tooltip>
    );

  if (bookedBySomebody) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DataStatePropInterceptor>
          <Toggle
            size={isMobile ? "sm" : "default"}
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
            <Gift className="stroke-[1.5px]" />
          </Toggle>
        </DataStatePropInterceptor>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isBookedByCurrentUser ? "Отменить бронь" : "Хочу подарить"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
