import type { Setter } from "@/shared/model/types";
import Searchbar from "@/shared/ui/Searchbar";

export function CollaboratorSearch({
  searchString,
  setSearchString,
}: {
  searchString: string;
  setSearchString: Setter<string>;
}) {
  return (
    <div>
      <span className="inline-block mb-2 font-medium text-muted-foreground text-sm">
        Найти пользователя по имени или никнейму
      </span>
      <Searchbar
        searchString={searchString}
        setSearchString={setSearchString}
        grow={false}
        className="[&_input]:h-12"
      />
    </div>
  );
}
