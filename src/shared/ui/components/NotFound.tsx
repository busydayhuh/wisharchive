import { Link } from "react-router";
import NotFoundUrl from "../assets/images/not-found.svg";
import { Button } from "../kit/button";

export function NotFound() {
  return (
    <div className="relative flex flex-col justify-center items-center max-w-full h-full overflow-hidden">
      <img
        src={NotFoundUrl}
        className="w-full max-w-[75rem] max-h-[60rem]"
        alt="Page Not Found"
      />
      <h1 className="top-5 sm:top-10 absolute font-bold text-3xl lg:text-5xl">
        Потерялись?
      </h1>

      <Button size="lg" className="bottom-[10%] sm:bottom-[30%] absolute h-14">
        <Link to="/">На главную</Link>
      </Button>
    </div>
  );
}
