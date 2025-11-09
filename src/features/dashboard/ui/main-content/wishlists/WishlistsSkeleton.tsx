import { CollaboratorsAvatarsSkeleton } from "@/features/collaborators";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function WishlistsSkeleton({
  viewMode,
}: {
  viewMode: "gallery" | "table";
}) {
  if (viewMode === "gallery") {
    return (
      <div className="flex flex-col gap-2 mb-4 md:mb-8">
        <Skeleton className="rounded-xl md:rounded-3xl w-full aspect-[4/3]" />
        <Skeleton className="rounded-md w-full h-6" />
      </div>
    );
  } else {
    return (
      <div className="wl-table-grid items-center py-2 pl-2 md:pl-0">
        <Skeleton className="rounded-sm md:rounded-xl w-[6rem] md:w-[7rem] lg:w-[10rem] aspect-[4/3]" />

        <div className="flex flex-col gap-1">
          <Skeleton className="w-42 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>

        <CollaboratorsAvatarsSkeleton
          size="md"
          maxVisible={3}
          className="hidden sm:flex justify-self-center"
        />
        <div className="hidden lg:flex flex-col justify-center justify-self-center items-center gap-1">
          <Skeleton className="w-14 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
        <div className="hidden lg:flex flex-col justify-center justify-self-center items-center gap-1">
          <Skeleton className="w-14 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
        <div className="flex justify-end md:justify-evenly items-center">
          <Skeleton className="hidden md:inline-flex w-9 h-9" />
          <Skeleton className="w-9 h-9" />
        </div>
      </div>
    );
  }
}
