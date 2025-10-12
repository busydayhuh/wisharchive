import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { ArrowDownUp } from "lucide-react";
import type { SortState } from "../../model/DashboardToolbarContext";
import { toolbarConfigs } from "../../model/toolbarConfig";
import { useDashboardToolbar } from "../../model/useDashboardToolbar";

export function SortingSelect() {
  const { toolbarState, setToolbarState, dashboardType } =
    useDashboardToolbar();

  const sortState = toolbarState.sort;

  const options = toolbarConfigs[dashboardType].sorts.map((sort) => ({
    value: `${sort.field}+${sort.direction}`,
    label: sort.label,
    icon: sort.icon,
  }));

  //   const defaultOption = toolbarConfigs[dashboardType].sorts[0];
  //   const isCurrentDefault =
  //     sortState.direction === defaultOption.direction &&
  //     sortState.field === defaultOption.field;

  //   const mobileTriggerIcon = options.find(
  //     (o) => o.value === `${sortState.field}+${sortState.direction}`
  //   )?.icon;

  const isMobile = useIsMobile();

  function setSort(value: string) {
    const splitValue = value.split("+");
    const newState: SortState = {
      field: splitValue[0],
      direction: splitValue[1] as "asc" | "desc",
    };

    setToolbarState((prev) => ({ ...prev, sort: newState }));
  }

  return (
    <div
      className={cn(
        "flex items-center bg-muted rounded-md shrink-0",
        !isMobile && "pl-2.5 "
      )}
    >
      {!isMobile && <ArrowDownUp className="size-4" />}
      <ResponsiveSelect
        value={`${sortState.field}+${sortState.direction}`}
        onChange={setSort}
        options={options}
        triggerCSS={cn(
          "bg-muted shadow-2xs max-w-[16rem] font-medium",
          isMobile && "h-9 px-2.5",
          !isMobile && "pl-1.5"
        )}
        title="Сортировка"
      />
    </div>
  );
}
