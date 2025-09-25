import { cva } from "class-variance-authority";
import {
  ArrowDown,
  ArrowUp,
  CircleDot,
  Eye,
  EyeOff,
  Pencil,
} from "lucide-react";
import { href, Link } from "react-router";
import { cn } from "../lib/css";
import { formatUrl } from "../lib/formatUrl";
import { ROUTES } from "../model/routes";

type Size = "sm" | "md" | "lg";

const badgesVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3 shrink-0 [&_svg]:shrink-0 w-fit shadow-none",
  {
    variants: {
      size: {
        sm: "h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5 text-xs 2xl:text-sm",
        md: "lg:h-9 lg:px-4 lg:py-2 lg:has-[>svg]:px-3 px-2 py-1 h-8 has-[>svg]:px-2 text-xs lg:text-sm 2xl:text-base",
        lg: "h-12 rounded-xl px-6 has-[>svg]:px-4 text-sm 2xl:text-base ",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const PRIORITIES = {
  high: {
    title: "высокий",
    icon: <ArrowUp />,
    colors: "bg-pink-200 text-pink-800 [&_svg]:text-pink-800",
  },
  medium: {
    title: "средний",
    icon: <CircleDot />,
    colors: "bg-indigo-200 text-indigo-700 [&_svg]:text-indigo-700",
  },
  low: {
    title: "низкий",
    icon: <ArrowDown />,
    colors: "bg-muted text-muted-foreground [&_svg]:text-muted-foreground",
  },
};

export const ROLES = {
  reader: {
    title: "читатель",
    icon: <Eye />,
    colors: "bg-muted text-muted-foreground",
  },
  editor: {
    title: "редактор",
    icon: <Pencil />,
    colors: "bg-details text-details-foreground",
  },
};

export function PriorityBadge({
  priority = "medium",
  size = "md",
  className,
}: {
  priority: "high" | "medium" | "low";
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        badgesVariants({ size, className }),
        PRIORITIES[priority].colors
      )}
    >
      {PRIORITIES[priority].icon}
      {PRIORITIES[priority].title}
    </span>
  );
}

export function WishlistBadge({
  id,
  title,
  isPrivate = false,
  size,
  className,
}: {
  id: string;
  title: string;
  isPrivate?: boolean;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      to={href(ROUTES.WISHLIST, { listId: id })}
      className={cn(
        badgesVariants({ size, className }),
        "bg-secondary hover:bg-secondary/70 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer md:max-w-[25ch] truncate"
      )}
    >
      {isPrivate && <EyeOff />}
      {title}
    </Link>
  );
}
export function BookingBadge({
  size,
  className,
}: {
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        badgesVariants({ size, className }),
        "bg-details text-sky-900"
      )}
    >
      забронировано
    </span>
  );
}
export function RoleBadge({
  role = "reader",
  size = "sm",
  className,
}: {
  role: "reader" | "editor";
  size?: Size;
  className?: string;
}) {
  <span className={cn(badgesVariants({ size, className }), ROLES[role].colors)}>
    {ROLES[role].icon}
    {ROLES[role].title}
  </span>;
}

export function ShopBadge({
  shopURL,
  size = "md",
  className,
}: {
  shopURL: string | null;
  size?: Size;
  className?: string;
}) {
  if (!shopURL) return null;

  const domain = formatUrl(shopURL);

  return (
    <a
      href={shopURL}
      target="_blank"
      className={cn(
        badgesVariants({ size, className }),
        "hover:underline hover:underline-offset-4"
      )}
    >
      <img
        height="16"
        width="16"
        src={`http://www.google.com/s2/favicons?domain=${domain}`}
        alt=""
        className="bg-details rounded-full"
      />
      {domain}
    </a>
  );
}
