import { Skeleton } from "@/shared/ui/kit/skeleton";

export function WishesSkeleton({
  viewMode,
}: {
  viewMode: "gallery" | "table";
}) {
  if (viewMode === "gallery") {
    return (
      <div className="flex flex-col gap-2 mb-4 md:mb-8">
        <Skeleton className="rounded-xl md:rounded-3xl w-full aspect-[4/5]"></Skeleton>
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-2">
          <Skeleton className="rounded-md w-full h-6"></Skeleton>
          <Skeleton className="rounded-md w-20 h-6 shrink-0"></Skeleton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative items-center gap-2 grid grid-cols-[3fr_1fr] md:grid-cols-[22rem_1fr_1fr_0.5fr] lg:grid-cols-[28rem_1fr_1fr_1fr_0.5fr] 2xl:grid-cols-[54rem_1fr_1fr_1fr_0.5fr] xl:grid-cols-[40rem_1fr_1fr_1fr_0.5fr] md:px-1 py-1 md:py-2 w-full">
        <div className="flex items-center">
          <Skeleton className="rounded-md md:rounded-xl w-24 md:w-32 lg:w-40 aspect-square"></Skeleton>
          <div className="flex flex-col gap-1 px-4 lg:px-8">
            <Skeleton className="w-42 h-6"></Skeleton>
            <Skeleton className="w-20 h-6"></Skeleton>
          </div>
        </div>
        <Skeleton className="hidden md:inline-flex justify-self-center w-28 h-9"></Skeleton>
        <Skeleton className="hidden lg:block justify-self-center w-36 h-5"></Skeleton>
        <Skeleton className="hidden md:block justify-self-end md:justify-self-center w-36 h-9"></Skeleton>
        <Skeleton className="justify-self-end lg:justify-self-center w-9 h-9"></Skeleton>
      </div>
    );
  }
}
