/* eslint-disable react-refresh/only-export-components */
import { appwriteService } from "@/shared/model/appwrite";
import db from "@/shared/model/databases";
import { ROUTES } from "@/shared/model/routes";
import { type Models } from "appwrite";
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
    nickname: string;
    name?: string;
    confirmPassword?: string;
  };
};

type Status = {
  status: "success" | "error";
  login_error_message?: string | null;
  register_error_message?: string | null;
};

type User = Models.User<{ theme?: "light" | "dark" }> | null;
type Session = Models.Session | null;

type UserContextType = {
  current: User;
  session: Session;
  login: (data: FormValues["login"]) => void;
  logout: () => void;
  register: (data: FormValues["register"]) => void;
  status: Status;
  isLoggedIn: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useAuth() {
  return useContext(UserContext);
}

export function UserProvider(props: { children: ReactNode }) {
  const navigate = useNavigate();

  const [session, setSession] = useState<Session>(null);
  const [user, setUser] = useState<User>(null);
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
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Не получилось выйти", error);
    }
  }

  async function register(data: FormValues["register"]) {
    try {
      await appwriteService.account.create(
        data.nickname,
        data.email,
        data.password,
        data.name
      );

      await db.users.create({
        userId: data.nickname,
        userName: data.name,
        userEmail: data.email,
      });

      await login(data);
    } catch (error) {
      setStatus({
        status: "error",
        register_error_message: "Не удалось зарегистрироваться",
      });
      console.log("Не удалось зарегистрироваться", error);
    }
  }

  async function init() {
    try {
      const loggedIn = await appwriteService.account.get();
      setUser(loggedIn);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        current: user,
        login,
        logout,
        register,
        status,
        session,
        isLoggedIn: Boolean(user),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
