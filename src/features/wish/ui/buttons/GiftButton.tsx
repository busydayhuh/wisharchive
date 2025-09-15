import { cn } from "@/shared/lib/css";
import DataStatePropInterceptor from "@/shared/lib/react/DataStatePropInterceptor";
import { Toggle } from "@/shared/ui/kit/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";
import { HeartCrack, HeartHandshake } from "lucide-react";
import { memo } from "react";

const giftButtonVariants = {
  page: "items-center bg-destructive data-[state=on]:bg-secondary hover:bg-destructive/80 shadow-none p-4 md:p-6 text-secondary data-[state=on]:text-foreground hover:text-secondary cursor-pointer",
  gallery:
    "hover:bg-muted/80 bg-secondary shadow-xs transition duration-300 md:size-12",
  table:
    "bg-muted shadow-none rounded-full hover:bg-destructive hover:text-secondary",
};

export const GiftButton = memo(function GiftButton({
  variant = "gallery",
  isBooked = false,
  isBookedByCurrentUser,
  onPressed,
  className,
}: React.ComponentProps<"div"> & {
  variant?: "gallery" | "table" | "page";
  isBooked: boolean;
  isBookedByCurrentUser: boolean;
  onPressed: (pressed: boolean) => void;
}) {
  const bookedBySomebody = isBooked && !isBookedByCurrentUser;

  if (variant === "page")
    return (
      <Tooltip>
        <Toggle
          defaultPressed={isBookedByCurrentUser}
          className={cn(giftButtonVariants[variant], className)}
          onPressedChange={onPressed}
        >
          {isBookedByCurrentUser ? <HeartCrack /> : <HeartHandshake />}
          {isBooked
            ? isBookedByCurrentUser
              ? "Отменить бронь"
              : "Желание забронировано"
            : "Хочу подарить"}
        </Toggle>
      </Tooltip>
    );

  // На дашборде — переключатель с тултипом
  // Если желание уже забронировано кем-то — не показываем

  if (bookedBySomebody) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DataStatePropInterceptor>
          <Toggle
            defaultPressed={isBookedByCurrentUser}
            className={cn(
              "data-[state=on]:bg-destructive data-[state=on]:hover:bg-destructive/80 border-0 rounded-full data-[state=on]:text-background cursor-pointer",
              giftButtonVariants[variant],
              className
            )}
            onPressedChange={onPressed}
          >
            <HeartHandshake />
          </Toggle>
        </DataStatePropInterceptor>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isBookedByCurrentUser ? "Отменить бронь" : "Хочу подарить"}</p>
      </TooltipContent>
    </Tooltip>
  );
});
