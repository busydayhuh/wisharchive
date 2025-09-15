import { cn } from "@/shared/lib/css";
import { gradients } from "@/shared/lib/gradients";
import { HeartHandshake } from "lucide-react";
import { memo } from "react";

const wishImageVariants = {
  gallery: {
    img: "rounded-xl max-h-[36rem] cover-overlay transition-all duration-300",
    fallback: "aspect-square",
  },
  table: {
    img: "rounded-[0.5rem] md:rounded-xl w-24 md:w-32 lg:w-40 aspect-[4/3]",
    fallback: "h-full",
  },
  page: {
    img: "rounded-3xl max-h-[24rem] md:max-h-[36rem] 2xl:max-h-[48rem]",
    fallback: "aspect-square",
  },
};

const fallbackColorCache = new Map();

export const WishImage = memo(function WishImage({
  wishId,
  url,
  alt,
  isBooked,
  isBooker,
  variant = "gallery",
}: {
  wishId: string;
  url?: string | null;
  alt?: string;
  isBooked?: boolean;
  isBooker?: boolean;
  variant?: "gallery" | "table" | "page";
}) {
  const fallbackColor = getFallbackColor(wishId);

  return (
    <div
      className={cn("relative overflow-clip", wishImageVariants[variant].img)}
    >
      {url ? (
        <img src={url} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div
          style={{ background: fallbackColor }}
          className={cn(
            "w-full transition-all duration-500",
            wishImageVariants[variant].fallback
          )}
        ></div>
      )}

      <BookedBadge
        isBooked={isBooked ?? false}
        isBooker={isBooker ?? false}
        variant={variant}
      />
    </div>
  );
});

function BookedBadge({
  isBooked,
  isBooker,
  variant = "gallery",
}: {
  isBooked: boolean;
  isBooker: boolean;
  variant?: string;
}) {
  if (!isBooked) return null;

  return (
    <div
      className={cn(
        "inline-flex top-2 left-2 z-10 absolute items-center gap-2 px-2.5 py-2 rounded-full font-medium text-xs md:text-sm",
        variant === "gallery" && "md:rounded-lg",
        variant === "page" && "md:rounded-lg left-3",
        isBooker
          ? "bg-destructive text-background"
          : "bg-background text-foreground"
      )}
    >
      <HeartHandshake className="size-4" />
      <span className={cn("hidden", variant !== "table" && "md:block")}>
        {isBooker ? "хочу подарить" : "забронировали"}
      </span>
    </div>
  );
}

function getFallbackColor(wishId: string) {
  if (!fallbackColorCache.has(wishId)) {
    const random = Math.floor(Math.random() * gradients.length);
    const color = gradients[random];

    fallbackColorCache.set(wishId, color);
  }

  return fallbackColorCache.get(wishId);
}
