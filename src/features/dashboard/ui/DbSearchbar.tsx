import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Search, X } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

function DbSearchbar({
  setSearchQuery,
  className,
}: {
  setSearchQuery: Dispatch<SetStateAction<string | null>>;
} & React.ComponentProps<"div">) {
  const [inputValue, setInputValue] = useState("");

  function clearSearchbar() {
    setInputValue("");
    setSearchQuery("");
  }

  function setNewQuery(query: string) {
    setInputValue(query);
    setSearchQuery(query);
  }
  return (
    <div
      className={cn(
        "group/searchbar flex md:justify-end items-center gap-2 w-full md:w-lg",
        className
      )}
    >
      <Input
        className={cn(
          "shadow-none pb-1.5 border-0 rounded-2xl w-full focus-visible:w-full h-8 text-sm transition-w-linear",
          !inputValue && "md:w-48"
        )}
        placeholder="найти"
        type="text"
        onChange={(e) => {
          setNewQuery(e.target.value);
        }}
        value={inputValue}
      />
      {inputValue ? (
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-transparent has-[>svg]:px-0 py-0 rounded-full"
          onClick={clearSearchbar}
        >
          <X />
        </Button>
      ) : (
        <Search className="size-4 text-ring/50 group-has-[input:focus-visible]/searchbar:text-foreground" />
      )}
    </div>
  );
}

export default DbSearchbar;
