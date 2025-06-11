import { ROUTES } from "@/shared/model/routes";

type Breadcrumb = {
  name: string;
  path: string;
};

const breadcrumbs: Breadcrumb[] = [
  {
    path: ROUTES.WISHES,
    name: "Дашборд",
  },
  {
    path: ROUTES.WISHLISTS,
    name: "Списки желаний",
  },
  {
    path: ROUTES.WISHLIST,
    name: "Список",
  },
  {
    path: ROUTES.WISH,
    name: "Желание",
  },
  {
    path: ROUTES.SHARED,
    name: "Совместные списки",
  },
  {
    path: ROUTES.BOOKED,
    name: "Хочу подарить",
  },
  {
    path: ROUTES.ARCHIVED,
    name: "Архив желаний",
  },
  {
    path: ROUTES.PROFILE,
    name: "Редактировать профиль",
  },
  {
    path: ROUTES.EDIT,
    name: "Редактировать желание",
  },
  {
    path: ROUTES.ADD,
    name: "Добавить желание",
  },
];
