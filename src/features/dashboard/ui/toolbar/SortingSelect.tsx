import { cn } from "@/shared/lib/css";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { ChevronDown } from "lucide-react";
import { useToolbar } from "../../model/store/toolbar/useToolbar";
import { toolbarConfigs } from "../../model/toolbarConfig";
import type { SortState } from "../../model/types";

export function SortingSelect() {
  const { toolbarState, setToolbarState, dashboardType } = useToolbar();

  const sortState = toolbarState.sort;

  const options = toolbarConfigs[dashboardType].sorts.map((sort) => ({
    value: `${sort.field}+${sort.direction}`,
    label: sort.label,
    icon: sort.icon,
  }));

  function setSort(value: string) {
    const splitValue = value.split("+");
    const newState: SortState = {
      field: splitValue[0],
      direction: splitValue[1] as "asc" | "desc",
    };

    setToolbarState((prev) => ({ ...prev, sort: newState }));
  }

  return (
    <ResponsiveSelect
      selectedValue={`${sortState.field}+${sortState.direction}`}
      onSelect={setSort}
      options={options}
      renderSelected={(selected) => (
        <>
          <span className="flex items-center gap-1.5">
            {selected?.icon}
            {selected?.label}
          </span>
          <ChevronDown className="md:hidden size-3" />
        </>
      )}
      triggerClassName={cn(
        "gap-2 bg-primary px-2.5 w-fit max-w-[16rem] h-9 md:data-[size=default]:h-10 text-primary-foreground text-xs lg:text-sm"
      )}
      title="Сортировка"
    />
  );
}
