import { Skeleton } from "@/shared/ui/kit/skeleton";
import { cn } from "@/shared/utils/css";
import type { Category } from "../model/types";

const ITEM_SIZES = {
  default: "p-4 gap-4 ",
  sm: "py-3 px-4 gap-2.5",
};

export function GlobalSearchSkeletons({
  category,
  size = "default",
}: {
  category: Category;
  size: "sm" | "default";
}) {
  return (
    <div className={cn("flex items-center", ITEM_SIZES[size])}>
      <Skeleton
        className={cn(
          "rounded-sm size-10",
          category === "users" && "rounded-full"
        )}
      />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-50 max-w-[60%] h-5 shrink-0" />
        <Skeleton className="w-30 max-w-[40%] h-5 shrink-0" />
      </div>
    </div>
  );
}
