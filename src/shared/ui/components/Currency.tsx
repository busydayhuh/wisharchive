import { CURRENCY } from "@/shared/utils/currencyList";

export function Currency({ currency }: { currency: string }) {
  return <span>{CURRENCY.find(({ abbr }) => abbr === currency)?.icon}</span>;
}
