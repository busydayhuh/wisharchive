import { cn } from "@/shared/lib/css";
import { formatUrl } from "@/shared/lib/formatUrl";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { LockIcon, ShoppingCart } from "lucide-react";
import { Link, href } from "react-router";

export function WishlistBadge({
  title,
  isPrivate,
  wishlistId,
  className,
}: {
  title: string;
  isPrivate: boolean;
  wishlistId: string;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "bg-transparent border-1 border-foreground rounded-full w-fit max-w-[25ch] h-6 font-normal",
        className
      )}
      asChild
    >
      <Link to={href(ROUTES.WISHLIST, { listId: wishlistId })}>
        {isPrivate && <LockIcon className="size-3" />}
        <span className="truncate">{title}</span>
      </Link>
    </Button>
  );
}

export function ShopBadge({ shopURL }: { shopURL: string }) {
  return (
    <Button variant="link" asChild>
      <a href={shopURL} target="_blank">
        <ShoppingCart />
        <span>{formatUrl(shopURL)}</span>
      </a>
    </Button>
  );
}
