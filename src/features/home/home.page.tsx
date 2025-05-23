import { ROUTES } from "@/shared/model/routes";
import { Link, href } from "react-router-dom";

function Homepage() {
  return (
    <div>
      Hello from Homepage
      <Link to={href(ROUTES.WISHES, { userId: "my-user-id" })}>
        To the dashboard
      </Link>
    </div>
  );
}

export const Component = Homepage;
