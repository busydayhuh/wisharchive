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
      <div className="flex gap-8 mt-4 md:mt-6 xl:mt-8 mr-8 mb-20 max-w-[96%]">
        {backSlot}
        <div className="gap-8 grid grid-cols-[0.7fr_1fr]">
          {imageSlot}
          {infoSlot}
        </div>
      </div>
      {relatedSlot}
    </StarFrame>
  );
}
