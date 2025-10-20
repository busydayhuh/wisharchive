import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { ChevronRight } from "lucide-react";
import { memo, useMemo } from "react";
import Masonry from "react-masonry-css";
import { Link, href } from "react-router";
import { useWishes } from "../model/useWishes";
import { WishImage } from "./WishImage";

export const RelatedWishes = memo(function RelatedWishes({
  userId,
  userName,
  wishId,
}: {
  userId: string;
  wishId: string;
  userName?: string;
}) {
  const { wishes, isLoading, error } = useWishes({
    ownerId: userId,
    archived: false,
    sort: {
      field: "$sequence",
      direction: "desc",
    },
    filters: [],
  });

  const relatedWishes = useMemo(
    () =>
      wishes
        ?.flat()
        .filter((wish) => wish.$id !== wishId)
        .slice(0, 4),
    [wishes, wishId]
  );

  if (isLoading) return "Загрузка...";
  if (error) return null;

  if (relatedWishes)
    return (
      <div className="space-y-3 md:space-y-6 mx-2 md:mx-auto mt-10 md:mt-20 md:max-w-[96%]">
        <div className="flex flex-wrap justify-between">
          <div className="font-bold text-lg md:text-xl 2xl:text-2xl">
            Другие желания пользователя {userName}
          </div>
          <Button
            variant="link"
            className="has-[>svg]:px-0 text-destructive"
            asChild
            aria-label="Смотреть все желания пользователя"
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
            <div
              className="group-card-wrapper transition-all duration-300"
              key={wish.$id}
            >
              <Link
                to={href(ROUTES.WISH, {
                  wishId: wish.$id,
                  userId: wish.ownerId,
                })}
                state={{
                  data: {
                    userName: wish.owner.userName,
                    userId: wish.owner.userId,
                    wishTitle: wish.title,
                    wlTitle: wish.wishlist?.title,
                  },
                }}
              >
                <div className="flex flex-col gap-1">
                  <WishImage
                    wishId={wish.$id}
                    url={wish.imageURL}
                    alt={wish.title}
                    variant="gallery"
                  />
                  <div className="font-medium text-base">{wish.title}</div>
                </div>
              </Link>
            </div>
          ))}
        </Masonry>
      </div>
    );
});
