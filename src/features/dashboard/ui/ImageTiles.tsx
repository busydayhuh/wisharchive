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

  if (variant === "gallery")
    return (
      <div className="gap-0.5 grid grid-cols-[1.5fr_1fr] grid-rows-2 *:first:row-span-2 brightness-100 group-hover/cover:brightness-50 rounded-2xl h-36 overflow-hidden transition">
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
            className={cn(
              "bg-muted border-1 border-background rounded-2xl w-20 lg:w-30 aspect-[4/3] overflow-clip",
              index !== 0 && `absolute top-${index} -left-${index}`
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
