import { cn } from "@/shared/lib/css";
import Searchbar from "@/shared/ui/Searchbar";
import { Navigation } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import ViewModeSwitch from "./ViewModeSwitch";

type DashboardToolbarProps = {
  isMobile: boolean;
  dashboardHeader: string | null;
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  viewMode: string;
  setViewMode: Dispatch<SetStateAction<string>>;
};

function DashboardToolbar({
  isMobile,
  dashboardHeader,
  searchString,
  setSearchString,
  viewMode,
  setViewMode,
}: DashboardToolbarProps) {
  if (isMobile) {
    return (
      <div className="top-0 z-10 sticky flex flex-col gap-6 bg-background -mb-4 py-2">
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
    <div className="top-0 z-10 sticky flex justify-between items-end gap-5 bg-background mr-6 -mb-9 py-2 w-full">
      <Navigation />

      <Searchbar
        searchString={searchString}
        setSearchString={setSearchString}
        className={cn(
          "mr-2",
          "md:justify-end w-full md:w-lg",
          !dashboardHeader ? "ms-auto" : "md:justify-start"
        )}
      />

      <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
}

export default DashboardToolbar;
