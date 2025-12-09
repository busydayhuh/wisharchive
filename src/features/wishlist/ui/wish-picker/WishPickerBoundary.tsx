import type { WishDocumentType } from "@/shared/types";
import { Frown, Wind, Leaf } from "lucide-react";
import { useMemo } from "react";

export function WishPickerBoundary({
  wishes,
  error,
  isLoading,
  skeleton,
  wishlistId,
  children,
}: {
  wishes?: WishDocumentType[];
  error?: unknown;
  isLoading: boolean;
  skeleton: React.ReactNode;
  wishlistId: string;
  children: (safeItems: WishDocumentType[]) => React.ReactNode;
}) {
  const filteredWishes = useMemo(
    () => wishes?.filter((w) => w.wishlistId !== wishlistId) ?? [],
    [wishes, wishlistId]
  );

  if (isLoading) return skeleton;

  if (error)
    return (
      <p className="flex flex-col items-center gap-1 mt-2 md:mt-4 text-muted-foreground text-sm">
        <Frown />
        Не удалось загрузить желания
      </p>
    );

  if (wishes && filteredWishes.length === 0)
    return (
      <p className="flex flex-col items-center gap-1 mt-2 md:mt-4 text-muted-foreground text-sm">
        <span className="inline-flex items-center">
          <Wind className="stroke-[1.5px]" />
          <Leaf className="size-4" />
        </span>
        Нет желаний
      </p>
    );

  if (wishes) return children(filteredWishes);
}
