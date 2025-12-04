import { cn } from "@/shared/lib/css";
import { useDebounce } from "@/shared/lib/react/useDebounce";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type {
  UserDocumentType,
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import Searchbar from "@/shared/ui/Searchbar";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryPicker } from "./ui/CategoryPicker";
import { SearchResults } from "./ui/SearchResults";

export type Category = "wishes" | "wishlists" | "users";
export type AnyDocument =
  | WishDocumentType
  | WishlistDocumentType
  | UserDocumentType;

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
        className="justify-between items-center pr-1.5 w-9 md:w-36 h-9 text-muted-foreground/50 text-xs"
      >
        поиск
        <span className="bg-muted px-1.5 py-1 rounded-[0.5rem] font-mono font-medium text-[0.6rem] text-muted-foreground">
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
