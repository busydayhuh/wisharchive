import { Skeleton } from "@/shared/ui/kit/skeleton";

export function WishPageSkeleton() {
  return (
    <div className="space-y-5 lg:space-y-20 mt-0.5 md:mt-5 md:mr-4">
      <div className="flex md:gap-4">
        <Skeleton className="w-9 h-9" />

        <div className="gap-2 md:gap-8 lg:gap-14 grid grid-cols-1 md:grid-cols-[0.8fr_1fr] mt-1 md:mt-0 w-full">
          <Skeleton className="rounded-3xl lg:rounded-[3rem] h-[24rem] md:h-[40rem] 2xl:h-[56rem] aspect-[4/5]" />

          <div className="flex flex-col gap-6 lg:gap-10 2xl:gap-12 px-2 md:px-0 py-2.5">
            {/* Заголовок */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline gap-4">
                <Skeleton className="w-full h-12 shrink-0" />
                <Skeleton className="w-9 h-9 shrink-0" />
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Skeleton className="rounded-full size-8" />
                <Skeleton className="w-24 h-6" />
              </div>
            </div>

            {/* Детали */}
            <div className="flex flex-col justify-between gap-2 md:gap-2.5 text-xs md:text-sm">
              {[...Array(3)].map((_, index) => (
                <div
                  key={"details" + index}
                  className="flex justify-between items-center gap-1 md:gap-4 md:basis-0"
                >
                  <Skeleton className="w-24 h-5" />
                  <div className="border-b-1 border-b-muted-foreground/50 border-dotted w-full h-1" />
                  <Skeleton className="w-24 h-5" />
                </div>
              ))}
            </div>

            {/* Футер */}
            <div className="flex md:flex-row flex-col md:justify-between items-start md:items-center gap-4 md:gap-10 md:mt-auto max-w-3xl">
              <Skeleton className="w-36 h-12" />
              <Skeleton className="w-full md:w-32 h-14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
