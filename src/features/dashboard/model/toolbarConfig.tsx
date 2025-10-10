import {
  ArrowDown10,
  ArrowDownZA,
  ArrowUp10,
  ArrowUpAZ,
  CalendarArrowDown,
  CalendarArrowUp,
  ClockArrowDown,
  ClockArrowUp,
  SortAscIcon,
  SortDescIcon,
} from "lucide-react";

export type DashboardType =
  | "wishes"
  | "lists"
  | "booked"
  | "bookmarks"
  | "shared"
  | "archived"
  | "list";

export type Sort = {
  label: string;
  field: string;
  direction: "asc" | "desc";
  default?: boolean;
  icon?: React.ReactNode;
};
export type Filter = {
  key: string;
  value?: string | boolean | number | null;
  requiresUser?: boolean;
  label: string;
  onlyIfOwner?: boolean;
};

export type ToolbarConfig = {
  sorts: Sort[];
  filters: Filter[];
};

const wishesSorts: Sort[] = [
  {
    label: "Сначала новые",
    field: "$sequence",
    direction: "desc",
    default: true,
    icon: <CalendarArrowDown />,
  },
  {
    label: "Сначала старые",
    field: "$sequence",
    direction: "asc",
    icon: <CalendarArrowUp />,
  },
  {
    label: "По названию (А-Я)",
    field: "title",
    direction: "asc",
    icon: <ArrowUpAZ />,
  },
  {
    label: "По названию (Я-А)",
    field: "title",
    direction: "desc",
    icon: <ArrowDownZA />,
  },
  {
    label: "Сначала дешевле",
    field: "price",
    direction: "asc",
    icon: <ArrowUp10 />,
  },
  {
    label: "Сначала дороже",
    field: "price",
    direction: "desc",
    icon: <ArrowDown10 />,
  },
  {
    label: "Сначала низкий приоритет",
    field: "priority",
    direction: "asc",
    icon: <SortAscIcon />,
  },
  {
    label: "Сначала высокий приоритет",
    field: "priority",
    direction: "desc",
    icon: <SortDescIcon />,
  },
];

const wishlistsSorts: Sort[] = [
  {
    label: "Сначала новые",
    field: "$sequence",
    direction: "desc",
    default: true,
    icon: <CalendarArrowDown />,
  },
  {
    label: "Сначала старые",
    field: "$sequence",
    direction: "asc",
    icon: <CalendarArrowUp />,
  },
  {
    label: "По названию (А-Я)",
    field: "title",
    direction: "asc",
    icon: <ArrowUpAZ />,
  },
  {
    label: "По названию (Я-А)",
    field: "title",
    direction: "desc",
    icon: <ArrowDownZA />,
  },
  {
    label: "Недавно обновлённые",
    field: "$updatedAt",
    direction: "desc",
    icon: <ClockArrowDown />,
  },
  {
    label: "Давно не обновлялись",
    field: "$updatedAt",
    direction: "asc",
    icon: <ClockArrowUp />,
  },
];

export const toolbarConfigs: Record<DashboardType, ToolbarConfig> = {
  wishes: {
    sorts: wishesSorts,
    filters: [
      { key: "isBooked", value: false, label: "только свободные" },
      { key: "priority", value: "2", label: "высокий приоритет" },
    ],
  },
  lists: {
    sorts: wishlistsSorts,
    filters: [
      {
        key: "isPrivate",
        value: true,
        label: "только приватные",
        onlyIfOwner: true,
      },
    ],
  },
  booked: {
    sorts: wishesSorts,
    filters: [{ key: "priority", value: "2", label: "высокий приоритет" }],
  },
  bookmarks: {
    sorts: wishlistsSorts,
    filters: [
      {
        key: "isPrivate",
        value: true,
        label: "только приватные",
        onlyIfOwner: true,
      },
    ],
  },
  shared: {
    sorts: wishlistsSorts,
    filters: [
      { key: "editorsIds", requiresUser: true, label: "я редактор" },
      { key: "readersIds", requiresUser: true, label: "я читатель" },
      { key: "ownerId", requiresUser: true, label: "я владелец" },
    ],
  },
  archived: {
    sorts: [],
    filters: [],
  },
  list: {
    sorts: wishesSorts,
    filters: [
      { key: "isBooked", value: false, label: "только свободные" },
      { key: "priority", value: "2", label: "высокий приоритет" },
      { key: "ownerId", requiresUser: true, label: "только мои" },
    ],
  },
};
