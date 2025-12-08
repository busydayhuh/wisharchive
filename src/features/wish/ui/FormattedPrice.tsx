import { cn } from "@/shared/utils/css";
import { CURRENCY } from "@/shared/utils/currencyList";
import { useMemo } from "react";
import { NumericFormat } from "react-number-format";

export function FormattedPrice({
  price,
  currency = "RUB",
  className,
}: {
  price: number | null;
  currency: string;
  className?: string;
}) {
  const currencyIcon = useMemo(
    () => CURRENCY.find(({ abbr }) => abbr === currency)?.icon,
    [currency]
  );

  if (!price) return null;

  return (
    <NumericFormat
      thousandSeparator=" "
      decimalScale={0}
      value={price}
      displayType="text"
      suffix={" " + currencyIcon}
      className={cn("shrink-0", className)}
    />
  );
}
