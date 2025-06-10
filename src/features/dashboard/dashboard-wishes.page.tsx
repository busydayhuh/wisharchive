import { Button } from "@/shared/ui/kit/button";
import { useUser } from "../auth";

function WishesPage() {
  const user = useUser();

  return (
    <div className="flex items-center align-center h-full">
      <div>
        Привет, <span className="text-green pl-1">{user.current?.name}</span>
      </div>
      <Button variant="link" onClick={user.logout}>
        Выйти
      </Button>
    </div>
  );
}

export const Component = WishesPage;
