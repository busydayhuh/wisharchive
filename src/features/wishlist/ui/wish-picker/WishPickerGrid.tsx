import { WishImage } from "@/features/wish";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Label } from "@/shared/ui/kit/label";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import type { WishPickerContentProps } from "./types";

export function WishPickerGrid({ wishes, onPickWish }: WishPickerContentProps) {
  return (
    <div className="w-full h-[calc(100%-3rem)] overflow-scroll">
      <div className="gap-2.5 grid grid-cols-5">
        {wishes.map((wish) => (
          <div className="relative px-1 py-1" key={wish.$id}>
            <Checkbox
              id={wish.$id}
              className="peer/box top-3 right-3 z-100 absolute rounded-full size-6"
              onCheckedChange={(checked) => {
                onPickWish(wish, Boolean(checked));
              }}
            />
            <Label
              htmlFor={wish.$id}
              className="peer-data-[state=checked]/box:[&_.image]:outline-3 peer-data-[state=checked]/box:[&_.image]:outline-foreground"
            >
              <div className="gap-1 grid w-full h-full">
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
    </div>
  );
}

export function WishPickerGridSkeleton() {
  return (
    <div className="gap-2.5 grid grid-cols-5 w-full h-[calc(100%-3rem)] overflow-scroll">
      {[...Array(5)].map((_, index) => (
        <div
          className="flex flex-col gap-2 mb-4 md:mb-8"
          key={"skeleton" + index}
        >
          <Skeleton className="rounded-xl md:rounded-3xl w-full aspect-[4/5]"></Skeleton>
          <Skeleton className="rounded-md w-full h-6"></Skeleton>
        </div>
      ))}
    </div>
  );
}
