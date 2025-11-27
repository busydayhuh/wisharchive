import { useRoute } from "@/features/breadcrumbs";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { ChevronDown } from "lucide-react";
import { href } from "react-router";
import { useWishlistOptions } from "../../model/useWishlistOptions";

export function WishlistChanger({
  onSelect,
  selectedValue,
  variant = "dashboard",
  className,
}: {
  onSelect: (value: string, list?: WishlistDocumentType) => void;
  selectedValue: string | null;
  variant?: "dashboard" | "form";
  className?: string;
}) {
  const { navigateWithState } = useRoute();
  const { wishlists, isLoading, error, optionValue, options, selectedOption } =
    useWishlistOptions(selectedValue);

  const goToWishlist = () => {
    if (!selectedOption || selectedOption.value === "none") {
      return undefined;
    }
    return navigateWithState(
      href(ROUTES.WISHLIST, {
        userId: selectedOption.ownerId!,
        listId: selectedOption.value,
      }),
      {
        userId: selectedOption.ownerId!,
        wlTitle: selectedOption.label,
      }
    );
  };

  if (isLoading) return <Skeleton className={cn("w-32 h-10", className)} />;
  if (error) return null;

  if (wishlists)
    return (
      <div
        className={cn("flex items-center rounded-md overflow-clip", className)}
      >
        <button
          className={cn(
            "flex items-center gap-1.5 bg-secondary hover:bg-secondary/90 shadow-none px-1.5 py-1 pr-2 border-r-1 border-r-border/60 rounded-l-md h-10",
            selectedOption?.value !== "none" && "cursor-pointer"
          )}
          onClick={goToWishlist}
        >
          {selectedOption?.icon}
          <span className="max-w-[10ch] truncate">{selectedOption?.label}</span>
        </button>

        <ResponsiveSelect
          selectedValue={optionValue}
          onSelect={(value) => {
            const selectedList = wishlists?.find((wl) => wl.$id === value);
            onSelect(value, selectedList);
          }}
          options={options}
          renderSelected={() => (
            <div className="md:hidden">
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          )}
          title="Выберите список"
          triggerClassName="h-10 bg-secondary rounded-r-md rounded-l-none flex items-center justify-center md:pl-0 py-5 px-2 md:pr-2 hover:bg-secondary/90"
          contentClassName={cn("max-h-md", variant === "dashboard" && "w-xs")}
        />
      </div>
    );
}
