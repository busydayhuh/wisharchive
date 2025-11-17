import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group";
import Searchbar from "@/shared/ui/Searchbar";

import { cn } from "@/shared/lib/css";
import { useDebounce } from "@/shared/lib/react/useDebounce";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import type {
  UserDocumentType,
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/kit/item";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { Frown, Leaf, Search, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { href } from "react-router";
import { useRoute } from "../breadcrumbs";
import { useGlobalSearch } from "./model/useGlobalSearch";
import { GlobalSearchSkeletons } from "./ui/Skeletons";

export type Category = "wishes" | "wishlists" | "users";
type AnyDocument = WishDocumentType | WishlistDocumentType | UserDocumentType;

export function GlobalSearchDialog() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const [searchString, setSearchString] = useState("");
  const debouncedSearch = useDebounce(searchString);

  const [category, setCategory] = useState<Category>("wishes");

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const mobileTrigger = (
    <Button variant="secondary" size="icon" className="ms-auto">
      <Search />
    </Button>
  );
  const desktopTrigger = (
    <div className="flex justify-self-end items-center gap-2">
      <Button
        variant="secondary"
        className="justify-between items-center pr-1.5 w-9 md:w-48 h-9 text-muted-foreground/50"
      >
        поиск
        <span className="bg-blue-bg px-1.5 py-1 rounded-[0.5rem] font-mono font-medium text-[0.6rem] text-blue">
          Ctrl+K
        </span>
      </Button>
      <Search className="size-3" />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isMobile ? mobileTrigger : desktopTrigger}
      </DialogTrigger>

      <DialogContent
        className={cn("top-[40%] md:max-w-2xl lg:max-w-3xl 2xl:max-w-5xl")}
      >
        <DialogHeader>
          <DialogTitle className="text-lg lg:text-2xl">
            Поиск по категориям
          </DialogTitle>
        </DialogHeader>

        <CategoryPicker category={category} setCategory={setCategory} />

        <Searchbar
          searchString={searchString}
          setSearchString={setSearchString}
          className="w-full [&_input]:h-12"
          grow={false}
        />
        <div className="h-96">
          <SearchResults
            category={category}
            searchString={debouncedSearch}
            isMobile={isMobile}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CategoryPicker({
  category,
  setCategory,
}: {
  category: Category;
  setCategory: (category: Category) => void;
}) {
  const styles =
    "text-xs text-muted-foreground font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground cursor-pointer first:pl-2.5 px-2.5 last:pr-2.5 rounded-sm hover:text-foreground h-8";

  return (
    <ToggleGroup type="single" value={category} onValueChange={setCategory}>
      <ToggleGroupItem
        value="wishes"
        aria-label="Поиск в желаниях"
        className={styles}
      >
        мои желания
      </ToggleGroupItem>
      <ToggleGroupItem
        value="wishlists"
        aria-label="Поиск в списках"
        className={styles}
      >
        мои списки
      </ToggleGroupItem>
      <ToggleGroupItem
        value="users"
        aria-label="Поиск в пользователях"
        className={styles}
      >
        пользователи
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function SearchResults({
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

  if (error)
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

function Media({ category, item }: { category: Category; item: AnyDocument }) {
  if (category === "users")
    return (
      <UserAvatar
        size="md"
        avatarURL={item.avatarURL}
        name={item.userName}
        id={item.userId}
      />
    );
  if (category === "wishes")
    return (
      <img
        src={item.imageURL}
        alt={item.title[0] || ""}
        className="flex justify-center items-center bg-muted font-medium"
      />
    );
  if (category === "wishlists")
    return (
      <img
        src={item.wishes?.at(-1)?.imageURL}
        alt={item.title[0] || ""}
        className="flex justify-center items-center bg-muted font-medium"
      />
    );
}

function ResultItem({
  item,
  category,
  isMobile,
  setOpen,
  className,
}: {
  item: AnyDocument;
  category: Category;
  isMobile?: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  className?: string;
}) {
  const { navigateWithState } = useRoute();

  function handleNavigation() {
    if (category === "wishes")
      navigateWithState(
        href(ROUTES.WISH, { userId: item.ownerId, wishId: item.$id }),
        { wishTitle: item.title }
      );

    if (category === "wishlists")
      navigateWithState(
        href(ROUTES.WISHLIST, { userId: item.ownerId, listId: item.$id }),
        { wlTitle: item.title }
      );

    if (category === "users")
      navigateWithState(href(ROUTES.WISHES, { userId: item.userId }));

    setOpen(false);
  }

  return (
    <Item
      size={isMobile ? "sm" : "default"}
      className={cn(
        isMobile && "px-1 py-2",
        "hover:bg-muted/50 cursor-pointer",
        className
      )}
      onClick={handleNavigation}
    >
      <ItemMedia variant="image">
        <Media item={item} category={category} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <span className="line-clamp-2">{item.title || item.userName}</span>
        </ItemTitle>
        <ItemDescription>
          {category === "users" ? `@${item.userId}` : item.description ?? ""}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
