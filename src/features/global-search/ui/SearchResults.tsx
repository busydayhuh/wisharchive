import { ItemGroup } from "@/shared/ui/kit/item";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { cn } from "@/shared/utils/css";
import { Frown, Leaf, Wind } from "lucide-react";
import type { AnyDocument, Category } from "../model/types";
import { useGlobalSearch } from "../model/useGlobalSearch";
import { ResultItem } from "./ResultItem";
import { GlobalSearchSkeletons } from "./Skeletons";

export function SearchResults({
  category,
  searchString,
  isMobile,
  setOpen,
}: {
  category: Category;
  searchString: string;
  isMobile?: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}) {
  const { results, isLoading, error } = useGlobalSearch({
    category,
    search: searchString,
  });

  const groupHeaders = {
    wishes: "Мои желания",
    wishlists: "Мои списки желаний",
    users: "Пользователи",
  };

  if (isLoading)
    return (
      <div className="flex flex-col h-96 max-h-96 overflow-y-scroll">
        <Skeleton className="w-36 h-5 shrink-0" />
        {[...Array(5)].map((_, index) => (
          <GlobalSearchSkeletons
            category={category}
            key={"search-loading" + index}
            size={isMobile ? "sm" : "default"}
          />
        ))}
      </div>
    );
  if (error || (!isLoading && !results))
    return (
      <p className="flex flex-col items-center gap-1 mt-2 md:mt-4 text-muted-foreground text-sm">
        <Frown />
        Что-то пошло не так. Повторите запрос позже
      </p>
    );

  if (results)
    return (
      <div className="flex flex-col h-96 max-h-96 overflow-y-scroll">
        <p className="inline-flex items-center gap-2 mb-1 font-semibold text-muted-foreground text-xs">
          {searchString ? (
            <>
              Результаты поиска
              <span className="bg-muted px-2.5 py-1 rounded-full text-[0.6rem] shrink-0">
                {results.length}
              </span>
            </>
          ) : (
            groupHeaders[category]
          )}
        </p>
        <ItemGroup>
          {results.length === 0 && (
            <p className="flex flex-col items-center gap-1 mt-2 md:mt-4 text-muted-foreground text-sm">
              <span className="inline-flex items-center">
                <Wind className="stroke-[1.5px]" />
                <Leaf className="size-4" />
              </span>
              Нет результатов
            </p>
          )}
          {results.map((r) => (
            <ResultItem
              item={r as AnyDocument}
              category={category}
              key={r.$id}
              isMobile={isMobile}
              setOpen={setOpen}
              className={cn(isLoading && "opacity-60")}
            />
          ))}
        </ItemGroup>
      </div>
    );
}
