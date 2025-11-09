import { Skeleton } from "@/shared/ui/kit/skeleton";

export function WishEditorSkeleton() {
  return (
    <div className="space-y-5 lg:space-y-20 mt-0.5 md:mt-5 md:mr-4">
      <div className="flex md:gap-4">
        <Skeleton className="w-9 h-9" />

        <div className="gap-2 md:gap-8 lg:gap-14 grid grid-cols-1 md:grid-cols-[0.8fr_1fr] mt-1 md:mt-0 w-full">
          <Skeleton className="rounded-3xl lg:rounded-[3rem] h-[24rem] md:h-[40rem] 2xl:h-[56rem] aspect-[4/5]" />

          <div className="flex flex-col gap-6 lg:gap-10 2xl:gap-12 md:px-0 py-2.5">
            {/* Заголовок */}
            <Skeleton className="w-[50%] h-12 shrink-0" />

            {/* Форма */}
            <div className="flex flex-col gap-4 md:gap-6 mt-3 md:mt-0 md:ml-4 px-2 md:px-0 pb-2 max-w-3xl">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-24 md:h-28" />
              <Skeleton className="w-full md:w-36 h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full md:w-54 h-12" />
              <Skeleton className="w-full md:w-60 h-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
