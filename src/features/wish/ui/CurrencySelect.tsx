import { CURRENCY } from "@/shared/lib/currency";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

export function CurrencySelect({
  onValueChange,
  value,
}: {
  onValueChange: (value: string) => void;
  value: string;
}) {
  const options = useMemo(
    () =>
      CURRENCY.map((c) => ({
        value: c.abbr,
        label: c.title,
        icon: c.icon,
      })),
    []
  );

  return (
    <ResponsiveSelect
      options={options}
      onChange={onValueChange}
      value={value}
      renderTrigger={(selected) => (
        <span className="flex justify-between items-center gap-1">
          {selected?.icon}
          <ChevronDown className="md:hidden size-3" />
        </span>
      )}
      triggerCSS="bg-muted/60 px-3 rounded-sm h-9 text-muted-foreground"
      renderOption={(opt) => (
        <span className="flex justify-between items-center gap-2 py-2 w-full">
          {opt.label}
          <span className="text-muted-foreground">{opt.icon}</span>
        </span>
      )}
      title="Валюта"
    />
  );
}
