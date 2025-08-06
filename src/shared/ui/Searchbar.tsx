import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Search, X } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

function Searchbar({
  searchString,
  setSearchString,
  className,
  shouldGrow = true,
}: {
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  shouldGrow?: boolean;
} & React.ComponentProps<"div">) {
  function clearSearchbar() {
    setSearchString("");
  }

  function setNewQuery(query: string) {
    setSearchString(query);
  }
  return (
    <div className={cn("group/searchbar flex items-center gap-2", className)}>
      <Input
        className={cn(
          "shadow-none pb-1.5 border-0 rounded-2xl outline-ring/60 h-8 text-sm",
          shouldGrow &&
            "w-full md:w-full focus-visible:w-full transition-w-linear",
          !searchString && shouldGrow && "md:w-48"
        )}
        placeholder="найти"
        type="text"
        onChange={(e) => {
          setNewQuery(e.target.value);
        }}
        value={searchString}
      />
      {searchString ? (
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-transparent has-[>svg]:px-0 py-0 rounded-full"
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
