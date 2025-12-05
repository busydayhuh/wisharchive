import { cva } from "class-variance-authority";
import {
  Circle,
  Crown,
  Eye,
  EyeClosed,
  Lock,
  Pencil,
  Sparkles,
  Users2,
} from "lucide-react";
import { motion } from "motion/react";
import { href, Link } from "react-router";
import { cn } from "../lib/css";
import { formatUrl } from "../lib/formatUrl";
import { ROUTES } from "../model/routes";
import { RoundedStar } from "./RoundedStar";
import { Rating, RatingButton } from "./kit/rating";
import { Tooltip, TooltipContent, TooltipTrigger } from "./kit/tooltip";

type Size = "sm" | "md" | "lg";

const badgesVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3 shrink-0 [&_svg]:shrink-0 w-fit shadow-none",
  {
    variants: {
      size: {
        sm: "h-7 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5 text-xs rounded-sm",
        md: "lg:h-9 lg:px-4 lg:py-2 lg:has-[>svg]:px-3 px-2 py-1 h-8 has-[>svg]:px-2 text-xs lg:text-sm",
        lg: "h-12 rounded-xl px-6 has-[>svg]:px-4 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const ROLES = {
  reader: {
    title: "читатель",
    icon: <Eye />,
    colors: "bg-muted text-muted-foreground",
  },
  editor: {
    title: "редактор",
    icon: <Pencil />,
    colors: "bg-pink-bg text-pink-900",
  },
  owner: {
    title: "владелец",
    icon: <Crown />,
    colors: "bg-blue-bg text-blue",
  },
};

export const PRIVACY_ICONS = {
  default: (
    <span className="p-1.5 rounded-sm [&_svg]:size-3.5 text-blue">
      <Eye className="stroke-[2px]" />
    </span>
  ),
  private: (
    <span className="p-1.5 rounded-sm [&_svg]:size-3 text-pink">
      <EyeClosed className="stroke-[2px]" />
    </span>
  ),
  collab: (
    <span className="p-1.5 rounded-sm [&_svg]:size-3 text-yellow">
      <Users2 className="stroke-[2px]" />
    </span>
  ),
  none: (
    <span className="p-1.5 rounded-sm [&_svg]:size-3 text-muted-foreground">
      <Circle className="stroke-[2px]" />
    </span>
  ),
};

export function PriorityBadge({
  priority = "1",
  size = "md",
  className,
}: {
  priority: "2" | "1" | "0";
  size?: Size;
  className?: string;
}) {
  const descriptions = new Map([
    [0, "Было бы неплохо"],
    [1, "Может подождать"],
    [2, "Очень нужно!"],
  ]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "bg-blue-bg px-2.5 pt-2 pb-1.5 rounded-md w-fit",
            size === "sm" && "px-1.5 pt-1 pb-0.5",
            className
          )}
        >
          <Rating readOnly value={Number(priority) + 1}>
            {Array.from({ length: 3 }).map((_, index) => (
              <RatingButton
                key={index}
                icon={<Sparkles />}
                className="text-blue"
                size={size === "md" ? 16 : 12}
              />
            ))}
          </Rating>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{descriptions.get(Number(priority))}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function WishlistBadge({
  id,
  title,
  isPrivate = false,
  ownerId,
  size,
  className,
}: {
  id?: string;
  title?: string;
  isPrivate?: boolean;
  ownerId?: string;
  size?: Size;
  className?: string;
}) {
  const linkTo =
    id && ownerId
      ? href(ROUTES.WISHLIST, { listId: id, userId: ownerId })
      : "/#";

  return (
    <Link
      to={linkTo}
      state={{
        data: {
          userId: ownerId,
          wlTitle: title,
        },
      }}
      className={cn(
        badgesVariants({ size, className }),
        "bg-secondary hover:bg-secondary/90 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer [&_svg]:size-4 font-normal"
      )}
    >
      {isPrivate && <EyeClosed />}
      <span className="max-w-[20ch] truncate">{title}</span>
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
  roles,
  size = "sm",
  className,
}: {
  roles: {
    isWishlistOwner: boolean;
    isReader: boolean;
    isEditor: boolean;
  };
  size?: Size;
  className?: string;
}) {
  const roleName = roles.isWishlistOwner
    ? "owner"
    : roles.isEditor
    ? "editor"
    : "reader";
  return (
    <span
      className={cn(
        badgesVariants({ size, className }),
        ROLES[roleName].colors
      )}
    >
      {ROLES[roleName].icon}
      {ROLES[roleName].title}
    </span>
  );
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
        "hover:underline hover:underline-offset-4 "
      )}
    >
      <img
        height="16"
        width="16"
        src={`http://www.google.com/s2/favicons?domain=${domain}`}
        alt=""
        className="bg-details rounded-full"
      />
      <span className="max-w-[16ch] truncate">{domain}</span>
    </a>
  );
}

export function BookedBadge() {
  return (
    <motion.div
      className="relative flex justify-center items-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <RoundedStar className="fill-primary w-12 sm:w-20 h-12 sm:h-20" />
      <Lock className="absolute size-4 sm:size-6 text-primary-foreground" />
    </motion.div>
  );
}
