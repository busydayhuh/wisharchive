import { ROUTES } from "@/shared/config/routes";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useMatch } from "react-router";
import { useToolbar } from "../../model/store/toolbar/useToolbar";
import FiltersGroup from "./FiltersGroup";
import { SortingSelect } from "./SortingSelect";
import ViewModeSwitch from "./ViewModeSwitch";

export function DashboardToolbar({ isOwner }: { isOwner: boolean }) {
  const isMobile = useIsMobile();
  const onArchivedPage = useMatch(ROUTES.ARCHIVED);
  const { toolbarState, setToolbarState } = useToolbar();

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
          className="ms-auto"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center gap-2 mr-6 px-1.5 py-2 w-full">
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
        className="ms-auto"
      />
    </div>
  );
}
