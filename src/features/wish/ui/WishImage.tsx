import { cn } from "@/shared/lib/css";
import { getFallbackColor } from "@/shared/lib/getFallbackColor";
import { BookedBadge } from "@/shared/ui/Badges";
import { AnimatePresence } from "motion/react";
import { memo } from "react";

const wishImageVariants = {
  gallery: {
    img: "md:rounded-3xl rounded-xl aspect-[4/5] transition-all duration-300 bg-muted",
    fallback: "aspect-[4/5]",
    icon: "w-10 md:w-16 h-10 md:h-16",
  },
  table: {
    img: "rounded-md md:rounded-xl transition-all duration-300 w-24 md:w-32 lg:w-40 aspect-square",
    fallback: "h-full",
    icon: "w-6 h-6 md:w-10 md:h-10",
  },
  page: {
    img: "lg:rounded-[3rem] rounded-3xl max-h-[24rem] md:max-h-[40rem] 2xl:max-h-[56rem]",
    fallback: "aspect-[4/5]",
    icon: "",
  },
};

export const WishImage = memo(function WishImage({
  wishId,
  url,
  alt,
  isBooked,
  variant = "gallery",
}: {
  wishId: string;
  url?: string | null;
  alt?: string;
  isBooked?: boolean;
  variant?: "gallery" | "table" | "page";
}) {
  const fallbackColor = getFallbackColor(wishId);

  return (
    <div
      className={cn("relative overflow-clip", wishImageVariants[variant].img)}
    >
      <div className="invisible absolute inset-0 pointer-events-none cover-overlay"></div>
      {url ? (
        <>
          <img
            src={url}
            alt={alt}
            className={cn("w-full h-full object-cover")}
          />
          <AnimatePresence initial={false}>
            {isBooked && variant !== "page" && (
              <div className="top-0 left-0 absolute flex justify-center items-center w-full h-full pointer-events-none">
                <BookedBadge />
              </div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div
          style={{ background: fallbackColor }}
          className={cn("w-full h-full", wishImageVariants[variant].fallback)}
        ></div>
      )}
    </div>
  );
});
