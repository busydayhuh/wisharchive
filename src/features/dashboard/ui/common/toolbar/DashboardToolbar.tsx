import { cn } from "@/shared/lib/css";
import Searchbar from "@/shared/ui/Searchbar";
import type { Dispatch, SetStateAction } from "react";
import Navigation from "./Navigation";
import ViewModeSwitch from "./ViewModeSwitch";

type DashboardToolbarProps = {
  isMobile: boolean;
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  viewMode: string;
  setViewMode: Dispatch<SetStateAction<string>>;
  showNavigation: boolean;
};

function DashboardToolbar({
  isMobile,
  searchString,
  setSearchString,
  viewMode,
  setViewMode,
  showNavigation,
}: DashboardToolbarProps) {
  if (isMobile) {
    return (
      <div className="top-0 z-20 sticky flex flex-col gap-6 bg-background -mb-4 py-2">
        <Searchbar
          searchString={searchString}
          setSearchString={setSearchString}
        />

        <div className="flex justify-between items-end gap-3 w-full">
          <Navigation />
          <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
    );
  }

  return (
    <div className="top-0 z-20 sticky flex justify-between items-end gap-5 bg-background mr-6 -mb-6 lg:-mb-7 py-2 w-full">
      <Navigation />

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

export default DashboardToolbar;
