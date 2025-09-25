import { cn } from "@/shared/lib/css";
import type { WishDocumentType } from "@/shared/model/types";
import { ID } from "appwrite";

function ImageTiles({
  wishes,
  variant = "gallery",
}: {
  wishes: WishDocumentType[] | null;
  variant?: "gallery" | "table";
}) {
  let coverImages = Array(3).fill(null);

  if (wishes) {
    coverImages = coverImages.map((_, i) =>
      wishes[i] ? wishes[i].imageURL : null
    );
  }

  const offsets = ["top-0 left-0", "top-1 -left-1", "top-2 -left-2"];

  if (variant === "gallery")
    return (
      <div className="gap-0.5 grid grid-cols-[1.5fr_1fr] grid-rows-2 *:first:row-span-2 rounded-xl md:rounded-3xl aspect-[4/3] overflow-hidden transition cover-overlay">
        {coverImages.map((imageURL: string | null) => {
          if (imageURL) {
            return (
              <img
                src={imageURL}
                className="w-full h-full object-cover"
                key={ID.unique()}
              />
            );
          }

          return <div className="bg-muted" key={ID.unique()}></div>;
        })}
      </div>
    );

  return (
    <div className="relative pr-1 pb-2">
      {coverImages.reverse().map((image, index) => {
        return (
          <div
            key={ID.unique()}
            className={cn(
              "bg-muted border-1 border-background rounded-sm md:rounded-xl w-[6rem] md:w-[7rem] lg:w-[10rem] aspect-[4/3] overflow-clip",
              index !== 0 && `absolute ${offsets[index]}`
            )}
          >
            {image && (
              <img src={image} className="w-full h-full object-cover" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ImageTiles;
