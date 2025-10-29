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
    <div className="space-y-5 lg:space-y-20 mt-0.5 md:mt-5 md:mr-4">
      <div className="flex md:gap-4">
        <div>{backSlot}</div>
        <div className="gap-2 md:gap-8 lg:gap-14 grid grid-cols-1 md:grid-cols-[0.8fr_1fr] mt-1 md:mt-0 w-full">
          {imageSlot}
          {infoSlot}
        </div>
      </div>
      {relatedSlot}
    </div>
  );
}
