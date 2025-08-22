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
      <div className="gap-0.5 grid grid-cols-[1.5fr_1fr] grid-rows-2 *:first:row-span-2 brightness-100 group-hover/cover:brightness-50 rounded-3xl aspect-[4/3] overflow-hidden transition">
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
      {coverImages.map((image, index) => {
        return (
          <div
            key={ID.unique()}
            className={cn(
              "bg-muted border-1 border-background rounded-xl w-20 lg:w-30 aspect-[4/3] overflow-clip",
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
