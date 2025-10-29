import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import { useMatch } from "react-router";
import { useDashboardToolbar } from "../../model/useDashboardToolbar";
import FiltersGroup from "./FiltersGroup";
import { SortingSelect } from "./SortingSelect";
import ViewModeSwitch from "./ViewModeSwitch";

export function DashboardToolbar({ isOwner }: { isOwner: boolean }) {
  const isMobile = useIsMobile();
  const onArchivedPage = useMatch(ROUTES.ARCHIVED);
  const { toolbarState, setToolbarState } = useDashboardToolbar();

  if (isMobile) {
    return (
      <div className="top-0 z-20 sticky flex justify-between gap-2 bg-background py-2 w-full">
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
    );
  }

  return (
    <div className="top-0 z-20 sticky flex justify-between items-center gap-2 bg-background mr-6 px-1.5 py-2 w-full">
      {!onArchivedPage && (
        <div className="flex items-center gap-2">
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
  );
}
