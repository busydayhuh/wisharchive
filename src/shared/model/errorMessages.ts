export const ERRORS = {
  AUTH_ERRORS: [
    {
      type: "user_invalid_credentials",
      message: "Неверный логин или пароль",
      path: "auth",
    },
    {
      type: "password_personal_data",
      message:
        "Пароль не должен содержать персональные данные: ваше имя или email",
      path: "register",
    },
    {
      type: "user_email_already_exists",
      message: "Пользователь с таким email уже существует",
      path: "register",
    },

    {
      type: "user_not_found",
      message: "Пользователь не найден",
      path: "dashboard",
    },
  ],
  DATABASES_ERRORS: [
    {
      type: "document_not_found",
      message: "Желание не найдено",
    },
    {
      type: "collection_not_found",
      message: "Список желаний не найден",
    },
  ],
};

export type TError = {
  error: unknown;
  error_message: string;
};
