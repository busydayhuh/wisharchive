import type { Message, Variant } from "./types";

export const STATUS_MESSAGES: Record<Variant, Record<string, Message>> = {
  default: {
    default: {
      header: "Что-то пошло не так",
      description: "Обновите страницу или повторите попытку позже",
    },
  },
  "no-items": {
    wishes: {
      header: "Нет желаний",
      description: "Здесь пока нет ни одного желания",
      CAT: "Создать желание",
    },
    wishlists: {
      header: "Нет списков",
      description: "Здесь пока нет ни одного списка",
      CAT: "Создать список",
    },
  },
  "no-results": {
    wishes: {
      header: "Нет таких желаний",
      description: "Ни одно желание не подходит под ваш запрос",
      CAT: "Создать желание",
    },
    wishlists: {
      header: "Нет таких списков",
      description: "Ни один список не подходит под ваш запрос",
      CAT: "Создать список",
    },
  },
  "not-found": {
    default: {
      header: "Страница не найдена",
      description: "Такой страницы не существует или она была удалена",
      CAT: "На главную",
    },
  },
  "no-access": {
    default: {
      header: "Нет доступа",
      description: "У вас нет доступа к этой странице",
      CAT: "На главную",
    },
  },
};
