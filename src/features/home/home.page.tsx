import { ROUTES } from "@/shared/config/routes";
import { Link, href } from "react-router-dom";

function Homepage() {
  return (
    <div className="relative flex justify-center items-center border-1 border-red-700 h-[50rem] grow">
      <div className="flex flex-col gap-1">
        <h2 className="first:mt-0 pb-2 border-b font-semibold text-3xl tracking-tight scroll-m-20">
          Hello from Homepage
        </h2>
        <Link to={href(ROUTES.WISHES, { userId: "my-user-id" })}>
          To the dashboard
        </Link>
        <Link to={ROUTES.LOGIN}>Войти</Link>
        <Link to={ROUTES.SIGNUP}>Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export const Component = Homepage;
