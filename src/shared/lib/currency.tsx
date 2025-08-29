import {
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyLari,
  TbCurrencyLira,
  TbCurrencyPound,
  TbCurrencyRiyal,
  TbCurrencyRubel,
  TbCurrencyRupee,
  TbCurrencyYen,
  TbCurrencyYuan,
} from "react-icons/tb";

export const CURRENCY = [
  {
    abbr: "RUB",
    icon: <TbCurrencyRubel className="stroke-[1.5px]" />,
  },
  {
    abbr: "USD",
    icon: <TbCurrencyDollar className="stroke-[1.5px]" />,
  },
  {
    abbr: "EUR",
    icon: <TbCurrencyEuro className="stroke-[1.5px]" />,
  },
  {
    abbr: "GBP",
    icon: <TbCurrencyPound className="stroke-[1.5px]" />,
  },
  {
    abbr: "INR",
    icon: <TbCurrencyRupee className="stroke-[1.5px]" />,
  },
  {
    abbr: "CNY",
    icon: <TbCurrencyYuan className="stroke-[1.5px]" />,
  },
  {
    abbr: "JPY",
    icon: <TbCurrencyYen className="stroke-[1.5px]" />,
  },
  {
    abbr: "GEL",
    icon: <TbCurrencyLari className="stroke-[1.5px]" />,
  },
  {
    abbr: "SAR",
    icon: <TbCurrencyRiyal className="stroke-[1.5px]" />,
  },
  {
    abbr: "TRY",
    icon: <TbCurrencyLira className="stroke-[1.5px]" />,
  },
];

export function Currency({ currency }: { currency: string }) {
  return CURRENCY.find(({ abbr }) => abbr === currency)?.icon;
}
