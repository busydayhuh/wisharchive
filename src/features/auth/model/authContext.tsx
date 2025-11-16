/* eslint-disable react-refresh/only-export-components */
import { appwriteService } from "@/shared/model/appwrite";
import db from "@/shared/model/databases";
import { handleError, type ResponseType } from "@/shared/model/handleError";
import { type Models } from "appwrite";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";

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

type User = Models.User<{ theme?: "light" | "dark" }> | null;
type Session = Models.Session | null;

type UserContextType = {
  current: User;
  session: Session;
  login: (data: FormValues["login"]) => Promise<ResponseType>;
  logout: () => Promise<ResponseType>;
  register: (data: FormValues["register"]) => Promise<ResponseType>;
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

  async function login(data: FormValues["login"]) {
    try {
      const loggedIn = await appwriteService.account.createEmailPasswordSession(
        data.email,
        data.password
      );
      setSession(loggedIn);
      init();

      return { ok: true };
    } catch (error) {
      console.log("Не получилось войти", error);
      return handleError(error);
    }
  }

  async function logout() {
    try {
      await appwriteService.account.deleteSession("current");
      setSession(null);
      setUser(null);

      navigate("/login");

      return { ok: true };
    } catch (error) {
      console.log("Не получилось выйти", error);
      return handleError(error);
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

      return { ok: true };
    } catch (error) {
      console.log("Не удалось зарегистрироваться", error);
      return handleError(error);
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
        session,
        isLoggedIn: Boolean(user),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
