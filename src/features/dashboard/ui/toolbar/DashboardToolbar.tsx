import { cn } from "@/shared/lib/css";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import Searchbar from "@/shared/ui/Searchbar";
import type { Dispatch, SetStateAction } from "react";
import ViewModeSwitch from "./ViewModeSwitch";

type DashboardToolbarProps = {
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  viewMode: "gallery" | "table";
  setViewMode: Dispatch<SetStateAction<"gallery" | "table">>;
  showNavigation: boolean;
};

export function DashboardToolbar({
  searchString,
  setSearchString,
  viewMode,
  setViewMode,
  showNavigation,
}: DashboardToolbarProps) {
  const { isMobile } = useSidebar();

  if (isMobile) {
    return (
      <div className="top-0 z-20 sticky flex justify-between gap-2 bg-background py-2 w-full">
        <Searchbar
          searchString={searchString}
          setSearchString={setSearchString}
        />

        <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
      </div>
    );
  }

  return (
    <div className="top-0 z-20 sticky flex justify-between items-end gap-5 bg-background mr-6 pb-3 w-full -">
      <Searchbar
        searchString={searchString}
        setSearchString={setSearchString}
        className={cn(
          "mr-2",
          "w-lg",
          showNavigation ? "justify-end ms-auto" : "justify-start"
        )}
      />

      <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
}
