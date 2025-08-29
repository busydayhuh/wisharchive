import { HeartHandshake } from "lucide-react";

export function WishImage({
  url,
  alt,
  isBooked,
}: {
  url?: string;
  alt?: string;
  isBooked?: boolean;
}) {
  return (
    <div className="relative flex justify-center bg-muted/30 my-2 rounded-3xl overflow-clip">
      {isBooked && <BookedBadge />}

      {!url ? (
        <div className="bg-muted rounded-3xl aspect-[4/3]"></div>
      ) : (
        <img src={url} alt={alt} className="w-full object-cover" />
      )}
    </div>
  );
}

function BookedBadge() {
  return (
    <div className="inline-flex top-2 left-3 absolute items-center gap-2 bg-background px-2.5 py-2 rounded-2xl font-medium text-sm">
      <HeartHandshake className="size-4" />
      забронировано
    </div>
  );
}
