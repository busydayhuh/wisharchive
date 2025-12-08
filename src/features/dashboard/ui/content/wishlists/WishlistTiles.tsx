import type { WishDocumentType } from "@/shared/types";
import { cn } from "@/shared/utils/css";
import { getFallbackColor } from "@/shared/utils/getFallbackColor";
import { ID } from "appwrite";

export function WishlistTiles({
  wishes,
  variant = "gallery",
}: {
  wishes: WishDocumentType[] | null;
  variant?: "gallery" | "table";
}) {
  let coverImages = Array(3).fill(null);

  if (wishes) {
    coverImages = coverImages.map((_, i) =>
      wishes[i] ? { imageURL: wishes[i].imageURL, id: wishes[i].$id } : null
    );
  }

  const offsets = ["top-0 left-0", "top-1 -left-1", "top-2 -left-2"];

  if (variant === "gallery")
    return (
      <div className="relative rounded-xl md:rounded-3xl overflow-hidden">
        <div className="invisible absolute inset-0 pointer-events-none cover-overlay"></div>
        <div className="gap-0.5 grid grid-cols-[1.5fr_1fr] grid-rows-2 *:first:row-span-2 aspect-[4/3] transition">
          {coverImages.map((wish) => {
            if (!wish) {
              return <div className="bg-muted" key={ID.unique()}></div>;
            }

            if (wish?.imageURL) {
              return (
                <img
                  src={wish.imageURL}
                  className="w-full h-full object-cover"
                  key={wish.id + "coverImage"}
                />
              );
            } else {
              return (
                <div
                  style={{ background: getFallbackColor(wish.id) }}
                  key={wish.id + "coverImage"}
                ></div>
              );
            }
          })}
        </div>
      </div>
    );

  return (
    <div className="relative pr-1 pb-2">
      {coverImages.reverse().map((wish, index) => {
        return (
          <div
            key={ID.unique()}
            className={cn(
              "bg-muted border-1 border-background rounded-sm md:rounded-xl w-[6rem] md:w-[7rem] lg:w-[10rem] aspect-[4/3] overflow-clip",
              index !== 0 && `absolute ${offsets[index]}`
            )}
          >
            {wish && wish.imageURL && (
              <img
                src={wish.imageURL}
                className="border-0 outline-0 w-full h-full object-cover"
                style={{ background: getFallbackColor(wish.id) }}
                key={wish.id + "coverImage"}
              />
            )}

            {wish && !wish.imageURL && (
              <div
                className="w-full h-full"
                style={{ background: getFallbackColor(wish.id) }}
                key={wish.id + "coverImage"}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
