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
    <div className="2xl:mx-auto mt-3 md:mt-5 md:mr-4 max-w-[96rem]">
      <div className="flex md:gap-4">
        <div>{backSlot}</div>
        <div className="gap-4 md:gap-8 lg:gap-14 grid grid-cols-1 sm:grid-cols-[0.8fr_1fr] w-full">
          {imageSlot}
          {infoSlot}
        </div>
      </div>
      {relatedSlot}
    </div>
  );
}
