export const CURRENCY = [
  {
    abbr: "RUB",
    title: "Российский рубль",
    icon: "₽",
  },
  {
    abbr: "USD",
    title: "Доллар США",
    icon: "$",
  },
  {
    abbr: "EUR",
    title: "Евро",
    icon: "€",
  },
  {
    abbr: "GBP",
    title: "Фунт стерлингов",
    icon: "£",
  },
  {
    abbr: "INR",
    title: "Индийская рупия",
    icon: "₹",
  },
  {
    abbr: "CNY",
    title: "Китайский юань",
    icon: "¥",
  },
  {
    abbr: "JPY",
    title: "Японская иена",
    icon: "JP¥",
  },
  {
    abbr: "GEL",
    title: "Грузинский лари",
    icon: "₾",
  },
  {
    abbr: "KZT",
    title: "Казахский тенге",
    icon: "₸",
  },
  {
    abbr: "SAR",
    title: "Саудовский риял",
    icon: "﷼",
  },
  {
    abbr: "TRY",
    title: "Турецкая лира",
    icon: "₺",
  },
];

export function Currency({ currency }: { currency: string }) {
  return <span>{CURRENCY.find(({ abbr }) => abbr === currency)?.icon}</span>;
}
