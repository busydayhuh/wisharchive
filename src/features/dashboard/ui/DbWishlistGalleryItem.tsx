import { Badge } from "@/shared/ui/kit/badge";
import { Lock } from "lucide-react";
import { memo } from "react";
import SharedAvatars from "./SharedAvatars";

type ListcardProps = {
  list: {
    name: string;
    imagesUrl: Array<string | undefined>;
    isPrivate: boolean;
    wishCount: number;
    canRead?: string[];
    canEdit?: string[];
  };
};

const DbWishlistGalleryItem = memo(function DbWishlistGalleryItem({
  list,
}: ListcardProps) {
  return (
    <div className="relative flex flex-col gap-1 mb-4">
      <div className="gap-0.5 grid grid-cols-[2fr_1fr] grid-rows-2 *:first:row-span-2 max-h-36">
        {list.imagesUrl.map((url) => {
          if (url)
            return <img src={url} className="w-full h-full object-cover" />;
          return <div className="bg-muted"></div>;
        })}
      </div>
      <div className="flex justify-between items-baseline px-1">
        <span className="pr-1 font-medium text-lg truncate">{list.name}</span>
        {list.isPrivate && (
          <Badge className="ms-1 me-auto px-1 py-1 rounded-full">
            <Lock className="size-3" />
          </Badge>
        )}
        <span className="text-base">{`(${list.wishCount})`}</span>
      </div>
      {list.isPrivate && list.canRead && (
        <SharedAvatars users={list.canRead} size={5} maxCount={3} />
      )}
    </div>
  );
});

export default DbWishlistGalleryItem;
