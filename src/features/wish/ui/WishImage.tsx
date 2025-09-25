import { cn } from "@/shared/lib/css";
import { gradients } from "@/shared/lib/gradients";
import { LockKeyhole } from "lucide-react";
import { memo } from "react";

const wishImageVariants = {
  gallery: {
    img: "md:rounded-3xl rounded-xl aspect-[4/5] cover-overlay transition-all duration-300",
    fallback: "aspect-[4/5]",
    icon: "w-10 md:w-16 h-10 md:h-16",
  },
  table: {
    img: "rounded-md md:rounded-xl cover-overlay transition-all duration-300 w-24 md:w-32 lg:w-40 aspect-[4/3]",
    fallback: "h-full",
    icon: "w-6 h-6 md:w-10 md:h-10",
  },
  page: {
    img: "rounded-3xl max-h-[24rem] md:max-h-[40rem] 2xl:max-h-[52rem]",
    fallback: "aspect-[4/5]",
    icon: "",
  },
};

const fallbackColorCache = new Map();

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
      {url ? (
        <>
          <img
            src={url}
            alt={alt}
            className={cn("w-full h-full object-cover")}
          />
          {isBooked && variant !== "page" && (
            <div className="top-0 left-0 absolute flex justify-center items-center bg-muted-backdrop w-full h-full pointer-events-none">
              <LockKeyhole
                className={cn(
                  "stroke-[1.5px] text-white",
                  wishImageVariants[variant].icon
                )}
              />
            </div>
          )}
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

function getFallbackColor(wishId: string) {
  if (!fallbackColorCache.has(wishId)) {
    const random = Math.floor(Math.random() * gradients.length);
    const color = gradients[random];

    fallbackColorCache.set(wishId, color);
  }

  return fallbackColorCache.get(wishId);
}
