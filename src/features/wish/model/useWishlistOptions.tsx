import { useAuth } from "@/features/auth";
import { useCollabWishlists } from "@/features/dashboard";
import { PRIVACY_ICONS } from "@/shared/ui/Badges";
import { type Option } from "@/shared/ui/ResponsiveSelect";
import { useMemo } from "react";

type WishlistOption = Option & {
  ownerId?: string;
};

export function useWishlistOptions(selectedValue: string | null) {
  const { userId } = useAuth();
  const { wishlists, isLoading, error } = useCollabWishlists(
    {
      sort: { field: "$sequence", direction: "desc" },
      filters: [],
      limit: 100,
    },
    "all",
    userId
  );
  const optionValue = useMemo(() => selectedValue ?? "none", [selectedValue]);
  const options: WishlistOption[] = useMemo(
    () => [
      {
        value: "none",
        label: "без списка",
        icon: PRIVACY_ICONS.none,
      },
      ...(wishlists ?? []).map((wl) => ({
        value: wl.$id,
        label: wl.title,
        icon:
          wl.ownerId === userId
            ? wl.isPrivate
              ? PRIVACY_ICONS.private
              : PRIVACY_ICONS.default
            : PRIVACY_ICONS.collab,
        ownerId: wl.ownerId,
      })),
    ],
    [userId, wishlists]
  );

  const selectedOption: WishlistOption = useMemo(
    () =>
      options.find((o) => o.value === optionValue) ?? {
        value: "none",
        label: "без списка",
        icon: PRIVACY_ICONS.none,
      },
    [optionValue, options]
  );

  return { wishlists, isLoading, error, optionValue, options, selectedOption };
}
