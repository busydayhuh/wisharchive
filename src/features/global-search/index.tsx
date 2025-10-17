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

import { ImageTiles } from "@/features/dashboard";
import { cn } from "@/shared/lib/css";
import { useDebounce } from "@/shared/lib/react/useDebounce";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/kit/item";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { Models } from "appwrite";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { href, useNavigate } from "react-router";
import { useGlobalSearch } from "./model/useGlobalSearch";

export type Category = "wishes" | "wishlists" | "users";

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
    <Button variant="secondary" size="icon">
      <Search />
    </Button>
  );
  const desktopTrigger = (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        className="justify-between items-center pr-1.5 w-9 md:w-48 h-9 text-muted-foreground/50"
      >
        поиск
        <span className="bg-chart-4/80 p-1 rounded-[0.6rem] font-mono font-medium text-foreground text-xs">
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
    "text-xs font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground cursor-pointer first:pl-2.5 last:pr-2.5 rounded-sm hover:text-foreground h-8";

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
}: {
  category: Category;
  searchString: string;
  isMobile?: boolean;
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

  if (isLoading) return <p>⌛ Загрузка...</p>;
  if (error) return <p>⛔ Ошибка</p>;

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
          {results.length === 0 && <p>Нет результатов</p>}
          {results.map((r) => (
            <ResultItem
              item={r}
              category={category}
              key={r.$id}
              isMobile={isMobile}
            />
          ))}
        </ItemGroup>
      </div>
    );
}

function ResultItem({
  item,
  category,
  isMobile,
}: {
  item: Models.Document;
  category: Category;
  isMobile?: boolean;
}) {
  const media = {
    users: (
      <Avatar className="rounded-full size-10 overflow-clip">
        <AvatarImage src={item.avatarURL} />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    ),
    wishlists: <ImageTiles wishes={item.wishes} variant="table" />,
    wishes: <img src={item.imageURL} alt={item.title} />,
  };

  const navigate = useNavigate();

  function handleNavigation() {
    if (category === "wishes")
      navigate(href(ROUTES.WISH, { userId: item.ownerId, wishId: item.$id }));
    if (category === "wishlists")
      navigate(
        href(ROUTES.WISHLIST, { userId: item.ownerId, listId: item.$id })
      );
    if (category === "users")
      navigate(href(ROUTES.WISHES, { userId: item.userId }));
  }

  return (
    <Item
      size={isMobile ? "sm" : "default"}
      className={cn(
        isMobile && "px-1 py-2",
        "hover:bg-muted/50 cursor-pointer"
      )}
      onClick={handleNavigation}
    >
      <ItemMedia variant="image">{media[category]}</ItemMedia>
      <ItemContent>
        <ItemTitle>
          <span className="line-clamp-2">{item.title || item.userName}</span>
        </ItemTitle>
        <ItemDescription>
          {category === "users" ? `@${item.userId}` : item.description ?? ""}
        </ItemDescription>
      </ItemContent>
      {/* <ItemActions>
        <DialogClose asChild>
          <Button
            size={isMobile ? "icon" : "default"}
            onClick={handleNavigation}
          >
            {isMobile ? <ArrowUpRight /> : "Перейти"}
          </Button>
        </DialogClose>
      </ItemActions> */}
    </Item>
  );
}
