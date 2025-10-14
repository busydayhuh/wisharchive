import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import { ROUTES } from "@/shared/model/routes";
import Searchbar from "@/shared/ui/Searchbar";
import { useMatch } from "react-router";
import { useDashboardToolbar } from "../../model/useDashboardToolbar";
import FiltersGroup from "./FiltersGroup";
import { SortingSelect } from "./SortingSelect";
import ViewModeSwitch from "./ViewModeSwitch";

export function DashboardToolbar({ isOwner }: { isOwner: boolean }) {
  const isMobile = useIsMobile();
  const onArchivedPage = useMatch(ROUTES.ARCHIVED);
  const { searchString, setSearchString, toolbarState, setToolbarState } =
    useDashboardToolbar();

  if (isMobile) {
    return (
      <div className="top-0 z-20 sticky flex flex-col justify-between gap-2 bg-background py-2 w-full">
        <Searchbar
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <div className="flex justify-between gap-2">
          {!onArchivedPage && (
            <div className="flex gap-2">
              <SortingSelect />
              <FiltersGroup isOwner={isOwner} />
            </div>
          )}
          <ViewModeSwitch
            viewMode={toolbarState.viewMode}
            setViewMode={(value: "gallery" | "table") =>
              setToolbarState((prev) => ({ ...prev, viewMode: value }))
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="top-0 z-20 sticky flex justify-between items-end gap-2 bg-background mr-6 pb-3 w-full">
      {!onArchivedPage && (
        <>
          <SortingSelect />
          <FiltersGroup isOwner={isOwner} />
        </>
      )}
      <Searchbar
        searchString={searchString}
        setSearchString={setSearchString}
        className={cn("mr-2", "w-lg", "justify-end ms-auto")}
      />

      <ViewModeSwitch
        viewMode={toolbarState.viewMode}
        setViewMode={(value: "gallery" | "table") =>
          setToolbarState((prev) => ({ ...prev, viewMode: value }))
        }
      />
    </div>
  );
}
