import { CollaboratorsAvatarsSkeleton } from "@/features/collaborators";
import { ContentGrid, WishesSkeleton } from "@/features/dashboard";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function WishlistSkeleton() {
  return (
    <div className="mt-4 md:mt-0 px-1 md:px-0">
      <div className="space-y-4 mt-2 mb-3 lg:mb-5">
        <div className="flex justify-between items-center">
          <Skeleton className="w-[60%] h-5 md:h-6 lg:h-7 xl:h-9" />
          <Skeleton className="size-9" />
        </div>
        <div className="flex justify-between items-center">
          <CollaboratorsAvatarsSkeleton size="md" maxVisible={3} />
          <Skeleton className="w-24 h-8" />
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 mr-6 px-1.5 py-2 w-full">
        <Skeleton className="w-40 h-9" />
        <div className="flex items-center gap-1">
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
        </div>
      </div>
      <ContentGrid viewMode="gallery">
        {[...Array(5)].map((_, index) => (
          <WishesSkeleton viewMode="gallery" key={"wish-skeleton-" + index} />
        ))}
      </ContentGrid>
    </div>
  );
}
