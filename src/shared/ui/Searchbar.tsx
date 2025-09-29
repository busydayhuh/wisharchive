import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Search, X } from "lucide-react";
import { type ComponentProps } from "react";
import type { Setter } from "../model/types";

type SearchbarProps = {
  searchString: string;
  setSearchString: Setter<string>;
  grow?: boolean;
} & ComponentProps<"input">;

function Searchbar({
  searchString,
  setSearchString,
  className,
  grow = true,
}: SearchbarProps) {
  function clearSearchbar() {
    setSearchString("");
  }

  return (
    <div className={cn("group/searchbar flex items-center gap-2", className)}>
      <Input
        className={cn(
          "shadow-none border-0 outline-ring/60 h-9 placeholder:text-ring/90 text-sm",
          grow &&
            "w-full md:w-full focus-visible:w-full transition-[width] duration-300 ease-linear",
          !searchString && grow && "md:w-48"
        )}
        placeholder="поиск"
        type="text"
        onChange={(e) => {
          setSearchString(e.target.value ?? "");
        }}
        value={searchString}
      />
      {searchString ? (
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-transparent has-[>svg]:px-0 py-0"
          onClick={clearSearchbar}
        >
          <X />
        </Button>
      ) : (
        <Search className="size-4 text-ring/80 group-has-[input:focus-visible]/searchbar:text-foreground" />
      )}
    </div>
  );
}

export default Searchbar;
