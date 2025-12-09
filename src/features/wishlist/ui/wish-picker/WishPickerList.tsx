import { WishImage } from "@/features/wish";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/kit/item";
import { Label } from "@/shared/ui/kit/label";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import type { WishPickerContentProps } from "./types";

export function WishPickerList({ wishes, onPickWish }: WishPickerContentProps) {
  return (
    <div className="flex flex-col gap-0.5 overflow-y-scroll">
      {wishes.map((wish) => (
        <div className="relative px-1 py-1" key={wish.$id}>
          <Label
            htmlFor={wish.$id}
            className="rounded-2xl peer-data-[state=checked]/box:outline-2 peer-data-[state=checked]/box:outline-foreground"
          >
            <Item className="py-2 pl-1 w-full">
              <ItemMedia variant="image">
                <WishImage
                  wishId={wish.$id}
                  url={wish.imageURL}
                  variant="table"
                />
              </ItemMedia>
              <ItemContent className="flex-row justify-between w-full">
                <ItemTitle>
                  <span className="line-clamp-1">{wish.title}</span>
                </ItemTitle>
                <Checkbox
                  id={wish.$id}
                  className="peer/box ms-auto size-5"
                  onCheckedChange={(checked) => {
                    onPickWish(wish, Boolean(checked));
                  }}
                />
              </ItemContent>
            </Item>
          </Label>
        </div>
      ))}
    </div>
  );
}

export function WishPickerListSkeleton() {
  return (
    <div className="flex flex-col gap-0.5 overflow-y-scroll">
      {[...Array(5)].map((_, index) => (
        <div className="flex items-center gap-2" key={"skeleton" + index}>
          <Skeleton className="rounded-sm size-10" />
          <Skeleton className="rounded-md w-full h-6"></Skeleton>
        </div>
      ))}
    </div>
  );
}
