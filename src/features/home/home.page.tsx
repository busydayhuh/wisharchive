import { ROUTES } from "@/shared/model/routes";
import { Link, href } from "react-router-dom";

function Homepage() {
  return (
    <div className="flex items-center justify-center grow h-dvh">
      <div className="flex flex-col gap-1">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
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
