/* eslint-disable react-refresh/only-export-components */
import { appwriteService } from "@/shared/model/appwrite";
import { ROUTES } from "@/shared/model/routes";
import { ID } from "appwrite";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { href, useNavigate } from "react-router";

export type FormValues = {
  login: {
    email: string;
    password: string;
  };

  register: {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
  };
};

type Status = {
  status: "success" | "error";
  login_error_message?: string | null;
  register_error_message?: string | null;
};

type Current = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId?: string;
  name?: string;
  password?: string;
};

type UserContextType = {
  current: Current | null;
  login: (data: FormValues["login"]) => void;
  logout: () => void;
  register: (data: FormValues["register"]) => void;
  status: Status;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props: { children: ReactNode }) {
  const navigate = useNavigate();
  const [session, setSession] = useState<Current | null>(null);

  const [status, setStatus] = useState<Status>({
    status: "success",
    login_error_message: null,
    register_error_message: null,
  });

  async function login(data: FormValues["login"]) {
    try {
      const loggedIn = await appwriteService.account.createEmailPasswordSession(
        data.email,
        data.password
      );
      setSession(loggedIn);
      navigate(href(ROUTES.WISHES, { userId: loggedIn.userId }));
      init();
    } catch (error) {
      setStatus({
        status: "error",
        login_error_message: "Неверный логин или пароль",
      });
      console.log("Не получилось войти", error);
    }
  }

  async function logout() {
    try {
      await appwriteService.account.deleteSession("current");
      setSession(null);
      navigate("/login");
    } catch (error) {
      console.log("Не получилось выйти", error);
    }
  }

  async function register(data: FormValues["register"]) {
    try {
      await appwriteService.account.create(
        ID.unique(),
        data.email,
        data.password,
        data.name
      );
      await login(data);
    } catch (error) {
      setStatus({
        status: "error",
        register_error_message: "Не удалось зарегистрироваться",
      });
      console.log("Не получилось зарегистрироваться", error);
    }
  }

  async function init() {
    try {
      const loggedIn = await appwriteService.account.get();
      setSession(loggedIn);
    } catch {
      setSession(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: session, login, logout, register, status }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
