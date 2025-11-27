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
      selectedValue={value}
      onSelect={onValueChange}
      options={options}
      renderSelected={(selected) => (
        <span className="flex justify-between items-center gap-1">
          {selected?.icon}
          <ChevronDown className="md:hidden size-3" />
        </span>
      )}
      renderOption={(opt) => (
        <span className="flex justify-between items-center gap-2 w-full">
          {opt.label}
          <span className="text-muted-foreground">{opt.icon}</span>
        </span>
      )}
      triggerClassName="bg-muted/60 px-3 rounded-sm h-9 text-muted-foreground"
      contentClassName="md:w-3xs"
      title="Валюта"
    />
  );
}
