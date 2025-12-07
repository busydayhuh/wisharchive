import { WishImage } from "@/features/wish";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Label } from "@/shared/ui/kit/label";
import type { WishPickerContentProps } from "./types";

export function WishPickerGrid({ wishes, onPickWish }: WishPickerContentProps) {
  return (
    <div className="gap-2.5 grid grid-cols-5 w-full max-h-[calc(100%-3rem)] overflow-scroll">
      {wishes.map((wish) => (
        <div className="relative px-1 py-1" key={wish.$id}>
          <Checkbox
            id={wish.$id}
            className="peer/box top-2 right-3 z-100 absolute rounded-full size-6"
            onCheckedChange={(checked) => {
              onPickWish(wish, Boolean(checked));
            }}
          />
          <Label
            htmlFor={wish.$id}
            className="peer-data-[state=checked]/box:[&_.image]:outline-3 peer-data-[state=checked]/box:[&_.image]:outline-foreground"
          >
            <div className="gap-1 grid">
              <div className="rounded-3xl image">
                <WishImage
                  wishId={wish.$id}
                  url={wish.imageURL}
                  variant="gallery"
                />
              </div>

              <p className="px-1 font-medium text-sm line-clamp-1">
                {wish.title}
              </p>
            </div>
          </Label>
        </div>
      ))}
    </div>
  );
}
