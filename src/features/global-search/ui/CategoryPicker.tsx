import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group";
import type { Category } from "../GlobalSearch";

export function CategoryPicker({
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
