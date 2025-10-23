import { PRIORITIES } from "@/shared/ui/Badges";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { useMemo } from "react";

export function PrioritySelect({
  onValueChange,
  value = "1",
}: {
  onValueChange: (value: string) => void;
  value: "2" | "1" | "0";
}) {
  const options = useMemo(
    () =>
      Object.entries(PRIORITIES).map((i) => ({
        value: i[0],
        label: i[1].title,
        colors: i[1].colors,
        icon: i[1].icon,
      })),
    []
  );

  return (
    <ResponsiveSelect
      options={options}
      onChange={onValueChange}
      value={value}
      renderTrigger={(selected) => (
        <span className="flex items-center gap-1.5">
          {selected?.icon}
          {selected?.label}
        </span>
      )}
      triggerCSS="py-6"
      title="Приоритет"
    />
  );
}
