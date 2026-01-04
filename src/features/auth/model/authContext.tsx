/* eslint-disable react-refresh/only-export-components */
import { appwriteService } from "@/shared/api/appwrite";
import db from "@/shared/api/databases";
import {
  handleError,
  type ResponseType,
} from "@/shared/entities/errors/handleError";
import { clearLocalFilters } from "@/shared/hooks/useLocalStorage";
import { useRevalidateSWR } from "@/shared/hooks/useRevalidateSWR";
import { useUpdateSWRCache } from "@/shared/hooks/useUpdateSWRCache";
import { type Models } from "appwrite";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

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
  userId?: string;
  session: Session;
  login: (data: FormValues["login"]) => Promise<ResponseType>;
  logout: () => Promise<ResponseType>;
  register: (data: FormValues["register"]) => Promise<ResponseType>;
  initSession: () => Promise<void>;
  isLoggedIn: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useAuth() {
  return useContext(UserContext);
}

export function UserProvider(props: { children: ReactNode }) {
  const navigate = useNavigate();
  const { revalidate } = useRevalidateSWR();
  const { clearCache } = useUpdateSWRCache();

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
      revalidate("currentUserTeams");

      return { ok: true };
    } catch (error) {
      return handleError(error);
    }
  }

  async function logout() {
    try {
      await appwriteService.account.deleteSession("current");
      setSession(null);
      setUser(null);

      clearCache();
      clearLocalFilters();

      navigate("/login");

      return { ok: true };
    } catch (error) {
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
      return handleError(error);
    }
  }

  const init = useCallback(async () => {
    try {
      const loggedIn = await appwriteService.account.get();
      setUser(loggedIn);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <UserContext.Provider
      value={{
        current: user,
        userId: user?.$id,
        login,
        logout,
        register,
        session,
        initSession: init,
        isLoggedIn: Boolean(user),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
