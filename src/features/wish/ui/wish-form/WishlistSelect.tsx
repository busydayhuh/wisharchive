import { useWishlistOptions } from "@/features/wishlist-controls";
import type { WishlistDocumentType } from "@/shared/types";
import { ResponsiveSelect } from "@/shared/ui/components/ResponsiveSelect";

export function WishlistSelect({
  onSelect,
  selectedValue,
  className,
}: {
  onSelect: (id: string, wishlist: WishlistDocumentType | null) => void;
  selectedValue: string | null;
  className?: string;
}) {
  const { wishlists, isLoading, error, optionValue, options } =
    useWishlistOptions(selectedValue);

  return (
    <ResponsiveSelect
      options={options}
      onSelect={(value) => {
        const selectedList = wishlists?.find((wl) => wl.$id === value);
        onSelect(value, selectedList ?? null);
      }}
      renderSelected={(selected) => (
        <span className="inline-flex items-center gap-2">
          {selected?.icon}
          {selected?.label}
        </span>
      )}
      selectedValue={optionValue}
      title="Выберите список"
      isLoading={isLoading}
      error={error}
      triggerClassName={className}
    />
  );
}
