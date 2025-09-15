import StarFrame from "./StarFrame";

export function WishLayout({
  backSlot,
  imageSlot,
  infoSlot,
  relatedSlot,
}: {
  backSlot?: React.ReactNode;
  imageSlot?: React.ReactNode;
  infoSlot?: React.ReactNode;
  relatedSlot?: React.ReactNode;
}) {
  return (
    <StarFrame>
      <div className="flex gap-6 mt-1 md:mt-6 2xl:mt-10 md:mr-8 md:max-w-[96%]">
        <div className="hidden md:block">{backSlot}</div>
        <div className="gap-4 md:gap-8 grid grid-cols-1 sm:grid-cols-[1fr_1fr] w-full">
          {imageSlot}
          {infoSlot}
        </div>
      </div>
      {relatedSlot}
    </StarFrame>
  );
}
