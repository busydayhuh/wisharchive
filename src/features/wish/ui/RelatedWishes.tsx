import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import Masonry from "react-masonry-css";
import { Link, href } from "react-router";
import { useWishes } from "../model/useWishes";

export function RelatedWishes({
  userId,
  userName,
  wishId,
}: {
  userId: string;
  wishId: string;
  userName?: string;
}) {
  const { wishes, isLoading, error } = useWishes(userId);

  const relatedWishes = useMemo(
    () => wishes?.filter((wish) => wish.$id !== wishId).slice(0, 4),
    [wishes, wishId]
  );

  if (isLoading) return "Загрузка...";
  if (error) return null;

  if (relatedWishes)
    return (
      <div className="space-y-3 md:space-y-6 mx-2 md:mx-auto mt-10 md:mt-20 md:max-w-[96%]">
        <div className="flex flex-wrap justify-between">
          <div className="font-medium text-lg md:text-xl">
            Другие желания пользователя {userName}
          </div>
          <Button
            variant="link"
            className="has-[>svg]:px-0 text-destructive"
            asChild
          >
            <Link to={href(ROUTES.WISHES, { userId: userId })}>
              смотреть все <ChevronRight />
            </Link>
          </Button>
        </div>

        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 768: 2 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {relatedWishes.map((wish) => (
            <Link to={href(ROUTES.WISH, { wishId: wish.$id })} key={wish.$id}>
              <div className="flex flex-col gap-1 hover:brightness-50 mb-2 transition-all duration-300">
                {wish.imageURL ? (
                  <img
                    src={wish.imageURL}
                    alt={wish.title}
                    className="rounded-2xl"
                  />
                ) : (
                  <div className="bg-muted aspect-square"></div>
                )}
                <div className="font-medium text-base">{wish.title}</div>
              </div>
            </Link>
          ))}
        </Masonry>
      </div>
    );
}
